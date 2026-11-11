import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';
import { DEFAULT_DISPLAY_CONFIG } from '../../data/fallbackSiteData.js';
import { useDraftState } from '../../hooks/useDraftState.js';
import ImagePickerField from './components/ImagePickerField.jsx';
import DraftBanner from './components/DraftBanner.jsx';

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
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null); // null = list view, 'new' = add, number = edit
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  // Recover selected editor across reload cleanly via sessionStorage
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
    setSaving(true);
    setError('');
    try {
      if (selectedId === 'new') {
        await adminApi.createService(form);
        showToast('New service created successfully.');
      } else {
        await adminApi.updateService(selectedId, form);
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

  const handleDelete = async (svc) => {
    if (
      !window.confirm(
        `Delete service "${svc.title}" and all ${svc.items_count || 0} of its offerings?`
      )
    ) {
      return;
    }
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

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SERVICES &amp; VIEW DISPLAY SETTINGS</h1>
          <p className="admin-page-subtitle">
            Add, edit, or delete services and control which fields appear on each service&rsquo;s public View Page.
          </p>
        </div>

        {selectedId === null ? (
          <button type="button" className="admin-btn-primary" onClick={() => setSelectedId('new')}>
            + ADD NEW SERVICE
          </button>
        ) : (
          <button
            type="button"
            className="admin-btn-ghost"
            onClick={() => setSelectedId(null)}
          >
            ← Back to Services List
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
            onDiscard={discardDraft}
            onSave={handleSave}
            saving={saving}
          />

          <div className="admin-card">
            <h2 className="admin-card-title">
              {selectedId === 'new' ? 'CREATE NEW SERVICE' : `EDIT SERVICE: ${form.title}`}
            </h2>

            <div className="admin-form-grid-2">
              <div className="admin-field-group">
                <label className="admin-label">SERVICE TITLE *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. VENUE MANAGEMENT"
                  required
                />
              </div>

              <div className="admin-field-group">
                <label className="admin-label">URL SLUG (AUTO IF EMPTY)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. venue-management"
                />
              </div>

              <div className="admin-field-group">
                <label className="admin-label">CATEGORY LABEL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="SPORTS INFRASTRUCTURE & OPERATIONS"
                />
              </div>

              <div className="admin-field-group">
                <label className="admin-label">TAGLINE</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="WORLD-CLASS INFRASTRUCTURE. PEAK PLAYABILITY."
                />
              </div>
            </div>

            <div className="admin-field-group">
              <label className="admin-label">SHORT DESCRIPTION</label>
              <textarea
                rows={3}
                className="admin-textarea"
                value={form.short_description}
                onChange={(e) => setForm({ ...form, short_description: e.target.value })}
              />
            </div>

            <div className="admin-form-grid-2">
              <ImagePickerField
                label="HOME SECTION CARD IMAGE"
                value={form.card_image}
                defaultTag="services"
                onChange={(url, media) =>
                  setForm({
                    ...form,
                    card_image: url,
                    card_media_id: media?.id ?? null,
                    hero_image: form.hero_image || url,
                    hero_media_id: form.hero_media_id || media?.id || null,
                  })
                }
              />

              <ImagePickerField
                label="VIEW PAGE HERO BANNER IMAGE"
                value={form.hero_image}
                defaultTag="services"
                onChange={(url, media) =>
                  setForm({
                    ...form,
                    hero_image: url,
                    hero_media_id: media?.id ?? null,
                  })
                }
              />
            </div>

            <div className="admin-form-grid-3">
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
                  checked={Boolean(form.is_featured_home)}
                  onChange={(e) => setForm({ ...form, is_featured_home: e.target.checked })}
                />
                <div>
                  <strong>Show Card on Home Page</strong>
                  <span>Include inside main Our Services 3x2 grid</span>
                </div>
              </label>

              <label className="admin-switch-tile">
                <input
                  type="checkbox"
                  checked={Boolean(form.is_active)}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                />
                <div>
                  <strong>Service Published (Active)</strong>
                  <span>Visible to public visitors</span>
                </div>
              </label>
            </div>
          </div>

          {/* Field Visibility Controls for this Service's View Page */}
          <div className="admin-card">
            <h2 className="admin-card-title">VIEW PAGE FIELD VISIBILITY CONTROLS</h2>
            <p className="admin-card-desc">
              Enable or disable specific fields shown on each offering card on <code>/services/{form.slug || '...'}</code>.
            </p>

            <div className="admin-toggle-grid">
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
                      {form.display_config?.[item.key] !== false ? 'Enabled on View Page' : 'Hidden on View Page'}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="admin-form-grid-2" style={{ marginTop: '1.25rem' }}>
              <div className="admin-field-group">
                <label className="admin-label">COMING SOON HEADLINE (WHEN 0 ITEMS)</label>
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
                <label className="admin-label">COMING SOON SUBTITLE</label>
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

          <div className="admin-form-footer">
            <button type="button" className="admin-btn-ghost" onClick={() => setSelectedId(null)}>
              Cancel
            </button>
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving ? 'SAVING SERVICE...' : 'SAVE SERVICE'}
            </button>
          </div>
        </form>
      ) : loading ? (
        <div className="admin-empty-box">Loading services catalog...</div>
      ) : (
        <div className="admin-services-list">
          {services.map((svc) => (
            <div key={svc.id} className="admin-service-row-card">
              <div className="service-row-thumb">
                {svc.card_image ? (
                  <img src={svc.card_image} alt={svc.title} />
                ) : (
                  <span>NO IMG</span>
                )}
              </div>

              <div className="service-row-info">
                <div className="service-row-badges">
                  <span className={`admin-status-badge ${svc.is_active ? 'status-new' : 'status-archived'}`}>
                    {svc.is_active ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                  {svc.is_featured_home && <span className="admin-mini-badge">HOME GRID</span>}
                  {svc.active_items_count === 0 ? (
                    <span className="admin-mini-badge badge-warn">0 ITEMS · COMING SOON</span>
                  ) : (
                    <span className="admin-mini-badge">{svc.active_items_count} OFFERINGS</span>
                  )}
                </div>

                <h3>{svc.title}</h3>
                <p className="service-row-slug">/services/{svc.slug}</p>
              </div>

              <div className="service-row-actions">
                <Link
                  to={`/admin-login/service-items?serviceId=${svc.id}`}
                  className="admin-btn-secondary"
                >
                  Offerings ({svc.items_count})
                </Link>
                <a
                  href={`/services/${svc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn-ghost"
                >
                  View ↗
                </a>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setSelectedId(svc.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="admin-btn-ghost-danger"
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
