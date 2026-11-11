import React from 'react';
import './About.css';
import { useStickySection } from '../../hooks/useStickySection.js';
import { scrollToSection } from '../../utils/navigation.js';
import { useSiteData } from '../../context/SiteDataContext.jsx';

export default function About() {
  const sectionRef = useStickySection();
  const { sections } = useSiteData();
  const aboutCfg = sections?.about || {};

  return (
    <section ref={sectionRef} className="about-section-luxury stacked-section stacked-section-2" id="about">
      <div className="about-luxury-container">
        {/* Left Column: Pure High-Impact Athletic Photography (ZERO text on image) */}
        <div className="about-visual-column">
          <div className="about-image-card">
            <img
              src={aboutCfg.posterSrc}
              alt={aboutCfg.posterAlt || 'Sportsaal Action'}
              className="about-image-poster"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Luxury Athletic Editorial Layout */}
        <div className="about-editorial-column">
          {/* Eyebrow Badge */}
          <div className="about-v4-badge">
            <span className="v4-badge-pulse" />
            <span>{aboutCfg.badge}</span>
          </div>

          {/* Bold Display Headline */}
          <h2 className="about-v4-headline">
            {aboutCfg.headlineLine1} <br />
            <span className="v4-headline-accent">{aboutCfg.headlineAccent}</span>
          </h2>

          {/* Brand Narrative */}
          <p className="about-v4-narrative">{aboutCfg.narrative}</p>

          {/* Action Buttons Row */}
          <div className="about-v4-action-row">
            <a
              href={aboutCfg.primaryCtaHref || '#services'}
              className="v4-services-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(aboutCfg.primaryCtaHref || '#services');
              }}
            >
              <span>{aboutCfg.primaryCtaText || 'EXPLORE SERVICES'}</span>
              <span className="v4-arrow">→</span>
            </a>

            <a
              href={aboutCfg.secondaryCtaHref || '#contact'}
              className="v4-ghost-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(aboutCfg.secondaryCtaHref || '#contact');
              }}
            >
              <span>{aboutCfg.secondaryCtaText || 'CONTACT OUR TEAM'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
