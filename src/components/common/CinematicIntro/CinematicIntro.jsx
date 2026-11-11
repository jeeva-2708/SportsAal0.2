import React, { useState, useEffect } from 'react';
import './CinematicIntro.css';

/**
 * CinematicIntro
 *
 * 1. Initial Loading Screen:
 *    - Exact Football Juggling Loading Screen inspired by reference
 *    - Styled with Sportsaal's signature athletic red and dark Obsidian accents
 *    - Classic 3D black & white soccer ball juggling above a sleek athletic sneaker
 *    - Real-time juggling kinematics: heel-pivoted toe flick, ball launch, parabolic apex & spin
 *    - Clean lower card with modern "Loading...." micro-animated typography
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
      {/* Loading Screen: Football & Sneaker Juggling Loader */}
      {!fontsLoaded && (
        <div className={`intro-font-loader ${loaderFading ? 'font-loader-fade-out' : ''}`}>
          <div className="football-loader-card" aria-hidden="true">
            {/* Top Section: Red Athletic Pitch with Football and Sneaker */}
            <div className="football-loader-top">
              <svg
                viewBox="0 0 320 330"
                className="football-loader-svg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Realistic 3D Soccer Ball Sphere Gradient */}
                  <radialGradient id="soccerBall3DGrad" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#F8FAFC" />
                    <stop offset="85%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </radialGradient>

                  {/* Dark Leather Panel Gradient */}
                  <linearGradient id="soccerPanelDark" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22252A" />
                    <stop offset="100%" stopColor="#111317" />
                  </linearGradient>

                  {/* Sneaker Sole Gradient */}
                  <linearGradient id="sneakerSoleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2A2F38" />
                    <stop offset="40%" stopColor="#1A1C22" />
                    <stop offset="100%" stopColor="#0E1014" />
                  </linearGradient>

                  {/* Sneaker Racing Wave Gradient */}
                  <linearGradient id="sneakerWaveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>

                  {/* Dynamic Contact Shadow */}
                  <radialGradient id="footballContactShadowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0, 0, 0, 0.55)" />
                    <stop offset="60%" stopColor="rgba(0, 0, 0, 0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* SNEAKER GROUP (Pivots at heel, toe flicks upward to kick) */}
                <g className="football-shoe-group">
                  {/* Contact Shadow on Shoe Toe */}
                  <ellipse
                    className="football-contact-shadow"
                    cx="132"
                    cy="180"
                    rx="16"
                    ry="5"
                    fill="url(#footballContactShadowGrad)"
                  />

                  {/* 1. Sneaker Dark Sculpted Sole */}
                  <path
                    d="M 80 218 C 95 240 135 252 185 252 C 220 252 245 246 252 238 C 255 234 253 228 246 226 C 230 230 200 234 160 234 C 120 234 95 224 80 218 Z"
                    fill="url(#sneakerSoleGrad)"
                  />
                  {/* Sole Midsole Speed Accent Line */}
                  <path
                    d="M 86 218 C 115 228 160 232 244 227"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />

                  {/* 2. Sneaker Upper Body (Matching Red Theme) */}
                  <path
                    d="M 80 218 C 78 206 88 194 108 190 C 125 186 145 178 162 168 C 168 164 175 166 178 172 C 184 180 196 186 212 184 C 225 182 235 188 238 198 C 242 210 246 222 244 228 C 200 234 150 234 105 226 L 80 218 Z"
                    fill="#DC2626"
                    stroke="#991B1B"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />

                  {/* 3. Toe Protector / Mudguard */}
                  <path
                    d="M 80 218 C 78 210 86 200 98 198 L 102 210 C 94 212 86 218 80 218 Z"
                    fill="#991B1B"
                    opacity="0.8"
                  />

                  {/* 4. Dynamic Side Waves / Racing Swoosh (Yellow & White) */}
                  <path
                    d="M 106 205 C 135 194 168 214 196 226 C 214 234 230 226 236 212 L 234 218 C 224 234 206 238 190 230 C 162 216 132 202 106 209 Z"
                    fill="url(#sneakerWaveGrad)"
                  />
                  <path
                    d="M 115 199 C 142 190 172 208 198 220 C 214 228 226 222 232 208"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* 5. Diagonal Laces (Yellow Bars along Tongue) */}
                  <line x1="125" y1="198" x2="135" y2="193" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
                  <line x1="133" y1="191" x2="143" y2="186" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
                  <line x1="141" y1="184" x2="151" y2="179" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
                  <line x1="149" y1="177" x2="159" y2="172" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
                  <line x1="157" y1="170" x2="167" y2="165" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />

                  {/* 6. Ankle Collar Opening */}
                  <path
                    d="M 178 172 C 185 180 198 184 214 182 C 220 181 224 185 222 190 C 210 193 194 190 182 178 Z"
                    fill="#181A20"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                </g>

                {/* SOCCER BALL GROUP (Juggles upward with realistic spin and bounce) */}
                <g className="football-ball-group">
                  {/* Sphere Base with 3D Shader */}
                  <circle
                    cx="132"
                    cy="135"
                    r="30"
                    fill="url(#soccerBall3DGrad)"
                    stroke="#18181B"
                    strokeWidth="2"
                  />

                  {/* Central Black Pentagon */}
                  <polygon
                    points="132,123 143.4,131.3 139,144.7 125,144.7 120.6,131.3"
                    fill="url(#soccerPanelDark)"
                    stroke="#18181B"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* 5 Seams Radiating from Center Pentagon */}
                  <line x1="132" y1="123" x2="132" y2="107" stroke="#18181B" strokeWidth="1.8" />
                  <line x1="143.4" y1="131.3" x2="156" y2="124" stroke="#18181B" strokeWidth="1.8" />
                  <line x1="139" y1="144.7" x2="150" y2="157" stroke="#18181B" strokeWidth="1.8" />
                  <line x1="125" y1="144.7" x2="114" y2="157" stroke="#18181B" strokeWidth="1.8" />
                  <line x1="120.6" y1="131.3" x2="108" y2="124" stroke="#18181B" strokeWidth="1.8" />

                  {/* 5 Outer Truncated Pentagons */}
                  {/* Top Pentagon */}
                  <path
                    d="M 124 106 L 132 107 L 140 106 A 30 30 0 0 0 124 106 Z"
                    fill="url(#soccerPanelDark)"
                    stroke="#18181B"
                    strokeWidth="1.5"
                  />
                  {/* Upper-Right Pentagon */}
                  <path
                    d="M 156 124 L 152 115 A 30 30 0 0 1 161 133 L 156 124 Z"
                    fill="url(#soccerPanelDark)"
                    stroke="#18181B"
                    strokeWidth="1.5"
                  />
                  {/* Lower-Right Pentagon */}
                  <path
                    d="M 150 157 L 157 149 A 30 30 0 0 1 144 163 L 150 157 Z"
                    fill="url(#soccerPanelDark)"
                    stroke="#18181B"
                    strokeWidth="1.5"
                  />
                  {/* Lower-Left Pentagon */}
                  <path
                    d="M 114 157 L 120 163 A 30 30 0 0 1 107 149 L 114 157 Z"
                    fill="url(#soccerPanelDark)"
                    stroke="#18181B"
                    strokeWidth="1.5"
                  />
                  {/* Upper-Left Pentagon */}
                  <path
                    d="M 108 124 L 103 133 A 30 30 0 0 1 112 115 L 108 124 Z"
                    fill="url(#soccerPanelDark)"
                    stroke="#18181B"
                    strokeWidth="1.5"
                  />

                  {/* Specular 3D Gloss Curve */}
                  <ellipse
                    cx="123"
                    cy="122"
                    rx="8"
                    ry="4.5"
                    transform="rotate(-30 123 122)"
                    fill="#FFFFFF"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </div>

            {/* Bottom Section: White Card with "Loading...." */}
            <div className="football-loader-bottom">
              <p className="football-loader-text">
                Loading
                <span className="football-loader-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </p>
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
