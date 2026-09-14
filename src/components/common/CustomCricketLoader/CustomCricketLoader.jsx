import React, { useState, useEffect } from 'react';
import './CustomCricketLoader.css';

/**
 * CustomCricketLoader
 *
 * Premium Split-Screen Loading Screen for Sportsaal:
 * - Top 50%: Solid Black (#000000)
 * - Bottom 50%: Solid White (#FFFFFF)
 * - Cricket bat and ball animation positioned exactly at the central horizon seam.
 * - Perfected physical contact: zero gap, zero overlap, realistic squash & stretch
 *   with synchronized bat recoil.
 * - Non-blocking: allows background page, components, images, and fonts to load
 *   normally while serving as a sleek visual overlay.
 * - Monitors document.fonts.ready (Anton, Barlow, Archivo) to guarantee zero FOUT,
 *   then smoothly fades out.
 */
export default function CustomCricketLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Prevent background scroll while loader is active
    document.body.classList.add('sportsaal-loader-active');

    const startTime = performance.now();
    // Allow at least ~1.4s so the user can enjoy the smooth bouncing animation
    const minDisplayDuration = 1200;
    // Safety fallback so the screen never gets stuck if network stalls
    const safetyTimeoutLimit = 3600;

    const dismissLoader = () => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(0, minDisplayDuration - elapsed);

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLoading(false);
          document.body.classList.remove('sportsaal-loader-active');
        }, 550); // Matches CSS fade-out duration
      }, remainingTime);
    };

    // Listen for font loading without blocking page resource downloads
    const fontPromises = [];
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      fontPromises.push(document.fonts.ready);
      if (document.fonts.load) {
        fontPromises.push(document.fonts.load('400 16px "Anton"'));
        fontPromises.push(document.fonts.load('400 16px "Barlow"'));
        fontPromises.push(document.fonts.load('400 16px "Archivo"'));
      }
    }

    // Window load check
    if (typeof document !== 'undefined' && document.readyState !== 'complete') {
      fontPromises.push(
        new Promise((resolve) => {
          window.addEventListener('load', resolve, { once: true });
        })
      );
    }

    const fallbackTimer = setTimeout(dismissLoader, safetyTimeoutLimit);

    Promise.allSettled(fontPromises).then(() => {
      clearTimeout(fallbackTimer);
      dismissLoader();
    });

    return () => {
      clearTimeout(fallbackTimer);
      document.body.classList.remove('sportsaal-loader-active');
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <aside 
      className={`sportsaal-split-loader ${isFadingOut ? 'loader-fade-out' : ''}`}
      aria-label="Loading Sportsaal website"
      role="progressbar"
      aria-live="polite"
    >
      {/* Top 50% Solid Black Half */}
      <div className="loader-half-top" aria-hidden="true">
        <div className="loader-top-ambient-glow" />
      </div>

      {/* Bottom 50% Solid White Half */}
      <div className="loader-half-bottom" aria-hidden="true" />

      {/* Central Interactive Horizon Stage */}
      <div className="loader-center-stage">
        {/* SVG Animation Canvas */}
        <div className="loader-canvas-container" aria-hidden="true">
          <svg 
            viewBox="0 0 400 300" 
            className="cricket-stage-svg" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Cricket Ball 3D Radial Sphere Shader */}
              <radialGradient id="cricketBallShader" cx="35%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#FF5C62" />
                <stop offset="32%" stopColor="#EF1C24" />
                <stop offset="72%" stopColor="#C40E15" />
                <stop offset="100%" stopColor="#78060A" />
              </radialGradient>

              {/* Dynamic Impact Glow on Contact */}
              <radialGradient id="impactGlowShader" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239, 28, 36, 0.9)" />
                <stop offset="50%" stopColor="rgba(239, 28, 36, 0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Contact Shadow on Bat Top Surface */}
              <radialGradient id="batContactShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0.85)" />
                <stop offset="65%" stopColor="rgba(0, 0, 0, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Bat 3D Ambient Soft Drop Shadow */}
              <radialGradient id="bat3DDropShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0.45)" />
                <stop offset="65%" stopColor="rgba(0, 0, 0, 0.12)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Bat 3D Willow Face Gradient (Light from top-left) */}
              <linearGradient id="bladeWoodShade3D" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="18%" stopColor="#F8F4EB" />
                <stop offset="55%" stopColor="#EBE3D3" />
                <stop offset="85%" stopColor="#D8CFBE" />
                <stop offset="100%" stopColor="#B3AA98" />
              </linearGradient>

              {/* Bat 3D Top Hitting Bevel (Bright light reflection on top facet) */}
              <linearGradient id="bladeTopFacet3D" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FAF7F0" />
                <stop offset="100%" stopColor="#ECE4D6" />
              </linearGradient>

              {/* Bat 3D Bottom Edge & Under-Bevel (Depth / Thickness) */}
              <linearGradient id="bladeBottomBevel3D" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9C9482" />
                <stop offset="50%" stopColor="#787161" />
                <stop offset="100%" stopColor="#4A453A" />
              </linearGradient>

              {/* Bat 3D Sweet Spot Longitudinal Sheen */}
              <linearGradient id="bladeSpineSheen3D" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                <stop offset="30%" stopColor="rgba(255, 255, 255, 0.55)" />
                <stop offset="65%" stopColor="rgba(255, 255, 255, 0.35)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>

              {/* Bat 3D Rounded Toe Shader */}
              <radialGradient id="bladeToeShade3D" cx="42%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#F0E8DC" />
                <stop offset="80%" stopColor="#C2BAA9" />
                <stop offset="100%" stopColor="#736A5B" />
              </radialGradient>

              {/* Handle 3D Cylindrical Rubber Shader */}
              <linearGradient id="handleCylinder3D" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E1E1E" />
                <stop offset="22%" stopColor="#4E4E4E" />
                <stop offset="48%" stopColor="#2E2E2E" />
                <stop offset="80%" stopColor="#161616" />
                <stop offset="100%" stopColor="#080808" />
              </linearGradient>

              {/* Handle 3D Cane Splice Collar */}
              <linearGradient id="handleSplice3D" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF666C" />
                <stop offset="35%" stopColor="#EF1C24" />
                <stop offset="80%" stopColor="#A80A10" />
                <stop offset="100%" stopColor="#660307" />
              </linearGradient>

              {/* Handle 3D End Knob (Radial 3D Sphere/Capsule) */}
              <radialGradient id="handleKnob3D" cx="35%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#FF7075" />
                <stop offset="40%" stopColor="#EF1C24" />
                <stop offset="78%" stopColor="#B30C13" />
                <stop offset="100%" stopColor="#5E0407" />
              </radialGradient>

              {/* 3D Embossed Red Decal Stripe */}
              <linearGradient id="embossedRedStripe3D" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B70" />
                <stop offset="32%" stopColor="#EF1C24" />
                <stop offset="75%" stopColor="#C40E15" />
                <stop offset="100%" stopColor="#78060A" />
              </linearGradient>
            </defs>

            {/* BAT ASSEMBLY (Synchronized Recoil Dip & Tap on impact) */}
            <g className="cricket-bat-assembly">
              {/* Soft Floating 3D Ambient Drop Shadow Beneath the Bat */}
              <ellipse 
                cx="195" 
                cy="173" 
                rx="148" 
                ry="6" 
                fill="url(#bat3DDropShadow)" 
                opacity="0.75" 
              />

              {/* Dynamic Contact Shadow on Bat Face (tightens & darkens on contact) */}
              <ellipse 
                className="bat-face-shadow" 
                cx="175" 
                cy="152.5" 
                rx="18" 
                ry="4.5" 
                fill="url(#batContactShadow)" 
              />

              {/* Expanding Impact Shockwave Ring */}
              <ellipse 
                className="bat-impact-ring" 
                cx="175" 
                cy="152" 
                rx="22" 
                ry="5.5" 
                fill="url(#impactGlowShader)" 
              />

              {/* 3D BOTTOM BEVEL & EDGE THICKNESS (Gives bat palpable physical depth) */}
              <path 
                d="M 64 166.5 L 248 166.5 C 254 166.5 258 168 262 170.5 L 260 172 C 255 172 250 172 64 172 C 55 172 47 169 47 165 C 50 166.5 56 166.5 64 166.5 Z" 
                fill="url(#bladeBottomBevel3D)" 
                stroke="#2B2720" 
                strokeWidth="1" 
              />

              {/* 3D MAIN BLADE FACE (English Willow with curved spine volume) */}
              <path 
                d="M 64 152 L 250 152 C 256 152 260 154.5 264 157 L 264 164 C 260 166.5 256 168.5 250 168.5 L 64 168.5 C 56 168.5 50 165 50 160.5 C 50 156 56 152 64 152 Z" 
                fill="url(#bladeWoodShade3D)" 
                stroke="#1A1A1A" 
                strokeWidth="2.6" 
                strokeLinejoin="round" 
              />

              {/* 3D TOP HITTING BEVEL / RIM (Illuminated top facet at Y=152 where ball bounces) */}
              <path 
                d="M 64 152 L 250 152 C 254 152 258 153.2 262 154.8 L 258 155.8 C 254 154.6 250 154 246 154 L 66 154 C 58 154 53 156.2 51 158.5 C 50.5 156 56 152 64 152 Z" 
                fill="url(#bladeTopFacet3D)" 
                opacity="0.95" 
              />

              {/* 3D ROUNDED TOE SHADING (Curved left end cap) */}
              <path 
                d="M 64 152 C 55 152 49 155.5 49 160.5 C 49 165 55 168.5 64 168.5 C 58 168 53 164.5 53 160.5 C 53 156 58 152.5 64 152 Z" 
                fill="url(#bladeToeShade3D)" 
              />

              {/* 3D SWEET SPOT SPECULAR SHEEN (Glossy light beam across sweet spot) */}
              <rect 
                x="80" 
                y="156.5" 
                width="155" 
                height="4.5" 
                rx="2" 
                fill="url(#bladeSpineSheen3D)" 
              />

              {/* Realistic Willow Grain Strands */}
              <line x1="72" y1="156" x2="242" y2="156" stroke="#D1C9B8" strokeWidth="0.8" strokeDasharray="45 8 30 12" opacity="0.65" />
              <line x1="68" y1="161.5" x2="246" y2="161.5" stroke="#BFB6A4" strokeWidth="0.8" strokeDasharray="35 15 50 10" opacity="0.55" />

              {/* 3D EMBOSSED RED SIGNATURE STRIPE */}
              {/* Drop Shadow of Stripe */}
              <path 
                d="M 66 163.5 L 246 163.5 C 251 163.5 255 165 258 166.5 L 254 168 L 64 168 C 58 168 54 166 54 164.5 C 57 163.8 62 163.5 66 163.5 Z" 
                fill="#4D0407" 
                opacity="0.6" 
              />
              {/* Raised 3D Stripe Body */}
              <path 
                d="M 66 162 L 246 162 C 250.5 162 254.5 163.8 257.5 165.5 L 253.5 167 L 64 167 C 58 167 54 165 54 163.5 C 57 162.8 62 162 66 162 Z" 
                fill="url(#embossedRedStripe3D)" 
                stroke="#6B0509" 
                strokeWidth="0.8" 
              />
              {/* Specular Top Edge on Red Stripe */}
              <line x1="67" y1="162.4" x2="246" y2="162.4" stroke="#FFA3A7" strokeWidth="0.8" opacity="0.9" />

              {/* 3D HANDLE SPLICE (Traditional Cane V-Splice into Willow) */}
              <polygon points="248,157 263,155 263,165 248,163" fill="#D3C9B8" stroke="#1A1A1A" strokeWidth="1.2" />
              <rect 
                x="263" 
                y="155.5" 
                width="7" 
                height="9" 
                rx="1.5" 
                fill="url(#handleSplice3D)" 
                stroke="#111111" 
                strokeWidth="1.8" 
              />
              <line x1="264" y1="156.5" x2="269" y2="156.5" stroke="#FF999D" strokeWidth="1" />

              {/* 3D CYLINDRICAL RUBBER HANDLE */}
              <rect 
                x="270" 
                y="155.5" 
                width="68" 
                height="9" 
                rx="4.5" 
                fill="url(#handleCylinder3D)" 
                stroke="#0A0A0A" 
                strokeWidth="2.2" 
              />

              {/* Cylindrical Highlight Line along Handle Center */}
              <line 
                x1="272" 
                y1="158" 
                x2="336" 
                y2="158" 
                stroke="rgba(255, 255, 255, 0.28)" 
                strokeWidth="1.6" 
                strokeLinecap="round" 
              />

              {/* 3D TACTILE RUBBER GRIP RIBS (Light & Shadow Pair for each ring) */}
              {[278, 286, 294, 302, 310, 318, 326, 334].map((x) => (
                <g key={x}>
                  <line x1={x} y1="156" x2={x} y2="164" stroke="#5E5E5E" strokeWidth="1.2" />
                  <line x1={x + 1.2} y1="156" x2={x + 1.2} y2="164" stroke="#0A0A0A" strokeWidth="1.2" />
                </g>
              ))}

              {/* 3D ROUNDED HANDLE END KNOB */}
              <ellipse 
                cx="342" 
                cy="160" 
                rx="6" 
                ry="5" 
                fill="url(#handleKnob3D)" 
                stroke="#0A0A0A" 
                strokeWidth="2" 
              />
              <ellipse 
                cx="340.5" 
                cy="158.5" 
                rx="2.2" 
                ry="1.4" 
                fill="#FFA3A7" 
                opacity="0.85" 
              />
            </g>

            {/* BALL ASSEMBLY (Synchronized Bouncing Arc, Seam Spin & Elastic Squash) */}
            <g className="cricket-ball-parent">
              <g className="cricket-ball-squash-box">
                {/* 3D Red Leather Cricket Ball Sphere */}
                <circle 
                  cx="175" 
                  cy="132" 
                  r="20" 
                  fill="url(#cricketBallShader)" 
                />

                {/* Stitched White Curved Seam Line */}
                <path 
                  className="cricket-ball-seam" 
                  d="M 160 119 C 172 131, 182 137, 190 145" 
                  stroke="#FFFFFF" 
                  strokeWidth="2.4" 
                  strokeDasharray="3 1.5" 
                  strokeLinecap="round" 
                  opacity="0.95" 
                />

                {/* Specular White Gloss Crescent */}
                <ellipse 
                  cx="168" 
                  cy="124" 
                  rx="7" 
                  ry="4" 
                  transform="rotate(-28, 168, 124)" 
                  fill="#FFFFFF" 
                  opacity="0.6" 
                />

                {/* Crisp Dark Outer Edge */}
                <circle 
                  cx="175" 
                  cy="132" 
                  r="20" 
                  stroke="#0A0A0A" 
                  strokeWidth="2.2" 
                  fill="none" 
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Status Text on the Bottom White Half */}
        <div className="loader-status-container">
          <p className="loader-status-text">
            LOADING
            <span className="loader-dots">
              <span className="dot dot-1">.</span>
              <span className="dot dot-2">.</span>
              <span className="dot dot-3">.</span>
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}
