import React, { useState, useEffect } from 'react';
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
  const [trainSettled, setTrainSettled] = useState(() => introComplete);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
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

  return (
    <section className="hero-section-v3" id="hero">
      {/* 1. Multi-Sport Cinema Ribbon (Pure slanted photo ribbon) */}
      <div className="hero-ribbon-viewport">
        <div className="hero-ribbon-track">
          {ribbonPhotos.map((item, idx) => {
            const cardSpacing = isMobile ? 142 : Math.min(210, Math.max(160, viewportWidth * 0.135));
            const ribbonX = (idx - 3.5) * cardSpacing;

            return (
              <div
                key={item.id}
                className={`hero-photo-frame ${
                  !introComplete
                    ? 'train-waiting'
                    : !trainSettled
                      ? 'train-animating'
                      : 'train-settled'
                }`}
                style={{
                  transform: `translate3d(${ribbonX}px, 0, 0)`,
                  zIndex: 10 + idx,
                  animationDelay: introComplete && !trainSettled ? `${idx * 0.08}s` : undefined,
                  '--ribbon-target-x': `${ribbonX}px`,
                }}
              >
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

      {/* 2. Hero Bottom Cluster (Marquee Ticker + Primary Action CTA) */}
      <div className="hero-bottom-cluster">
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
    </section>
  );
}
