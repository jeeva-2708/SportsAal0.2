import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logoDarkImg from '../../assets/logos/sportsaal-logo.png';


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleBtnRef = useRef(null);
  const overlayRef = useRef(null);

  // Monitor scroll position to apply translucent color only when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('sportsaal_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  // Sync data-theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sportsaal_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isAnimating) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const btn = toggleBtnRef.current;
    if (!btn) {
      setTheme(nextTheme);
      return;
    }

    // Get button center position for the ripple origin
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate radius needed to cover the full screen from the click origin
    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Build and inject the circular ripple overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      background: ${nextTheme === 'light' ? '#D9E4EE' : '#050505'};
      clip-path: circle(0px at ${x}px ${y}px);
      transition: clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
    setIsAnimating(true);

    // Trigger expand animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(${maxDist}px at ${x}px ${y}px)`;
      });
    });

    // Switch theme mid-animation (at 60% through = ~330ms)
    const themeTimeout = setTimeout(() => {
      setTheme(nextTheme);
    }, 330);

    // Remove overlay after full animation
    const cleanupTimeout = setTimeout(() => {
      overlay.style.transition = 'opacity 0.18s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        setIsAnimating(false);
        overlayRef.current = null;
      }, 180);
    }, 560);

    return () => {
      clearTimeout(themeTimeout);
      clearTimeout(cleanupTimeout);
    };
  };

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isClosing]);

  const handleOpenMenu = () => {
    setIsClosing(false);
    setMobileMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const currentLogo = logoDarkImg;

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className={`container header-container${isScrolled ? ' is-scrolled' : ''}`}>
        {/* Brand Logo */}
        <a href="#" className="brand-logo" aria-label="Sportsaal Home">
          <img src={currentLogo} alt="SPORTSAAL" className="brand-logo-img" />
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="desktop-nav-menu">
          <a href="#services" className="nav-link">Services</a>
          <a href="#venues" className="nav-link">Venues</a>
          <a href="#tournaments" className="nav-link">Tournaments</a>
          <a href="#coaching" className="nav-link">Coaching</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Light/Dark Mode Theme Switcher Toggle */}
          <button
            ref={toggleBtnRef}
            className={`theme-toggle-btn${isAnimating ? ' animating' : ''}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              /* Sun Icon — switch to Light */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toggle-icon">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1"  x2="12" y2="3"  />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1"  y1="12" x2="3"  y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
                <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
              </svg>
            ) : (
              /* Moon Icon — switch to Dark */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toggle-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a href="#book" className="btn-header-cta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-calendar-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8"  y1="2" x2="8"  y2="6" />
              <line x1="3"  y1="10" x2="21" y2="10" />
            </svg>
            <span>Book a Venue</span>
          </a>

          {/* Circular Mobile Toggle (visible when menu is closed) */}
          {(!mobileMenuOpen || isClosing) && (
            <button
              className="mobile-toggle-circle"
              aria-label="Open navigation menu"
              onClick={handleOpenMenu}
            >
              <span className="red-line line-1"></span>
              <span className="red-line line-2"></span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div className={`mobile-fullscreen-menu ${isClosing ? 'closing' : 'opening'}`}>
          <div className="mobile-menu-top">
            <a href="#" onClick={handleCloseMenu}>
              <img src={logoDarkImg} alt="SPORTSAAL" className="mobile-menu-logo" />
            </a>
            <button
              className="mobile-close-x"
              onClick={handleCloseMenu}
              aria-label="Close navigation menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6"  x2="6"  y2="18"></line>
                <line x1="6"  y1="6"  x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="mobile-nav-links">
            {['SERVICES','VENUES','TOURNAMENTS','COACHING','CONTACT'].map((label, i) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className={`mobile-nav-item item-${i + 1}`}
                onClick={handleCloseMenu}
              >
                <span className="item-text">{label}</span>
                <span className="item-arrow">→</span>
              </a>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-divider"></div>
            <a href="#book" className="mobile-cta-full-red" onClick={handleCloseMenu}>
              <span>BOOK A VENUE</span>
              <span className="cta-arrow">→</span>
            </a>
            <div className="mobile-social-icons">
              {[
                { href: 'https://instagram.com', label: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></> },
                { href: 'https://youtube.com',   label: 'YouTube',   icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></> },
                { href: 'https://linkedin.com',  label: 'LinkedIn',  icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-circle" aria-label={label}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
