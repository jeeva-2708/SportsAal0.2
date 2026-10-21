import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { useStickySection } from '../../hooks/useStickySection';

// Import Service Card Background Images from local assets
import venueImg from '../../assets/images/our-services/venue-management.png';
import tournamentsImg from '../../assets/images/our-services/tournaments.png';
import coachingImg from '../../assets/images/our-services/coaching-programs.png';
import eventsImg from '../../assets/images/our-services/event-management.png';
import technologyImg from '../../assets/images/our-services/sports-technology.png';
import sportswearImg from '../../assets/images/our-work/sportswear-products.webp';

const serviceImages = {
  venue: venueImg,
  tournaments: tournamentsImg,
  coaching: coachingImg,
  events: eventsImg,
  technology: technologyImg,
  sportswear: sportswearImg,
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
          <Link to="/services/venue-management" className="service-card">
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

              <div className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Card 2: Tournaments */}
          <Link to="/services/cricket-tournaments" className="service-card">
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

              <h3 className="card-title">CRICKET TOURNAMENTS</h3>
              <p className="card-description">
                End-to-end tournament management for corporate, amateur and professional events.
              </p>

              <div className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Card 3: Coaching Programs */}
          <Link to="/services/professional-coaching" className="service-card">
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

              <h3 className="card-title">PROFESSIONAL COACHING</h3>
              <p className="card-description">
                Expert coaching for all ages and skill levels to unlock true potential.
              </p>

              <div className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Card 4: Event Management */}
          <Link to="/services/event-management" className="service-card">
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

              <div className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Card 5: Sports Technology */}
          <Link to="/services/sports-technology" className="service-card">
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

              <div className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Card 6: Sportswear & Products (Replaced Athlete Management) */}
          <Link to="/services/sportswear-products" className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.sportswear})` }}></div>
            <div className="card-gradient-overlay"></div>

            <div className="card-content">
              <div className="card-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </div>

              <h3 className="card-title">SPORTSWEAR & PRODUCTS</h3>
              <p className="card-description">
                High-performance technical apparel, custom team kits, and handcrafted professional gear.
              </p>

              <div className="card-link">
                <span>Learn More</span>
                <span className="link-arrow">→</span>
              </div>
            </div>
          </Link>

        </div>

        {/* Center Bottom Action CTA Button */}
        <div className="services-bottom-cta">
          <Link to="/services/corporate-events" className="btn-services-cta">
            <span>EXPLORE CORPORATE & ALL SERVICES</span>
            <span className="cta-arrow">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
