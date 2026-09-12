import React from 'react';
import './Services.css';
import { useStickySection } from '../../hooks/useStickySection';

// Import Service Card Background Images from local assets
import venueImg from '../../assets/images/our-services/venue-management.png';
import tournamentsImg from '../../assets/images/our-services/tournaments.png';
import coachingImg from '../../assets/images/our-services/coaching-programs.png';
import eventsImg from '../../assets/images/our-services/event-management.png';
import technologyImg from '../../assets/images/our-services/sports-technology.png';
import athleteImg from '../../assets/images/our-services/athlete-management.png';

const serviceImages = {
  venue: venueImg,
  tournaments: tournamentsImg,
  coaching: coachingImg,
  events: eventsImg,
  technology: technologyImg,
  athlete: athleteImg,
};

export default function Services() {
  const sectionRef = useStickySection();

  return (
    <section ref={sectionRef} className="services-section stacked-section stacked-section-3" id="services">
      <div className="container services-container">
        
        {/* Centered Section Header */}
        <div className="services-header">
          <div className="services-tag">
            <span className="services-tag-line"></span>
            <span className="services-tag-text">OUR SERVICES</span>
          </div>

          <h2 className="services-title">
            <span className="title-navy">COMPLETE SOLUTIONS.</span>{' '}
            <span className="title-red">BUILT FOR SPORT.</span>
          </h2>

          <p className="services-description">
            From world-class venues to professional tournaments and expert coaching, we deliver end-to-end sports solutions tailored to your goals.
          </p>
        </div>

        {/* 3x2 Service Cards Grid */}
        <div className="services-grid">
          
          {/* Card 1: Venue Management */}
          <div className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.venue})` }}></div>
            <div className="card-gradient-overlay"></div>
            
            <div className="card-content">
              <div className="card-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V10a7 7 0 0 1 14 0v11" />
                  <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                  <path d="M2 10h20" />
                  <path d="M12 3v3" />
                </svg>
              </div>

              <h3 className="card-title">VENUE MANAGEMENT</h3>
              <p className="card-description">
                World-class infrastructure managed for performance and experience.
              </p>

              <a href="#venue-management" className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Card 2: Tournaments */}
          <div className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.tournaments})` }}></div>
            <div className="card-gradient-overlay"></div>

            <div className="card-content">
              <div className="card-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H7v3h10v-3h-2c-.55 0-1-.45-1-1v-2.34" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
              </div>

              <h3 className="card-title">TOURNAMENTS</h3>
              <p className="card-description">
                End-to-end tournament management for corporate, amateur and professional events.
              </p>

              <a href="#tournaments" className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Card 3: Coaching Programs */}
          <div className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.coaching})` }}></div>
            <div className="card-gradient-overlay"></div>

            <div className="card-content">
              <div className="card-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                  <path d="M8 3h8" />
                </svg>
              </div>

              <h3 className="card-title">COACHING PROGRAMS</h3>
              <p className="card-description">
                Expert coaching for all ages and skill levels to unlock true potential.
              </p>

              <a href="#coaching" className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Card 4: Event Management */}
          <div className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.events})` }}></div>
            <div className="card-gradient-overlay"></div>

            <div className="card-content">
              <div className="card-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>

              <h3 className="card-title">EVENT MANAGEMENT</h3>
              <p className="card-description">
                Seamless planning and execution of sports events that leave a lasting impact.
              </p>

              <a href="#event-management" className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Card 5: Sports Technology */}
          <div className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.technology})` }}></div>
            <div className="card-gradient-overlay"></div>

            <div className="card-content">
              <div className="card-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>

              <h3 className="card-title">SPORTS TECHNOLOGY</h3>
              <p className="card-description">
                Data-driven insights and technology solutions to enhance performance.
              </p>

              <a href="#sports-technology" className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Card 6: Athlete Management */}
          <div className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.athlete})` }}></div>
            <div className="card-gradient-overlay"></div>

            <div className="card-content">
              <div className="card-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <h3 className="card-title">ATHLETE MANAGEMENT</h3>
              <p className="card-description">
                End-to-end support for athletes to grow, compete and succeed.
              </p>

              <a href="#athlete-management" className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>

        </div>

        {/* Center Bottom Action CTA Button */}
        <div className="services-bottom-cta">
          <a href="#all-services" className="btn-services-cta">
            <span>EXPLORE ALL SERVICES</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
