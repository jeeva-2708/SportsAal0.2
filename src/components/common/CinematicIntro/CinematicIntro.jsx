import React, { useState, useEffect } from 'react';
import './CinematicIntro.css';

/**
 * CinematicIntro
 *
 * 5-second cinematic typography preloader:
 * - 2 bold monochromatic phrases emerging from background to foreground in 3D
 * - Final punch with SPORTSAAL brand reveal
 * - All fonts are strictly single-color (crisp white / light gray)
 * - Completes in ~5.0s and triggers hero train entrance animation
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
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll during intro
    document.body.classList.add('intro-scroll-lock');

    // 5-second timeline with 2 phrases + SPORTSAAL brand punch:
    // Step 0: 0.0s - 1.8s (Phrase 1)
    // Step 1: 1.8s - 3.5s (Phrase 2)
    // Step 2: 3.5s - 4.7s (Brand Reveal: SPORTSAAL)
    // Fade out: 4.7s - 5.05s (Smooth dissolve into Hero train)
    const t1 = setTimeout(() => setCurrentStep(1), 1800);
    const t2 = setTimeout(() => setCurrentStep(2), 3500);

    const tFade = setTimeout(() => {
      setIsFadingOut(true);
    }, 4700);

    const tEnd = setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove('intro-scroll-lock');
      if (onComplete) onComplete();
    }, 5050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tFade);
      clearTimeout(tEnd);
      document.body.classList.remove('intro-scroll-lock');
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove('intro-scroll-lock');
      if (onComplete) onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  const activePhrase = PHRASES[currentStep];

  return (
    <div 
      className={`cinematic-intro-overlay ${isFadingOut ? 'intro-fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sportsaal Introduction"
    >
      {/* Background Cinematic Atmosphere: Deep obsidian with subtle light sweep */}
      <div className="intro-bg-ambient" aria-hidden="true">
        <div className="intro-light-pulse" />
        <div className="intro-grid-mesh" />
      </div>

      {/* 3D Depth Stage: Text emerges from background to foreground */}
      <div className="intro-depth-stage">
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
      </div>

      {/* Progress Dots Indicator */}
      <div className="intro-progress-bar" aria-hidden="true">
        {PHRASES.map((p, idx) => (
          <span 
            key={p.id} 
            className={`intro-dot ${idx === currentStep ? 'is-active' : ''} ${idx < currentStep ? 'is-passed' : ''}`} 
          />
        ))}
      </div>

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
