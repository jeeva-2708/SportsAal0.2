import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useStickySection } from '../../hooks/useStickySection.js';
import { scrollToSection } from '../../utils/navigation.js';
import { FALLBACK_SECTIONS } from '../../data/fallbackSiteData.js';

export default function Hero({ introComplete = false }) {
  const sectionRef = useStickySection();
  // Hero is strictly code-managed for guaranteed animation performance and visual fidelity
  const heroCfg = FALLBACK_SECTIONS.hero || {};
  const ribbonPhotos = Array.isArray(heroCfg.ribbonPhotos) ? heroCfg.ribbonPhotos : [];
  const sportsaalServices = Array.isArray(heroCfg.marqueeItems) ? heroCfg.marqueeItems : [];
  const ctaText = heroCfg.ctaText || 'EXPLORE SPORTSAAL';
  const ctaHref = heroCfg.ctaHref || '#about';

  const [trainSettled, setTrainSettled] = useState(() => introComplete);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth <= 768;

  // Initial train entrance on load after intro
  useEffect(() => {
    if (introComplete && !trainSettled) {
      const timer = setTimeout(() => {
        setTrainSettled(true);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [introComplete, trainSettled]);

  const midpoint = (ribbonPhotos.length - 1) / 2;

  return (
    <section ref={sectionRef} className="hero-section-v3 stacked-section stacked-section-1" id="hero">
      {/* 1. Multi-Sport Cinema Ribbon */}
      <div className="hero-ribbon-viewport">
        <div className="hero-ribbon-track">
          {ribbonPhotos.map((item, idx) => {
            const cardSpacing = isMobile ? 142 : Math.min(210, Math.max(160, viewportWidth * 0.135));
            const ribbonX = (idx - midpoint) * cardSpacing;

            return (
              <div
                key={item.id || idx}
                className={`hero-photo-frame ${
                  !introComplete
                    ? 'train-waiting'
                    : !trainSettled
                      ? 'train-animating'
                      : 'train-settled'
                }`}
                style={{
                  transform: `translate3d(${ribbonX}px, 0, 0)`,
                  zIndex: 10 + idx,
                  animationDelay: introComplete && !trainSettled ? `${idx * 0.08}s` : undefined,
                  '--ribbon-target-x': `${ribbonX}px`,
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt || 'Sportsaal'}
                  className="hero-photo-img"
                  loading="eager"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Hero Bottom Cluster (Marquee Ticker + Primary Action CTA) */}
      <div className="hero-bottom-cluster">
        {/* Running Marquee Ticker */}
        <div
          className={`hero-marquee-wrapper ${!introComplete ? 'hero-marquee-waiting' : 'hero-marquee-active'}`}
          aria-hidden="true"
        >
          <div className="hero-marquee-track">
            {[...sportsaalServices, ...sportsaalServices, ...sportsaalServices].map((service, idx) => (
              <span key={idx} className="hero-marquee-item">
                <span className="marquee-text">{service}</span>
                <span className="marquee-dot">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Primary Action Callout CTA */}
        <div className={`hero-action-container ${!introComplete ? 'hero-btn-waiting' : 'hero-btn-active'}`}>
          <a
            href={ctaHref}
            className="hero-pill-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(ctaHref);
            }}
          >
            <span>{ctaText}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
