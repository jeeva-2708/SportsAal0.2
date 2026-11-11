import React from 'react';
import './About.css';
import { useStickySection } from '../../hooks/useStickySection.js';
import { scrollToSection } from '../../utils/navigation.js';
import cricketBatsmanImg from '../../assets/images/hero-ribbon/cricket-batsman.jpg';

export default function About() {
  const sectionRef = useStickySection();

  return (
    <section ref={sectionRef} className="about-section-luxury stacked-section stacked-section-2" id="about">
      <div className="about-luxury-container">
        {/* Left Column: Pure High-Impact Athletic Photography (ZERO text on image) */}
        <div className="about-visual-column">
          <div className="about-image-card">
            <img
              src={cricketBatsmanImg}
              alt="Cricket Batsman Action"
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
            <span>SPORTSAAL ECOSYSTEM // PERFORMANCE PLATFORM</span>
          </div>

          {/* Bold Display Headline */}
          <h2 className="about-v4-headline">
            WE BUILD THE STAGE. <br />
            <span className="v4-headline-accent">YOU BRING THE GAME.</span>
          </h2>

          {/* Brand Narrative */}
          <p className="about-v4-narrative">
            Sportsaal is India's premier integrated athletic ecosystem. We connect athletes, corporate clubs, and sporting venues through world-class ground operations, premier tournaments, BCCI-certified coaching, and broadcast-grade streaming technology.
          </p>

          {/* Action Buttons Row */}
          <div className="about-v4-action-row">
            <a
              href="#services"
              className="v4-services-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#services');
              }}
            >
              <span>EXPLORE SERVICES</span>
              <span className="v4-arrow">→</span>
            </a>

            <a
              href="#contact"
              className="v4-ghost-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
            >
              <span>BOOK A VENUE</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
