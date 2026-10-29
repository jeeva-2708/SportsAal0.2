import React from 'react';
import './Hero.css';

// Multi-Sport Panorama Ribbon Assets
import cricketBatsmanImg from '../../assets/images/hero-ribbon/cricket-batsman.jpg';
import footballActionImg from '../../assets/images/hero-ribbon/football-action.jpg';
import badmintonActionImg from '../../assets/images/hero-ribbon/badminton-action.jpg';
import cricketStadiumImg from '../../assets/images/hero-ribbon/cricket-stadium.jpg';
import tennisActionImg from '../../assets/images/hero-ribbon/tennis-action.jpg';
import footballCelebrateImg from '../../assets/images/hero-ribbon/football-celebrate.jpg';
import athleteSprintImg from '../../assets/images/hero-ribbon/athlete-sprint.jpg';

const ribbonCards = [
  { id: 'cricket', title: 'CRICKET', image: cricketBatsmanImg, badge: 'PRO LEAGUE' },
  { id: 'football', title: 'FOOTBALL', image: footballActionImg, badge: 'TURF ARENAS' },
  { id: 'badminton', title: 'BADMINTON', image: badmintonActionImg, badge: 'SHUTTLE COURTS' },
  { id: 'stadiums', title: 'VENUES', image: cricketStadiumImg, badge: 'INFRASTRUCTURE' },
  { id: 'tennis', title: 'TENNIS', image: tennisActionImg, badge: 'SYNTHETIC COURTS' },
  { id: 'tournaments', title: 'TOURNAMENTS', image: footballCelebrateImg, badge: 'CUPS & LEAGUES' },
  { id: 'athletics', title: 'ATHLETICS', image: athleteSprintImg, badge: 'SPEED & S&C' },
];

const marqueeWords = [
  'CRICKET',
  'FOOTBALL',
  'BADMINTON',
  'TENNIS',
  'TOURNAMENTS',
  'PRO VENUES',
  'LIVE STREAMING',
  'ELITE COACHING',
  'ATHLETIC SPRINT',
];

export default function Hero() {
  return (
    <section className="hero-section-v3" id="hero">
      {/* Ambient Radial Athletic Lighting */}
      <div className="hero-ambient-glow"></div>
      <div className="hero-ambient-red"></div>

      {/* 1. Multi-Sport Horizontal Panorama Ribbon */}
      <div className="hero-ribbon-viewport">
        <div className="hero-ribbon-track">
          {ribbonCards.map((card, index) => (
            <div 
              key={card.id} 
              className={`hero-ribbon-card hero-card-${index + 1}`}
            >
              <img 
                src={card.image} 
                alt={card.title} 
                className="hero-ribbon-img" 
                loading="eager" 
              />
              <div className="hero-ribbon-overlay">
                <span className="hero-ribbon-badge">{card.badge}</span>
                <span className="hero-ribbon-sport">{card.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Giant Running Marquee Ticker */}
      <div className="hero-marquee-wrapper" aria-hidden="true">
        <div className="hero-marquee-track">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, idx) => (
            <span key={idx} className="hero-marquee-item">
              <span className="marquee-text">{word}</span>
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
