import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';
import { FALLBACK_SECTIONS } from '../../data/fallbackSiteData.js';
import { useDraftState } from '../../hooks/useDraftState.js';
import ImagePickerField from './components/ImagePickerField.jsx';
import DraftBanner from './components/DraftBanner.jsx';
import { useConfirm } from './context/ConfirmContext.jsx';

const CANONICAL_NAV_ITEMS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'EVENTS', href: '/services/cricket-tournaments' },
  { label: 'VENUES', href: '/services/venue-management' },
  { label: 'CONTACT US', href: '#contact' },
];

function normalizeNavLinks(currentLinks) {
  if (!Array.isArray(currentLinks) || currentLinks.length === 0) {
    return CANONICAL_NAV_ITEMS;
  }

  const result = [];
  const handled = new Set();

  for (const item of currentLinks) {
    const canonical = CANONICAL_NAV_ITEMS.find((c) => c.href === item?.href);
    if (canonical && !handled.has(canonical.href)) {
      result.push({
        label: typeof item?.label === 'string' && item.label.trim() ? item.label.trim() : canonical.label,
        href: canonical.href,
      });
      handled.add(canonical.href);
    }
  }

  for (const canonical of CANONICAL_NAV_ITEMS) {
    if (!handled.has(canonical.href)) {
      result.push({ ...canonical });
      handled.add(canonical.href);
    }
  }

  return result;
}

const SECTION_META = {
  header: {
    title: 'Header & Navigation',
    subtitle: 'Manage top brand logo, header menu links order, and primary pill CTA.',
  },
  hero: {
    title: 'Hero Section (Code-Managed)',
    subtitle: 'Hero visuals, ribbon action photos, and marquee ticker are configured directly in source code.',
  },
  about: {
    title: 'About Section',
    subtitle: 'Manage the About side poster photo, eyebrow badge, narrative copy, and CTAs.',
  },
  services_section: {
    title: 'Services Section Header',
    subtitle: 'Manage the Services heading, subtitle, and bottom All Services button.',
  },
  trusted_by: {
    title: 'Trusted By Partners',
    subtitle: 'Manage partner section headings, stadium backdrop, and scrolling brand logos.',
  },
  testimonials: {
    title: 'Testimonials',
    subtitle: 'Add, edit, or remove client testimonials, roles, companies, and avatars.',
  },
  contact_footer: {
    title: 'Contact & Footer Settings',
    subtitle: 'Manage phone, email, hours, social links, inquiry subjects, and footer branding.',
  },
};

export default function AdminSections() {
  const { sectionKey } = useParams();
  const { onContentChanged } = useOutletContext();
  const confirm = useConfirm();

  const [serverSections, setServerSections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const loadSections = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.getSections();
      const map = {};
      for (const [k, v] of Object.entries(res.sections || {})) {
        map[k] = v.content;
      }
      setServerSections(map);
    } catch (err) {
      setError(err.message || 'Failed to load section content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const initialValue = useMemo(() => {
    if (!serverSections) return null;
    if (sectionKey === 'contact_footer') {
      return {
        contact: serverSections.contact || FALLBACK_SECTIONS.contact,
        footer: serverSections.footer || FALLBACK_SECTIONS.footer,
      };
    }
    return serverSections[sectionKey] || FALLBACK_SECTIONS[sectionKey] || {};
  }, [sectionKey, serverSections]);

  const {
    value: form,
    setValue: setForm,
    isDirty,
    hasRecoveredDraft,
    discardDraft,
    clearDraft,
  } = useDraftState(`section_${sectionKey}`, initialValue);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!form) return;

    const ok = await confirm({
      title: 'Save Section Changes',
      message: `Are you sure you want to save and publish changes for "${meta.title}" to the live website?`,
      confirmText: 'Save Section',
      variant: 'primary',
    });
    if (!ok) return;

    setSaving(true);
    setError('');
    try {
      if (sectionKey === 'contact_footer') {
        await Promise.all([
          adminApi.updateSection('contact', form.contact),
          adminApi.updateSection('footer', form.footer),
        ]);
      } else {
        await adminApi.updateSection(sectionKey, form);
      }
      clearDraft();
      showToast('Section updated in PostgreSQL cleanly.');
      await loadSections();
      await onContentChanged();
    } catch (err) {
      setError(err.message || 'Failed to save section.');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardWithConfirm = async () => {
    if (!isDirty && !hasRecoveredDraft) return;
    const ok = await confirm({
      title: 'Discard Unsaved Changes',
      message: `Are you sure you want to discard your unsaved changes for "${meta.title}"? All edits made since the last save will be reset.`,
      confirmText: 'Discard Changes',
      cancelText: 'Keep Editing',
      variant: 'warning',
    });
    if (!ok) return;
    discardDraft();
  };

  const meta = SECTION_META[sectionKey] || {
    title: 'Section Editor',
    subtitle: 'Manage website content.',
  };

  if (loading || !form) {
    return <div className="admin-empty-box">Loading {meta.title}...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{meta.title}</h1>
          <p className="admin-page-subtitle">{meta.subtitle}</p>
        </div>
        {sectionKey !== 'hero' && (
          <button type="button" className="admin-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      {toast && <div className="admin-alert admin-alert-success">{toast}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {sectionKey === 'hero' ? (
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '1.45rem' }}>⚡</span>
            <h2 className="admin-card-title" style={{ margin: 0 }}>Hero Section is Code-Managed</h2>
          </div>
          <p className="admin-card-desc" style={{ marginTop: '0.35rem' }}>
            The Hero Cinema Ribbon photos, marquee keywords ticker, and action button are configured strictly in source code (<code>src/sections/Hero/Hero.jsx</code> &amp; <code>src/data/fallbackSiteData.js</code>) for optimal animation performance and visual fidelity. No fields need to be managed by the admin.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <a href="/#hero" target="_blank" rel="noopener noreferrer" className="admin-btn-secondary admin-btn-sm">
              View Live Hero ↗
            </a>
            <Link to="/admin-portal/sections/header" className="admin-btn-primary admin-btn-sm">
              Go to Header &amp; Navigation
            </Link>
          </div>
        </div>
      ) : (
        <>
          <DraftBanner
            isDirty={isDirty}
            hasRecoveredDraft={hasRecoveredDraft}
            onDiscard={handleDiscardWithConfirm}
            onSave={handleSave}
            saving={saving}
          />

          <form onSubmit={handleSave} className="admin-form-stack">
            {sectionKey === 'header' && <HeaderEditor form={form} setForm={setForm} />}
            {sectionKey === 'about' && (
              <AboutEditor
                form={form}
                setForm={setForm}
                savedPosterSrc={serverSections?.about?.posterSrc || ''}
                onQuickSave={handleSave}
                saving={saving}
              />
            )}
            {sectionKey === 'services_section' && <ServicesHeaderEditor form={form} setForm={setForm} />}
            {sectionKey === 'trusted_by' && <TrustedByEditor form={form} setForm={setForm} />}
            {sectionKey === 'testimonials' && <TestimonialsEditor form={form} setForm={setForm} />}
            {sectionKey === 'contact_footer' && <ContactFooterEditor form={form} setForm={setForm} />}

            <div className="admin-form-footer">
              <button type="button" className="admin-btn-ghost" onClick={handleDiscardWithConfirm} disabled={!isDirty || saving}>
                Reset Changes
              </button>
              <button type="submit" className="admin-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Section'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

function HeaderEditor({ form, setForm }) {
  const confirm = useConfirm();
  const links = normalizeNavLinks(form.navLinks);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const moveLink = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= links.length || fromIdx === toIdx) return;
    const next = [...links];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setForm({ ...form, navLinks: next });
  };

  const updateLabel = (idx, newLabel) => {
    const next = [...links];
    next[idx] = { ...next[idx], label: newLabel };
    setForm({ ...form, navLinks: next });
  };

  const resetOrder = async () => {
    const ok = await confirm({
      title: 'Reset Navigation Order',
      message:
        'Are you sure you want to restore the default navigation order and labels? Click Save Changes afterwards to publish to the live site.',
      confirmText: 'Reset Order',
      cancelText: 'Cancel',
      variant: 'warning',
    });
    if (!ok) return;

    setForm({
      ...form,
      navLinks: CANONICAL_NAV_ITEMS.map((item) => {
        const existing = links.find((l) => l.href === item.href);
        return {
          label: existing?.label || item.label,
          href: item.href,
        };
      }),
    });
  };

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/plain', String(index));
    } catch {
      // ignore
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDragLeave = (e, index) => {
    if (dragOverIdx === index) {
      setDragOverIdx(null);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }
    const next = [...links];
    const [moved] = next.splice(draggedIdx, 1);
    next.splice(dropIndex, 0, moved);
    setForm({ ...form, navLinks: next });
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Brand &amp; CTA</h2>
      <ImagePickerField
        label="Header Brand Logo"
        value={form.logoUrl}
        defaultTag="general"
        onChange={(url, media) =>
          setForm({ ...form, logoUrl: url, logoMediaId: media?.id ?? null })
        }
      />
      <div className="admin-field-group">
        <label className="admin-label">CTA Button Text</label>
        <input
          type="text"
          className="admin-input"
          value={form.ctaText || ''}
          placeholder="e.g. INQUIRE NOW"
          onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
        />
      </div>

      <div className="admin-card-header" style={{ marginTop: '1.75rem', alignItems: 'flex-start' }}>
        <div>
          <h3 className="admin-card-title">Navigation Links Order</h3>
          <p className="admin-card-desc" style={{ marginBottom: 0 }}>
            Drag and drop rows using the handle (<strong>⋮⋮</strong>) or use the arrow buttons to arrange menu sequence. Click <strong>Save Changes</strong> to publish live.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-secondary admin-btn-sm"
          onClick={resetOrder}
          title="Restore standard navigation sequence"
        >
          Reset Order
        </button>
      </div>

      <div className="admin-nav-order-list">
        {links.map((lnk, idx) => {
          const isDragging = draggedIdx === idx;
          const isOver = dragOverIdx === idx;

          return (
            <div
              key={lnk.href}
              className={`admin-nav-order-row ${isDragging ? 'is-dragging' : ''} ${isOver ? 'is-drag-over' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={(e) => handleDragLeave(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
            >
              <div
                className="admin-nav-drag-handle"
                title="Drag to reorder"
                aria-label="Drag to reorder"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="5" r="2" />
                  <circle cx="16" cy="5" r="2" />
                  <circle cx="8" cy="12" r="2" />
                  <circle cx="16" cy="12" r="2" />
                  <circle cx="8" cy="19" r="2" />
                  <circle cx="16" cy="19" r="2" />
                </svg>
              </div>

              <span className="admin-nav-order-num" title={`Menu Position ${idx + 1}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="admin-nav-label-field">
                <label className="admin-label-mini">Navigation Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={lnk.label}
                  placeholder="e.g. ABOUT"
                  onChange={(e) => updateLabel(idx, e.target.value)}
                />
              </div>

              <div className="admin-nav-order-actions">
                <label className="admin-label-mini">Move</label>
                <div className="admin-nav-order-btns">
                  <button
                    type="button"
                    className="admin-nav-move-btn"
                    disabled={idx === 0}
                    onClick={() => moveLink(idx, idx - 1)}
                    title={idx === 0 ? 'Already at top' : 'Move Up'}
                    aria-label={`Move ${lnk.label} Up`}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    className="admin-nav-move-btn"
                    disabled={idx === links.length - 1}
                    onClick={() => moveLink(idx, idx + 1)}
                    title={idx === links.length - 1 ? 'Already at bottom' : 'Move Down'}
                    aria-label={`Move ${lnk.label} Down`}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutEditor({ form, setForm, savedPosterSrc = '', onQuickSave, saving = false }) {
  const posterChanged = (form.posterSrc || '') !== (savedPosterSrc || '');
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">About Editorial Content</h2>
      <div className="admin-field-group">
        <label className="admin-label">Eyebrow Badge</label>
        <input
          type="text"
          className="admin-input"
          value={form.badge || ''}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
        />
      </div>

      <div className="admin-form-grid-2">
        <div className="admin-field-group">
          <label className="admin-label">Headline Line 1 (White)</label>
          <input
            type="text"
            className="admin-input"
            value={form.headlineLine1 || ''}
            onChange={(e) => setForm({ ...form, headlineLine1: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">Headline Line 2 (Red Accent)</label>
          <input
            type="text"
            className="admin-input"
            value={form.headlineAccent || ''}
            onChange={(e) => setForm({ ...form, headlineAccent: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-field-group">
        <label className="admin-label">Brand Narrative</label>
        <textarea
          rows={4}
          className="admin-textarea"
          value={form.narrative || ''}
          onChange={(e) => setForm({ ...form, narrative: e.target.value })}
        />
      </div>

      <ImagePickerField
        label="Left Poster Photo (Pure Photo, Zero Overlay Text)"
        value={form.posterSrc}
        defaultTag="about"
        helperText="Click Select from Gallery to pick or upload an About photo, then click Save Photo Now / Save Changes."
        onChange={(url, media) =>
          setForm({
            ...form,
            posterSrc: url,
            posterMediaId: media?.id ?? null,
            posterAlt: media?.alt_text || form.posterAlt || 'Sportsaal About',
          })
        }
      />

      {posterChanged && onQuickSave && (
        <div className="about-photo-save-callout" role="status">
          <span>New About image selected — publish it to update the live site right away.</span>
          <button
            type="button"
            className="admin-btn-primary"
            onClick={() => onQuickSave()}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Photo Now'}
          </button>
        </div>
      )}

      <div className="admin-form-grid-2">
        <div className="admin-field-group">
          <label className="admin-label">Primary CTA Label</label>
          <input
            type="text"
            className="admin-input"
            value={form.primaryCtaText || ''}
            onChange={(e) => setForm({ ...form, primaryCtaText: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">Secondary CTA Label</label>
          <input
            type="text"
            className="admin-input"
            value={form.secondaryCtaText || ''}
            onChange={(e) => setForm({ ...form, secondaryCtaText: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function ServicesHeaderEditor({ form, setForm }) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Services Section Header &amp; CTA</h2>
      <div className="admin-form-grid-3">
        <div className="admin-field-group">
          <label className="admin-label">Eyebrow Tag</label>
          <input
            type="text"
            className="admin-input"
            value={form.tagText || ''}
            onChange={(e) => setForm({ ...form, tagText: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">Title Primary</label>
          <input
            type="text"
            className="admin-input"
            value={form.titlePrimary || ''}
            onChange={(e) => setForm({ ...form, titlePrimary: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">Title Red Accent</label>
          <input
            type="text"
            className="admin-input"
            value={form.titleAccent || ''}
            onChange={(e) => setForm({ ...form, titleAccent: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-field-group">
        <label className="admin-label">Section Subtitle</label>
        <textarea
          rows={3}
          className="admin-textarea"
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="admin-field-group">
        <label className="admin-label">Bottom CTA Text</label>
        <input
          type="text"
          className="admin-input"
          value={form.ctaText || ''}
          placeholder="e.g. INQUIRE CUSTOM SOLUTION"
          onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
        />
      </div>
    </div>
  );
}

function TrustedByEditor({ form, setForm }) {
  const logos = Array.isArray(form.logos) ? form.logos : [];
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <div className="admin-card">
        <h2 className="admin-card-title">Partner Section Copy &amp; Backdrop</h2>
        <div className="admin-form-grid-3">
          <div className="admin-field-group">
            <label className="admin-label">Subtitle Line</label>
            <input
              type="text"
              className="admin-input"
              value={form.eyebrow || ''}
              onChange={(e) => setForm({ ...form, eyebrow: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Heading White</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineWhite || ''}
              onChange={(e) => setForm({ ...form, headlineWhite: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Heading Red</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineRed || ''}
              onChange={(e) => setForm({ ...form, headlineRed: e.target.value })}
            />
          </div>
        </div>
        <ImagePickerField
          label="Stadium Card Background Image"
          value={form.bgImageSrc}
          defaultTag="partners"
          onChange={(url, media) =>
            setForm({ ...form, bgImageSrc: url, bgMediaId: media?.id ?? null })
          }
        />
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Partner Brand Logos ({logos.length})</h2>
          <button
            type="button"
            className="admin-btn-primary admin-btn-sm"
            onClick={() => {
              const nextIdx = logos.length;
              setForm({
                ...form,
                logos: [...logos, { id: `partner-${Date.now()}`, name: 'New Partner', src: '' }],
              });
              setExpandedIdx(nextIdx);
            }}
          >
            + Add Partner Logo
          </button>
        </div>

        <div className="admin-compact-stack">
          {logos.map((logo, idx) => {
            const isOpen = expandedIdx === idx;
            return (
              <div key={logo.id || idx} className="admin-compact-row-card">
                <div className="compact-row-summary">
                  <div className="compact-row-thumb is-logo">
                    {logo.src ? <img src={logo.src} alt={logo.name} /> : <span>Logo</span>}
                  </div>
                  <div className="compact-row-meta">
                    <strong>{logo.name || `Partner #${idx + 1}`}</strong>
                    <span className="compact-row-sub">{logo.src || 'No logo file chosen'}</span>
                  </div>
                  <div className="hero-card-controls">
                    <button
                      type="button"
                      className="admin-btn-secondary admin-btn-sm"
                      onClick={() => setExpandedIdx(isOpen ? null : idx)}
                    >
                      {isOpen ? 'Done' : 'Edit'}
                    </button>
                    <button
                      type="button"
                      className="admin-btn-ghost-danger admin-btn-sm"
                      onClick={() => {
                        if (expandedIdx === idx) setExpandedIdx(null);
                        setForm({ ...form, logos: logos.filter((_, i) => i !== idx) });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="compact-row-drawer">
                    <div className="admin-field-group">
                      <label className="admin-label">Brand Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={logo.name || ''}
                        onChange={(e) => {
                          const next = [...logos];
                          next[idx] = { ...logo, name: e.target.value };
                          setForm({ ...form, logos: next });
                        }}
                      />
                    </div>
                    <ImagePickerField
                      label="Logo File (SVG / PNG / WebP)"
                      value={logo.src}
                      defaultTag="partners"
                      onChange={(url, media) => {
                        const next = [...logos];
                        next[idx] = { ...logo, src: url, mediaId: media?.id ?? null };
                        setForm({ ...form, logos: next });
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function TestimonialsEditor({ form, setForm }) {
  const items = Array.isArray(form.items) ? form.items : [];
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <div className="admin-card">
        <h2 className="admin-card-title">Testimonials Header</h2>
        <div className="admin-form-grid-3">
          <div className="admin-field-group">
            <label className="admin-label">Tag Text</label>
            <input
              type="text"
              className="admin-input"
              value={form.tagText || ''}
              onChange={(e) => setForm({ ...form, tagText: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Heading Line 1</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineWhite || ''}
              onChange={(e) => setForm({ ...form, headlineWhite: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Heading Accent</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineRed || ''}
              onChange={(e) => setForm({ ...form, headlineRed: e.target.value })}
            />
          </div>
        </div>
        <div className="admin-field-group" style={{ marginBottom: 0 }}>
          <label className="admin-label">Subtitle</label>
          <input
            type="text"
            className="admin-input"
            value={form.subtitle || ''}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Client Reviews ({items.length})</h2>
          <button
            type="button"
            className="admin-btn-primary admin-btn-sm"
            onClick={() => {
              const nextIdx = items.length;
              setForm({
                ...form,
                items: [
                  ...items,
                  {
                    id: Date.now(),
                    quote: '',
                    name: 'Client Name',
                    role: 'Manager',
                    company: 'Company',
                    avatarSrc: '',
                  },
                ],
              });
              setExpandedIdx(nextIdx);
            }}
          >
            + Add Testimonial
          </button>
        </div>

        <div className="admin-compact-stack">
          {items.map((item, idx) => {
            const isOpen = expandedIdx === idx;
            return (
              <div key={item.id || idx} className="admin-compact-row-card">
                <div className="compact-row-summary">
                  <div className="compact-row-thumb is-avatar">
                    {item.avatarSrc || item.avatar ? (
                      <img src={item.avatarSrc || item.avatar} alt={item.name} />
                    ) : (
                      <span>{(item.name || 'C')[0]}</span>
                    )}
                  </div>
                  <div className="compact-row-meta">
                    <strong>
                      {item.name || `Review #${idx + 1}`}{' '}
                      <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>
                        · {item.company || item.role}
                      </span>
                    </strong>
                    <span className="compact-row-sub">
                      {item.quote ? `“${item.quote.slice(0, 90)}${item.quote.length > 90 ? '…' : ''}”` : 'No quote yet'}
                    </span>
                  </div>
                  <div className="hero-card-controls">
                    <button
                      type="button"
                      className="admin-btn-secondary admin-btn-sm"
                      onClick={() => setExpandedIdx(isOpen ? null : idx)}
                    >
                      {isOpen ? 'Done' : 'Edit'}
                    </button>
                    <button
                      type="button"
                      className="admin-btn-ghost-danger admin-btn-sm"
                      onClick={() => {
                        if (expandedIdx === idx) setExpandedIdx(null);
                        setForm({ ...form, items: items.filter((_, i) => i !== idx) });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="compact-row-drawer">
                    <div className="admin-field-group">
                      <label className="admin-label">Quote Text</label>
                      <textarea
                        rows={3}
                        className="admin-textarea"
                        value={item.quote || ''}
                        onChange={(e) => {
                          const next = [...items];
                          next[idx] = { ...item, quote: e.target.value };
                          setForm({ ...form, items: next });
                        }}
                      />
                    </div>
                    <div className="admin-form-grid-3">
                      <div className="admin-field-group">
                        <label className="admin-label">Client Name</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={item.name || ''}
                          onChange={(e) => {
                            const next = [...items];
                            next[idx] = { ...item, name: e.target.value };
                            setForm({ ...form, items: next });
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Role</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={item.role || ''}
                          onChange={(e) => {
                            const next = [...items];
                            next[idx] = { ...item, role: e.target.value };
                            setForm({ ...form, items: next });
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Company</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={item.company || ''}
                          onChange={(e) => {
                            const next = [...items];
                            next[idx] = { ...item, company: e.target.value };
                            setForm({ ...form, items: next });
                          }}
                        />
                      </div>
                    </div>
                    <ImagePickerField
                      label="Client Avatar Photo"
                      value={item.avatarSrc || item.avatar}
                      defaultTag="testimonials"
                      onChange={(url, media) => {
                        const next = [...items];
                        next[idx] = { ...item, avatarSrc: url, mediaId: media?.id ?? null };
                        setForm({ ...form, items: next });
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ContactFooterEditor({ form, setForm }) {
  const contact = form?.contact || {};
  const footer = form?.footer || {};
  const socials = Array.isArray(contact.socials) ? contact.socials : [];

  const updateContact = (patch) =>
    setForm((prev) => ({
      ...prev,
      contact: { ...(prev?.contact || {}), ...patch },
    }));

  const updateFooter = (patch) =>
    setForm((prev) => ({
      ...prev,
      footer: { ...(prev?.footer || {}), ...patch },
    }));

  const updateSocials = (nextSocials) =>
    setForm((prev) => ({
      ...prev,
      contact: { ...(prev?.contact || {}), socials: nextSocials },
      footer: { ...(prev?.footer || {}), socials: nextSocials },
    }));

  return (
    <>
      <div className="admin-card">
        <h2 className="admin-card-title">Contact Details (Synced with Footer)</h2>
        <div className="admin-form-grid-2">
          <div className="admin-field-group">
            <label className="admin-label">Phone Number</label>
            <input
              type="text"
              className="admin-input"
              value={contact.phone || ''}
              onChange={(e) => updateContact({ phone: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Public Contact Email</label>
            <input
              type="email"
              className="admin-input"
              value={contact.email || ''}
              onChange={(e) => updateContact({ email: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Location Address</label>
            <input
              type="text"
              className="admin-input"
              value={contact.location || ''}
              onChange={(e) => updateContact({ location: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Business Hours</label>
            <input
              type="text"
              className="admin-input"
              value={contact.hours || ''}
              onChange={(e) => updateContact({ hours: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-field-group">
            <label className="admin-label">Contact Description</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={contact.description || ''}
              onChange={(e) => updateContact({ description: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">Inquiry Forward Email (FormSubmit Target)</label>
            <input
              type="email"
              className="admin-input"
              value={contact.formEmailTarget || ''}
              onChange={(e) => updateContact({ formEmailTarget: e.target.value })}
            />
          </div>
        </div>

        <ImagePickerField
          label="Contact Cutout Image"
          value={contact.batsmanImg}
          defaultTag="general"
          onChange={(url, media) =>
            updateContact({ batsmanImg: url, batsmanMediaId: media?.id ?? null })
          }
        />
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Social Links &amp; Footer Branding</h2>
        <div className="admin-repeater-list" style={{ marginBottom: '1.25rem' }}>
          {socials.map((soc, idx) => (
            <div key={idx} className="admin-repeater-row">
              <input
                type="text"
                className="admin-input"
                value={soc.label || soc.platform}
                placeholder="Platform Label"
                onChange={(e) => {
                  const next = [...socials];
                  next[idx] = { ...soc, label: e.target.value };
                  updateSocials(next);
                }}
              />
              <input
                type="url"
                className="admin-input"
                value={soc.url}
                placeholder="https://..."
                onChange={(e) => {
                  const next = [...socials];
                  next[idx] = { ...soc, url: e.target.value };
                  updateSocials(next);
                }}
              />
            </div>
          ))}
        </div>

        <div className="admin-field-group">
          <label className="admin-label">Footer Brand Description</label>
          <textarea
            rows={2}
            className="admin-textarea"
            value={footer.brandDesc || ''}
            onChange={(e) => updateFooter({ brandDesc: e.target.value })}
          />
        </div>

        <div className="admin-field-group">
          <label className="admin-label">Copyright Notice</label>
          <input
            type="text"
            className="admin-input"
            value={footer.copyrightText || ''}
            onChange={(e) => updateFooter({ copyrightText: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}

