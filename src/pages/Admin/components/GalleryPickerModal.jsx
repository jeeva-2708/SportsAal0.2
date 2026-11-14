import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../../lib/api.js';

const TAG_FILTERS = [
  { key: 'all', label: 'All Media' },
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'service-items', label: 'Service Items' },
  { key: 'partners', label: 'Partners' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'showcase', label: 'Showcase' },
  { key: 'general', label: 'General' },
];

export default function GalleryPickerModal({
  isOpen,
  onClose,
  onSelect,
  defaultTag = 'all',
  currentUrl = '',
}) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tag, setTag] = useState(defaultTag || 'all');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const loadMedia = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.getGallery({ tag, search });
      setMedia(res.media || []);
    } catch (err) {
      setError(err.message || 'Unable to load gallery media.');
    } finally {
      setLoading(false);
    }
  }, [tag, search]);

  useEffect(() => {
    if (isOpen) {
      setTag(defaultTag || 'all');
    }
  }, [isOpen, defaultTag]);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen, loadMedia]);

  const handleInstantUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const uploadTag = tag === 'all' ? 'general' : tag;
      const res = await adminApi.uploadGalleryFiles(files, { sectionTag: uploadTag });
      const first = res.uploaded?.[0];
      if (first && onSelect) {
        onSelect(first);
        onClose();
      } else {
        await loadMedia();
      }
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-label="Select Image from Gallery">
      <div className="admin-modal-card gallery-picker-modal">
        <div className="admin-modal-header">
          <div>
            <h3 className="admin-modal-title">Select from Gallery</h3>
            <p className="admin-modal-subtitle">
              Choose an existing gallery photo or upload a new image right away.
            </p>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="gallery-picker-toolbar">
          <div className="toolbar-select-group">
            <label htmlFor="picker-tag-select" className="admin-label">
              Category
            </label>
            <select
              id="picker-tag-select"
              className="admin-input admin-toolbar-select"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              {TAG_FILTERS.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="gallery-picker-right-tools">
            <input
              type="search"
              className="admin-input admin-search-input"
              placeholder="Search gallery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label className="admin-btn-primary admin-btn-sm upload-inline-btn">
              <span>{uploading ? 'Uploading...' : '+ Upload New'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleInstantUpload}
                disabled={uploading}
                hidden
              />
            </label>
          </div>
        </div>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <div className="gallery-picker-grid-scroll">
          {loading ? (
            <div className="admin-empty-box">Loading gallery assets...</div>
          ) : media.length === 0 ? (
            <div className="admin-empty-box">
              <p style={{ marginTop: 0 }}>
                No images found under &ldquo;{tag}&rdquo;. Browse All Media or upload a new photo above.
              </p>
              {tag !== 'all' && (
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setTag('all')}
                >
                  Show All Media
                </button>
              )}
            </div>
          ) : (
            <>
              {tag !== 'all' && media.length <= 2 && (
                <div style={{ marginBottom: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)' }}>
                    Filtered by &ldquo;{tag}&rdquo; tag. Want another image?
                  </span>
                  <button
                    type="button"
                    className="admin-btn-ghost admin-btn-sm"
                    onClick={() => setTag('all')}
                  >
                    Browse All Media →
                  </button>
                </div>
              )}
              <div className="gallery-picker-grid">
                {media.map((item) => {
                  const isSelected = currentUrl && item.file_url === currentUrl;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`gallery-picker-tile ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => {
                        onSelect(item);
                        onClose();
                      }}
                    >
                      <div className="picker-thumb">
                        <img src={item.file_url} alt={item.alt_text || item.title} loading="lazy" />
                        {isSelected && <span className="picker-selected-badge">Selected</span>}
                      </div>
                      <div className="picker-meta">
                        <span className="picker-title">{item.title}</span>
                        <span className="picker-tag">{item.section_tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

