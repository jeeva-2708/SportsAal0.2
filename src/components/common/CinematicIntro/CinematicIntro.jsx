import React, { useState, useEffect } from 'react';
import './CinematicIntro.css';

/**
 * CinematicIntro
 *
 * 1. Initial Loading Screen:
 *    - Realistic 2D Cricket Bat tapping the ball in the air
 *    - The bat's handle (top) remains anchored while the bat's blade (bottom) flicks up to tap the ball
 *    - Each tap progressively launches the ball higher (Low -> Medium -> High air time)
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

  // 1. Initial Font Preloader with Realistic Bat-Tapping Animation
  useEffect(() => {
    document.body.classList.add('intro-scroll-lock');

    const startTime = performance.now();
    // Allow at least ~2.1s so user enjoys watching the progressive taps (Low -> Med -> High)
    const minDisplayDuration = 2100;
    const safetyLimit = 3600;

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
        }, 340);
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
      {/* Loading Screen: Realistic 2D Cricket Bat Tapping Ball (No text) */}
      {!fontsLoaded && (
        <div className={`intro-font-loader ${loaderFading ? 'font-loader-fade-out' : ''}`}>
          <div className="cricket-tap-loader" aria-hidden="true">
            <svg
              viewBox="0 0 280 260"
              className="cricket-tap-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Realistic Cricket Ball Shader */}
                <radialGradient id="cricketBallRealistic" cx="32%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#FF6E75" />
                  <stop offset="28%" stopColor="#EF202A" />
                  <stop offset="68%" stopColor="#B9131A" />
                  <stop offset="100%" stopColor="#54070A" />
                </radialGradient>

                {/* English Willow Wood Face Gradient */}
                <linearGradient id="willowBladeFace" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDF7" />
                  <stop offset="16%" stopColor="#F7F0E1" />
                  <stop offset="60%" stopColor="#E9DCBF" />
                  <stop offset="88%" stopColor="#D5C5A1" />
                  <stop offset="100%" stopColor="#B3A17B" />
                </linearGradient>

                {/* Blade Bottom Thickness / Edge Bevel */}
                <linearGradient id="willowBladeEdge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8C7957" />
                  <stop offset="50%" stopColor="#67563A" />
                  <stop offset="100%" stopColor="#3C311F" />
                </linearGradient>

                {/* Embossed Brand Decal Gradient */}
                <linearGradient id="batDecalGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF3333" />
                  <stop offset="50%" stopColor="#D91616" />
                  <stop offset="100%" stopColor="#990B0B" />
                </linearGradient>

                {/* Rubber Grip Texture Gradient */}
                <linearGradient id="handleGripShader" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="40%" stopColor="#DC2626" />
                  <stop offset="85%" stopColor="#991B1B" />
                  <stop offset="100%" stopColor="#580C0C" />
                </linearGradient>

                {/* Dynamic Contact Shadow beneath ball */}
                <radialGradient id="contactShadowShader" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 0, 0, 0.85)" />
                  <stop offset="65%" stopColor="rgba(0, 0, 0, 0.25)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                {/* Sweet Spot Impact Glow */}
                <radialGradient id="sweetSpotImpactGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 43, 43, 0.9)" />
                  <stop offset="50%" stopColor="rgba(255, 43, 43, 0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Floor Ambient Shadow */}
              <ellipse cx="120" cy="186" rx="90" ry="7" fill="rgba(0, 0, 0, 0.55)" />

              {/* BAT ASSEMBLY: Pivot origin at handle top (230px, 149px) so the BOTTOM moves, not the top! */}
              <g className="realistic-bat-assembly">
                {/* Dynamic Ball Contact Shadow on the hitting face */}
                <ellipse 
                  className="tap-ball-contact-shadow" 
                  cx="102" 
                  cy="142" 
                  rx="16" 
                  ry="4.5" 
                  fill="url(#contactShadowShader)" 
                />

                {/* Impact Shockwave Ring on Contact */}
                <ellipse 
                  className="tap-sweetspot-impact-ring" 
                  cx="102" 
                  cy="140" 
                  rx="22" 
                  ry="6.5" 
                  stroke="#FF2B2B" 
                  strokeWidth="2" 
                />

                {/* 1. Blade Bottom Edge Thickness (Gives the bat solid 2D depth) */}
                <path
                  d="M 44 162 L 165 162 C 170 162 173 163.5 176 166 L 174 168 C 170 168 165 168 44 168 C 36 168 31 165 31 162 C 33 162 38 162 44 162 Z"
                  fill="url(#willowBladeEdge)"
                  stroke="#231E17"
                  strokeWidth="0.8"
                />

                {/* 2. Main English Willow Blade */}
                <path
                  d="M 44 140 L 166 140 C 171 140 174 142.5 177 145.5 L 177 161 C 174 163.5 171 165 166 165 L 44 165 C 36 165 31 161.5 31 152.5 C 31 144 36 140 44 140 Z"
                  fill="url(#willowBladeFace)"
                  stroke="#1A1814"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* 3. Willow Grain Lines */}
                <line x1="56" y1="145" x2="160" y2="145" stroke="#D1BE9B" strokeWidth="0.75" opacity="0.6" />
                <line x1="52" y1="151" x2="162" y2="151" stroke="#D1BE9B" strokeWidth="0.75" opacity="0.6" />
                <line x1="48" y1="157" x2="158" y2="157" stroke="#D1BE9B" strokeWidth="0.75" opacity="0.6" />

                {/* 4. Protective Toe Guard (Dark rubber bottom tip) */}
                <path
                  d="M 44 140 C 35 140 30 144.5 30 152.5 C 30 160.5 35 165 44 165 L 48 165 C 40 165 36 161 36 152.5 C 36 144 40 140 48 140 Z"
                  fill="#1C1917"
                />

                {/* 5. Embossed Athletic Decal on Blade Face */}
                <path
                  d="M 62 148 L 148 148 L 144 154 L 58 154 Z"
                  fill="url(#batDecalGradient)"
                  stroke="#990B0B"
                  strokeWidth="0.6"
                />
                <line x1="64" y1="151" x2="142" y2="151" stroke="#FFFFFF" strokeWidth="1" opacity="0.85" />

                {/* 6. Bat Shoulder Splice Wedge */}
                <path
                  d="M 166 144 L 176 146.5 L 176 153.5 L 166 156 Z"
                  fill="#78716C"
                />

                {/* 7. Realistic Cane Handle with Rubber Grip Wrap */}
                <rect
                  x="176"
                  y="146.5"
                  width="54"
                  height="7"
                  rx="3.5"
                  fill="url(#handleGripShader)"
                  stroke="#7F1D1D"
                  strokeWidth="1.2"
                />

                {/* Handle Chevron Grip Wrap Ribs */}
                <line x1="184" y1="146.5" x2="184" y2="153.5" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />
                <line x1="192" y1="146.5" x2="192" y2="153.5" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />
                <line x1="200" y1="146.5" x2="200" y2="153.5" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />
                <line x1="208" y1="146.5" x2="208" y2="153.5" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />
                <line x1="216" y1="146.5" x2="216" y2="153.5" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />
                <line x1="224" y1="146.5" x2="224" y2="153.5" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.7" />

                {/* Handle Top Rubber Cap (Anchor point) */}
                <circle cx="230" cy="150" r="4.2" fill="#1C1917" stroke="#44403C" strokeWidth="0.8" />
              </g>

              {/* REALISTIC BOUNCING CRICKET BALL: Progressive Heights (Low -> Med -> High) */}
              <g className="realistic-ball-flight-group">
                {/* 3D Shaded Leather Cricket Ball */}
                <circle
                  cx="102"
                  cy="126"
                  r="13"
                  fill="url(#cricketBallRealistic)"
                  stroke="#450A0A"
                  strokeWidth="1.2"
                />

                {/* Twin White Seam Stitch Lines with Cross-Stitch Marks */}
                <path
                  d="M 92 119 C 98 122 106 128 112 133"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeDasharray="2.2 1.5"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <path
                  d="M 93.5 120.5 C 99.5 123.5 107.5 129.5 113.5 134.5"
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  strokeDasharray="1.5 2"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* High-Gloss Specular Shine Highlight */}
                <ellipse cx="97" cy="120" rx="3.5" ry="2" transform="rotate(-30 97 120)" fill="#FFFFFF" opacity="0.65" />
              </g>
            </svg>
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
