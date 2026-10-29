import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { scrollToSection } from '../../utils/navigation.js';

// Multi-Sport Cinema Ribbon Photos (Fresh Action Shots)
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

// Actual Sportsaal Services (What we provide, NOT image/sport names)
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

export default function Hero() {
  const wrapperRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Split mechanics:
  // As user scrolls from 0 -> 1:
  // - Images 1-4 slide left and upward
  // - Images 5-8 slide right and downward
  // - Center portal expands and displays athletic scrolling animation
  // - Bottom marquee and CTA fade out gracefully
  const p = scrollProgress;
  const splitP = Math.min(1, p * 1.2); // reaches full split slightly before exit

  // Distance in viewport width units (vw) and pixels
  const splitX = splitP * 35; // 0vw -> 35vw
  const splitY = splitP * 50; // 0px -> 50px
  const splitRotate = splitP * 2.8; // subtle fan angle

  // Portal fade & scale
  let portalOpacity = 0;
  let portalScale = 0.8;
  if (p > 0.08 && p <= 0.78) {
    portalOpacity = Math.min(1, (p - 0.08) / 0.22);
    portalScale = 0.8 + Math.min(0.28, (p - 0.08) * 0.4);
  } else if (p > 0.78) {
    portalOpacity = Math.max(0, 1 - (p - 0.78) / 0.22);
    portalScale = 1.08 + (p - 0.78) * 0.15;
  }

  // Bottom cluster (Marquee + Button) fade out during split
  const bottomOpacity = Math.max(0, 1 - p * 2.6);
  const bottomTranslateY = p * 45;

  return (
    <section className="hero-scroll-wrapper" id="hero" ref={wrapperRef}>
      <div className="hero-sticky-frame">
        {/* Ambient Radial Athletic Lighting */}
        <div className="hero-ambient-glow" aria-hidden="true"></div>
        <div className="hero-ambient-red" aria-hidden="true"></div>

        {/* 1. Slanted Cinema Photo Strip with 4 & 4 Interactive Split */}
        <div className="hero-slanted-viewport">
          <div className="hero-slanted-track">
            {/* Left Cluster: First 4 Photos (Cricket, Football Action, Badminton, Arena) */}
            <div 
              className="hero-split-cluster hero-split-left"
              style={{
                transform: `translate3d(-${splitX}vw, -${splitY}px, 0) rotate(-${splitRotate}deg)`,
                opacity: Math.max(0.35, 1 - splitP * 0.35)
              }}
            >
              {ribbonPhotos.slice(0, 4).map((item) => (
                <div key={item.id} className="hero-photo-frame">
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="hero-photo-img" 
                    loading="eager" 
                  />
                </div>
              ))}
            </div>

            {/* Center Animated Scroll Portal (Revealed between the split halves) */}
            <div 
              className="hero-center-portal"
              style={{
                opacity: portalOpacity,
                transform: `translate(-50%, -50%) scale(${portalScale})`,
                pointerEvents: p > 0.15 && p < 0.85 ? 'auto' : 'none'
              }}
              onClick={() => scrollToSection('#about')}
            >
              <div className="portal-ring ring-outer" aria-hidden="true"></div>
              <div className="portal-ring ring-middle" aria-hidden="true"></div>
              <div className="portal-ring ring-inner" aria-hidden="true"></div>
              <div className="portal-glow-core" aria-hidden="true"></div>

              <div className="portal-card-content">
                <div className="portal-tag">
                  <span className="portal-live-dot"></span>
                  <span>SPORTSAAL ECOSYSTEM</span>
                </div>
                <h3 className="portal-headline">
                  WHERE PASSION <br />
                  <span className="portal-accent">MEETS PRECISION</span>
                </h3>
                <div className="portal-scroll-prompt">
                  <span className="prompt-text">SCROLL TO EXPLORE ABOUT</span>
                  <div className="prompt-arrow-container">
                    <span className="prompt-arrow">↓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cluster: Last 4 Photos (Tennis, Goal Celebration, Dunk, Sprint) */}
            <div 
              className="hero-split-cluster hero-split-right"
              style={{
                transform: `translate3d(${splitX}vw, ${splitY}px, 0) rotate(${splitRotate}deg)`,
                opacity: Math.max(0.35, 1 - splitP * 0.35)
              }}
            >
              {ribbonPhotos.slice(4, 8).map((item) => (
                <div key={item.id} className="hero-photo-frame">
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="hero-photo-img" 
                    loading="eager" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Bottom Cluster: Giant Running Marquee Ticker + Primary Action CTA */}
        <div 
          className="hero-bottom-cluster"
          style={{
            opacity: bottomOpacity,
            transform: `translate3d(0, ${bottomTranslateY}px, 0)`,
            pointerEvents: p > 0.35 ? 'none' : 'auto'
          }}
        >
          {/* Running Marquee Ticker */}
          <div className="hero-marquee-wrapper" aria-hidden="true">
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
          <div className="hero-action-container">
            <a 
              href="#about" 
              className="hero-pill-cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#about');
              }}
            >
              <span>EXPLORE SPORTSAAL</span>
              <span className="pill-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

