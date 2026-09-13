import React from 'react';
import './Footer.css';
import brandLogo from '../../assets/logos/sportsaal-logo.png';
import { scrollToSection } from '../../utils/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <footer className="footer-section stacked-section stacked-section-8" id="footer" aria-label="Site Footer">
      {/* Subtle top stadium ambient lighting effect */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="container footer-container">
        {/* Main 4-Column Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="footer-col footer-col-brand">
            <a 
              href="#hero" 
              className="footer-brand-logo" 
              onClick={(e) => handleNavClick(e, '#hero')}
              aria-label="Sportsaal Home"
            >
              <img 
                src={brandLogo} 
                alt="SPORTSAAL" 
                className="footer-logo-img" 
                loading="lazy"
              />
            </a>
            
            <p className="footer-brand-desc">
              Delivering end-to-end cricket solutions through events, infrastructure, technology and passion for the game.
            </p>

            {/* Social Icons */}
            <div className="footer-social-links" aria-label="Social media links">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn" 
                aria-label="Follow us on Instagram"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn" 
                aria-label="Subscribe to our YouTube channel"
                title="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn" 
                aria-label="Connect with us on LinkedIn"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn" 
                aria-label="Follow us on X"
                title="X (Twitter)"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h3 className="footer-col-title">QUICK LINKS</h3>
            <div className="footer-title-bar" aria-hidden="true" />
            <ul className="footer-nav-list">
              <li>
                <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About Us</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
              </li>
              <li>
                <a href="#work" onClick={(e) => handleNavClick(e, '#work')}>Our Work</a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Testimonials</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="footer-col footer-col-links">
            <h3 className="footer-col-title">OUR SERVICES</h3>
            <div className="footer-title-bar" aria-hidden="true" />
            <ul className="footer-nav-list">
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Corporate Events</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Ground Booking</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Live Streaming</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Tournaments</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Sportswear & Products</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Coaching</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Sports Technology</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-col-title">CONTACT US</h3>
            <div className="footer-title-bar" aria-hidden="true" />
            <ul className="footer-contact-list">
              {/* Phone */}
              <li className="footer-contact-item">
                <a href="tel:+919876543210" className="footer-contact-link">
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.25 1.02l-2.22 2.09z" />
                    </svg>
                  </span>
                  <span className="footer-contact-text">+91 98765 43210</span>
                </a>
              </li>

              {/* Email */}
              <li className="footer-contact-item">
                <a href="mailto:info@sportsaal.com" className="footer-contact-link">
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </span>
                  <span className="footer-contact-text">info@sportsaal.com</span>
                </a>
              </li>

              {/* Location */}
              <li className="footer-contact-item">
                <div className="footer-contact-static">
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                    </svg>
                  </span>
                  <span className="footer-contact-text">Chennai, Tamil Nadu, India</span>
                </div>
              </li>

              {/* Let's Discuss Your Event */}
              <li className="footer-contact-item">
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="footer-contact-link footer-contact-cta"
                >
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                    </svg>
                  </span>
                  <span className="footer-contact-text">Let's Discuss Your Event</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Policies Bar */}
        <div className="footer-bottom-divider" aria-hidden="true" />

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {currentYear} Sportsaal Event Management. All rights reserved.
          </div>

          <div className="footer-policy-links">
            <a href="#privacy" className="footer-policy-link">Privacy Policy</a>
            <span className="footer-policy-sep" aria-hidden="true">|</span>
            <a href="#terms" className="footer-policy-link">Terms of Service</a>
            <span className="footer-policy-sep" aria-hidden="true">|</span>
            <a href="#sitemap" className="footer-policy-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
