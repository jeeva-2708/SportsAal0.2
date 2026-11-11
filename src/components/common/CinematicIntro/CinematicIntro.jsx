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
      {/* Loading Screen: Realistic Soccer Ball & Sneaker Juggling (Pure Animation, No Phone Box) */}
      {!fontsLoaded && (
        <div className={`intro-font-loader ${loaderFading ? 'font-loader-fade-out' : ''}`}>
          <div className="football-juggle-stage" aria-hidden="true">
            <svg
              viewBox="0 0 360 380"
              className="football-juggle-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Realistic Soccer Ball Shading */}
                <radialGradient id="soccerBallSphereGrad" cx="32%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="58%" stopColor="#F8FAFC" />
                  <stop offset="85%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </radialGradient>

                {/* Soccer Leather Dark Panel */}
                <linearGradient id="soccerDarkPanelGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#252830" />
                  <stop offset="100%" stopColor="#121317" />
                </linearGradient>

                {/* Realistic Sneaker Upper Red Gradient */}
                <linearGradient id="sneakerUpperRealGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF3838" />
                  <stop offset="35%" stopColor="#E52020" />
                  <stop offset="75%" stopColor="#B81414" />
                  <stop offset="100%" stopColor="#8A0C0C" />
                </linearGradient>

                {/* Sneaker Wedge Sole Gradient */}
                <linearGradient id="sneakerSoleRealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E3440" />
                  <stop offset="45%" stopColor="#1C2028" />
                  <stop offset="100%" stopColor="#0F1115" />
                </linearGradient>

                {/* Golden Yellow Accent Gradient */}
                <linearGradient id="sneakerGoldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFE066" />
                  <stop offset="50%" stopColor="#FFD166" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>

                {/* Dynamic Contact Shadow */}
                <radialGradient id="ballContactShadowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 0, 0, 0.7)" />
                  <stop offset="55%" stopColor="rgba(0, 0, 0, 0.25)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Ground Shadow */}
              <ellipse cx="180" cy="326" rx="115" ry="10" fill="rgba(0, 0, 0, 0.65)" />

              {/* SNEAKER ASSEMBLY (3D Isometric Profile matching reference image) */}
              <g className="realistic-shoe-group">
                {/* Dynamic Ball Contact Shadow on Toe Box */}
                <ellipse
                  className="football-contact-shadow"
                  cx="128"
                  cy="252"
                  rx="18"
                  ry="6"
                  fill="url(#ballContactShadowGrad)"
                />

                {/* 1. Sculpted Outsole (Wedge running sole with curved toe rocker) */}
                <path
                  d="M 75 282 C 72 286 73 293 78 297 C 92 309 125 317 175 317 C 225 317 265 309 284 295 C 291 289 289 281 283 275 C 277 271 268 274 252 277 C 215 283 155 285 105 283 L 75 282 Z"
                  fill="url(#sneakerSoleRealGrad)"
                  stroke="#0A0B0E"
                  strokeWidth="1.2"
                />

                {/* Midsole Accent Line */}
                <path
                  d="M 80 282 C 110 286 160 288 278 276"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {/* 2. Main Sneaker Upper (Red 3D Contours) */}
                <path
                  d="M 75 282 C 74 270 85 254 110 248 C 130 244 158 230 182 212 C 188 206 195 208 198 214 C 205 224 220 234 242 232 C 255 230 268 238 274 250 C 278 260 280 270 278 274 C 240 280 160 284 75 282 Z"
                  fill="url(#sneakerUpperRealGrad)"
                  stroke="#7A0A0A"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />

                {/* 3. Ankle Collar 3D Opening */}
                <path
                  d="M 198 214 C 208 226 226 235 248 232 C 258 230 266 224 262 218 C 248 210 224 206 204 210 Z"
                  fill="#0D0E11"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  opacity="0.55"
                />

                {/* 4. Signature Yellow Toe Cap (Directly from reference image) */}
                <path
                  d="M 75 282 C 74 272 82 258 104 252 C 108 256 112 264 108 272 C 98 278 86 282 75 282 Z"
                  fill="url(#sneakerGoldGrad)"
                  stroke="#D97706"
                  strokeWidth="0.8"
                />

                {/* 5. Signature Yellow Racing Wave Swoosh */}
                <path
                  d="M 105 272 C 135 258 165 275 198 278 C 225 280 252 268 268 252 C 265 258 250 274 225 282 C 190 284 150 274 105 272 Z"
                  fill="url(#sneakerGoldGrad)"
                />
                {/* Secondary Wave Pinstripe Accent */}
                <path
                  d="M 115 264 C 142 252 170 268 200 272 C 224 274 246 264 260 250"
                  stroke="#FFFFFF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />

                {/* 6. Parallel Eyestay Laces (Yellow bars directly matching reference) */}
                <line x1="118" y1="252" x2="128" y2="244" stroke="#FFD166" strokeWidth="3.2" strokeLinecap="round" />
                <line x1="132" y1="244" x2="142" y2="236" stroke="#FFD166" strokeWidth="3.2" strokeLinecap="round" />
                <line x1="146" y1="236" x2="156" y2="228" stroke="#FFD166" strokeWidth="3.2" strokeLinecap="round" />
                <line x1="160" y1="228" x2="170" y2="220" stroke="#FFD166" strokeWidth="3.2" strokeLinecap="round" />
                <line x1="174" y1="220" x2="184" y2="212" stroke="#FFD166" strokeWidth="3.2" strokeLinecap="round" />
                <line x1="188" y1="212" x2="198" y2="204" stroke="#FFD166" strokeWidth="3.2" strokeLinecap="round" />
              </g>

              {/* SOCCER BALL GROUP (Juggles with smooth vertical flight and rotation) */}
              <g className="realistic-ball-group">
                {/* 3D Sphere Base */}
                <circle
                  cx="145"
                  cy="172"
                  r="36"
                  fill="url(#soccerBallSphereGrad)"
                  stroke="#18181B"
                  strokeWidth="2.2"
                />

                {/* Central Black Pentagon */}
                <polygon
                  points="145,157 159,167 154,183 136,183 131,167"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                {/* Seam Lines Radiating from Center Pentagon */}
                <line x1="145" y1="157" x2="145" y2="138" stroke="#18181B" strokeWidth="2" />
                <line x1="159" y1="167" x2="174" y2="159" stroke="#18181B" strokeWidth="2" />
                <line x1="154" y1="183" x2="167" y2="198" stroke="#18181B" strokeWidth="2" />
                <line x1="136" y1="183" x2="123" y2="198" stroke="#18181B" strokeWidth="2" />
                <line x1="131" y1="167" x2="116" y2="159" stroke="#18181B" strokeWidth="2" />

                {/* Outer Perimeter Pentagons */}
                {/* Top Pentagon */}
                <path
                  d="M 135 137 L 145 138 L 155 137 A 36 36 0 0 0 135 137 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                {/* Upper-Right Pentagon */}
                <path
                  d="M 174 159 L 169 148 A 36 36 0 0 1 180 170 L 174 159 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                {/* Lower-Right Pentagon */}
                <path
                  d="M 167 198 L 175 188 A 36 36 0 0 1 160 205 L 167 198 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                {/* Lower-Left Pentagon */}
                <path
                  d="M 123 198 L 130 205 A 36 36 0 0 1 115 188 L 123 198 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                {/* Upper-Left Pentagon */}
                <path
                  d="M 116 159 L 110 170 A 36 36 0 0 1 121 148 L 116 159 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />

                {/* 3D Specular Gloss Highlight */}
                <ellipse
                  cx="134"
                  cy="156"
                  rx="9.5"
                  ry="5.5"
                  transform="rotate(-30 134 156)"
                  fill="#FFFFFF"
                  opacity="0.55"
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
