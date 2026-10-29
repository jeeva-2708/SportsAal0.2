import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { useStickySection } from '../../hooks/useStickySection';

// Sportsaal 3.0 Core Services (What we provide, exactly matching the user request)
const servicesData = [
  {
    id: 'venue-management',
    num: '001',
    title: 'Venue Management',
    slug: '/services/venue-management',
    tags: ['Full Grounds', 'Night Floodlights', 'Arena Maintenance', 'Slot Booking'],
    desc: 'Turnkey venue operations, sports infrastructure, and automated slot scheduling.',
  },
  {
    id: 'cricket-tournaments',
    num: '002',
    title: 'Cricket Tournaments',
    slug: '/services/cricket-tournaments',
    tags: ['Corporate Leagues', 'Certified Umpires', 'Prize Operations', 'Live Digital Scoring'],
    desc: 'End-to-end tournament execution for corporates, clubs, and state championships.',
  },
  {
    id: 'professional-coaching',
    num: '003',
    title: 'Professional Coaching',
    slug: '/services/professional-coaching',
    tags: ['BCCI Certified', 'Grassroots to Elite', 'Video Biomechanics', 'Personal Mentorship'],
    desc: 'Elite athletic coaching academies with customized technical training modules.',
  },
  {
    id: 'event-management',
    num: '004',
    title: 'Event Management',
    slug: '/services/event-management',
    tags: ['Opening Ceremonies', 'Stage & Sound', 'VIP Hospitality', 'Sports PR'],
    desc: 'Full-scale corporate sports festivals, annual meets, and stadium exhibitions.',
  },
  {
    id: 'sports-technology',
    num: '005',
    title: 'Sports Technology',
    slug: '/services/sports-technology',
    tags: ['Speed Radar Guns', 'Smart Wearables', 'Cloud Analytics', 'Digital Scoreboards'],
    desc: 'Next-generation performance analytics, sensor tracking, and automated scoring.',
  },
  {
    id: 'live-streaming',
    num: '006',
    title: 'Live Streaming',
    slug: '/services/live-streaming',
    tags: ['Multi-Cam 1080p', 'Slow-Mo Replays', 'Live Commentary', 'Social Broadcast'],
    desc: 'Broadcast-grade multi-camera production with live graphic score overlays.',
  },
  {
    id: 'ground-bookings',
    num: '007',
    title: 'Ground Bookings',
    slug: '/services/venue-management',
    tags: ['Instant Confirmation', 'Flexible Slots', 'Floodlit Grounds', 'Practice Nets'],
    desc: 'Real-time online booking for South India’s top cricket arenas and turf grounds.',
  },
  {
    id: 'sportswear',
    num: '008',
    title: 'Sportswear & Kits',
    slug: '/services/sportswear-products',
    tags: ['Custom Team Jerseys', 'Sublimation Print', 'Breathable Fabrics', 'Full Gear Sets'],
    desc: 'Pro-grade athletic apparel, custom corporate kits, and tournament gear.',
  },
];

export default function Services() {
  const sectionRef = useStickySection();
  const [activeCardId, setActiveCardId] = useState('venue-management');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const trackRef = useRef(null);

  // Responsive calculation of visible cards per carousel view
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(1);
      } else if (width < 1150) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, servicesData.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section ref={sectionRef} className="services-section-v3" id="services">
      <div className="services-wrapper">
        {/* Section Header Matching Reference Video */}
        <div className="services-header-row">
          <div className="services-header-text">
            <span className="services-eyebrow">WHAT WE OFFER</span>
            <h2 className="services-headline">WOULD BE USEFUL FOR</h2>
          </div>

          {/* Carousel Navigation Controls (Arrows + Page Pill) */}
          <div className="services-carousel-nav">
            <button
              type="button"
              className="carousel-btn prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous services"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <span className="carousel-page-indicator">
              0{Math.floor(currentIndex / itemsPerPage) + 1} / 0{Math.ceil(servicesData.length / itemsPerPage)}
            </span>

            <button
              type="button"
              className="carousel-btn next"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next services"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="services-carousel-viewport">
          <div
            ref={trackRef}
            className="services-carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {servicesData.map((service) => {
              const isActive = activeCardId === service.id;

              return (
                <div
                  key={service.id}
                  className="services-carousel-slide"
                  style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                >
                  <div
                    className={`service-video-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveCardId(isActive ? null : service.id)}
                  >
                    {/* State 1: Inactive Card (Dark bordered box with centered title, matching video) */}
                    <div className="card-idle-view">
                      <h3 className="card-idle-title">{service.title}</h3>
                    </div>

                    {/* State 2: Active Card (Circle Sphere Lens + Connector Pin + 001 + Red Title + 1-line Description) */}
                    <div className="card-active-view">
                      {/* Vibrant Red Circle Sphere with Stacked Tags inside */}
                      <div className="card-active-sphere">
                        <div className="sphere-tags-stack">
                          {service.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="sphere-tag-item">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Delicate Vertical Pin Line with Circle Node below sphere */}
                      <div className="card-pin-connector">
                        <span className="connector-line"></span>
                        <span className="connector-node"></span>
                      </div>

                      {/* Bottom Info: Number, Title, 1-Line Description */}
                      <div className="card-bottom-info">
                        <span className="card-number">{service.num}</span>
                        <h4 className="card-active-title">
                          <Link to={service.slug} className="card-title-link">
                            {service.title}
                          </Link>
                        </h4>
                        <p className="card-active-desc">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
