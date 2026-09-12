import React from 'react';
import './About.css';
import { useStickySection } from '../../hooks/useStickySection';

export default function About() {
  const sectionRef = useStickySection();

  return (
    <section ref={sectionRef} className="about-section stacked-section stacked-section-2" id="about">
      <div className="container about-container">
        
        {/* Top 2-Column Section */}
        <div className="about-top-grid">
          
          {/* Left Column: Heading & Paragraph */}
          <div className="about-left-col">
            <div className="about-tag">
              <span className="about-tag-line"></span>
              <span className="about-tag-text">ABOUT SPORTSAAL</span>
            </div>

            <h2 className="about-title">
              <span className="title-navy">BUILT FOR PASSION.</span>
              <span className="title-red">DRIVEN BY SPORT.</span>
            </h2>

            <p className="about-description">
              Sportsaal is a complete sports management company dedicated to the growth of sports at every level. From world-class venues and professional tournaments to expert coaching and modern sports technology — we provide everything athletes, teams and organizations need to perform, compete and win.
            </p>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="about-cards-grid">
            
            {/* Card 1: Our Mission */}
            <div className="about-card">
              <div className="card-icon-wrapper">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M22 2L15 9" />
                  <path d="M22 2l-5 1" />
                  <path d="M22 2l-1 5" />
                </svg>
              </div>
              <h3 className="card-title">OUR MISSION</h3>
              <p className="card-description">
                To empower athletes and organizations with the best resources, venues and support.
              </p>
            </div>

            {/* Card 2: Our Vision */}
            <div className="about-card">
              <div className="card-icon-wrapper">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="card-title">OUR VISION</h3>
              <p className="card-description">
                To be India’s most trusted sports development and management brand.
              </p>
            </div>

            {/* Card 3: Our Values */}
            <div className="about-card">
              <div className="card-icon-wrapper">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H7v3h10v-3h-2c-.55 0-1-.45-1-1v-2.34" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
              </div>
              <h3 className="card-title">OUR VALUES</h3>
              <p className="card-description">
                Passion, Integrity, Excellence and Commitment to the game.
              </p>
            </div>

            {/* Card 4: Our Approach */}
            <div className="about-card">
              <div className="card-icon-wrapper">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="card-title">OUR APPROACH</h3>
              <p className="card-description">
                Athlete-first approach with end-to-end solutions under one roof.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Bordered Statistics Panel */}
        <div className="about-stats-panel">
          
          {/* Stat Item 1: Venues */}
          <div className="stat-item">
            <div className="stat-header">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V10a7 7 0 0 1 14 0v11" />
                  <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                  <path d="M2 10h20" />
                  <path d="M12 3v3" />
                </svg>
              </div>
              <div className="stat-number">30+</div>
            </div>
            <div className="stat-content">
              <div className="stat-label">VENUES</div>
              <div className="stat-subtext">Across Tamil Nadu</div>
            </div>
          </div>

          {/* Stat Item 2: Events */}
          <div className="stat-item">
            <div className="stat-header">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H7v3h10v-3h-2c-.55 0-1-.45-1-1v-2.34" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
              </div>
              <div className="stat-number">100+</div>
            </div>
            <div className="stat-content">
              <div className="stat-label">EVENTS</div>
              <div className="stat-subtext">Organized Successfully</div>
            </div>
          </div>

          {/* Stat Item 3: Players */}
          <div className="stat-item">
            <div className="stat-header">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-number">500+</div>
            </div>
            <div className="stat-content">
              <div className="stat-label">PLAYERS</div>
              <div className="stat-subtext">Trained & Empowered</div>
            </div>
          </div>

          {/* Stat Item 4: Coaches */}
          <div className="stat-item">
            <div className="stat-header">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                  <path d="M8 3h8" />
                </svg>
              </div>
              <div className="stat-number">50+</div>
            </div>
            <div className="stat-content">
              <div className="stat-label">COACHES</div>
              <div className="stat-subtext">Expert & Certified</div>
            </div>
          </div>

          {/* Stat Item 5: Years */}
          <div className="stat-item">
            <div className="stat-header">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div className="stat-number">10+</div>
            </div>
            <div className="stat-content">
              <div className="stat-label">YEARS</div>
              <div className="stat-subtext">Of Excellence</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
