import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';
import {
  DEFAULT_DISPLAY_CONFIG,
  resolveItemFieldVisibility,
} from '../../data/fallbackSiteData.js';
import { useDraftState } from '../../hooks/useDraftState.js';
import ImagePickerField from './components/ImagePickerField.jsx';
import DraftBanner from './components/DraftBanner.jsx';
import { useConfirm } from './context/ConfirmContext.jsx';

const EMPTY_ITEM = {
  title: '',
  tag: '',
  price_label: '',
  description: '',
  highlightsText: '',
  image_url: '',
  media_id: null,
  cta_text: 'Inquire Now',
  display_config: {},
  is_active: true,
  sort_order: 10,
};

const QUICK_TOGGLES = [
  { key: 'showImage', label: 'Photo' },
  { key: 'showTag', label: 'Tag Badge' },
  { key: 'showPriceOrLabel', label: 'Price / Scale' },
  { key: 'showDescription', label: 'Description' },
  { key: 'showHighlights', label: 'Highlights' },
  { key: 'showContactCta', label: 'Inquire CTA' },
];

export default function AdminServiceItems() {
  const { onContentChanged } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const confirm = useConfirm();

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [openVisibilityCardId, setOpenVisibilityCardId] = useState(null);
  const [showDefaultTogglesPanel, setShowDefaultTogglesPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const loadServices = useCallback(async () => {
    try {
      const res = await adminApi.getServices();
      const list = res.services || [];
      setServices(list);

      const paramId = Number(searchParams.get('serviceId'));
      if (paramId && list.some((s) => s.id === paramId)) {
        setSelectedServiceId(paramId);
      } else if (list.length > 0 && !selectedServiceId) {
        setSelectedServiceId(list[0].id);
      }
    } catch (err) {
      setError(err.message || 'Unable to load services.');
    } finally {
      setLoading(false);
    }
  }, [searchParams, selectedServiceId]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const loadItems = useCallback(async (serviceId) => {
    if (!serviceId) return;
    try {
      const res = await adminApi.getServiceItems(serviceId);
      setItems(res.items || []);
    } catch (err) {
      setError(err.message || 'Unable to load service offerings.');
    }
  }, []);

  useEffect(() => {
    if (selectedServiceId) {
      loadItems(selectedServiceId);
      setEditingItemId(null);
      setOpenVisibilityCardId(null);
    }
  }, [selectedServiceId, loadItems]);

  const activeService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) || null,
    [services, selectedServiceId]
  );

  const serverItemForm = useMemo(() => {
    if (editingItemId === null) return null;
    if (editingItemId === 'new') return { ...EMPTY_ITEM, service_id: selectedServiceId };
    const found = items.find((i) => i.id === editingItemId);
    if (!found) return null;
    return {
      ...EMPTY_ITEM,
      ...found,
      display_config:
        found.display_config && typeof found.display_config === 'object'
          ? found.display_config
          : {},
      highlightsText: Array.isArray(found.highlights) ? found.highlights.join('\n') : '',
    };
  }, [editingItemId, items, selectedServiceId]);

  const draftKey = editingItemId
    ? `service_item_${selectedServiceId}_${editingItemId}`
    : 'service_item_none';

  const {
    value: form,
    setValue: setForm,
    isDirty,
    hasRecoveredDraft,
    discardDraft,
    clearDraft,
  } = useDraftState(draftKey, serverItemForm);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleToggleDisplayField = async (fieldKey, checked) => {
    if (!activeService) return;
    const nextConfig = {
      ...DEFAULT_DISPLAY_CONFIG,
      ...(activeService.display_config || {}),
      [fieldKey]: checked,
    };
    try {
      await adminApi.updateService(activeService.id, { display_config: nextConfig });
      setServices((prev) =>
        prev.map((s) => (s.id === activeService.id ? { ...s, display_config: nextConfig } : s))
      );
      await onContentChanged();
      showToast('Updated service-wide field visibility.');
    } catch (err) {
      setError(err.message || 'Failed to update toggle.');
    }
  };

  const handleToggleItemField = async (item, fieldKey) => {
    if (!activeService) return;
    const serviceCfg = { ...DEFAULT_DISPLAY_CONFIG, ...(activeService.display_config || {}) };
    const currentEffective = resolveItemFieldVisibility(serviceCfg, item.display_config, fieldKey);
    const nextItemConfig = {
      ...(item.display_config || {}),
      [fieldKey]: !currentEffective,
    };
    try {
      const res = await adminApi.updateServiceItem(item.id, { display_config: nextItemConfig });
      setItems((prev) => prev.map((it) => (it.id === item.id ? res.item : it)));
      await onContentChanged();
      showToast(`Updated field visibility for "${item.title}".`);
    } catch (err) {
      setError(err.message || 'Failed to update card setting.');
    }
  };

  const handleResetItemOverrides = async (item) => {
    const ok = await confirm({
      title: 'Reset Card Overrides',
      message: `Reset card display overrides for "${item.title}" back to Service defaults?`,
      confirmText: 'Reset to Default',
      variant: 'warning',
    });
    if (!ok) return;

    try {
      const res = await adminApi.updateServiceItem(item.id, { display_config: {} });
      setItems((prev) => prev.map((it) => (it.id === item.id ? res.item : it)));
      await onContentChanged();
      showToast(`"${item.title}" now inherits Service defaults.`);
    } catch (err) {
      setError(err.message || 'Failed to reset card overrides.');
    }
  };

  const handleResetAllServiceOverrides = async () => {
    if (!activeService) return;
    const ok = await confirm({
      title: 'Reset All Cards to Default',
      message: `Reset display overrides for ALL offerings in "${activeService.title}" to follow Service defaults?`,
      confirmText: 'Reset All Cards',
      variant: 'warning',
    });
    if (!ok) return;

    try {
      await adminApi.resetServiceItemOverrides(activeService.id);
      await loadItems(activeService.id);
      await onContentChanged();
      showToast(`All cards in ${activeService.title} now follow Service defaults.`);
    } catch (err) {
      setError(err.message || 'Failed to reset all card overrides.');
    }
  };

  const handleSaveItem = async (e) => {
    if (e) e.preventDefault();
    if (!form) return;

    const isNew = editingItemId === 'new';
    const ok = await confirm({
      title: isNew ? 'Create New Offering' : 'Save Offering Changes',
      message: isNew
        ? `Are you sure you want to add this new offering to "${activeService?.title || 'Service'}"?`
        : `Are you sure you want to save changes to "${form.title}"?`,
      confirmText: isNew ? 'Create Offering' : 'Save Changes',
      variant: 'primary',
    });
    if (!ok) return;

    setSaving(true);
    setError('');
    const payload = {
      service_id: selectedServiceId,
      title: form.title,
      tag: form.tag,
      price_label: form.price_label,
      description: form.description,
      highlights: form.highlightsText,
      image_url: form.image_url,
      media_id: form.media_id,
      cta_text: form.cta_text,
      display_config: form.display_config || {},
      is_active: form.is_active,
      sort_order: form.sort_order,
    };
    try {
      if (editingItemId === 'new') {
        await adminApi.createServiceItem(payload);
        showToast('Offering added cleanly.');
      } else {
        await adminApi.updateServiceItem(editingItemId, payload);
        showToast('Offering updated cleanly.');
      }
      clearDraft();
      setEditingItemId(null);
      await loadItems(selectedServiceId);
      await loadServices();
      await onContentChanged();
    } catch (err) {
      setError(err.message || 'Failed to save offering.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (item) => {
    const ok = await confirm({
      title: 'Delete Offering',
      message: `Are you sure you want to delete "${item.title}"? This cannot be undone.`,
      confirmText: 'Delete Offering',
      cancelText: 'Cancel',
      variant: 'danger',
    });
    if (!ok) return;

    try {
      await adminApi.deleteServiceItem(item.id);
      if (editingItemId === item.id) {
        clearDraft();
        setEditingItemId(null);
      }
      showToast('Offering deleted.');
      await loadItems(selectedServiceId);
      await loadServices();
      await onContentChanged();
    } catch (err) {
      setError(err.message || 'Failed to delete item.');
    }
  };

  const handleServiceSelect = async (newId) => {
    if (newId === selectedServiceId) return;
    if (isDirty) {
      const ok = await confirm({
        title: 'Unsaved Changes',
        message: 'You have unsaved changes in your current offering draft. Switching services will discard them. Proceed?',
        confirmText: 'Switch Service',
        cancelText: 'Keep Editing',
        variant: 'warning',
      });
      if (!ok) return;
      discardDraft();
    }
    setSelectedServiceId(newId);
    setSearchParams({ serviceId: String(newId) });
  };

  const handleCancelEdit = async () => {
    if (isDirty) {
      const ok = await confirm({
        title: 'Discard Unsaved Changes',
        message: 'Discard all unsaved edits for this offering draft?',
        confirmText: 'Discard Draft',
        cancelText: 'Keep Editing',
        variant: 'warning',
      });
      if (!ok) return;
      discardDraft();
    }
    setEditingItemId(null);
  };

  const handleDiscardDraftWithConfirm = async () => {
    const ok = await confirm({
      title: 'Discard Draft Edits',
      message: 'Discard all unsaved edits made to this offering draft?',
      confirmText: 'Discard Draft',
      cancelText: 'Keep Editing',
      variant: 'warning',
    });
    if (!ok) return;
    discardDraft();
  };

  if (loading) {
    return <div className="admin-empty-box">Loading services &amp; offerings...</div>;
  }

  const displayCfg = {
    ...DEFAULT_DISPLAY_CONFIG,
    ...(activeService?.display_config || {}),
  };

  const cardsWithOverridesCount = items.filter(
    (it) => it.display_config && Object.keys(it.display_config).length > 0
  ).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Service Data &amp; Offerings</h1>
          <p className="admin-page-subtitle">
            Select a service to manage its cards and control field visibility.
          </p>
        </div>

        {activeService && editingItemId === null && (
          <button
            type="button"
            className="admin-btn-primary"
            onClick={() => setEditingItemId('new')}
          >
            + Add Offering
          </button>
        )}
      </div>

      {toast && <div className="admin-alert admin-alert-success">{toast}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {/* Clean Single-Row Selector Bar (replaces 2 rows of pill clutter) */}
      <div className="admin-toolbar-row admin-clean-toolbar">
        <div className="toolbar-select-group">
          <label htmlFor="service-picker-select" className="admin-label">
            Service
          </label>
          <select
            id="service-picker-select"
            className="admin-input admin-toolbar-select"
            value={selectedServiceId || ''}
            onChange={(e) => handleServiceSelect(Number(e.target.value))}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.items_count})
              </option>
            ))}
          </select>
        </div>

        {activeService && (
          <div className="toolbar-actions-group">
            <button
              type="button"
              className={`admin-btn-secondary admin-btn-sm ${showDefaultTogglesPanel ? 'is-expanded' : ''}`}
              onClick={() => setShowDefaultTogglesPanel((v) => !v)}
            >
              {showDefaultTogglesPanel ? 'Hide Field Defaults ▴' : 'All Cards Visibility ▾'}
            </button>
            <a
              href={`/services/${activeService.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-ghost admin-btn-sm"
            >
              Preview Page ↗
            </a>
          </div>
        )}
      </div>

      {activeService && (
        <>
          {/* Expandable Service-Wide Default Visibility Panel */}
          {showDefaultTogglesPanel && (
            <div className="admin-card admin-quick-toggles-bar">
              <div className="quick-toggles-header">
                <div>
                  <strong>All Cards Default ({activeService.title})</strong>
                  <span>
                    Applies to all cards unless customized individually
                    {cardsWithOverridesCount > 0
                      ? ` · ${cardsWithOverridesCount} card${cardsWithOverridesCount > 1 ? 's' : ''} customized`
                      : ''}
                  </span>
                </div>
                {cardsWithOverridesCount > 0 && (
                  <button
                    type="button"
                    className="admin-btn-secondary admin-btn-sm"
                    onClick={handleResetAllServiceOverrides}
                  >
                    Apply Default to All Cards
                  </button>
                )}
              </div>
              <div className="quick-toggles-list">
                {QUICK_TOGGLES.map((t) => (
                  <label key={t.key} className="admin-chip-toggle">
                    <input
                      type="checkbox"
                      checked={displayCfg[t.key] !== false}
                      onChange={(e) => handleToggleDisplayField(t.key, e.target.checked)}
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {editingItemId !== null && form ? (
            <form onSubmit={handleSaveItem} className="admin-form-stack">
              <DraftBanner
                isDirty={isDirty}
                hasRecoveredDraft={hasRecoveredDraft}
                onDiscard={handleDiscardDraftWithConfirm}
                onSave={handleSaveItem}
                saving={saving}
              />

              <div className="admin-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">
                    {editingItemId === 'new' ? 'Add Offering Item' : `Edit: ${form.title}`}
                  </h2>
                  <button
                    type="button"
                    className="admin-btn-ghost admin-btn-sm"
                    onClick={() => setEditingItemId(null)}
                  >
                    ← Back to Cards
                  </button>
                </div>

                <div className="admin-form-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">Item Title *</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Greenfield Championship Ground"
                      required
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-label">Tag Badge</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.tag}
                      onChange={(e) => setForm({ ...form, tag: e.target.value })}
                      placeholder="e.g. Full Cricket Ground"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-label">Price / Scale Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.price_label}
                      onChange={(e) => setForm({ ...form, price_label: e.target.value })}
                      placeholder="e.g. ₹2,500 / hr"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-label">Button Text (Links to Contact Us)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.cta_text}
                      onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                      placeholder="Inquire Now"
                    />
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Highlights / Specs (One per Line)</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={form.highlightsText}
                    onChange={(e) => setForm({ ...form, highlightsText: e.target.value })}
                    placeholder={'4 Natural Clay Turf Wickets\nBroadcast-Grade 1000 Lux Floodlights'}
                  />
                </div>

                <ImagePickerField
                  label="Offering Card Photo"
                  value={form.image_url}
                  defaultTag="service-items"
                  allowClear
                  onChange={(url, media) =>
                    setForm({ ...form, image_url: url, media_id: media?.id ?? null })
                  }
                />

                <div className="admin-form-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">Sort Order</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={form.sort_order}
                      onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    />
                  </div>

                  <label className="admin-switch-tile">
                    <input
                      type="checkbox"
                      checked={Boolean(form.is_active)}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    />
                    <div>
                      <strong>Active on View Page</strong>
                      <span>Uncheck to hide without deleting</span>
                    </div>
                  </label>
                </div>

                {/* Per-Card Field Visibility Overrides */}
                <div className="admin-card-subpanel">
                  <div className="subpanel-header">
                    <div>
                      <strong>Per-Card Field Visibility (Only This Card)</strong>
                      <span>
                        Choose whether this card uses the Service default or overrides individual fields.
                      </span>
                    </div>
                  </div>
                  <div className="admin-item-tri-grid">
                    {QUICK_TOGGLES.map((t) => {
                      const itemCfg = form.display_config || {};
                      const serviceVal = displayCfg[t.key] !== false;
                      const mode =
                        typeof itemCfg[t.key] === 'boolean'
                          ? itemCfg[t.key]
                            ? 'show'
                            : 'hide'
                          : 'inherit';

                      const setFieldMode = (nextMode) => {
                        const nextDisplay = { ...itemCfg };
                        if (nextMode === 'inherit') {
                          delete nextDisplay[t.key];
                        } else {
                          nextDisplay[t.key] = nextMode === 'show';
                        }
                        setForm({ ...form, display_config: nextDisplay });
                      };

                      return (
                        <div key={t.key} className="item-tri-row">
                          <span className="tri-row-label">{t.label}</span>
                          <div className="field-tri-toggle" role="group" aria-label={t.label}>
                            <button
                              type="button"
                              className={`tri-opt ${mode === 'inherit' ? 'is-active' : ''}`}
                              onClick={() => setFieldMode('inherit')}
                            >
                              Default ({serviceVal ? 'On' : 'Off'})
                            </button>
                            <button
                              type="button"
                              className={`tri-opt is-show ${mode === 'show' ? 'is-active' : ''}`}
                              onClick={() => setFieldMode('show')}
                            >
                              Show
                            </button>
                            <button
                              type="button"
                              className={`tri-opt is-hide ${mode === 'hide' ? 'is-active' : ''}`}
                              onClick={() => setFieldMode('hide')}
                            >
                              Hide
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="admin-form-footer">
                  <button
                    type="button"
                    className="admin-btn-ghost"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Offering'}
                  </button>
                </div>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="admin-card admin-coming-soon-notice">
              <h3>0 Offerings for {activeService.title}</h3>
              <p>
                Visitors opening <code>/services/{activeService.slug}</code> currently see the{' '}
                <strong>Coming Soon</strong> message.
              </p>
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => setEditingItemId('new')}
              >
                + Add First Offering
              </button>
            </div>
          ) : (
            <div className="admin-items-grid">
              {items.map((item) => {
                const itemOverrides = item.display_config || {};
                const overrideCount = Object.keys(itemOverrides).length;
                const isVisOpen = openVisibilityCardId === item.id;

                return (
                  <div key={item.id} className="admin-item-card">
                    <div className="admin-item-thumb">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} />
                      ) : (
                        <span>No Image</span>
                      )}
                      <span className={`admin-status-badge ${item.is_active ? 'status-new' : 'status-archived'}`}>
                        {item.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </div>

                    <div className="admin-item-body">
                      {(item.tag || item.price_label) && (
                        <div className="item-meta-pills">
                          {item.tag && <span className="admin-mini-badge">{item.tag}</span>}
                          {item.price_label && <span className="admin-mini-badge">{item.price_label}</span>}
                        </div>
                      )}
                      <h3>{item.title}</h3>
                      <p className="admin-item-desc-clamp">{item.description}</p>

                      {isVisOpen && (
                        <div className="item-card-overrides">
                          <div className="item-overrides-head">
                            <span>This Card Visibility:</span>
                            {overrideCount > 0 && (
                              <button
                                type="button"
                                className="item-reset-link"
                                onClick={() => handleResetItemOverrides(item)}
                              >
                                Reset to Default
                              </button>
                            )}
                          </div>
                          <div className="item-overrides-pills">
                            {QUICK_TOGGLES.map((t) => {
                              const isCustom = typeof itemOverrides[t.key] === 'boolean';
                              const isVisible = resolveItemFieldVisibility(
                                displayCfg,
                                itemOverrides,
                                t.key
                              );
                              return (
                                <button
                                  key={t.key}
                                  type="button"
                                  className={`item-override-pill ${isVisible ? 'is-on' : 'is-off'} ${
                                    isCustom ? 'is-custom' : ''
                                  }`}
                                  onClick={() => handleToggleItemField(item, t.key)}
                                >
                                  <span className="override-dot" />
                                  <span>{t.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="admin-item-actions">
                        <button
                          type="button"
                          className="admin-btn-primary admin-btn-sm"
                          onClick={() => setEditingItemId(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={`admin-btn-secondary admin-btn-sm ${isVisOpen ? 'is-expanded' : ''}`}
                          onClick={() => setOpenVisibilityCardId(isVisOpen ? null : item.id)}
                        >
                          {isVisOpen
                            ? 'Hide Fields ▴'
                            : overrideCount > 0
                              ? `Visibility (${overrideCount}) ▾`
                              : 'Visibility ▾'}
                        </button>
                        <button
                          type="button"
                          className="admin-btn-ghost-danger admin-btn-sm"
                          onClick={() => handleDeleteItem(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
