import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../../lib/api.js';
import { useSiteData, broadcastCmsUpdate } from '../../context/SiteDataContext.jsx';
import logoDarkImg from '../../assets/logos/sportsaal-logo.png';
import ChangePasswordModal from './components/ChangePasswordModal.jsx';
import { ConfirmProvider, useConfirm } from './context/ConfirmContext.jsx';
import './Admin.css';

const ADMIN_THEME_KEY = 'sportsaal_admin_theme';

const CORE_MENUS = [
  { path: '/admin-portal/dashboard', label: 'Dashboard' },
  { path: '/admin-portal/services', label: 'Services & Toggles' },
  { path: '/admin-portal/service-items', label: 'Service Offerings' },
  { path: '/admin-portal/gallery', label: 'Media Gallery' },
];

const SECTION_MENUS = [
  { path: '/admin-portal/sections/header', label: 'Header & Navigation' },
  { path: '/admin-portal/sections/about', label: 'About Section' },
  { path: '/admin-portal/sections/services_section', label: 'Services Header' },
  { path: '/admin-portal/sections/trusted_by', label: 'Trusted By Partners' },
  { path: '/admin-portal/sections/testimonials', label: 'Testimonials' },
  { path: '/admin-portal/sections/contact_footer', label: 'Contact & Footer' },
];

const OPERATIONS_MENUS = [
  { path: '/admin-portal/inquiries', label: 'Contact Inquiries' },
];

export function readAdminTheme() {
  try {
    return localStorage.getItem(ADMIN_THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function AdminLayoutContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshSiteData } = useSiteData();
  const confirm = useConfirm();

  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(() =>
    location.pathname.startsWith('/admin-portal/sections')
  );
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [adminTheme, setAdminTheme] = useState(readAdminTheme);

  const toggleAdminTheme = () => {
    setAdminTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(ADMIN_THEME_KEY, next);
      } catch {
        // ignore storage restrictions
      }
      return next;
    });
  };

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

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

  useEffect(() => {
    setSidebarOpen(false);
    if (location.pathname.startsWith('/admin-portal/sections')) {
      setSectionsOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    const ok = await confirm({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out of the Sportsaal Admin Portal?',
      confirmText: 'Sign Out',
      cancelText: 'Cancel',
      variant: 'danger',
    });
    if (!ok) return;

    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    navigate('/admin-login', { replace: true });
  }, [confirm, navigate]);

  const handleContentChanged = useCallback(async () => {
    broadcastCmsUpdate();
    await refreshSiteData();
  }, [refreshSiteData]);

  if (checkingAuth) {
    return (
      <div className="admin-session-loader" data-admin-theme={adminTheme}>
        <span>Verifying admin session...</span>
      </div>
    );
  }

  if (!adminUser) return null;

  return (
    <div className="admin-shell" data-admin-theme={adminTheme}>
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
          <div className="admin-logo-badge">
            <img src={logoDarkImg} alt="Sportsaal" className="admin-sidebar-logo" />
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-group">Management</div>
          {CORE_MENUS.map((entry) => (
            <NavLink
              key={entry.path}
              to={entry.path}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'is-active' : ''}`}
            >
              <span>{entry.label}</span>
            </NavLink>
          ))}

          <button
            type="button"
            className={`admin-nav-accordion-btn ${sectionsOpen ? 'is-open' : ''}`}
            onClick={() => setSectionsOpen((v) => !v)}
            aria-expanded={sectionsOpen}
          >
            <span>Website Sections (7)</span>
            <span className="accordion-chevron">{sectionsOpen ? '▾' : '▸'}</span>
          </button>

          {sectionsOpen && (
            <div className="admin-nav-sublist">
              {SECTION_MENUS.map((entry) => (
                <NavLink
                  key={entry.path}
                  to={entry.path}
                  className={({ isActive }) =>
                    `admin-nav-link admin-nav-sublink ${isActive ? 'is-active' : ''}`
                  }
                >
                  <span>{entry.label}</span>
                </NavLink>
              ))}
            </div>
          )}

          <div className="admin-nav-group">Inbox &amp; Account</div>
          {OPERATIONS_MENUS.map((entry) => (
            <NavLink
              key={entry.path}
              to={entry.path}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'is-active' : ''}`}
            >
              <span>{entry.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-chip">
            <span className="user-avatar-dot">{(adminUser.name || 'A')[0].toUpperCase()}</span>
            <div className="user-chip-info">
              <span className="user-chip-name">{adminUser.name}</span>
              <span className="user-chip-email">{adminUser.email}</span>
            </div>
          </div>
          <div className="admin-sidebar-footer-btns">
            <button
              type="button"
              className="admin-btn-secondary admin-btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setPasswordModalOpen(true)}
            >
              Change Password
            </button>
            <button type="button" className="admin-logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
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
            <span className="admin-topbar-brand-label">Sportsaal Admin</span>
          </div>

          <div className="admin-topbar-actions">
            <button
              type="button"
              className="admin-btn-ghost admin-btn-sm"
              onClick={toggleAdminTheme}
              title={`Switch to ${adminTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Admin Theme"
            >
              {adminTheme === 'dark' ? '☀ Light' : '☾ Dark'}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-secondary admin-btn-sm"
            >
              View Website ↗
            </a>
          </div>
        </header>

        <main className="admin-workspace">
          <Outlet context={{ adminUser, onContentChanged: handleContentChanged, adminTheme }} />
        </main>
      </div>

      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        adminEmail={adminUser?.email}
      />
    </div>
  );
}

export default function AdminLayout() {
  return (
    <ConfirmProvider>
      <AdminLayoutContent />
    </ConfirmProvider>
  );
}
