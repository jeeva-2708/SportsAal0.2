import React, { useState, useEffect } from 'react';
import './CinematicIntro.css';

/**
 * CinematicIntro
 *
 * 1. Initial Loading Screen:
 *    - Realistic 2D Cricket Bat (SIDE ANGLE profile showing striking face, thick spine swell & toe)
 *    - Organic biomechanics: the handle moves naturally with hand flex, while the bottom of the bat
 *      flicks up with dynamic wrist action to tap the ball into the air
 *    - Progressive bounce heights on each tap (Low -> Medium -> High air time)
 *    - No text on screen, pure realistic athletic loader
 *    - Monitors document.fonts.ready to guarantee 'Anton' and 'Barlow' are ready
 *
 * 2. 5-second cinematic typography sequence:
 *    - 2 bold monochromatic phrases emerging from background to foreground in 3D
 *    - Final punch with SPORTSAAL brand reveal
 *    - Completes smoothly and triggers hero section
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

  // 1. Initial Font Preloader with Realistic Side-Angle Bat Tapping Animation
  useEffect(() => {
    document.body.classList.add('intro-scroll-lock');

    const startTime = performance.now();
    // Allow ~2.2s so user enjoys watching the 3 progressive height taps
    const minDisplayDuration = 2200;
    const safetyLimit = 3800;

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
      {/* Loading Screen: Realistic Side-Angle Cricket Bat Tapping Ball */}
      {!fontsLoaded && (
        <div className={`intro-font-loader ${loaderFading ? 'font-loader-fade-out' : ''}`}>
          <div className="cricket-tap-loader" aria-hidden="true">
            <svg
              viewBox="0 0 320 280"
              className="cricket-tap-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Realistic Cricket Ball Shader */}
                <radialGradient id="cricketBallShaderReal" cx="30%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#FF7A80" />
                  <stop offset="28%" stopColor="#EF232C" />
                  <stop offset="68%" stopColor="#BA141C" />
                  <stop offset="100%" stopColor="#4A0508" />
                </radialGradient>

                {/* English Willow Wood Profile Shader (Side View) */}
                <linearGradient id="willowProfileWood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDF8" />
                  <stop offset="12%" stopColor="#F8F2E4" />
                  <stop offset="55%" stopColor="#EADECA" />
                  <stop offset="85%" stopColor="#D5C5A8" />
                  <stop offset="100%" stopColor="#AC9974" />
                </linearGradient>

                {/* Spine Bottom Depth Bevel */}
                <linearGradient id="willowSpineShadow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#877553" />
                  <stop offset="55%" stopColor="#5E4E32" />
                  <stop offset="100%" stopColor="#352B19" />
                </linearGradient>

                {/* Side Edge Branding Sticker */}
                <linearGradient id="sideEdgeDecalGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF3333" />
                  <stop offset="60%" stopColor="#DC1414" />
                  <stop offset="100%" stopColor="#990B0B" />
                </linearGradient>

                {/* Cane Handle Rubber Grip */}
                <linearGradient id="handleRubberGrip" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="35%" stopColor="#EF4444" />
                  <stop offset="75%" stopColor="#B91C1C" />
                  <stop offset="100%" stopColor="#680C0C" />
                </linearGradient>

                {/* Dynamic Contact Shadow on Bat Face */}
                <radialGradient id="contactShadowSide" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 0, 0, 0.88)" />
                  <stop offset="60%" stopColor="rgba(0, 0, 0, 0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                {/* Sweet Spot Impact Shockwave */}
                <radialGradient id="sweetSpotImpactBurst" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 43, 43, 0.95)" />
                  <stop offset="50%" stopColor="rgba(255, 43, 43, 0.35)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Ambient Ground Shadow */}
              <ellipse cx="150" cy="225" rx="105" ry="8" fill="rgba(0, 0, 0, 0.55)" />

              {/* SIDE-ANGLE CRICKET BAT ASSEMBLY: Dynamic Hand & Wrist Motion */}
              <g className="realistic-side-bat-assembly">
                {/* Contact Shadow on the flat striking face */}
                <ellipse
                  className="tap-side-contact-shadow"
                  cx="115"
                  cy="155.5"
                  rx="18"
                  ry="4.5"
                  fill="url(#contactShadowSide)"
                />

                {/* Impact Shockwave Ring on Contact */}
                <ellipse
                  className="tap-side-impact-ring"
                  cx="115"
                  cy="154"
                  rx="24"
                  ry="6.5"
                  stroke="#FF2B2B"
                  strokeWidth="2"
                />

                {/* 1. Spine Under-Bevel (Bottom edge thickness seen from side) */}
                <path
                  d="M 60 174 Q 115 194 186 160 L 186 163 Q 115 198 60 178 Z"
                  fill="url(#willowSpineShadow)"
                />

                {/* 2. Main Cricket Bat Side Profile: Flat striking face on top, iconic curved spine swell below */}
                <path
                  d="M 60 155 L 186 148 C 188 148 190 149.5 190 151.5 L 188 159 C 187 160 185 160.5 183 160.5 Q 115 192 60 174 C 54 172 50 167 50 162 C 50 158 54 155 60 155 Z"
                  fill="url(#willowProfileWood)"
                  stroke="#1E1A14"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* 3. Authentic Wood Grain Curves on Willow Profile */}
                <path
                  d="M 66 160 Q 115 168 180 154"
                  stroke="#CDB790"
                  strokeWidth="0.8"
                  opacity="0.55"
                />
                <path
                  d="M 62 165 Q 115 178 182 157"
                  stroke="#CDB790"
                  strokeWidth="0.8"
                  opacity="0.55"
                />
                <path
                  d="M 60 170 Q 115 185 176 160"
                  stroke="#CDB790"
                  strokeWidth="0.8"
                  opacity="0.55"
                />

                {/* 4. Protective Toe Guard at the Bottom Tip */}
                <path
                  d="M 60 155 C 53 155 49 158 49 162 C 49 167 53 172 60 174 L 68 171.5 C 62 169.5 59 166 59 162 C 59 158.5 62 155 68 155 Z"
                  fill="#18181B"
                  stroke="#09090B"
                  strokeWidth="0.8"
                />

                {/* 5. Authentic Side Edge Branding Tape (Red & Silver athletic decal) */}
                <path
                  d="M 72 161 Q 115 170 176 155 L 174 157.5 Q 115 172.5 70 163.5 Z"
                  fill="url(#sideEdgeDecalGrad)"
                  stroke="#990B0B"
                  strokeWidth="0.5"
                />
                <path
                  d="M 78 162.5 Q 115 171 168 156.5"
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  opacity="0.85"
                />

                {/* 6. Shoulder Splice Joint */}
                <path
                  d="M 186 148 L 196 144 L 195 156 L 186 160 Z"
                  fill="#78716C"
                  stroke="#44403C"
                  strokeWidth="0.8"
                />

                {/* 7. Angled Cane Handle with Textured Rubber Grip */}
                <rect
                  x="195"
                  y="142"
                  width="56"
                  height="11"
                  rx="5.5"
                  transform="rotate(-5 195 142)"
                  fill="url(#handleRubberGrip)"
                  stroke="#7F1D1D"
                  strokeWidth="1.2"
                />

                {/* Handle Chevron Grip Wrap Ribs */}
                <line x1="205" y1="140" x2="204" y2="152" stroke="#FFFFFF" strokeWidth="1" opacity="0.65" />
                <line x1="214" y1="139" x2="213" y2="151" stroke="#FFFFFF" strokeWidth="1" opacity="0.65" />
                <line x1="223" y1="138" x2="222" y2="150" stroke="#FFFFFF" strokeWidth="1" opacity="0.65" />
                <line x1="232" y1="137" x2="231" y2="149" stroke="#FFFFFF" strokeWidth="1" opacity="0.65" />
                <line x1="241" y1="136" x2="240" y2="148" stroke="#FFFFFF" strokeWidth="1" opacity="0.65" />

                {/* Handle Top Rubber End Cap */}
                <circle cx="251" cy="143" r="5" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
              </g>

              {/* REALISTIC BOUNCING CRICKET BALL: Progressive Heights (Low -> Med -> High) */}
              <g className="realistic-side-ball-group">
                {/* 3D Radial Sphere Leather Cricket Ball */}
                <circle
                  cx="115"
                  cy="139"
                  r="14"
                  fill="url(#cricketBallShaderReal)"
                  stroke="#3B0507"
                  strokeWidth="1.2"
                />

                {/* Hand-Stitched White Seam Line with Cross-Stitches */}
                <path
                  d="M 104 131 C 111 134 119 141 126 147"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeDasharray="2.5 1.6"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <path
                  d="M 105.5 132.5 C 112.5 135.5 120.5 142.5 127.5 148.5"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeDasharray="1.6 2.2"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* Realistic Specular Gloss Gleam */}
                <ellipse
                  cx="110"
                  cy="133"
                  rx="3.8"
                  ry="2.2"
                  transform="rotate(-28 110 133)"
                  fill="#FFFFFF"
                  opacity="0.65"
                />
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
