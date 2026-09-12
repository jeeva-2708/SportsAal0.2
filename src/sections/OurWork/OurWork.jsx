import React, { useRef } from 'react';
import './OurWork.css';
import { useStickySection } from '../../hooks/useStickySection';

// Project card images
import corporateEventsImg from '../../assets/images/our-work/corporate-events.png';
import cricketTournamentsImg from '../../assets/images/our-work/cricket-tournaments.png';
import professionalCoachingImg from '../../assets/images/our-work/professional-coaching.png';
import liveStreamingImg from '../../assets/images/our-work/live-streaming.png';
import groundBookingImg from '../../assets/images/our-work/ground-booking.png';
import sportswearProductsImg from '../../assets/images/our-work/sportswear-products.png';
import sportsTechnologyImg from '../../assets/images/our-work/sports-technology.png';

const projects = [
  {
    id: 'corporate-events',
    title: 'CORPORATE EVENTS',
    subtitle: 'Teams. Competition. Stronger Together.',
    image: corporateEventsImg,
    isFeatured: true, // Spans 2 rows in desktop Bento grid
  },
  {
    id: 'cricket-tournaments',
    title: 'CRICKET TOURNAMENTS',
    subtitle: 'From local to league-level events.',
    image: cricketTournamentsImg,
  },
  {
    id: 'professional-coaching',
    title: 'PROFESSIONAL COACHING',
    subtitle: 'Build Skills. Raise Champions.',
    image: professionalCoachingImg,
  },
  {
    id: 'live-streaming',
    title: 'LIVE STREAMING & PRODUCTION',
    subtitle: 'Every Moment. A Wider Audience.',
    image: liveStreamingImg,
  },
  {
    id: 'ground-booking',
    title: 'GROUND BOOKING',
    subtitle: 'Premium Grounds. Hassle-Free Access.',
    image: groundBookingImg,
  },
  {
    id: 'sportswear-products',
    title: 'SPORTSWEAR & PRODUCTS',
    subtitle: 'Gear Up. Play Better.',
    image: sportswearProductsImg,
  },
  {
    id: 'sports-technology',
    title: 'SPORTS TECHNOLOGY',
    subtitle: 'Smarter Insights. Better Performance.',
    image: sportsTechnologyImg,
  },
];

export default function OurWork() {
  const sectionRef = useStickySection();
  const gridRef = useRef(null);

  const handleScroll = (direction) => {
    if (!gridRef.current) return;
    const scrollAmount = direction === 'left' ? -340 : 340;
    gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="our-work-section stacked-section stacked-section-4" id="work">
      <div className="container our-work-container">
        
        {/* Section Header */}
        <div className="work-header">
          <div className="work-header-left">
            <div className="work-tag">
              <span className="work-tag-line"></span>
              <span className="work-tag-text">OUR WORK</span>
            </div>

            <h2 className="work-title">
              <span className="title-row title-white">EVENTS THAT</span>
              <span className="title-row">
                <span className="text-red">BRING PEOPLE</span>{' '}
                <span className="title-white">TOGETHER</span>
              </span>
            </h2>

            <p className="work-description">
              A glimpse of the ground bookings, tournaments, corporate events, and cricket experiences we've delivered.
            </p>
          </div>

          {/* Top-Right Navigation Arrows */}
          <div className="work-nav-arrows">
            <button 
              className="arrow-btn arrow-prev" 
              onClick={() => handleScroll('left')}
              aria-label="Previous work projects"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button 
              className="arrow-btn arrow-next" 
              onClick={() => handleScroll('right')}
              aria-label="Next work projects"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* 4-Column Bento Project Cards Grid / Horizontal Scroll Carousel */}
        <div className="work-grid" ref={gridRef}>
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`work-card${project.isFeatured ? ' featured-card' : ''}`}
            >
              <div 
                className="work-card-bg" 
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              <div className="work-card-overlay"></div>
              
              <div className="work-card-content">
                <h3 className="work-card-title">{project.title}</h3>
                <p className="work-card-subtitle">{project.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="work-bottom-cta">
          <a href="#contact" className="btn-view-more">
            <span>VIEW MORE</span>
            <span className="view-more-arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
