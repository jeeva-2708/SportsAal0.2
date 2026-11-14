import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';
import { DEFAULT_DISPLAY_CONFIG } from '../../data/fallbackSiteData.js';
import { useDraftState } from '../../hooks/useDraftState.js';
import ImagePickerField from './components/ImagePickerField.jsx';
import DraftBanner from './components/DraftBanner.jsx';
import { useConfirm } from './context/ConfirmContext.jsx';

const EMPTY_SERVICE_TEMPLATE = {
  title: '',
  slug: '',
  category: '',
  tagline: '',
  short_description: '',
  card_image: '',
  card_media_id: null,
  hero_image: '',
  hero_media_id: null,
  is_featured_home: true,
  is_active: true,
  sort_order: 10,
  display_config: { ...DEFAULT_DISPLAY_CONFIG },
};

const FIELD_TOGGLES = [
  { key: 'showImage', label: 'Item Card Image' },
  { key: 'showTag', label: 'Tag Badge Pill' },
  { key: 'showPriceOrLabel', label: 'Price / Scale Badge' },
  { key: 'showDescription', label: 'Description Text' },
  { key: 'showHighlights', label: 'Highlights / Specs Bullets' },
  { key: 'showContactCta', label: 'Inquire / Contact Button' },
  { key: 'showGalleryStrip', label: 'Action Gallery Strip' },
];

export default function AdminServices() {
  const { onContentChanged } = useOutletContext();
  const confirm = useConfirm();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [editorTab, setEditorTab] = useState('general'); // 'general' | 'display' | 'empty'
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedMode = sessionStorage.getItem('sportsaal_admin_active_service_editor');
    if (savedMode) {
      setSelectedId(savedMode === 'new' ? 'new' : Number(savedMode));
    }
  }, []);

  useEffect(() => {
    if (selectedId === null) {
      sessionStorage.removeItem('sportsaal_admin_active_service_editor');
    } else {
      sessionStorage.setItem('sportsaal_admin_active_service_editor', String(selectedId));
      setEditorTab('general');
    }
  }, [selectedId]);

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getServices();
      setServices(res.services || []);
    } catch (err) {
      setError(err.message || 'Unable to load services.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const serverFormTarget = useMemo(() => {
    if (selectedId === null) return null;
    if (selectedId === 'new') return EMPTY_SERVICE_TEMPLATE;
    const found = services.find((s) => s.id === selectedId);
    if (!found) return null;
    return {
      ...EMPTY_SERVICE_TEMPLATE,
      ...found,
      display_config: { ...DEFAULT_DISPLAY_CONFIG, ...(found.display_config || {}) },
    };
  }, [selectedId, services]);

  const draftKey = selectedId ? `service_${selectedId}` : 'service_none';
  const {
    value: form,
    setValue: setForm,
    isDirty,
    hasRecoveredDraft,
    discardDraft,
    clearDraft,
  } = useDraftState(draftKey, serverFormTarget);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!form) return;

    const isNew = selectedId === 'new';
    const ok = await confirm({
      title: isNew ? 'Create New Service' : 'Save Service Changes',
      message: isNew
        ? `Are you sure you want to create and publish the service "${form.title || 'Untitled'}"?`
        : `Are you sure you want to save changes to service "${form.title}"?`,
      confirmText: isNew ? 'Create Service' : 'Save Changes',
      variant: 'primary',
    });
    if (!ok) return;

    setSaving(true);
    setError('');
    const payload = {
      ...form,
      is_active: Boolean(form.is_active),
      is_featured_home: Boolean(form.is_active),
    };
    try {
      if (selectedId === 'new') {
        await adminApi.createService(payload);
        showToast('New service created successfully.');
      } else {
        await adminApi.updateService(selectedId, payload);
        showToast('Service updated successfully.');
      }
      clearDraft();
      setSelectedId(null);
      await loadServices();
      await onContentChanged();
    } catch (err) {
      setError(err.message || 'Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleWebsiteVisibility = async (svc) => {
    const nextActive = !svc.is_active;
    const ok = await confirm({
      title: nextActive ? 'Show Service on Website' : 'Hide Service from Website',
      message: nextActive
        ? `Make "${svc.title}" publicly visible on the live website and homepage?`
        : `Hide "${svc.title}" from the live website? Its data and settings will be preserved in Admin.`,
      confirmText: nextActive ? 'Show on Website' : 'Hide from Website',
      variant: nextActive ? 'primary' : 'warning',
    });
    if (!ok) return;

    setTogglingId(svc.id);
    setError('');
    try {
      await adminApi.updateService(svc.id, {
        is_active: nextActive,
        is_featured_home: nextActive,
      });
      setServices((prev) =>
        prev.map((item) =>
          item.id === svc.id
            ? { ...item, is_active: nextActive, is_featured_home: nextActive }
            : item
        )
      );
      await onContentChanged();
      showToast(
        nextActive
          ? `"${svc.title}" is now visible on the website.`
          : `"${svc.title}" is now hidden from the website.`
      );
    } catch (err) {
      setError(err.message || 'Failed to update service visibility.');
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (svc) => {
    const ok = await confirm({
      title: 'Delete Service',
      message: `Delete service "${svc.title}" and all ${svc.items_count || 0} of its offerings? This action cannot be undone.`,
      confirmText: 'Delete Service',
      cancelText: 'Cancel',
      variant: 'danger',
    });
    if (!ok) return;

    try {
      await adminApi.deleteService(svc.id);
      if (selectedId === svc.id) {
        clearDraft();
        setSelectedId(null);
      }
      showToast('Service deleted.');
      await loadServices();
      await onContentChanged();
    } catch (err) {
      setError(err.message || 'Failed to delete service.');
    }
  };

  const handleCancelEdit = async () => {
    if (isDirty) {
      const ok = await confirm({
        title: 'Discard Unsaved Changes',
        message: 'You have unsaved changes on this service. Are you sure you want to discard them?',
        confirmText: 'Discard Changes',
        cancelText: 'Keep Editing',
        variant: 'warning',
      });
      if (!ok) return;
      discardDraft();
    }
    setSelectedId(null);
  };

  const handleDiscardDraftWithConfirm = async () => {
    const ok = await confirm({
      title: 'Discard Draft Edits',
      message: 'Discard all unsaved edits made to this service draft?',
      confirmText: 'Discard Draft',
      cancelText: 'Keep Editing',
      variant: 'warning',
    });
    if (!ok) return;
    discardDraft();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Services &amp; View Settings</h1>
          <p className="admin-page-subtitle">
            Manage service categories and configure each service&rsquo;s View Page layout.
          </p>
        </div>

        {selectedId === null ? (
          <button type="button" className="admin-btn-primary" onClick={() => setSelectedId('new')}>
            + Add Service
          </button>
        ) : (
          <button
            type="button"
            className="admin-btn-ghost"
            onClick={() => setSelectedId(null)}
          >
            ← Back to List
          </button>
        )}
      </div>

      {toast && <div className="admin-alert admin-alert-success">{toast}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {selectedId !== null && form ? (
        <form onSubmit={handleSave} className="admin-form-stack">
          <DraftBanner
            isDirty={isDirty}
            hasRecoveredDraft={hasRecoveredDraft}
            onDiscard={handleDiscardDraftWithConfirm}
            onSave={handleSave}
            saving={saving}
          />

          {/* Clean Tab Switcher to prevent a crowded long scroll */}
          <div className="admin-tabs-bar" role="tablist" aria-label="Service editor sections">
            <button
              type="button"
              role="tab"
              aria-selected={editorTab === 'general'}
              className={`admin-tab-btn ${editorTab === 'general' ? 'is-active' : ''}`}
              onClick={() => setEditorTab('general')}
            >
              General Info &amp; Images
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={editorTab === 'display'}
              className={`admin-tab-btn ${editorTab === 'display' ? 'is-active' : ''}`}
              onClick={() => setEditorTab('display')}
            >
              View Page Layout &amp; Toggles
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={editorTab === 'empty'}
              className={`admin-tab-btn ${editorTab === 'empty' ? 'is-active' : ''}`}
              onClick={() => setEditorTab('empty')}
            >
              Coming Soon Text
            </button>
          </div>

          {editorTab === 'general' && (
            <div className="admin-card">
              <h2 className="admin-card-title">
                {selectedId === 'new' ? 'Create New Service' : `Edit: ${form.title}`}
              </h2>

              <div className="admin-form-grid-2">
                <div className="admin-field-group">
                  <label className="admin-label">Service Title *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Venue Management"
                    required
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">URL Slug (Auto if Empty)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. venue-management"
                  />
                </div>
              </div>

              <ImagePickerField
                label="Home Card Cover Image"
                value={form.card_image}
                defaultTag="services"
                onChange={(url, media) =>
                  setForm({
                    ...form,
                    card_image: url,
                    card_media_id: media?.id ?? null,
                    hero_image: url,
                    hero_media_id: media?.id ?? null,
                  })
                }
              />

              <div className="admin-form-grid-2">
                <div className="admin-field-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Sort Order</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  />
                </div>

                <div className="admin-switch-tile is-toggle">
                  <div className="switch-tile-copy">
                    <strong>Show on Website</strong>
                    <span>
                      {form.is_active
                        ? 'Visible on Home page & service detail route'
                        : 'Hidden from public website visitors'}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(form.is_active)}
                    aria-label="Show on website"
                    className={`admin-toggle-switch-btn ${form.is_active ? 'is-on' : ''}`}
                    onClick={() => {
                      const next = !form.is_active;
                      setForm({ ...form, is_active: next, is_featured_home: next });
                    }}
                  >
                    <span className="admin-switch-track">
                      <span className="admin-switch-thumb" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {editorTab === 'display' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h2 className="admin-card-title">Offerings Grid &amp; Card Visibility</h2>
                  <p className="admin-card-desc" style={{ marginBottom: 0 }}>
                    Settings for <code>/services/{form.slug || '...'}</code>. Individual cards can override these in Service Offerings.
                  </p>
                </div>

                {selectedId !== 'new' && (
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={async () => {
                      try {
                        await adminApi.resetServiceItemOverrides(selectedId);
                        await onContentChanged();
                        showToast('Applied Service defaults to all cards.');
                      } catch (err) {
                        setError(err.message || 'Unable to reset card overrides.');
                      }
                    }}
                  >
                    Apply to All Cards
                  </button>
                )}
              </div>

              <div className="admin-form-grid-2" style={{ marginBottom: '1.25rem' }}>
                <div className="admin-field-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Desktop Cards per Row</label>
                  <select
                    className="admin-input"
                    value={Number(form.display_config?.cardsPerRow) === 4 ? 4 : 3}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        display_config: {
                          ...form.display_config,
                          cardsPerRow: Number(e.target.value),
                        },
                      })
                    }
                  >
                    <option value={3}>3 Cards per Row (Recommended)</option>
                    <option value={4}>4 Cards per Row</option>
                  </select>
                </div>
              </div>

              <div className="admin-field-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Default Card Fields (Applies to All Cards)</label>
                <div className="admin-toggle-grid admin-toggle-grid-2">
                  {FIELD_TOGGLES.map((item) => (
                    <label key={item.key} className="admin-switch-tile">
                      <input
                        type="checkbox"
                        checked={form.display_config?.[item.key] !== false}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            display_config: {
                              ...form.display_config,
                              [item.key]: e.target.checked,
                            },
                          })
                        }
                      />
                      <div>
                        <strong>{item.label}</strong>
                        <span>
                          {form.display_config?.[item.key] !== false ? 'Enabled' : 'Hidden'}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {editorTab === 'empty' && (
            <div className="admin-card">
              <h2 className="admin-card-title">Coming Soon State (When 0 Offerings Exist)</h2>
              <p className="admin-card-desc">
                Shown automatically when this service has no active offering cards.
              </p>

              <div className="admin-form-grid-2">
                <div className="admin-field-group">
                  <label className="admin-label">Coming Soon Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.display_config?.emptyMessage || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        display_config: {
                          ...form.display_config,
                          emptyMessage: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Coming Soon Subtitle</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.display_config?.emptySubtext || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        display_config: {
                          ...form.display_config,
                          emptySubtext: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <div className="admin-form-footer">
            <button type="button" className="admin-btn-ghost" onClick={handleCancelEdit}>
              Cancel
            </button>
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      ) : loading ? (
        <div className="admin-empty-box">Loading services...</div>
      ) : (
        <div className="admin-services-list">
          {services.map((svc) => (
            <div key={svc.id} className="admin-service-row-card">
              <div className="service-row-thumb">
                {svc.card_image ? (
                  <img src={svc.card_image} alt={svc.title} />
                ) : (
                  <span>No Img</span>
                )}
              </div>

              <div className="service-row-info">
                <div className="service-row-badges">
                  <span className={`admin-status-badge ${svc.is_active ? 'status-new' : 'status-archived'}`}>
                    {svc.is_active ? 'On Website' : 'Hidden'}
                  </span>
                  {svc.active_items_count === 0 ? (
                    <span className="admin-mini-badge badge-warn">Coming Soon</span>
                  ) : (
                    <span className="admin-mini-badge">{svc.active_items_count} Offerings</span>
                  )}
                </div>

                <h3>{svc.title}</h3>
                <p className="service-row-slug">/services/{svc.slug}</p>
              </div>

              <div className="service-row-actions">
                <button
                  type="button"
                  role="switch"
                  aria-checked={Boolean(svc.is_active)}
                  aria-label={`Show ${svc.title} on website`}
                  className={`admin-toggle-switch-pill ${svc.is_active ? 'is-on' : ''}`}
                  disabled={togglingId === svc.id}
                  onClick={() => handleToggleWebsiteVisibility(svc)}
                >
                  <span className="admin-switch-track">
                    <span className="admin-switch-thumb" />
                  </span>
                  <span className="switch-pill-label">
                    {togglingId === svc.id
                      ? 'Saving...'
                      : svc.is_active
                        ? 'Show on Website'
                        : 'Hidden'}
                  </span>
                </button>
                <Link
                  to={`/admin-portal/service-items?serviceId=${svc.id}`}
                  className="admin-btn-secondary admin-btn-sm"
                >
                  Offerings ({svc.items_count})
                </Link>
                <button
                  type="button"
                  className="admin-btn-primary admin-btn-sm"
                  onClick={() => setSelectedId(svc.id)}
                >
                  Edit
                </button>
                <a
                  href={`/services/${svc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn-ghost admin-btn-sm"
                >
                  View ↗
                </a>
                <button
                  type="button"
                  className="admin-btn-ghost-danger admin-btn-sm"
                  onClick={() => handleDelete(svc)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
