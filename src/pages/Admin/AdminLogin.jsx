import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../lib/api.js';
import logoDarkImg from '../../assets/logos/sportsaal-logo.png';
import './Admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [adminTheme] = useState(() => {
    try {
      return localStorage.getItem('sportsaal_admin_theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Enforce noindex metadata on admin login route
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Maintain active session across reloads
  useEffect(() => {
    let active = true;
    authApi
      .getMe()
      .then((res) => {
        if (active && res?.admin) {
          navigate('/admin-portal/dashboard', { replace: true });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await authApi.login(email.trim(), password);
      navigate('/admin-portal/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials or backend offline.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page" data-admin-theme={adminTheme}>
      <div className="admin-login-ambient" aria-hidden="true" />

      <div className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-logo-badge">
            <img src={logoDarkImg} alt="Sportsaal" className="admin-login-logo" />
          </div>
          <span className="admin-login-badge">Control Portal</span>
        </div>

        <h1 className="admin-login-title">Admin Sign In</h1>
        <p className="admin-login-subtitle">
          Direct URL access only. Manage sections, services, offerings, gallery assets, and customer inquiries.
        </p>

        {checkingSession ? (
          <div className="admin-login-checking">Verifying session...</div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            <div className="admin-field-group">
              <label htmlFor="admin-email" className="admin-label">Admin Email</label>
              <input
                id="admin-email"
                type="email"
                className="admin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sportsaal.com"
                autoComplete="username"
                required
              />
            </div>

            <div className="admin-field-group">
              <label htmlFor="admin-password" className="admin-label">Password</label>
              <input
                id="admin-password"
                type="password"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="admin-btn-primary admin-login-submit"
              disabled={submitting}
            >
              {submitting ? 'Signing In...' : 'Enter Admin Portal →'}
            </button>
          </form>
        )}

        <div className="admin-login-footer">
          <a href="/" className="admin-back-link">← Return to Sportsaal Website</a>
        </div>
      </div>
    </main>
  );
}

