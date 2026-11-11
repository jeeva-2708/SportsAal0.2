import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';
import { FALLBACK_SECTIONS } from '../../data/fallbackSiteData.js';
import { useDraftState } from '../../hooks/useDraftState.js';
import ImagePickerField from './components/ImagePickerField.jsx';
import DraftBanner from './components/DraftBanner.jsx';

const SECTION_META = {
  header: {
    title: 'HEADER & NAVIGATION',
    subtitle: 'Manage top brand logo, header menu links, and primary pill CTA.',
  },
  hero: {
    title: 'HERO RIBBON & MARQUEE',
    subtitle: 'Manage the 8-photo slanted cinema ribbon cards, marquee strip, and CTA button.',
  },
  about: {
    title: 'ABOUT SECTION',
    subtitle: 'Manage the About side poster photo, eyebrow badge, narrative copy, and CTAs.',
  },
  services_section: {
    title: 'SERVICES SECTION HEADER',
    subtitle: 'Manage the Services heading, subtitle, and bottom All Services button.',
  },
  trusted_by: {
    title: 'TRUSTED BY PARTNERS',
    subtitle: 'Manage partner section headings, stadium backdrop, and scrolling brand logos.',
  },
  testimonials: {
    title: 'TESTIMONIALS',
    subtitle: 'Add, edit, or remove client testimonials, roles, companies, and avatars.',
  },
  contact_footer: {
    title: 'CONTACT & FOOTER SETTINGS',
    subtitle: 'Manage phone, email, hours, social links, inquiry subjects, and footer branding.',
  },
};

export default function AdminSections() {
  const { sectionKey } = useParams();
  const { onContentChanged } = useOutletContext();

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

  const initialValue =
    sectionKey === 'contact_footer'
      ? {
          contact: serverSections?.contact || FALLBACK_SECTIONS.contact,
          footer: serverSections?.footer || FALLBACK_SECTIONS.footer,
        }
      : serverSections?.[sectionKey] || FALLBACK_SECTIONS[sectionKey] || {};

  const {
    value: form,
    setValue: setForm,
    isDirty,
    hasRecoveredDraft,
    discardDraft,
    clearDraft,
  } = useDraftState(`section_${sectionKey}`, serverSections ? initialValue : null);

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

  const meta = SECTION_META[sectionKey] || {
    title: 'SECTION EDITOR',
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
        <button type="button" className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
      </div>

      {toast && <div className="admin-alert admin-alert-success">{toast}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <DraftBanner
        isDirty={isDirty}
        hasRecoveredDraft={hasRecoveredDraft}
        onDiscard={discardDraft}
        onSave={handleSave}
        saving={saving}
      />

      <form onSubmit={handleSave} className="admin-form-stack">
        {sectionKey === 'header' && <HeaderEditor form={form} setForm={setForm} />}
        {sectionKey === 'hero' && <HeroEditor form={form} setForm={setForm} />}
        {sectionKey === 'about' && <AboutEditor form={form} setForm={setForm} />}
        {sectionKey === 'services_section' && <ServicesHeaderEditor form={form} setForm={setForm} />}
        {sectionKey === 'trusted_by' && <TrustedByEditor form={form} setForm={setForm} />}
        {sectionKey === 'testimonials' && <TestimonialsEditor form={form} setForm={setForm} />}
        {sectionKey === 'contact_footer' && <ContactFooterEditor form={form} setForm={setForm} />}

        <div className="admin-form-footer">
          <button type="button" className="admin-btn-ghost" onClick={discardDraft} disabled={!isDirty || saving}>
            Reset Changes
          </button>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'SAVING...' : 'SAVE SECTION'}
          </button>
        </div>
      </form>
    </div>
  );
}

function HeaderEditor({ form, setForm }) {
  const navLinks = Array.isArray(form.navLinks) ? form.navLinks : [];
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">BRAND &amp; CTA</h2>
      <ImagePickerField
        label="HEADER BRAND LOGO"
        value={form.logoUrl}
        defaultTag="general"
        onChange={(url, media) =>
          setForm({ ...form, logoUrl: url, logoMediaId: media?.id ?? null })
        }
      />
      <div className="admin-form-grid-2">
        <div className="admin-field-group">
          <label className="admin-label">CTA BUTTON TEXT</label>
          <input
            type="text"
            className="admin-input"
            value={form.ctaText || ''}
            onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">CTA TARGET (#contact or /services/...)</label>
          <input
            type="text"
            className="admin-input"
            value={form.ctaHref || ''}
            onChange={(e) => setForm({ ...form, ctaHref: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-card-header" style={{ marginTop: '1.5rem' }}>
        <h3 className="admin-card-title">NAVIGATION LINKS</h3>
        <button
          type="button"
          className="admin-btn-secondary"
          onClick={() =>
            setForm({
              ...form,
              navLinks: [...navLinks, { label: 'NEW LINK', href: '#services' }],
            })
          }
        >
          + Add Link
        </button>
      </div>

      <div className="admin-repeater-list">
        {navLinks.map((lnk, idx) => (
          <div key={idx} className="admin-repeater-row">
            <input
              type="text"
              className="admin-input"
              value={lnk.label}
              placeholder="Label"
              onChange={(e) => {
                const next = [...navLinks];
                next[idx] = { ...lnk, label: e.target.value };
                setForm({ ...form, navLinks: next });
              }}
            />
            <input
              type="text"
              className="admin-input"
              value={lnk.href}
              placeholder="Href (#about or /services/...)"
              onChange={(e) => {
                const next = [...navLinks];
                next[idx] = { ...lnk, href: e.target.value };
                setForm({ ...form, navLinks: next });
              }}
            />
            <button
              type="button"
              className="admin-btn-ghost-danger"
              onClick={() =>
                setForm({ ...form, navLinks: navLinks.filter((_, i) => i !== idx) })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroEditor({ form, setForm }) {
  const photos = Array.isArray(form.ribbonPhotos) ? form.ribbonPhotos : [];
  const marqueeText = Array.isArray(form.marqueeItems) ? form.marqueeItems.join('\n') : '';

  return (
    <>
      <div className="admin-card">
        <h2 className="admin-card-title">HERO MARQUEE &amp; ACTION BUTTON</h2>
        <div className="admin-form-grid-2">
          <div className="admin-field-group">
            <label className="admin-label">CTA BUTTON TEXT</label>
            <input
              type="text"
              className="admin-input"
              value={form.ctaText || ''}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">CTA TARGET (#about)</label>
            <input
              type="text"
              className="admin-input"
              value={form.ctaHref || ''}
              onChange={(e) => setForm({ ...form, ctaHref: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-field-group">
          <label className="admin-label">TICKER KEYWORDS (ONE PER LINE)</label>
          <textarea
            rows={5}
            className="admin-textarea"
            value={marqueeText}
            onChange={(e) =>
              setForm({
                ...form,
                marqueeItems: e.target.value.split(/\r?\n/),
              })
            }
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">SLANTED RIBBON CARDS ({photos.length})</h2>
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={() =>
              setForm({
                ...form,
                ribbonPhotos: [
                  ...photos,
                  { id: `photo-${Date.now()}`, src: '', alt: 'Sportsaal Action' },
                ],
              })
            }
          >
            + Add Ribbon Card
          </button>
        </div>

        <div className="admin-repeater-cards">
          {photos.map((p, idx) => (
            <div key={p.id || idx} className="admin-repeater-card">
              <div className="repeater-card-top">
                <strong>CARD #{idx + 1}</strong>
                <button
                  type="button"
                  className="admin-btn-ghost-danger"
                  onClick={() =>
                    setForm({ ...form, ribbonPhotos: photos.filter((_, i) => i !== idx) })
                  }
                >
                  Delete Card
                </button>
              </div>
              <ImagePickerField
                label="CARD PHOTO"
                value={p.src}
                defaultTag="hero"
                onChange={(url, media) => {
                  const next = [...photos];
                  next[idx] = {
                    ...p,
                    src: url,
                    mediaId: media?.id ?? p.mediaId ?? null,
                    alt: p.alt || media?.alt_text || media?.title || 'Sportsaal Action',
                  };
                  setForm({ ...form, ribbonPhotos: next });
                }}
              />
              <div className="admin-field-group">
                <label className="admin-label">ALT TEXT</label>
                <input
                  type="text"
                  className="admin-input"
                  value={p.alt || ''}
                  onChange={(e) => {
                    const next = [...photos];
                    next[idx] = { ...p, alt: e.target.value };
                    setForm({ ...form, ribbonPhotos: next });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AboutEditor({ form, setForm }) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">ABOUT EDITORIAL CONTENT</h2>
      <div className="admin-field-group">
        <label className="admin-label">EYEBROW BADGE</label>
        <input
          type="text"
          className="admin-input"
          value={form.badge || ''}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
        />
      </div>

      <div className="admin-form-grid-2">
        <div className="admin-field-group">
          <label className="admin-label">HEADLINE LINE 1 (WHITE)</label>
          <input
            type="text"
            className="admin-input"
            value={form.headlineLine1 || ''}
            onChange={(e) => setForm({ ...form, headlineLine1: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">HEADLINE LINE 2 (RED ACCENT)</label>
          <input
            type="text"
            className="admin-input"
            value={form.headlineAccent || ''}
            onChange={(e) => setForm({ ...form, headlineAccent: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-field-group">
        <label className="admin-label">BRAND NARRATIVE</label>
        <textarea
          rows={4}
          className="admin-textarea"
          value={form.narrative || ''}
          onChange={(e) => setForm({ ...form, narrative: e.target.value })}
        />
      </div>

      <ImagePickerField
        label="LEFT POSTER PHOTO (PURE PHOTO, ZERO OVERLAY TEXT)"
        value={form.posterSrc}
        defaultTag="about"
        onChange={(url, media) =>
          setForm({
            ...form,
            posterSrc: url,
            posterMediaId: media?.id ?? null,
            posterAlt: media?.alt_text || form.posterAlt || 'Sportsaal About',
          })
        }
      />

      <div className="admin-form-grid-2">
        <div className="admin-field-group">
          <label className="admin-label">PRIMARY CTA LABEL</label>
          <input
            type="text"
            className="admin-input"
            value={form.primaryCtaText || ''}
            onChange={(e) => setForm({ ...form, primaryCtaText: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">SECONDARY CTA LABEL</label>
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
      <h2 className="admin-card-title">SERVICES SECTION HEADER &amp; CTA</h2>
      <div className="admin-form-grid-3">
        <div className="admin-field-group">
          <label className="admin-label">EYEBROW TAG</label>
          <input
            type="text"
            className="admin-input"
            value={form.tagText || ''}
            onChange={(e) => setForm({ ...form, tagText: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">TITLE PRIMARY</label>
          <input
            type="text"
            className="admin-input"
            value={form.titlePrimary || ''}
            onChange={(e) => setForm({ ...form, titlePrimary: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">TITLE RED ACCENT</label>
          <input
            type="text"
            className="admin-input"
            value={form.titleAccent || ''}
            onChange={(e) => setForm({ ...form, titleAccent: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-field-group">
        <label className="admin-label">SECTION SUBTITLE</label>
        <textarea
          rows={3}
          className="admin-textarea"
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="admin-form-grid-2">
        <div className="admin-field-group">
          <label className="admin-label">BOTTOM CTA TEXT</label>
          <input
            type="text"
            className="admin-input"
            value={form.ctaText || ''}
            onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
          />
        </div>
        <div className="admin-field-group">
          <label className="admin-label">BOTTOM CTA LINK</label>
          <input
            type="text"
            className="admin-input"
            value={form.ctaHref || ''}
            onChange={(e) => setForm({ ...form, ctaHref: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function TrustedByEditor({ form, setForm }) {
  const logos = Array.isArray(form.logos) ? form.logos : [];
  return (
    <>
      <div className="admin-card">
        <h2 className="admin-card-title">PARTNER SECTION COPY &amp; BACKDROP</h2>
        <div className="admin-form-grid-3">
          <div className="admin-field-group">
            <label className="admin-label">SUBTITLE LINE</label>
            <input
              type="text"
              className="admin-input"
              value={form.eyebrow || ''}
              onChange={(e) => setForm({ ...form, eyebrow: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">HEADING WHITE</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineWhite || ''}
              onChange={(e) => setForm({ ...form, headlineWhite: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">HEADING RED</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineRed || ''}
              onChange={(e) => setForm({ ...form, headlineRed: e.target.value })}
            />
          </div>
        </div>
        <ImagePickerField
          label="STADIUM CARD BACKGROUND IMAGE"
          value={form.bgImageSrc}
          defaultTag="partners"
          onChange={(url, media) =>
            setForm({ ...form, bgImageSrc: url, bgMediaId: media?.id ?? null })
          }
        />
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">PARTNER BRAND LOGOS ({logos.length})</h2>
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={() =>
              setForm({
                ...form,
                logos: [...logos, { id: `partner-${Date.now()}`, name: 'New Partner', src: '' }],
              })
            }
          >
            + Add Partner Logo
          </button>
        </div>

        <div className="admin-repeater-cards">
          {logos.map((logo, idx) => (
            <div key={logo.id || idx} className="admin-repeater-card">
              <div className="repeater-card-top">
                <strong>PARTNER #{idx + 1}</strong>
                <button
                  type="button"
                  className="admin-btn-ghost-danger"
                  onClick={() =>
                    setForm({ ...form, logos: logos.filter((_, i) => i !== idx) })
                  }
                >
                  Delete Partner
                </button>
              </div>
              <div className="admin-field-group">
                <label className="admin-label">BRAND NAME</label>
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
                label="LOGO FILE (SVG / PNG / WEBP)"
                value={logo.src}
                defaultTag="partners"
                onChange={(url, media) => {
                  const next = [...logos];
                  next[idx] = { ...logo, src: url, mediaId: media?.id ?? null };
                  setForm({ ...form, logos: next });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TestimonialsEditor({ form, setForm }) {
  const items = Array.isArray(form.items) ? form.items : [];
  return (
    <>
      <div className="admin-card">
        <h2 className="admin-card-title">TESTIMONIALS HEADER</h2>
        <div className="admin-form-grid-3">
          <div className="admin-field-group">
            <label className="admin-label">TAG TEXT</label>
            <input
              type="text"
              className="admin-input"
              value={form.tagText || ''}
              onChange={(e) => setForm({ ...form, tagText: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">HEADING LINE 1</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineWhite || ''}
              onChange={(e) => setForm({ ...form, headlineWhite: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">HEADING ACCENT</label>
            <input
              type="text"
              className="admin-input"
              value={form.headlineRed || ''}
              onChange={(e) => setForm({ ...form, headlineRed: e.target.value })}
            />
          </div>
        </div>
        <div className="admin-field-group">
          <label className="admin-label">SUBTITLE</label>
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
          <h2 className="admin-card-title">CLIENT REVIEWS ({items.length})</h2>
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={() =>
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
              })
            }
          >
            + Add Testimonial
          </button>
        </div>

        <div className="admin-repeater-cards">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="admin-repeater-card">
              <div className="repeater-card-top">
                <strong>REVIEW #{idx + 1}</strong>
                <button
                  type="button"
                  className="admin-btn-ghost-danger"
                  onClick={() =>
                    setForm({ ...form, items: items.filter((_, i) => i !== idx) })
                  }
                >
                  Delete Review
                </button>
              </div>
              <div className="admin-field-group">
                <label className="admin-label">QUOTE TEXT</label>
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
                  <label className="admin-label">CLIENT NAME</label>
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
                  <label className="admin-label">ROLE</label>
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
                  <label className="admin-label">COMPANY</label>
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
                label="CLIENT AVATAR PHOTO"
                value={item.avatarSrc || item.avatar}
                defaultTag="testimonials"
                onChange={(url, media) => {
                  const next = [...items];
                  next[idx] = { ...item, avatarSrc: url, mediaId: media?.id ?? null };
                  setForm({ ...form, items: next });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ContactFooterEditor({ form, setForm }) {
  const contact = form.contact || {};
  const footer = form.footer || {};
  const socials = Array.isArray(contact.socials) ? contact.socials : [];

  const updateContact = (patch) => setForm({ ...form, contact: { ...contact, ...patch } });
  const updateFooter = (patch) => setForm({ ...form, footer: { ...footer, ...patch } });

  return (
    <>
      <div className="admin-card">
        <h2 className="admin-card-title">CONTACT DETAILS (SYNCED WITH FOOTER)</h2>
        <div className="admin-form-grid-2">
          <div className="admin-field-group">
            <label className="admin-label">PHONE NUMBER</label>
            <input
              type="text"
              className="admin-input"
              value={contact.phone || ''}
              onChange={(e) => updateContact({ phone: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">PUBLIC CONTACT EMAIL</label>
            <input
              type="email"
              className="admin-input"
              value={contact.email || ''}
              onChange={(e) => updateContact({ email: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">LOCATION ADDRESS</label>
            <input
              type="text"
              className="admin-input"
              value={contact.location || ''}
              onChange={(e) => updateContact({ location: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">BUSINESS HOURS</label>
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
            <label className="admin-label">CONTACT DESCRIPTION</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={contact.description || ''}
              onChange={(e) => updateContact({ description: e.target.value })}
            />
          </div>
          <div className="admin-field-group">
            <label className="admin-label">INQUIRY FORWARD EMAIL (FORMSUBMIT TARGET)</label>
            <input
              type="email"
              className="admin-input"
              value={contact.formEmailTarget || ''}
              onChange={(e) => updateContact({ formEmailTarget: e.target.value })}
            />
          </div>
        </div>

        <ImagePickerField
          label="CONTACT CUTOUT IMAGE"
          value={contact.batsmanImg}
          defaultTag="general"
          onChange={(url, media) =>
            updateContact({ batsmanImg: url, batsmanMediaId: media?.id ?? null })
          }
        />
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">SOCIAL LINKS &amp; FOOTER BRANDING</h2>
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
                  updateContact({ socials: next });
                  updateFooter({ socials: next });
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
                  updateContact({ socials: next });
                  updateFooter({ socials: next });
                }}
              />
            </div>
          ))}
        </div>

        <div className="admin-field-group">
          <label className="admin-label">FOOTER BRAND DESCRIPTION</label>
          <textarea
            rows={2}
            className="admin-textarea"
            value={footer.brandDesc || ''}
            onChange={(e) => updateFooter({ brandDesc: e.target.value })}
          />
        </div>

        <div className="admin-field-group">
          <label className="admin-label">COPYRIGHT NOTICE</label>
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
