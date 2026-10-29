import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { useStickySection } from '../../hooks/useStickySection';

// Dark Theme Images
import venueDarkImg from '../../assets/images/our-services/venue-management.png';
import tournamentsDarkImg from '../../assets/images/our-services/tournaments.png';
import coachingDarkImg from '../../assets/images/our-services/coaching-programs.png';
import eventsDarkImg from '../../assets/images/our-services/event-management.png';
import technologyDarkImg from '../../assets/images/our-services/sports-technology.png';
import sportswearDarkImg from '../../assets/images/our-work/sportswear-products.webp';

// Light Theme Images
import venueLightImg from '../../assets/images/our-services/venue-management-light.jpg';
import tournamentsLightImg from '../../assets/images/our-services/tournaments-light.jpg';
import coachingLightImg from '../../assets/images/our-services/coaching-programs-light.jpg';
import eventsLightImg from '../../assets/images/our-services/event-management-light.png';
import technologyLightImg from '../../assets/images/our-services/sports-technology-light.webp';
import sportswearLightImg from '../../assets/images/our-services/sportswear-products-light.webp';

export default function Services() {
  const sectionRef = useStickySection();

  // Track theme to dynamically serve light vs dark theme images
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('sportsaal_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';

  const serviceImages = {
    venue: isLight ? venueLightImg : venueDarkImg,
    tournaments: isLight ? tournamentsLightImg : tournamentsDarkImg,
    coaching: isLight ? coachingLightImg : coachingDarkImg,
    events: isLight ? eventsLightImg : eventsDarkImg,
    technology: isLight ? technologyLightImg : technologyDarkImg,
    sportswear: isLight ? sportswearLightImg : sportswearDarkImg,
  };

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
            
            <div className="card-content">
              <h3 className="card-title">
                VENUE MANAGEMENT
                <span className="card-title-arrow">→</span>
              </h3>
            </div>
          </Link>

          {/* Card 2: Tournaments */}
          <Link to="/services/cricket-tournaments" className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.tournaments})` }}></div>

            <div className="card-content">
              <h3 className="card-title">
                CRICKET TOURNAMENTS
                <span className="card-title-arrow">→</span>
              </h3>
            </div>
          </Link>

          {/* Card 3: Coaching Programs */}
          <Link to="/services/professional-coaching" className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.coaching})` }}></div>

            <div className="card-content">
              <h3 className="card-title">
                PROFESSIONAL COACHING
                <span className="card-title-arrow">→</span>
              </h3>
            </div>
          </Link>

          {/* Card 4: Event Management */}
          <Link to="/services/event-management" className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.events})` }}></div>

            <div className="card-content">
              <h3 className="card-title">
                EVENT MANAGEMENT
                <span className="card-title-arrow">→</span>
              </h3>
            </div>
          </Link>

          {/* Card 5: Sports Technology */}
          <Link to="/services/sports-technology" className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.technology})` }}></div>

            <div className="card-content">
              <h3 className="card-title">
                SPORTS TECHNOLOGY & LIVE STREAMING
                <span className="card-title-arrow">→</span>
              </h3>
            </div>
          </Link>

          {/* Card 6: Sportswear & Products */}
          <Link to="/services/sportswear-products" className="service-card">
            <div className="card-bg-image" style={{ backgroundImage: `url(${serviceImages.sportswear})` }}></div>

            <div className="card-content">
              <h3 className="card-title">
                SPORTSWEAR & PRODUCTS
                <span className="card-title-arrow">→</span>
              </h3>
            </div>
          </Link>

        </div>

        {/* Center Bottom Action CTA Button */}
        <div className="services-bottom-cta">
          <Link to="/services/corporate-events" className="btn-services-cta">
            <span>ALL SERVICES</span>
            <span className="cta-arrow">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
