import React from 'react';

export default function DraftBanner({ isDirty, hasRecoveredDraft, onDiscard, onSave, saving }) {
  if (!isDirty && !hasRecoveredDraft) return null;

  return (
    <div className="admin-draft-banner" role="status">
      <div className="draft-banner-text">
        <span className="draft-dot" />
        <span>
          {hasRecoveredDraft
            ? 'Unsaved edits were automatically restored from your previous session after reload.'
            : 'You have unsaved edits (auto-saved safely against accidental page reload).'}
        </span>
      </div>
      <div className="draft-banner-actions">
        {onDiscard && (
          <button type="button" className="admin-btn-ghost" onClick={onDiscard} disabled={saving}>
            Discard Draft
          </button>
        )}
        {onSave && (
          <button type="button" className="admin-btn-primary" onClick={onSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
    </div>
  );
}
