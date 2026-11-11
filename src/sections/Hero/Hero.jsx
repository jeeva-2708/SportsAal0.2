import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { scrollToSection } from '../../utils/navigation.js';

// Multi-Sport Cinema Ribbon Photos
import cricketBatsmanImg from '../../assets/images/hero-ribbon/cricket-batsman.jpg';
import footballActionImg from '../../assets/images/hero-ribbon/football-action.jpg';
import badmintonActionImg from '../../assets/images/hero-ribbon/badminton-action.jpg';
import cricketStadiumImg from '../../assets/images/hero-ribbon/cricket-stadium.jpg';
import tennisActionImg from '../../assets/images/hero-ribbon/tennis-action.jpg';
import footballCelebrateImg from '../../assets/images/hero-ribbon/football-celebrate.jpg';
import basketballDunkImg from '../../assets/images/hero-ribbon/basketball-dunk.jpg';
import athleteSprintImg from '../../assets/images/hero-ribbon/athlete-sprint.jpg';

const ribbonPhotos = [
  { id: 'photo-1', src: cricketBatsmanImg, alt: 'Cricket Batting Action' },
  { id: 'photo-2', src: footballActionImg, alt: 'Football Turf Match' },
  { id: 'photo-3', src: badmintonActionImg, alt: 'Badminton Smash' },
  { id: 'photo-4', src: cricketStadiumImg, alt: 'Sports Arena Infrastructure' },
  { id: 'photo-5', src: tennisActionImg, alt: 'Tennis Court Rally' },
  { id: 'photo-6', src: footballCelebrateImg, alt: 'Goal Celebration Action' },
  { id: 'photo-7', src: basketballDunkImg, alt: 'Basketball Slam Dunk' },
  { id: 'photo-8', src: athleteSprintImg, alt: 'Athletic Conditioning' },
];

const sportsaalServices = [
  'VENUE MANAGEMENT',
  'CRICKET TOURNAMENTS',
  'PROFESSIONAL COACHING',
  'EVENT MANAGEMENT',
  'SPORTS TECHNOLOGY',
  'LIVE STREAMING',
  'GROUND BOOKINGS',
  'SPORTSWEAR',
];

export default function Hero({ introComplete = false }) {
  const wrapperRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trainSettled, setTrainSettled] = useState(() => introComplete);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
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

  // If user scrolls at all, instantly settle train so scroll tracking takes full control
  useEffect(() => {
    if (scrollProgress > 0 && !trainSettled) {
      setTrainSettled(true);
    }
  }, [scrollProgress, trainSettled]);

  // Smooth pixel-by-pixel scroll tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!wrapperRef.current) {
            ticking = false;
            return;
          }
          const rect = wrapperRef.current.getBoundingClientRect();
          const totalDistance = wrapperRef.current.offsetHeight - window.innerHeight;
          if (totalDistance <= 0) {
            setScrollProgress(0);
            ticking = false;
            return;
          }
          const scrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const p = scrollProgress;

  // --------------------------------------------------------------------------
  // Continuous Smooth Interpolation Phases:
  // Phase 1 (0.0 -> 0.36): Gather & Stack on Right (Only during scroll!)
  // Phase 2 (0.36 -> 0.72): Card 0 Deals to Left, while Stack fades to 0!
  // Phase 3 (0.55 -> 1.0): New Redesigned About Section reveals on the right
  // --------------------------------------------------------------------------

  // Ease function for buttery-smooth physics
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const pStackRaw = Math.min(1, p / 0.36);
  const pStack = easeInOut(pStackRaw);

  const pDealRaw = Math.max(0, Math.min(1, (p - 0.36) / 0.36));
  const pDeal = easeInOut(pDealRaw);

  const pAboutRaw = Math.max(0, Math.min(1, (p - 0.55) / 0.40));
  const pAbout = easeInOut(pAboutRaw);

  // Marquee & CTA button fade out during Phase 1
  const heroBottomOpacity = Math.max(0, 1 - p * 3.8);
  const heroBottomTranslateY = p * 60;

  // Track slant straightens as cards gather
  const trackRotation = -2.8 * (1 - pStack);

  return (
    <section className="hero-scroll-wrapper" id="hero" ref={wrapperRef}>
      {/* Anchor for Header/Footer 'ABOUT' Link */}
      <div id="about" className="about-scroll-anchor" aria-hidden="true" />

      <div className="hero-sticky-frame">
        {/* ==================================================================
            1. MULTI-SPORT CARDS STAGE
            - Initial State (p = 0): All 8 cards spread out across screen in ribbon (NEVER stacked)
            - During Scroll (p > 0): Gathers dynamically into right stack
            - At About (p > 0.5): Card 0 docks on left (NO TEXT ON IMAGE), remaining stack fades to 0!
            ================================================================== */}
        <div
          className="hero-cards-stage-viewport"
          style={{
            transform: `rotate(${trackRotation}deg)`,
          }}
        >
          <div className="hero-cards-stage-track">
            {ribbonPhotos.map((item, idx) => {
              const isFeaturedCard = idx === 0;

              // Ribbon base X coordinate (cards are fully spaced across screen initially)
              const cardSpacing = isMobile ? 140 : Math.min(210, Math.max(160, viewportWidth * 0.135));
              const ribbonX = (idx - 3.5) * cardSpacing;

              // Right-side Stack target coordinates (only reached during scroll!)
              const stackBaseX = isMobile ? (viewportWidth * 0.08) : (viewportWidth * 0.24);
              const stackX = stackBaseX + (idx * (isMobile ? 6 : 9));
              const stackY = (idx * (isMobile ? 3 : 5)) - (isMobile ? 8 : 16);
              const stackRot = (idx - 3.5) * (isMobile ? 1.6 : 2.4);

              // Left-side Docked About position for Card 0 (Scales up into prominent poster)
              const aboutDockX = isMobile ? 0 : -(viewportWidth * 0.23);
              const aboutDockY = isMobile ? -(viewportHeight * 0.22) : 0;
              const aboutDockRot = isMobile ? 0 : -1.5;
              const aboutDockScale = isMobile ? 1.02 : 1.45;

              let currentX, currentY, currentRot, currentScale, currentOpacity;

              if (isFeaturedCard) {
                // Card 0: Ribbon -> Stack -> Glides across to Left Dock
                const midX = ribbonX + (stackX - ribbonX) * pStack;
                const midY = stackY * pStack;
                const midRot = stackRot * pStack;

                currentX = midX + (aboutDockX - stackX) * pDeal;
                currentY = midY + (aboutDockY - stackY) * pDeal;
                currentRot = midRot + (aboutDockRot - stackRot) * pDeal;
                currentScale = 1 + (aboutDockScale - 1) * pDeal;
                currentOpacity = 1; // Featured card stays fully visible
              } else {
                // Cards 1-7: Ribbon -> Stack on Right -> FADE OUT COMPLETELY so they disappear!
                currentX = ribbonX + (stackX - ribbonX) * pStack;
                currentY = stackY * pStack;
                currentRot = stackRot * pStack;
                currentScale = 1;
                // Disappears completely as Card 0 arrives on the left
                currentOpacity = Math.max(0, 1 - pDeal * 1.6);
              }

              // Z-Index: Card 0 stays in front
              const cardZIndex = isFeaturedCard ? 50 : (35 - idx);

              return (
                <div
                  key={item.id}
                  className={`hero-photo-frame dynamic-scroll-card ${
                    !introComplete 
                      ? 'train-waiting' 
                      : !trainSettled 
                        ? 'train-animating' 
                        : 'train-settled'
                  } ${isFeaturedCard && pDeal > 0.4 ? 'is-docked-about-card' : ''}`}
                  style={{
                    transform: `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentRot}deg) scale(${currentScale})`,
                    opacity: currentOpacity,
                    zIndex: cardZIndex,
                    pointerEvents: currentOpacity <= 0.05 ? 'none' : 'auto',
                    visibility: currentOpacity <= 0.01 ? 'hidden' : 'visible',
                    animationDelay: introComplete && !trainSettled ? `${idx * 0.08}s` : undefined,
                    '--ribbon-target-x': `${ribbonX}px`,
                  }}
                >
                  {/* Pure pristine photography — ZERO text overlay as requested */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="hero-photo-img"
                    loading="eager"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            2. HERO BOTTOM CLUSTER (Marquee Ticker + Primary Action CTA)
            Fades away smoothly as user scrolls into the transition
            ================================================================== */}
        <div
          className="hero-bottom-cluster"
          style={{
            opacity: heroBottomOpacity,
            transform: `translate3d(0, ${heroBottomTranslateY}px, 0)`,
            pointerEvents: p > 0.1 ? 'none' : 'auto',
          }}
        >
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
              href="#about"
              className="hero-pill-cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#about');
              }}
            >
              <span>EXPLORE SPORTSAAL</span>
            </a>
          </div>
        </div>

        {/* ==================================================================
            3. NEW REDESIGNED ABOUT SECTION (Luxury Athletic Editorial Layout)
            Docked card sits on left; Stack on right has faded to zero!
            ================================================================== */}
        <div
          className="about-editorial-panel"
          style={{
            opacity: pAbout,
            transform: `translate3d(0, ${(1 - pAbout) * 35}px, 0)`,
            pointerEvents: pAbout > 0.6 ? 'auto' : 'none',
          }}
        >
          <div className="about-editorial-content">
            {/* Minimal Brand Tag */}
            <div className="about-v4-badge">
              <span className="v4-badge-pulse" />
              <span>SPORTSAAL ECOSYSTEM // PERFORMANCE PLATFORM</span>
            </div>

            {/* Powerful Display Headline */}
            <h2 className="about-v4-headline">
              WE BUILD THE STAGE. <br />
              <span className="v4-headline-accent">YOU BRING THE GAME.</span>
            </h2>

            {/* Crisp 2-Sentence Brand Mission */}
            <p className="about-v4-narrative">
              Sportsaal is India's premier integrated athletic ecosystem. We connect athletes, corporate clubs, and sporting venues through world-class ground operations, premier tournaments, BCCI-certified coaching, and broadcast-grade streaming technology.
            </p>

            {/* 4-Pillar Athletic Capability Matrix */}
            <div className="about-v4-matrix">
              <div className="v4-matrix-item">
                <span className="matrix-number">30+</span>
                <span className="matrix-label">VENUES MANAGED</span>
                <span className="matrix-sub">BCCI & FIFA Standard Grounds</span>
              </div>
              <div className="v4-matrix-item">
                <span className="matrix-number">120+</span>
                <span className="matrix-label">TOURNAMENTS HOSTED</span>
                <span className="matrix-sub">Corporate & Open Championships</span>
              </div>
              <div className="v4-matrix-item">
                <span className="matrix-number">15K+</span>
                <span className="matrix-label">ATHLETES EMPOWERED</span>
                <span className="matrix-sub">Active Coaching & Leagues</span>
              </div>
              <div className="v4-matrix-item">
                <span className="matrix-number">100%</span>
                <span className="matrix-label">FLOODLIT COVERAGE</span>
                <span className="matrix-sub">Broadcast-Grade Illumination</span>
              </div>
            </div>

            {/* Feature Highlight Tags */}
            <div className="about-v4-tags-row">
              <span className="v4-pillar-pill">PRO TURF ARENAS</span>
              <span className="v4-pillar-pill">LIVE 4K BROADCAST</span>
              <span className="v4-pillar-pill">BCCI CERTIFIED COACHES</span>
              <span className="v4-pillar-pill">LEAGUE MANAGEMENT</span>
            </div>

            {/* Action Buttons Row */}
            <div className="about-v4-action-row">
              <a
                href="#services"
                className="v4-services-btn"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#services');
                }}
              >
                <span>EXPLORE SERVICES</span>
                <span className="v4-arrow">→</span>
              </a>

              <a
                href="#contact"
                className="v4-ghost-btn"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
              >
                <span>BOOK A VENUE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
