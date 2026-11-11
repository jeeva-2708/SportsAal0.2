import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../../lib/api.js';
import { useSiteData } from '../../context/SiteDataContext.jsx';
import logoDarkImg from '../../assets/logos/sportsaal-logo.png';
import './Admin.css';

const ADMIN_MENUS = [
  { group: 'CORE' },
  { path: '/admin-login/dashboard', label: 'Dashboard Overview' },
  { path: '/admin-login/services', label: 'Services & Display Toggles' },
  { path: '/admin-login/service-items', label: 'Service Data / Offerings' },
  { path: '/admin-login/gallery', label: 'Media Gallery' },
  { group: 'WEBSITE SECTIONS' },
  { path: '/admin-login/sections/header', label: 'Header & Navigation' },
  { path: '/admin-login/sections/hero', label: 'Hero Ribbon & Marquee' },
  { path: '/admin-login/sections/about', label: 'About Section' },
  { path: '/admin-login/sections/services_section', label: 'Services Header' },
  { path: '/admin-login/sections/trusted_by', label: 'Trusted By Partners' },
  { path: '/admin-login/sections/testimonials', label: 'Testimonials' },
  { path: '/admin-login/sections/contact_footer', label: 'Contact & Footer' },
  { group: 'OPERATIONS' },
  { path: '/admin-login/inquiries', label: 'Contact Inquiries' },
  { path: '/admin-login/security', label: 'Admin Security' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshSiteData } = useSiteData();

  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbConnected, setDbConnected] = useState(true);

  // Enforce noindex across all admin routes
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Rehydrate persistent session across accidental browser reloads
  useEffect(() => {
    let active = true;
    authApi
      .getMe()
      .then((res) => {
        if (!active) return;
        if (res?.admin) {
          setAdminUser(res.admin);
        } else {
          navigate('/admin-login', { replace: true });
        }
      })
      .catch(() => {
        if (active) {
          navigate('/admin-login', { replace: true });
        }
      })
      .finally(() => {
        if (active) setCheckingAuth(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  // Close mobile sidebar on route transition and check live PostgreSQL health
  useEffect(() => {
    setSidebarOpen(false);
    fetch('/api/health', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setDbConnected(Boolean(d?.connected)))
      .catch(() => setDbConnected(false));
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    navigate('/admin-login', { replace: true });
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="admin-session-loader">
        <span>Verifying admin session...</span>
      </div>
    );
  }

  if (!adminUser) return null;

  return (
    <div className="admin-shell">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`} aria-label="Admin Navigation">
        <div className="admin-sidebar-brand">
          <img src={logoDarkImg} alt="Sportsaal" className="admin-sidebar-logo" />
          <span className="admin-brand-pill">ADMIN CMS</span>
        </div>

        <nav className="admin-sidebar-nav">
          {ADMIN_MENUS.map((entry, idx) =>
            entry.group ? (
              <div key={`grp-${idx}`} className="admin-nav-group">
                {entry.group}
              </div>
            ) : (
              <NavLink
                key={entry.path}
                to={entry.path}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? 'is-active' : ''}`
                }
              >
                <span>{entry.label}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-chip">
            <span className="user-avatar-dot">{(adminUser.name || 'A')[0].toUpperCase()}</span>
            <div className="user-chip-info">
              <span className="user-chip-name">{adminUser.name}</span>
              <span className="user-chip-email">{adminUser.email}</span>
            </div>
          </div>
          <button type="button" className="admin-logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-column">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-menu-btn"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle admin menu"
            >
              ☰
            </button>
            <div className="admin-db-status-pill">
              <span className={`db-status-dot ${dbConnected ? '' : 'is-offline'}`} />
              <span>{dbConnected ? 'PostgreSQL Connected' : 'PostgreSQL Disconnected'}</span>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-ghost"
            >
              View Website ↗
            </a>
          </div>
        </header>

        <main className="admin-workspace">
          <Outlet context={{ adminUser, onContentChanged: refreshSiteData }} />
        </main>
      </div>
    </div>
  );
}
