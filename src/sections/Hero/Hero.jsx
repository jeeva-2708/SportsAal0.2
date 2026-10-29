import React from 'react';
import './Hero.css';

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
  return (
    <section className="hero-section-v3" id="hero">
      {/* Ambient Radial Athletic Lighting */}
      <div className="hero-ambient-glow"></div>
      <div className="hero-ambient-red"></div>

      {/* 1. Slanted Cinema Photo Strip (Exact Video Style: Diagonal continuous ribbon, ZERO text over photos) */}
      <div className="hero-slanted-viewport">
        <div className="hero-slanted-track">
          {ribbonPhotos.map((item) => (
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

      {/* 2. Giant Running Marquee Ticker (Showing Actual Sportsaal Services) */}
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

      {/* 3. Primary Action Callout CTA */}
      <div className="hero-action-container">
        <a href="#services" className="hero-pill-cta">
          <span>EXPLORE SPORTSAAL</span>
          <span className="pill-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
