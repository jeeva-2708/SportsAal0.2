import React, { useState } from 'react';
import { authApi } from '../../../lib/api.js';
import { useConfirm } from '../context/ConfirmContext.jsx';

export default function ChangePasswordModal({ isOpen, onClose, adminEmail = '' }) {
  const confirm = useConfirm();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetAndClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccess('');
    setError('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    const ok = await confirm({
      title: 'Update Admin Password',
      message: 'Are you sure you want to update your admin credentials?',
      confirmText: 'Update Password',
      variant: 'warning',
    });
    if (!ok) return;

    setSaving(true);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      setSuccess('Password updated cleanly (encrypted in PostgreSQL).');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Unable to update password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="admin-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Change Admin Password"
    >
      <div className="admin-modal-card admin-password-modal">
        <div className="admin-modal-header">
          <div>
            <h3 className="admin-modal-title">Change Admin Password</h3>
            <p className="admin-modal-subtitle">
              Update credentials for <strong>{adminEmail || 'Admin'}</strong>. Stored securely using salted bcrypt encryption.
            </p>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={resetAndClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-body-pad">
          {success && <div className="admin-alert admin-alert-success">{success}</div>}
          {error && <div className="admin-alert admin-alert-error">{error}</div>}

          <div className="admin-field-group">
            <label htmlFor="modal-prev-pw" className="admin-label">
              Previous Password
            </label>
            <input
              id="modal-prev-pw"
              type="password"
              className="admin-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              autoComplete="current-password"
              required
            />
          </div>

          <div className="admin-field-group">
            <label htmlFor="modal-new-pw" className="admin-label">
              New Password (Min 8 Characters)
            </label>
            <input
              id="modal-new-pw"
              type="password"
              className="admin-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="admin-field-group">
            <label htmlFor="modal-confirm-pw" className="admin-label">
              Confirm New Password
            </label>
            <input
              id="modal-confirm-pw"
              type="password"
              className="admin-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="admin-form-footer" style={{ marginTop: '1.25rem' }}>
            <button type="button" className="admin-btn-ghost" onClick={resetAndClose}>
              Close
            </button>
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

