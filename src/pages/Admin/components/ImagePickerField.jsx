import React, { useState } from 'react';
import GalleryPickerModal from './GalleryPickerModal.jsx';

export default function ImagePickerField({
  label,
  value,
  onChange,
  defaultTag = 'all',
  helperText = '',
  allowClear = false,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="admin-image-picker-field">
      {label && <label className="admin-label">{label}</label>}

      <div className="image-picker-preview-row">
        <div className="image-picker-thumb-box">
          {value ? (
            <img src={value} alt={label || 'Selected preview'} />
          ) : (
            <span className="thumb-placeholder">No Image</span>
          )}
        </div>

        <div className="image-picker-controls">
          <div className="image-picker-url-row">
            <input
              type="text"
              className="admin-input"
              value={value || ''}
              onChange={(e) => onChange(e.target.value, null)}
              placeholder="/uploads/... or select from gallery"
            />
          </div>

          <div className="image-picker-btn-row">
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => setModalOpen(true)}
            >
              Select from Gallery
            </button>

            {allowClear && value && (
              <button
                type="button"
                className="admin-btn-ghost-danger"
                onClick={() => onChange('', null)}
              >
                Clear
              </button>
            )}
          </div>

          {helperText && <p className="admin-helper-text">{helperText}</p>}
        </div>
      </div>

      <GalleryPickerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTag={defaultTag}
        currentUrl={value}
        onSelect={(media) => onChange(media.file_url, media)}
      />
    </div>
  );
}
