import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';
import { DEFAULT_DISPLAY_CONFIG } from '../../data/fallbackSiteData.js';
import { useDraftState } from '../../hooks/useDraftState.js';
import ImagePickerField from './components/ImagePickerField.jsx';
import DraftBanner from './components/DraftBanner.jsx';

const EMPTY_ITEM = {
  title: '',
  tag: '',
  price_label: '',
  description: '',
  highlightsText: '',
  image_url: '',
  media_id: null,
  cta_text: 'Inquire Now',
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

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // null | 'new' | id
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  // Load services list
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
      showToast('Updated view page visibility toggle.');
    } catch (err) {
      setError(err.message || 'Failed to update toggle.');
    }
  };

  const handleSaveItem = async (e) => {
    if (e) e.preventDefault();
    if (!form) return;
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
    if (!window.confirm(`Delete "${item.title}"?`)) return;
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

  if (loading) {
    return <div className="admin-empty-box">Loading services &amp; offerings...</div>;
  }

  const displayCfg = {
    ...DEFAULT_DISPLAY_CONFIG,
    ...(activeService?.display_config || {}),
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SERVICE DATA &amp; OFFERINGS</h1>
          <p className="admin-page-subtitle">
            Manage cards inside each Service view page. All inquiry buttons automatically redirect visitors to Contact Us.
          </p>
        </div>

        {activeService && editingItemId === null && (
          <button
            type="button"
            className="admin-btn-primary"
            onClick={() => setEditingItemId('new')}
          >
            + ADD ITEM TO {activeService.title}
          </button>
        )}
      </div>

      {toast && <div className="admin-alert admin-alert-success">{toast}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {/* Service Selector Tabs */}
      <div className="admin-service-tabs">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`admin-pill-btn ${selectedServiceId === s.id ? 'is-active' : ''}`}
            onClick={() => {
              setSelectedServiceId(s.id);
              setSearchParams({ serviceId: String(s.id) });
            }}
          >
            {s.title} ({s.items_count})
          </button>
        ))}
      </div>

      {activeService && (
        <>
          {/* Quick View-Page Field Toggles */}
          <div className="admin-card admin-quick-toggles-bar">
            <div className="quick-toggles-header">
              <div>
                <strong>VIEW PAGE FIELDS FOR {activeService.title}</strong>
                <span>Toggle fields ON or OFF directly on the public View Page:</span>
              </div>
              <a
                href={`/services/${activeService.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn-ghost"
              >
                Preview View Page ↗
              </a>
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

          {editingItemId !== null && form ? (
            <form onSubmit={handleSaveItem} className="admin-form-stack">
              <DraftBanner
                isDirty={isDirty}
                hasRecoveredDraft={hasRecoveredDraft}
                onDiscard={discardDraft}
                onSave={handleSaveItem}
                saving={saving}
              />

              <div className="admin-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">
                    {editingItemId === 'new' ? 'ADD OFFERING ITEM' : `EDIT ITEM: ${form.title}`}
                  </h2>
                  <button
                    type="button"
                    className="admin-btn-ghost"
                    onClick={() => setEditingItemId(null)}
                  >
                    ← Back to Items
                  </button>
                </div>

                <div className="admin-form-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">ITEM TITLE *</label>
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
                    <label className="admin-label">TAG BADGE (TOGGLEABLE ON VIEW PAGE)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.tag}
                      onChange={(e) => setForm({ ...form, tag: e.target.value })}
                      placeholder="e.g. Full Cricket Ground"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-label">PRICE / SCALE LABEL (TOGGLEABLE)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.price_label}
                      onChange={(e) => setForm({ ...form, price_label: e.target.value })}
                      placeholder="e.g. ₹2,500 / hr or 8–16 Teams"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-label">BUTTON TEXT (REDIRECTS TO CONTACT US)</label>
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
                  <label className="admin-label">DESCRIPTION</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">HIGHLIGHTS / SPECS BULLETS (ONE PER LINE)</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={form.highlightsText}
                    onChange={(e) => setForm({ ...form, highlightsText: e.target.value })}
                    placeholder={'4 Natural Clay Turf Wickets\nBroadcast-Grade 1000 Lux Floodlights'}
                  />
                </div>

                <ImagePickerField
                  label="OFFERING CARD PHOTO"
                  value={form.image_url}
                  defaultTag="service-items"
                  allowClear
                  onChange={(url, media) =>
                    setForm({ ...form, image_url: url, media_id: media?.id ?? null })
                  }
                />

                <div className="admin-form-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">SORT ORDER</label>
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

                <div className="admin-form-footer">
                  <button
                    type="button"
                    className="admin-btn-ghost"
                    onClick={() => setEditingItemId(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary" disabled={saving}>
                    {saving ? 'SAVING...' : 'SAVE OFFERING'}
                  </button>
                </div>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="admin-card admin-coming-soon-notice">
              <h3>0 OFFERINGS FOR {activeService.title}</h3>
              <p>
                Because this service currently has no items, visitors opening <code>/services/{activeService.slug}</code> automatically see the <strong>COMING SOON</strong> view state.
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
              {items.map((item) => (
                <div key={item.id} className="admin-item-card">
                  <div className="admin-item-thumb">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} />
                    ) : (
                      <span>NO IMAGE</span>
                    )}
                    <span className={`admin-status-badge ${item.is_active ? 'status-new' : 'status-archived'}`}>
                      {item.is_active ? 'ACTIVE' : 'HIDDEN'}
                    </span>
                  </div>
                  <div className="admin-item-body">
                    <div className="item-meta-pills">
                      {item.tag && <span className="admin-mini-badge">{item.tag}</span>}
                      {item.price_label && <span className="admin-mini-badge">{item.price_label}</span>}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="admin-item-actions">
                      <button
                        type="button"
                        className="admin-btn-secondary"
                        onClick={() => setEditingItemId(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-btn-ghost-danger"
                        onClick={() => handleDeleteItem(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
