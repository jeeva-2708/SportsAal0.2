import React, { useState, useEffect } from 'react';
import './Hero.css';
import darkHeroImg from '../../assets/images/hero-cricket-dark.jpg';
import lightHeroImg from '../../assets/images/hero-cricket-light.jpg';

export default function Hero() {
  // Synchronously initialize theme from localStorage / document attribute to prevent flash on refresh
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('sportsaal_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const heroImg = theme === 'light' ? lightHeroImg : darkHeroImg;

  return (
    <section className="hero-section" id="hero">
      {/* Ambient Radial Glow Effects */}
      <div className="hero-ambient-glow"></div>
      <div className="hero-ambient-red"></div>

      {/* Hero Visual Background Layer (Cricket Player Canvas) */}
      <div className="hero-visual-layer">
        <div className="hero-visual-wrapper">
          <img 
            src={heroImg} 
            alt="Sportsaal Cricket Player" 
            className="hero-player-img" 
          />
          <div className="hero-blend-left"></div>
          <div className="hero-blend-bottom"></div>
          <div className="hero-blend-top"></div>
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="container hero-container">
        <div className="hero-content">
          
          {/* Subhead Tag */}
          <div className="hero-tag">
            <span className="tag-line"></span>
            <span className="tag-text">SPORTSAAL</span>
          </div>

          {/* Large Editorial Display Headline in Anton Font */}
          <h1 className="hero-title">
            <span className="title-row">
              <span className="title-navy">COMPLETE</span> <span className="text-red">SPORTS</span>
            </span>
            <span className="title-row">
              <span className="title-navy">SOLUTIONS.</span>
            </span>
            <span className="title-row">
              <span className="title-navy">FROM GROUND</span> <span className="text-red">TO</span>
            </span>
            <span className="title-row">
              <span className="title-navy">GAME DAY.</span>
            </span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="hero-description">
            Professional cricket events, venues, tournaments, coaching and sports technology — all under one roof.
          </p>

          {/* Action CTA Buttons */}
          <div className="hero-cta-group">
            <a href="#services" className="btn btn-primary">
              <span>EXPLORE SERVICES</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-outline">
              <span>CONTACT US</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
