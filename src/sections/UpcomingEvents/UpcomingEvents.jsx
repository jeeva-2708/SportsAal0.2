import React, { useState } from 'react';
import './UpcomingEvents.css';
import { useStickySection } from '../../hooks/useStickySection';
import { scrollToSection } from '../../utils/navigation.js';

// High-Res Action Visuals
import cricketStadiumImg from '../../assets/images/hero-ribbon/cricket-stadium.jpg';
import footballActionImg from '../../assets/images/hero-ribbon/football-action.jpg';
import badmintonActionImg from '../../assets/images/hero-ribbon/badminton-action.jpg';
import tennisActionImg from '../../assets/images/hero-ribbon/tennis-action.jpg';

const UPCOMING_EVENTS = [
  {
    id: 'sccc-2026',
    sport: 'CRICKET',
    format: 'T20 FLOODLIGHT DERBY',
    tag: 'FLAGSHIP LEAGUE',
    title: 'SPORTSAAL CORPORATE CRICKET CHAMPIONSHIP',
    date: 'NOV 28 - DEC 06, 2026',
    time: 'NIGHT FLOODLIGHTS • 06:30 PM ONWARDS',
    venue: 'Champion Arena, ECR Chennai',
    prize: '₹2,50,000 PRIZE POOL',
    slots: '4 SLOTS REMAINING',
    features: ['BCCI Certified Umpires', 'Live 1080p Multi-Cam Stream', 'Electronic Scoreboard'],
    image: cricketStadiumImg,
  },
  {
    id: 'football-cup',
    sport: 'FOOTBALL',
    format: '7-A-SIDE TURF CUP',
    tag: 'TURF LEAGUE',
    title: 'SOUTH INDIA CORPORATE FOOTBALL DERBY',
    date: 'DEC 12 - 14, 2026',
    time: 'WEEKEND CUP • 08:00 AM ONWARDS',
    venue: 'Elite Park Stadium, Velachery',
    prize: '₹1,00,000 + GOLD BOOT',
    slots: '6 SLOTS REMAINING',
    features: ['FIFA-Grade Astro Turf', 'VAR & Video Highlights', 'Trophy & Branded Kits'],
    image: footballActionImg,
  },
  {
    id: 'shuttle-open',
    sport: 'BADMINTON',
    format: 'SINGLES & DOUBLES OPEN',
    tag: 'INDOOR MASTERS',
    title: 'SPORTSAAL SMASH MASTERS ARENA',
    date: 'DEC 19 - 21, 2026',
    time: 'WEEKEND ARENA • 09:00 AM ONWARDS',
    venue: 'Central Indoor Sports Complex, Guindy',
    prize: '₹75,000 + TROPHIES',
    slots: '8 SLOTS REMAINING',
    features: ['BWF Synthetic Courts', 'State-Level Referees', 'Custom Tournament Jerseys'],
    image: badmintonActionImg,
  },
  {
    id: 'tennis-masters',
    sport: 'TENNIS',
    format: 'MEN & WOMEN SINGLES',
    tag: 'CHAMPIONSHIP',
    title: 'PREMIER TENNIS MASTERS CIRCUIT',
    date: 'JAN 08 - 11, 2027',
    time: 'WEEKEND FINALS • 07:00 AM ONWARDS',
    venue: 'Greenfield Tennis Arena, OMR',
    prize: '₹1,20,000 PRIZE POOL',
    slots: '5 SLOTS REMAINING',
    features: ['ITF Decoturf Hard Courts', 'Ball Crew & Line Judges', 'Broadcast Coverage'],
    image: tennisActionImg,
  },
];

export default function UpcomingEvents() {
  const sectionRef = useStickySection();
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const activeEvent = UPCOMING_EVENTS[activeEventIndex];

  return (
    <section ref={sectionRef} className="upcoming-events-section" id="events">
      <div className="events-container">
        {/* Section Header */}
        <div className="events-header-row">
          <div className="events-header-badge">
            <span className="badge-pulse-dot" />
            <span>UPCOMING EVENTS & TOURNAMENTS</span>
          </div>
          <h2 className="events-headline">
            LIVE ON THE <span className="headline-accent">ARENA</span>
          </h2>
          <p className="events-subheadline">
            Register your squad for premier corporate cups, athletic leagues, and championship opens.
          </p>
        </div>

        {/* Cinematic Main Stage Screen */}
        <div className="events-stage-wrapper">
          <div className="events-main-stage" key={activeEvent.id}>
            {/* Background Image Layer with Atmospheric Gradients */}
            <div className="stage-bg-image-wrapper">
              <img 
                src={activeEvent.image} 
                alt={activeEvent.title} 
                className="stage-bg-image" 
              />
              <div className="stage-gradient-overlay" />
              <div className="stage-vignette-overlay" />
            </div>

            {/* Stage Foreground Content */}
            <div className="stage-content">
              {/* Top Badges Row */}
              <div className="stage-top-row">
                <span className="stage-sport-pill">{activeEvent.sport}</span>
                <span className="stage-format-pill">{activeEvent.format}</span>
                <span className="stage-slots-pill">
                  <span className="live-dot" />
                  {activeEvent.slots}
                </span>
              </div>

              {/* Tournament Title */}
              <h3 className="stage-title">{activeEvent.title}</h3>

              {/* Tournament Meta Info */}
              <div className="stage-meta-grid">
                <div className="meta-card">
                  <span className="meta-label">DATE & SCHEDULE</span>
                  <span className="meta-value">{activeEvent.date}</span>
                  <span className="meta-subvalue">{activeEvent.time}</span>
                </div>

                <div className="meta-card">
                  <span className="meta-label">VENUE LOCATION</span>
                  <span className="meta-value">{activeEvent.venue}</span>
                  <span className="meta-subvalue">South India Circuit</span>
                </div>

                <div className="meta-card">
                  <span className="meta-label">REWARDS & POOL</span>
                  <span className="meta-value meta-prize">{activeEvent.prize}</span>
                  <span className="meta-subvalue">Medals & Certificates</span>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="stage-features-row">
                {activeEvent.features.map((feat, i) => (
                  <span key={i} className="stage-feature-tag">
                    <span className="feat-check">✓</span> {feat}
                  </span>
                ))}
              </div>

              {/* Action Callouts */}
              <div className="stage-actions-row">
                <a
                  href="#contact"
                  className="btn-register-squad"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                  }}
                >
                  <span>REGISTER SQUAD</span>
                  <span className="btn-arrow">→</span>
                </a>

                <a
                  href="#contact"
                  className="btn-event-inquire"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                  }}
                >
                  <span>DOWNLOAD BROCHURE</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Event Selector Thumbnail Ribbon Strip */}
          <div className="events-thumbnail-strip" role="tablist" aria-label="Select Upcoming Event">
            {UPCOMING_EVENTS.map((item, idx) => {
              const isActive = idx === activeEventIndex;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`thumbnail-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveEventIndex(idx)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <div className="thumb-image-box">
                    <img src={item.image} alt={item.sport} className="thumb-img" />
                    <span className="thumb-sport-badge">{item.sport}</span>
                  </div>
                  <div className="thumb-info-box">
                    <span className="thumb-format">{item.tag}</span>
                    <h4 className="thumb-title">{item.title}</h4>
                    <span className="thumb-date">{item.date}</span>
                  </div>
                  {isActive && <div className="thumb-active-indicator" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

