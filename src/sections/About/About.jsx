import React, { useState } from 'react';
import './About.css';
import { useStickySection } from '../../hooks/useStickySection';
import { scrollToSection } from '../../utils/navigation.js';

const audienceCards = [
  {
    num: '01',
    role: 'FOR ATHLETES',
    subtitle: 'Individual & Academy Players',
    tags: ['Ground Booking', 'Pro Coaching', 'Live Match Stats'],
    link: '#services',
  },
  {
    num: '02',
    role: 'FOR CORPORATES',
    subtitle: 'Inter-Company Championships',
    tags: ['Corporate Leagues', 'Custom Sportswear', 'Multi-Cam Streaming'],
    link: '/services/cricket-tournaments',
  },
  {
    num: '03',
    role: 'FOR ORGANIZERS',
    subtitle: 'Pro Tournaments & Cups',
    tags: ['Full Grounds', 'Certified Umpires', 'Prize Operations'],
    link: '/services/cricket-tournaments',
  },
  {
    num: '04',
    role: 'FOR VENUE OWNERS',
    subtitle: 'Ground & Arena Management',
    tags: ['Turf Management', 'Floodlight Automation', 'Slot Revenue Tech'],
    link: '/services/venue-management',
  },
];

const minimalistStats = [
  { value: '30+', label: 'VENUES' },
  { value: '100+', label: 'LEAGUES' },
  { value: '500+', label: 'ATHLETES' },
  { value: '10+', label: 'YEARS' },
];

export default function About() {
  const sectionRef = useStickySection();
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section ref={sectionRef} className="about-section-v3" id="about">
      <div className="about-wrapper">
        {/* Minimal Header (Video Style: Clean, Breathable, No Text Walls) */}
        <div className="about-header-container">
          <div className="about-badge-tag">
            <span className="badge-dot"></span>
            <span className="badge-text">ABOUT SPORTSAAL</span>
          </div>

          <h2 className="about-headline">
            INDIA'S PREMIER <span className="headline-red">ATHLETIC ECOSYSTEM</span>
          </h2>

          <p className="about-subheadline">
            Empowering athletes, tournament organizers, and sports venues through world-class infrastructure and real-time athletic technology.
          </p>
        </div>

        {/* 4 Minimalist Interactive Cards with Video Focus Bubble (0:02 - 0:05 in video) */}
        <div className="about-cards-grid">
          {audienceCards.map((card, idx) => {
            const isActive = activeCard === idx;
            return (
              <div
                key={card.num}
                className={`about-role-card ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveCard(idx)}
                onClick={() => setActiveCard(idx)}
              >
                {/* Card Header */}
                <div className="card-top-row">
                  <span className="card-num">{card.num}</span>
                  <span className="card-dot"></span>
                </div>

                <h3 className="card-role-title">{card.role}</h3>
                <p className="card-role-sub">{card.subtitle}</p>

                {/* Animated Circular Focus Bubble (Exact Video Mechanism) */}
                <div className="card-focus-bubble">
                  <div className="bubble-lens"></div>
                  <div className="bubble-content">
                    {card.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="bubble-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <a
                  href={card.link}
                  className="card-explore-btn"
                  onClick={(e) => {
                    if (card.link.startsWith('#')) {
                      e.preventDefault();
                      scrollToSection(card.link);
                    }
                  }}
                >
                  <span>EXPLORE</span>
                  <span className="explore-arrow">→</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Minimal Horizontal Statistics Bar (Anton Typography, Zero Clutter) */}
        <div className="about-minimal-stats">
          {minimalistStats.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="min-stat-node">
                <span className="min-stat-val">{item.value}</span>
                <span className="min-stat-lbl">{item.label}</span>
              </div>
              {idx < minimalistStats.length - 1 && (
                <span className="min-stat-sep">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
