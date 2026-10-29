import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logoDarkImg from '../../assets/logos/sportsaal-logo.png';
import { scrollToSection } from '../../utils/navigation';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollPositionRef = useRef(0);
  const targetSectionRef = useRef(null);

  // Monitor scroll position to apply translucent color only when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (document.body.classList.contains('nav-menu-open')) return;
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile/tablet menu is open without losing scroll position
  useEffect(() => {
    if (mobileMenuOpen) {
      // 1. Capture exact scroll offset before applying lock
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      scrollPositionRef.current = currentScrollY;

      // 2. Lock body position without collapsing document height or resetting scrollTop
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.classList.add('nav-menu-open');

      const handleTouchMove = (e) => {
        const menu = document.querySelector('.mobile-fullscreen-menu');
        if (menu && !menu.contains(e.target)) {
          e.preventDefault();
        }
      };

      window.addEventListener('touchmove', handleTouchMove, { passive: false });

      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        document.body.classList.remove('nav-menu-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        if (targetSectionRef.current) {
          const target = targetSectionRef.current;
          targetSectionRef.current = null;
          setTimeout(() => {
            scrollToSection(target);
          }, 30);
        } else {
          // Closed without clicking navigation link; restore exact prior scroll position
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, scrollPositionRef.current);
          requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = '';
          });
        }
      };
    }
  }, [mobileMenuOpen]);

  // Auto-close mobile menu if viewport resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1150 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setIsClosing(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const handleOpenMenu = () => {
    setIsClosing(false);
    setMobileMenuOpen(true);
  };

  const handleCloseMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 600);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    handleCloseMenu();
    if (location.pathname === '/') {
      scrollToSection(href);
    } else {
      navigate('/' + href);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (mobileMenuOpen) handleCloseMenu();
    if (location.pathname === '/') {
      scrollToSection('#hero');
    } else {
      navigate('/');
    }
  };

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className={`container header-container${isScrolled ? ' is-scrolled' : ''}`}>
        {/* Brand Logo */}
        <a 
          href="/" 
          className="brand-logo" 
          aria-label="Sportsaal Home"
          onClick={handleLogoClick}
        >
          <img src={logoDarkImg} alt="SPORTSAAL" className="brand-logo-img" />
        </a>

        {/* Desktop Navigation Menu (Video Style) */}
        <nav className="desktop-nav-menu">
          <a href="/#services" className="nav-link" onClick={(e) => handleNavClick(e, '#services')}>SERVICES</a>
          <a href="/services/cricket-tournaments" className="nav-link" onClick={(e) => handleNavClick(e, '/services/cricket-tournaments')}>EVENTS</a>
          <a href="/services/venue-management" className="nav-link" onClick={(e) => handleNavClick(e, '/services/venue-management')}>VENUES</a>
          <a href="/#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>ABOUT US</a>
          <a href="/#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>CONTACT US</a>
        </nav>

        {/* Header Actions: Clean Outline Pill CTA like the video SAVE MY SPOT */}
        <div className="header-actions">
          <a 
            href="#contact" 
            className="btn-header-outline-pill"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
          >
            <span>BOOK A VENUE</span>
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
            <a href="/" className="mobile-menu-logo-link" onClick={handleLogoClick}>
              <img src={logoDarkImg} alt="SPORTSAAL" className="mobile-menu-logo" />
            </a>
            <button
              type="button"
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
            {[
              { label: 'HOME', href: '#hero' },
              { label: 'ABOUT US', href: '#about' },
              { label: 'SERVICES', href: '#services' },
              { label: 'OUR WORK', href: '#work' },
              { label: 'CONTACT US', href: '#contact' },
            ].map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`mobile-nav-item item-${i + 1}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="item-text">{item.label}</span>
                <span className="item-arrow">→</span>
              </a>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-divider"></div>
            <a href="#book" className="mobile-cta-full-red" onClick={(e) => handleNavClick(e, '#book')}>
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
