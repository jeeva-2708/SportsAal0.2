import React from 'react';
import './About.css';
import { scrollToSection } from '../../utils/navigation.js';
import cricketBatsmanImg from '../../assets/images/hero-ribbon/cricket-batsman.jpg';

export default function About() {
  return (
    <section className="about-section-luxury" id="about">
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

          {/* 4-Pillar Athletic Capability Matrix */}
          <div className="about-v4-matrix">
            <div className="v4-matrix-item">
              <span className="matrix-number">30+</span>
              <span className="matrix-label">VENUES MANAGED</span>
              <span className="matrix-sub">BCCI & FIFA Standard Grounds</span>
            </div>
            <div className="v4-matrix-item">
              <span className="matrix-number">120+</span>
              <span className="matrix-label">TOURNAMENTS HOSTED</span>
              <span className="matrix-sub">Corporate & Open Championships</span>
            </div>
            <div className="v4-matrix-item">
              <span className="matrix-number">15K+</span>
              <span className="matrix-label">ATHLETES EMPOWERED</span>
              <span className="matrix-sub">Active Coaching & Leagues</span>
            </div>
            <div className="v4-matrix-item">
              <span className="matrix-number">100%</span>
              <span className="matrix-label">FLOODLIT COVERAGE</span>
              <span className="matrix-sub">Broadcast-Grade Illumination</span>
            </div>
          </div>

          {/* Feature Highlight Tags */}
          <div className="about-v4-tags-row">
            <span className="v4-pillar-pill">PRO TURF ARENAS</span>
            <span className="v4-pillar-pill">LIVE 4K BROADCAST</span>
            <span className="v4-pillar-pill">BCCI CERTIFIED COACHES</span>
            <span className="v4-pillar-pill">LEAGUE MANAGEMENT</span>
          </div>

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
