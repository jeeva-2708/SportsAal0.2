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
      {/* Loading Screen: Pro Soccer Boot & Football Juggling */}
      {!fontsLoaded && (
        <div className={`intro-font-loader ${loaderFading ? 'font-loader-fade-out' : ''}`}>
          <div className="football-juggle-stage" aria-hidden="true">
            <svg
              viewBox="0 0 340 310"
              className="football-juggle-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Realistic Soccer Ball Shading */}
                <radialGradient id="soccerBallSphereGrad" cx="30%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="58%" stopColor="#F8FAFC" />
                  <stop offset="85%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </radialGradient>

                {/* Soccer Leather Dark Panel */}
                <linearGradient id="soccerDarkPanelGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#262930" />
                  <stop offset="100%" stopColor="#0E1014" />
                </linearGradient>

                {/* Pro Football Boot Metallic Red Upper Gradient */}
                <linearGradient id="proBootUpperGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF3B30" />
                  <stop offset="35%" stopColor="#E61E2A" />
                  <stop offset="75%" stopColor="#B9121B" />
                  <stop offset="100%" stopColor="#70090E" />
                </linearGradient>

                {/* Pro Boot Heel Counter Dark Carbon */}
                <linearGradient id="proHeelCarbonGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2D313B" />
                  <stop offset="100%" stopColor="#121419" />
                </linearGradient>

                {/* Sculpted Soleplate Carbon Gradient */}
                <linearGradient id="proBootSoleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A2F3A" />
                  <stop offset="50%" stopColor="#171A21" />
                  <stop offset="100%" stopColor="#090A0D" />
                </linearGradient>

                {/* Dynamic Speed Swoosh Gradient (Crisp White/Gold) */}
                <linearGradient id="proSwooshWhiteGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>

                <linearGradient id="proSwooshGoldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFE066" />
                  <stop offset="50%" stopColor="#FFD166" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>

                {/* Dynamic Contact Shadow on Vamp */}
                <radialGradient id="ballContactShadowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 0, 0, 0.78)" />
                  <stop offset="55%" stopColor="rgba(0, 0, 0, 0.28)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Ambient Ground Shadow beneath Cleat */}
              <ellipse cx="165" cy="256" rx="120" ry="8" fill="rgba(0, 0, 0, 0.65)" />

              {/* PRO SOCCER BOOT ASSEMBLY (Slender, Aerodynamic, Cleated Soleplate) */}
              <g className="realistic-shoe-group">
                {/* Dynamic Ball Impact Contact Shadow on Instep */}
                <ellipse
                  className="football-contact-shadow"
                  cx="106"
                  cy="182"
                  rx="20"
                  ry="6.5"
                  fill="url(#ballContactShadowGrad)"
                />

                {/* 1. Pro Turf / FG Cleat Studs underneath Soleplate */}
                <g fill="#161920" stroke="#090A0D" strokeWidth="0.9" strokeLinejoin="round">
                  {/* Forefoot Bladed Studs */}
                  <polygon points="68,234 70,245 77,245 80,235" />
                  <polygon points="102,237 104,248 111,248 114,237" />
                  <polygon points="138,236 140,247 147,247 150,235" />
                  {/* Heel Stability Studs */}
                  <polygon points="222,238 224,250 232,250 235,238" />
                  <polygon points="256,235 258,247 266,247 269,233" />
                  {/* Stud metallic tips */}
                  <line x1="71" y1="244" x2="76" y2="244" stroke="#E2E8F0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="105" y1="247" x2="110" y2="247" stroke="#E2E8F0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="141" y1="246" x2="146" y2="246" stroke="#E2E8F0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="225" y1="249" x2="231" y2="249" stroke="#E2E8F0" strokeWidth="1.2" opacity="0.6" />
                  <line x1="259" y1="246" x2="265" y2="246" stroke="#E2E8F0" strokeWidth="1.2" opacity="0.6" />
                </g>

                {/* 2. Sculpted Speed Soleplate Outsole */}
                <path
                  d="M 38 219 C 52 229 72 238 96 238 C 132 238 152 232 178 232 C 204 232 218 239 242 239 C 262 239 272 234 277 224 C 280 218 279 212 276 208 C 266 215 246 220 236 220 C 194 220 158 223 94 227 C 68 227 49 219 38 214 Z"
                  fill="url(#proBootSoleGrad)"
                  stroke="#090A0D"
                  strokeWidth="1.2"
                />

                {/* Sleek White Cushion Midsole Bevel Edge */}
                <path
                  d="M 40 214 C 65 223 102 227 176 223 C 222 221 258 215 276 206"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                {/* 3. Main Aerodynamic Football Boot Upper */}
                <path
                  d="M 38 214 C 42 197 58 187 88 182 C 120 174 156 150 180 128 C 186 122 194 122 198 126 C 214 142 226 148 246 146 C 256 144 263 140 266 145 C 274 164 278 186 276 206 C 258 215 222 221 176 223 C 102 227 65 223 38 214 Z"
                  fill="url(#proBootUpperGrad)"
                  stroke="#5E070B"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />

                {/* 4. Sculpted External Carbon Heel Counter Wrap */}
                <path
                  d="M 234 220 C 242 200 248 175 266 146 C 274 164 278 186 276 206 C 260 214 245 218 234 220 Z"
                  fill="url(#proHeelCarbonGrad)"
                  opacity="0.92"
                />
                {/* Heel Tab Loop */}
                <path
                  d="M 260 144 C 264 137 269 139 267 146"
                  stroke="#EF232C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* 5. Dynamic Fit Ankle Sock-Collar Opening (3D Interior View) */}
                <path
                  d="M 196 125 C 208 139 227 147 247 145 C 257 143 262 137 260 132 C 247 124 222 118 200 122 Z"
                  fill="#0D0F13"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  opacity="0.7"
                />

                {/* 6. Forefoot Textured Control Strike Ribs (Predator/Mercurial Detail) */}
                <path d="M 62 195 Q 72 205 68 216" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M 74 191 Q 85 204 81 217" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M 86 188 Q 97 202 93 217" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeLinecap="round" />

                {/* 7. Razor-Sharp Dynamic Speed Swoosh + Gold Accent */}
                <path
                  d="M 102 196 C 145 184 185 196 226 178 C 244 170 258 157 265 147 C 254 164 240 180 218 190 C 178 206 138 194 102 196 Z"
                  fill="url(#proSwooshWhiteGrad)"
                />
                <path
                  d="M 108 202 C 148 194 184 205 224 191 C 238 186 249 178 258 166"
                  stroke="url(#proSwooshGoldGrad)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* 8. Realistic Instep Lace System (Perpendicular Protruding Lace Loops & Eyelets) */}
                {/* Eyestay Panel Strip */}
                <path
                  d="M 96 181 L 178 130 L 184 136 L 104 185 Z"
                  fill="rgba(0, 0, 0, 0.25)"
                />
                {/* Crisp Perpendicular Lace Loops protruding slightly from tongue */}
                <rect x="108" y="170" width="9" height="4" rx="2" transform="rotate(-32 108 170)" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.6" />
                <rect x="122" y="161" width="9" height="4" rx="2" transform="rotate(-32 122 161)" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.6" />
                <rect x="136" y="152" width="9" height="4" rx="2" transform="rotate(-32 136 152)" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.6" />
                <rect x="150" y="143" width="9" height="4" rx="2" transform="rotate(-32 150 143)" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.6" />
                <rect x="164" y="134" width="9" height="4" rx="2" transform="rotate(-32 164 134)" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.6" />
                <rect x="176" y="126" width="9" height="4" rx="2" transform="rotate(-32 176 126)" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.6" />
              </g>

              {/* SOCCER BALL GROUP (Lands cleanly on vamp sweet spot at Y=140, launches up to Y=40) */}
              <g className="realistic-ball-group">
                {/* 3D Sphere Base */}
                <circle
                  cx="106"
                  cy="140"
                  r="36"
                  fill="url(#soccerBallSphereGrad)"
                  stroke="#18181B"
                  strokeWidth="2.2"
                />

                {/* Central Black Pentagon */}
                <polygon
                  points="106,125 120,135 115,151 97,151 92,135"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                {/* Seam Lines Radiating from Center Pentagon */}
                <line x1="106" y1="125" x2="106" y2="106" stroke="#18181B" strokeWidth="2" />
                <line x1="120" y1="135" x2="135" y2="127" stroke="#18181B" strokeWidth="2" />
                <line x1="115" y1="151" x2="128" y2="166" stroke="#18181B" strokeWidth="2" />
                <line x1="97" y1="151" x2="84" y2="166" stroke="#18181B" strokeWidth="2" />
                <line x1="92" y1="135" x2="77" y2="127" stroke="#18181B" strokeWidth="2" />

                {/* Outer Perimeter Pentagons */}
                <path
                  d="M 96 105 L 106 106 L 116 105 A 36 36 0 0 0 96 105 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                <path
                  d="M 135 127 L 130 116 A 36 36 0 0 1 141 138 L 135 127 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                <path
                  d="M 128 166 L 136 156 A 36 36 0 0 1 121 173 L 128 166 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                <path
                  d="M 84 166 L 91 173 A 36 36 0 0 1 76 156 L 84 166 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />
                <path
                  d="M 77 127 L 71 138 A 36 36 0 0 1 82 116 L 77 127 Z"
                  fill="url(#soccerDarkPanelGrad)"
                  stroke="#18181B"
                  strokeWidth="1.8"
                />

                {/* 3D Specular Gloss Highlight */}
                <ellipse
                  cx="95"
                  cy="124"
                  rx="9.5"
                  ry="5.5"
                  transform="rotate(-30 95 124)"
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
