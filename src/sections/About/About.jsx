import React from 'react';
import './About.css';
import { useStickySection } from '../../hooks/useStickySection';

const aboutPillars = [
  {
    num: '01',
    title: 'WORLD-CLASS INFRASTRUCTURE',
    desc: 'From turnkey full-ground construction to international-spec indoor badminton and cricket turfs with automated floodlighting.',
    bullets: ['30+ Premium Venues', 'Floodlit Night Play', 'Automated Slot Booking'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V10a7 7 0 0 1 14 0v11" />
        <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'TOURNAMENT OPERATIONS',
    desc: 'End-to-end execution of corporate leagues, youth championships, and professional state tournaments with verified umpires.',
    bullets: ['100+ Pro Leagues', 'Live Digital Scoring', 'Full Prize Management'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7v3h10v-3h-2c-.55 0-1-.45-1-1v-2.34" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'CERTIFIED COACHING ACADEMY',
    desc: 'BCCI & certified national coaches providing personalized training, biomechanics analysis, and strength & conditioning.',
    bullets: ['50+ Certified Coaches', 'Grassroots to Elite Path', 'Video Technical Analysis'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'SPORTS TECH & BROADCAST',
    desc: 'Broadcast-grade multi-camera live streaming, instant slow-motion highlights, speed guns, and cloud match analytics.',
    bullets: ['HD Multi-Cam Stream', 'Real-Time Graphics', 'Player Performance Data'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
];

const statsData = [
  { value: '30+', label: 'PREMIER VENUES', detail: 'Across South India' },
  { value: '100+', label: 'LEAGUES ORGANIZED', detail: 'Corporate & State Tournaments' },
  { value: '500+', label: 'ATHLETES EMPOWERED', detail: 'Trained & Competed' },
  { value: '50+', label: 'CERTIFIED COACHES', detail: 'High-Performance Specialists' },
  { value: '10+', label: 'YEARS EXPERIENCE', detail: 'In Sports Excellence' },
];

export default function About() {
  const sectionRef = useStickySection();

  return (
    <section ref={sectionRef} className="about-section-v3" id="about">
      {/* Ambient Radial Sports Glow */}
      <div className="about-ambient-glow" aria-hidden="true"></div>
      <div className="about-ambient-red" aria-hidden="true"></div>

      <div className="about-wrapper">
        {/* Top Header & Intro Statement */}
        <div className="about-header-container">
          <div className="about-badge-tag">
            <span className="badge-dot"></span>
            <span className="badge-text">ABOUT SPORTSAAL</span>
          </div>

          <h2 className="about-headline">
            BUILT FOR PASSION. <span className="headline-red">DRIVEN BY SPORT.</span>
          </h2>

          <p className="about-subheadline">
            Sportsaal is India's premier integrated athletic ecosystem. We deliver world-class sporting infrastructure, professional tournament execution, certified coaching academies, and cutting-edge live broadcast technology — empowering athletes, venues, and corporations to perform at the highest level.
          </p>
        </div>

        {/* 4 Interactive Athletic Pillars Grid (Matching Video Aesthetic) */}
        <div className="about-pillars-grid">
          {aboutPillars.map((pillar) => (
            <div key={pillar.num} className="about-pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-number">{pillar.num}</span>
                <div className="pillar-icon-box">{pillar.icon}</div>
              </div>

              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>

              <div className="pillar-divider"></div>

              <ul className="pillar-bullets">
                {pillar.bullets.map((b, idx) => (
                  <li key={idx} className="pillar-bullet-item">
                    <span className="bullet-check">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cinematic Statistics Strip */}
        <div className="about-stats-strip">
          {statsData.map((stat, idx) => (
            <div key={idx} className="about-stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-detail">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
