import React, { useState, useEffect } from 'react';
import './CinematicIntro.css';

/**
 * CinematicIntro
 *
 * 1. Initial Small Loading Screen:
 *    - Minimalist 2D cricket bat tapping the ball in the air
 *    - Each tap increases the ball's bounce height (low -> medium -> high)
 *    - Monitors document.fonts.ready to guarantee 'Anton' and 'Barlow' are ready
 *    - Completely eliminates FOUT (Flash of Unstyled Text)
 *
 * 2. 5-second cinematic typography sequence:
 *    - 2 bold monochromatic phrases emerging from background to foreground in 3D
 *    - Final punch with SPORTSAAL brand reveal
 *    - Completes smoothly and triggers hero train entrance
 */

const PHRASES = [
  {
    id: 1,
    line1: 'WE BUILD THE STAGE.',
    line2: 'YOU BRING THE GAME.',
  },
  {
    id: 2,
    line1: 'WHERE PASSION MEETS THE PITCH.',
    line2: 'CHAMPIONS ARE FORGED HERE.',
  },
  {
    id: 3,
    isBrand: true,
    line1: 'SPORTSAAL',
    line2: 'ATHLETIC ECOSYSTEM',
  },
];

export default function CinematicIntro({ onComplete }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loaderFading, setLoaderFading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // 1. Initial Font Preloader with Bat-Tapping Animation
  useEffect(() => {
    document.body.classList.add('intro-scroll-lock');

    const startTime = performance.now();
    // Allow at least ~1.8s so user sees the 2D bat progressively tapping the ball higher
    const minDisplayDuration = 1800;
    const safetyLimit = 3200;

    const fontPromises = [];
    if (typeof document !== 'undefined' && document.fonts) {
      if (document.fonts.ready) {
        fontPromises.push(document.fonts.ready);
      }
      if (document.fonts.load) {
        fontPromises.push(document.fonts.load('400 32px "Anton"'));
        fontPromises.push(document.fonts.load('400 16px "Barlow"'));
        fontPromises.push(document.fonts.load('700 16px "Barlow"'));
      }
    }

    const dismissPreloader = () => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(0, minDisplayDuration - elapsed);

      setTimeout(() => {
        setLoaderFading(true);
        setTimeout(() => {
          setFontsLoaded(true);
        }, 320);
      }, remainingTime);
    };

    const fallbackTimer = setTimeout(dismissPreloader, safetyLimit);

    Promise.allSettled(fontPromises).then(() => {
      clearTimeout(fallbackTimer);
      dismissPreloader();
    });

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  // 2. Cinematic Typography Sequence: Starts only after fonts are 100% loaded
  useEffect(() => {
    if (!fontsLoaded) return;

    // Phrase 1 (1.75s) -> Phrase 2 (1.7s) -> Brand punch (1.2s) -> Smooth fade out
    const t1 = setTimeout(() => setCurrentStep(1), 1750);
    const t2 = setTimeout(() => setCurrentStep(2), 3450);

    const tFade = setTimeout(() => {
      setIsFadingOut(true);
    }, 4650);

    const tEnd = setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove('intro-scroll-lock');
      if (onComplete) onComplete();
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tFade);
      clearTimeout(tEnd);
    };
  }, [fontsLoaded, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove('intro-scroll-lock');
      if (onComplete) onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`cinematic-intro-overlay ${isFadingOut ? 'intro-fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sportsaal Introduction"
    >
      {/* Small Font Preloader Screen: 2D Bat Tapping Ball */}
      {!fontsLoaded && (
        <div className={`intro-font-loader ${loaderFading ? 'font-loader-fade-out' : ''}`}>
          {/* Minimal 2D Cricket Bat Tapping Ball Animation */}
          <div className="cricket-tap-loader" aria-hidden="true">
            <svg
              viewBox="0 0 120 130"
              className="cricket-tap-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft Ground Shadow beneath bat */}
              <ellipse cx="56" cy="118" rx="38" ry="3" fill="rgba(0, 0, 0, 0.6)" />

              {/* Dynamic Contact Shadow on Bat Face (expands on descent, shrinks in air) */}
              <ellipse className="tap-ball-shadow" cx="48" cy="105" rx="6" ry="1.8" fill="rgba(0, 0, 0, 0.75)" />

              {/* Impact Flash Shockwave Ring on Contact */}
              <ellipse className="tap-impact-ring" cx="48" cy="104" rx="9" ry="2.6" stroke="#FF2B2B" strokeWidth="1.4" />

              {/* 2D Cricket Bat Assembly (Recoil tap motion) */}
              <g className="tap-bat-assembly">
                {/* Bat Blade */}
                <rect x="18" y="104" width="56" height="10" rx="3" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.2" />
                {/* Red Brand Accent Stripe on Blade */}
                <rect x="30" y="107" width="30" height="2" rx="1" fill="#FF2B2B" />
                {/* Bat Handle Collar */}
                <path d="M 74 106.5 L 80 107.5 L 80 110.5 L 74 111.5 Z" fill="#94A3B8" />
                {/* Bat Handle with Red Grip */}
                <rect x="80" y="107.5" width="24" height="3" rx="1.5" fill="#FF2B2B" stroke="#B91C1C" strokeWidth="0.8" />
                {/* Grip Wrap Rings */}
                <line x1="86" y1="107.5" x2="86" y2="110.5" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.65" />
                <line x1="92" y1="107.5" x2="92" y2="110.5" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.65" />
                <line x1="98" y1="107.5" x2="98" y2="110.5" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.65" />
              </g>

              {/* Bouncing Cricket Ball (Progressive height taps) */}
              <g className="tap-ball-group">
                {/* Red Cricket Ball */}
                <circle cx="48" cy="98" r="6" fill="#FF2B2B" stroke="#B91C1C" strokeWidth="1" />
                {/* White Curved Seam Stitch */}
                <path
                  d="M 44.5 95 C 47.5 96.5 48.5 99.5 51.5 101"
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  strokeDasharray="1.2 1"
                  strokeLinecap="round"
                />
                {/* Specular Highlight */}
                <circle cx="46" cy="96" r="1.5" fill="#FFFFFF" opacity="0.5" />
              </g>
            </svg>
          </div>

          <div className="font-loader-brand">
            <span className="font-loader-title">SPORTSAAL</span>
            <div className="font-loader-bar-track">
              <div className="font-loader-bar-fill" />
            </div>
          </div>
        </div>
      )}

      {/* Background Cinematic Atmosphere */}
      <div className="intro-bg-ambient" aria-hidden="true">
        <div className="intro-light-pulse" />
      </div>

      {/* 3D Depth Stage: Text emerges from background to foreground with loaded fonts */}
      {fontsLoaded && (
        <div className="intro-depth-stage">
          {(() => {
            const activePhrase = PHRASES[currentStep];
            return (
              <div key={activePhrase.id} className="intro-phrase-card">
                {activePhrase.isBrand ? (
                  <div className="intro-brand-block">
                    <h1 className="intro-brand-title">{activePhrase.line1}</h1>
                    <p className="intro-brand-subtitle">{activePhrase.line2}</p>
                  </div>
                ) : (
                  <div className="intro-phrase-block">
                    <h2 className="intro-phrase-line intro-phrase-line1">{activePhrase.line1}</h2>
                    <h2 className="intro-phrase-line intro-phrase-line2">{activePhrase.line2}</h2>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Progress Dots Indicator */}
      {fontsLoaded && (
        <div className="intro-progress-bar" aria-hidden="true">
          {PHRASES.map((p, idx) => (
            <span 
              key={p.id} 
              className={`intro-dot ${idx === currentStep ? 'is-active' : ''} ${idx < currentStep ? 'is-passed' : ''}`} 
            />
          ))}
        </div>
      )}

      {/* Subtle Skip button */}
      <button 
        type="button" 
        className="intro-skip-btn" 
        onClick={handleSkip}
        aria-label="Skip intro"
      >
        <span>SKIP</span>
        <span className="skip-arrow">→</span>
      </button>
    </div>
  );
}
