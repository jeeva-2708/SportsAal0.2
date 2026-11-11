import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { authApi } from '../../lib/api.js';

export default function AdminSecurity() {
  const { adminUser } = useOutletContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setSaving(true);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      setSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Password update failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">ADMIN SECURITY &amp; SESSION</h1>
          <p className="admin-page-subtitle">
            Signed in as <strong>{adminUser?.email}</strong>. HTTP-only JWT cookie persistence keeps your portal session active across page refreshes.
          </p>
        </div>
      </div>

      <div className="admin-dashboard-split">
        <form onSubmit={handleSubmit} className="admin-card">
          <h2 className="admin-card-title">CHANGE ADMIN PASSWORD</h2>
          {success && <div className="admin-alert admin-alert-success">{success}</div>}
          {error && <div className="admin-alert admin-alert-error">{error}</div>}

          <div className="admin-field-group">
            <label className="admin-label">CURRENT PASSWORD</label>
            <input
              type="password"
              className="admin-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="admin-field-group">
            <label className="admin-label">NEW PASSWORD (MIN 8 CHARACTERS)</label>
            <input
              type="password"
              className="admin-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="admin-field-group">
            <label className="admin-label">CONFIRM NEW PASSWORD</label>
            <input
              type="password"
              className="admin-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'UPDATING...' : 'UPDATE PASSWORD'}
          </button>
        </form>

        <div className="admin-card">
          <h2 className="admin-card-title">POSTGRESQL &amp; HOSTINGER DEPLOYMENT NOTES</h2>
          <ul className="admin-checklist">
            <li>
              <strong>Stealth URL Access:</strong> Public nav &amp; footer have zero links to <code>/admin-login</code>, and <code>robots.txt</code> + <code>noindex</code> block search indexing.
            </li>
            <li>
              <strong>Database Engine:</strong> Powered exclusively by PostgreSQL (zero SQLite), using relational tables plus JSONB section &amp; field-toggle configs.
            </li>
            <li>
              <strong>Draft Protection:</strong> Unsaved Admin form changes auto-backup into <code>sessionStorage</code> until saved or discarded.
            </li>
            <li>
              <strong>Deploying to Hostinger:</strong> Export local DB via <code>pg_dump sportsaal &gt; sportsaal.sql</code>, restore on Hostinger KVM VPS PostgreSQL (or managed Neon/Supabase), run <code>npm run build</code>, and launch with <code>NODE_ENV=production node server/index.js</code>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
