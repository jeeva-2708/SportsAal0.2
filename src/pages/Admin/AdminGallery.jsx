import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';

const GALLERY_TAGS = [
  { key: 'all', label: 'All Media' },
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'service-items', label: 'Service Items' },
  { key: 'partners', label: 'Partners' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'showcase', label: 'Service Showcases' },
  { key: 'general', label: 'General' },
];

export default function AdminGallery() {
  const { onContentChanged } = useOutletContext();
  const [media, setMedia] = useState([]);
  const [services, setServices] = useState([]);
  const [filterTag, setFilterTag] = useState('all');
  const [search, setSearch] = useState('');
  const [uploadTag, setUploadTag] = useState('general');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ title: '', alt_text: '', section_tag: 'general' });

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [gRes, sRes] = await Promise.all([
        adminApi.getGallery({ tag: filterTag, search }),
        adminApi.getServices(),
      ]);
      setMedia(gRes.media || []);
      setServices(sRes.services || []);
    } catch (err) {
      setError(err.message || 'Unable to load gallery.');
    } finally {
      setLoading(false);
    }
  }, [filterTag, search]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const res = await adminApi.uploadGalleryFiles(files, { sectionTag: uploadTag });
      showToast(`Uploaded ${res.uploaded?.length || 0} image(s) cleanly in WebP/SVG.`);
      await loadAll();
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleAssign = async (mediaId, target) => {
    if (!target) return;
    setError('');
    try {
      const res = await adminApi.assignMedia(mediaId, target);
      showToast(res.message || 'Assigned image to section!');
      await onContentChanged();
      await loadAll();
    } catch (err) {
      setError(err.message || 'Assignment failed.');
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditDraft({
      title: item.title || '',
      alt_text: item.alt_text || '',
      section_tag: item.section_tag || 'general',
    });
  };

  const saveEdit = async (id) => {
    try {
      await adminApi.updateMedia(id, editDraft);
      setEditingId(null);
      showToast('Updated image metadata.');
      await loadAll();
      await onContentChanged();
    } catch (err) {
      setError(err.message || 'Update failed.');
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}" from the Gallery?`)) return;
    try {
      await adminApi.deleteMedia(item.id);
      showToast('Deleted image.');
      await loadAll();
    } catch (err) {
      setError(err.message || 'Delete failed.');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">MEDIA GALLERY</h1>
          <p className="admin-page-subtitle">
            Upload images once (automatically compressed to WebP), organize by section tag, and assign to Hero, About, Partners, or any Service page.
          </p>
        </div>
      </div>

      {toast && <div className="admin-alert admin-alert-success">{toast}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {/* Upload Box */}
      <div className="admin-card admin-upload-card">
        <div className="upload-card-controls">
          <div>
            <label htmlFor="gallery-upload-tag" className="admin-label">TAG FOR UPLOADED FILES</label>
            <select
              id="gallery-upload-tag"
              className="admin-input"
              value={uploadTag}
              onChange={(e) => setUploadTag(e.target.value)}
            >
              {GALLERY_TAGS.filter((t) => t.key !== 'all' && t.key !== 'showcase').map((t) => (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
              {services.map((s) => (
                <option key={s.id} value={`showcase:${s.slug}`}>
                  Showcase Strip: {s.title}
                </option>
              ))}
            </select>
          </div>

          <label className="admin-upload-dropzone">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                handleUpload(e.target.files);
                e.target.value = '';
              }}
              disabled={uploading}
              hidden
            />
            <strong>{uploading ? 'OPTIMIZING & UPLOADING...' : 'CLICK TO UPLOAD IMAGES (MULTI-SELECT)'}</strong>
            <span>Supports JPG, PNG, WebP, AVIF, and SVG logos up to 12 MB each</span>
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-toolbar-row">
        <div className="gallery-filter-pills">
          {GALLERY_TAGS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`admin-pill-btn ${filterTag === t.key ? 'is-active' : ''}`}
              onClick={() => setFilterTag(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="admin-input admin-search-input"
          placeholder="Search title or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="admin-empty-box">Loading gallery media...</div>
      ) : media.length === 0 ? (
        <div className="admin-empty-box">No images match your filter.</div>
      ) : (
        <div className="admin-gallery-grid">
          {media.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <div key={item.id} className="admin-gallery-card">
                <div className="gallery-card-media">
                  <img src={item.file_url} alt={item.alt_text || item.title} loading="lazy" />
                  <span className="gallery-tag-badge">{item.section_tag}</span>
                </div>

                <div className="gallery-card-body">
                  {isEditing ? (
                    <div className="gallery-inline-edit">
                      <input
                        type="text"
                        className="admin-input"
                        value={editDraft.title}
                        onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={editDraft.alt_text}
                        onChange={(e) => setEditDraft({ ...editDraft, alt_text: e.target.value })}
                        placeholder="Alt text"
                      />
                      <select
                        className="admin-input"
                        value={editDraft.section_tag}
                        onChange={(e) => setEditDraft({ ...editDraft, section_tag: e.target.value })}
                      >
                        {GALLERY_TAGS.filter((t) => t.key !== 'all' && t.key !== 'showcase').map((t) => (
                          <option key={t.key} value={t.key}>{t.label}</option>
                        ))}
                        {services.map((s) => (
                          <option key={s.id} value={`showcase:${s.slug}`}>
                            Showcase: {s.title}
                          </option>
                        ))}
                      </select>
                      <div className="gallery-edit-actions">
                        <button type="button" className="admin-btn-primary" onClick={() => saveEdit(item.id)}>
                          Save
                        </button>
                        <button type="button" className="admin-btn-ghost" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="gallery-card-title">{item.title}</h3>
                      <p className="gallery-card-dims">
                        {item.width ? `${item.width}×${item.height} · ` : ''}
                        {item.size_bytes ? `${Math.round(item.size_bytes / 1024)} KB` : ''}
                      </p>

                      {/* Direct Assignment Dropdown */}
                      <select
                        className="admin-input gallery-assign-select"
                        defaultValue=""
                        onChange={(e) => {
                          const target = e.target.value;
                          e.target.value = '';
                          handleAssign(item.id, target);
                        }}
                      >
                        <option value="" disabled>Assign Directly to Section →</option>
                        <option value="about.poster">Set as About Section Poster</option>
                        <option value="hero.addCard">Add Card to Hero Ribbon</option>
                        <option value="trusted_by.addLogo">Add to Trusted By Partner Logos</option>
                        {services.map((s) => (
                          <optgroup key={s.id} label={s.title}>
                            <option value={`service.card:${s.id}`}>Set as Home Card Cover</option>
                            <option value={`service.hero:${s.id}`}>Set as View Page Hero Image</option>
                            <option value={`showcase:${s.slug}`}>Add to Action Showcase Strip</option>
                          </optgroup>
                        ))}
                      </select>

                      <div className="gallery-card-footer">
                        <button type="button" className="admin-btn-ghost" onClick={() => startEdit(item)}>
                          Edit Info
                        </button>
                        <button
                          type="button"
                          className="admin-btn-ghost-danger"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
