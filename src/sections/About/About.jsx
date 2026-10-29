import React from 'react';
import './About.css';
import { useStickySection } from '../../hooks/useStickySection';
import { scrollToSection } from '../../utils/navigation.js';

export default function About() {
  const sectionRef = useStickySection();

  return (
    <section ref={sectionRef} className="about-section-minimal" id="about">
      <div className="about-minimal-container">
        {/* Eyebrow Badge */}
        <div className="about-minimal-badge">
          <span className="badge-dot"></span>
          <span>ABOUT SPORTSAAL</span>
        </div>

        {/* Massive Editorial Headline */}
        <h2 className="about-minimal-headline">
          WE BUILD THE STAGE. <br />
          <span className="headline-red">YOU BRING THE GAME.</span>
        </h2>

        {/* Crisp Brand Statement */}
        <p className="about-minimal-description">
          Sportsaal is India's premier integrated athletic ecosystem. We connect athletes, tournament organizers, and venues through world-class sporting infrastructure, professional leagues, certified coaching, and cutting-edge live broadcasting.
        </p>

        {/* Minimal High-Impact Numbers */}
        <div className="about-minimal-metrics">
          <div className="metric-box">
            <span className="metric-number">30+</span>
            <span className="metric-label">VENUES</span>
          </div>
          <span className="metric-dot">•</span>
          <div className="metric-box">
            <span className="metric-number">100+</span>
            <span className="metric-label">TOURNAMENTS</span>
          </div>
          <span className="metric-dot">•</span>
          <div className="metric-box">
            <span className="metric-number">10K+</span>
            <span className="metric-label">ATHLETES</span>
          </div>
        </div>

        {/* Single Sleek Action Link */}
        <div className="about-minimal-cta">
          <a
            href="#services"
            className="about-arrow-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#services');
            }}
          >
            <span>EXPLORE SERVICES</span>
            <span className="link-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
