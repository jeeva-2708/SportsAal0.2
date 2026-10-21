import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './VenueBooking.css';
import {
  venueMetrics,
  searchLocations,
  searchVenueTypes,
  featuredVenues,
  whyChooseUs,
  howItWorksSteps,
  venueCategories,
  venueTestimonials,
  venueFaqs,
  venueImages
} from '../../data/venuesData';
import batsmanCutoutImg from '../../assets/images/venues/batsman-cutout.png';

export default function VenueBooking() {
  // State for hero search filters
  const [selectedLocation, setSelectedLocation] = useState('All Chennai Locations');
  const [selectedType, setSelectedType] = useState('All Venue Types');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Category filter state for featured grid
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');

  // FAQ accordion active state
  const [activeFaq, setActiveFaq] = useState(0);

  // Testimonials carousel index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Modal State for Venue Details & Slot Booking
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookingDate, setBookingDate] = useState(selectedDate);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Scroll to featured section ref
  const featuredSectionRef = useRef(null);

  // Filter featured venues
  const filteredVenues = featuredVenues.filter((venue) => {
    // Category tab filter
    if (activeCategoryFilter === 'FULL_GROUNDS' && !venue.category.includes('Full Cricket Grounds')) {
      return false;
    }
    if (activeCategoryFilter === 'NETS' && !venue.category.includes('Practice Nets')) {
      return false;
    }

    // Search dropdown filter
    if (
      selectedLocation !== 'All Chennai Locations' &&
      !venue.location.toLowerCase().includes(selectedLocation.split(',')[0].toLowerCase())
    ) {
      return false;
    }

    if (
      selectedType !== 'All Venue Types' &&
      !venue.category.toLowerCase().includes(selectedType.toLowerCase().split(' ')[0])
    ) {
      return false;
    }

    return true;
  });

  // Handle hero search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (featuredSectionRef.current) {
      featuredSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open venue modal
  const handleOpenVenueModal = (venue) => {
    setSelectedVenue(venue);
    // Find first available slot
    const firstAvailable = venue.slots.find((s) => s.available);
    setSelectedSlotId(firstAvailable ? firstAvailable.id : venue.slots[0]?.id);
    setBookingDate(selectedDate);
    setBookingSuccess(false);
  };

  // Close venue modal
  const handleCloseModal = () => {
    setSelectedVenue(null);
    setBookingSuccess(false);
    setCaptainName('');
    setTeamName('');
    setPhoneNumber('');
  };

  // Handle slot reservation
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!phoneNumber || !captainName) {
      alert('Please provide your name and phone number to complete the booking.');
      return;
    }
    setBookingSuccess(true);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % venueTestimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedSlot = selectedVenue?.slots.find((s) => s.id === selectedSlotId);

  return (
    <div className="venue-page-root">
      {/* Top ambient glow */}
      <div className="venue-top-ambient" aria-hidden="true" />

      {/* Main Container */}
      <div className="venue-main-container">
        
        {/* ===================================================================
            1. BREADCRUMBS
           =================================================================== */}
        <nav className="venue-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">HOME</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/#services" className="breadcrumb-link">SERVICES</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">VENUE BOOKING</span>
        </nav>

        {/* ===================================================================
            2. HERO SECTION
           =================================================================== */}
        <section className="venue-hero-section">
          {/* Hero Stadium Backdrop */}
          <div
            className="venue-hero-backdrop"
            style={{ backgroundImage: `url(${venueImages.heroStadium})` }}
            aria-hidden="true"
          >
            <div className="venue-hero-overlay" />
          </div>

          <div className="venue-hero-content">
            {/* Left Hero Column */}
            <div className="venue-hero-left">
              <div className="venue-tag-badge">
                <span className="venue-tag-dot" />
                <span className="venue-tag-text">PREMIUM SPORTS INFRASTRUCTURE</span>
              </div>

              <h1 className="venue-hero-title">
                FIND. BOOK. <br />
                <span className="hero-title-accent">PLAY.</span>
              </h1>

              <p className="venue-hero-subtitle">
                Reserve tournament-grade cricket grounds, floodlit practice nets, and indoor turf arenas across Chennai with guaranteed pitch prep and instant digital confirmation.
              </p>

              {/* Trust Badges */}
              <div className="venue-trust-badges">
                <div className="trust-badge-item">
                  <span className="trust-icon">⚡</span>
                  <span className="trust-label">Instant Confirmation</span>
                </div>
                <div className="trust-badge-item">
                  <span className="trust-icon">🏏</span>
                  <span className="trust-label">Verified Standard Pitches</span>
                </div>
                <div className="trust-badge-item">
                  <span className="trust-icon">🌧️</span>
                  <span className="trust-label">100% Weather Shield</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Decorative Typography & Live Badge */}
            <div className="venue-hero-right">
              <div className="venue-hero-highlight-card">
                <div className="highlight-tag">CHAMPIONSHIP VENUES</div>
                <h3 className="highlight-slogan">
                  GREAT VENUES.<br />
                  <span className="highlight-red">GREATER GAMES.</span>
                </h3>
                <p className="highlight-desc">
                  From international 75m turf grounds to high-speed floodlit nets, elevate your team's match day with stadium-grade infrastructure.
                </p>
                <div className="highlight-live-status">
                  <span className="live-pulse-dot" />
                  <span className="live-status-text">50+ VENUES AVAILABLE TODAY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Search Bar */}
          <form className="venue-search-bar-form" onSubmit={handleSearchSubmit}>
            <div className="search-field-group">
              <label className="search-field-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>LOCATION</span>
              </label>
              <select
                className="search-field-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {searchLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-divider" />

            <div className="search-field-group">
              <label className="search-field-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span>VENUE TYPE</span>
              </label>
              <select
                className="search-field-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {searchVenueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-divider" />

            <div className="search-field-group">
              <label className="search-field-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>MATCH DATE</span>
              </label>
              <input
                type="date"
                className="search-field-input"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <button type="submit" className="search-submit-btn">
              <span>FIND VENUES</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </section>

        {/* ===================================================================
            3. METRICS STRIP
           =================================================================== */}
        <section className="venue-metrics-strip" aria-label="Venue statistics">
          {venueMetrics.map((metric, idx) => (
            <div key={idx} className="metric-strip-card">
              <div className="metric-strip-val">{metric.value}</div>
              <div className="metric-strip-lbl">{metric.label}</div>
            </div>
          ))}
        </section>

        {/* ===================================================================
            4. FEATURED VENUES SECTION
           =================================================================== */}
        <section ref={featuredSectionRef} className="venue-featured-section" id="featured-venues">
          <div className="section-header-centered">
            <div className="section-mini-tag">
              <span className="tag-line" />
              <span className="tag-label">DISCOVER THE BEST</span>
              <span className="tag-line" />
            </div>
            <h2 className="section-headline">FEATURED CRICKET VENUES</h2>
            <p className="section-subheadline">
              Championship cricket grounds and premier training turf carefully vetted for pitch bounce, floodlight brightness, and player amenities.
            </p>

            {/* Filter Pills */}
            <div className="featured-filter-pills">
              <button
                type="button"
                className={`filter-pill ${activeCategoryFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setActiveCategoryFilter('ALL')}
              >
                All Venues ({featuredVenues.length})
              </button>
              <button
                type="button"
                className={`filter-pill ${activeCategoryFilter === 'FULL_GROUNDS' ? 'active' : ''}`}
                onClick={() => setActiveCategoryFilter('FULL_GROUNDS')}
              >
                Full Cricket Grounds
              </button>
              <button
                type="button"
                className={`filter-pill ${activeCategoryFilter === 'NETS' ? 'active' : ''}`}
                onClick={() => setActiveCategoryFilter('NETS')}
              >
                Practice Nets & Box Turf
              </button>
            </div>
          </div>

          {/* Venues Grid */}
          <div className="featured-venues-grid">
            {filteredVenues.length === 0 ? (
              <div className="no-venues-found">
                <p>No venues match your current filter criteria.</p>
                <button
                  type="button"
                  className="reset-filter-btn"
                  onClick={() => {
                    setActiveCategoryFilter('ALL');
                    setSelectedLocation('All Chennai Locations');
                    setSelectedType('All Venue Types');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredVenues.map((venue) => (
                <div key={venue.id} className="venue-card">
                  {/* Card Media */}
                  <div className="venue-card-media">
                    <img src={venue.image} alt={venue.name} className="venue-card-img" loading="lazy" />
                    <div className="venue-badge-chip">{venue.badge}</div>
                    <div className="venue-price-tag">{venue.priceDisplay}</div>
                  </div>

                  {/* Card Body */}
                  <div className="venue-card-body">
                    <div className="venue-meta-top">
                      <div className="venue-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{venue.location}</span>
                      </div>
                      <div className="venue-rating">
                        <span className="star-icon">★</span>
                        <span className="rating-num">{venue.rating}</span>
                        <span className="reviews-count">({venue.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="venue-card-title">{venue.name}</h3>

                    {/* Spec Tags */}
                    <div className="venue-specs-row">
                      <span className="spec-tag">{venue.boundary}</span>
                      <span className="spec-tag">{venue.pitchType}</span>
                      <span className="spec-tag">{venue.lighting}</span>
                    </div>

                    <p className="venue-card-desc">{venue.description}</p>

                    {/* Amenities Icons */}
                    <div className="venue-amenities-list">
                      {venue.amenities.slice(0, 4).map((amenity, i) => (
                        <span key={i} className="amenity-item">
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      className="venue-card-btn"
                      onClick={() => handleOpenVenueModal(venue)}
                    >
                      <span>VIEW DETAILS & BOOK</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ===================================================================
            5. WHY CHOOSE SPORTSAAL
           =================================================================== */}
        <section className="venue-why-section">
          <div className="section-header-centered">
            <div className="section-mini-tag">
              <span className="tag-line" />
              <span className="tag-label">WHY CHOOSE SPORTSAAL</span>
              <span className="tag-line" />
            </div>
            <h2 className="section-headline">MORE THAN JUST A GROUND BOOKING</h2>
            <p className="section-subheadline">
              We deliver professional-grade cricket infrastructure so your team can focus entirely on match strategy and winning.
            </p>
          </div>

          <div className="why-grid">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="why-card">
                <div className="why-card-top">
                  <span className="why-number">{item.number}</span>
                  <div className="why-corner-accent" />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            6. HOW IT WORKS
           =================================================================== */}
        <section className="venue-how-section">
          <div className="section-header-centered">
            <div className="section-mini-tag">
              <span className="tag-line" />
              <span className="tag-label">SIMPLE PROCESS</span>
              <span className="tag-line" />
            </div>
            <h2 className="section-headline">BOOK YOUR VENUE IN 4 SIMPLE STEPS</h2>
            <p className="section-subheadline">
              Experience friction-free booking from real-time calendar discovery to walking out onto freshly rolled turf.
            </p>
          </div>

          <div className="how-steps-grid">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="how-step-card">
                <div className="step-badge-row">
                  <span className="step-num">{step.step}</span>
                  {idx < howItWorksSteps.length - 1 && <span className="step-connector" />}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            7. VENUES FOR EVERY CRICKET NEED (CATEGORIES)
           =================================================================== */}
        <section className="venue-categories-section">
          <div className="section-header-centered">
            <div className="section-mini-tag">
              <span className="tag-line" />
              <span className="tag-label">EXPLORE INFRASTRUCTURE</span>
              <span className="tag-line" />
            </div>
            <h2 className="section-headline">VENUES FOR EVERY CRICKET NEED</h2>
            <p className="section-subheadline">
              Choose from international-dimension grounds, dedicated coaching lanes, climate-controlled box turf, or corporate championship arenas.
            </p>
          </div>

          <div className="categories-grid">
            {venueCategories.map((cat) => (
              <div key={cat.id} className="category-card">
                <div
                  className="category-card-bg"
                  style={{ backgroundImage: `url(${cat.image})` }}
                  aria-hidden="true"
                />
                <div className="category-card-overlay" />
                
                <div className="category-card-content">
                  <span className="category-badge">{cat.badge}</span>
                  <h3 className="category-title">{cat.title}</h3>
                  <div className="category-subtitle">{cat.subtitle}</div>
                  <p className="category-desc">{cat.description}</p>
                  
                  <button
                    type="button"
                    className="category-explore-btn"
                    onClick={() => {
                      if (cat.id === 'full-grounds') setActiveCategoryFilter('FULL_GROUNDS');
                      else if (cat.id === 'practice-nets') setActiveCategoryFilter('NETS');
                      else setActiveCategoryFilter('ALL');
                      
                      if (featuredSectionRef.current) {
                        featuredSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <span>EXPLORE VENUES</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            8. WHAT OUR PLAYERS SAY (TESTIMONIALS)
           =================================================================== */}
        <section className="venue-testimonials-section">
          <div className="section-header-centered">
            <div className="section-mini-tag">
              <span className="tag-line" />
              <span className="tag-label">COMMUNITY & CAPTAINS</span>
              <span className="tag-line" />
            </div>
            <h2 className="section-headline">WHAT OUR PLAYERS SAY</h2>
            <p className="section-subheadline">
              Trusted by corporate teams, weekend tournament directors, and professional cricket academies across Tamil Nadu.
            </p>
          </div>

          <div className="testimonials-carousel-wrapper">
            <div className="testimonial-active-card">
              <div className="testimonial-quote-icon">“</div>
              <p className="testimonial-text">
                {venueTestimonials[testimonialIndex].quote}
              </p>

              <div className="testimonial-author-row">
                <img
                  src={venueTestimonials[testimonialIndex].avatar}
                  alt={venueTestimonials[testimonialIndex].name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-author-info">
                  <div className="author-name">{venueTestimonials[testimonialIndex].name}</div>
                  <div className="author-role">{venueTestimonials[testimonialIndex].role}</div>
                  <div className="author-stars">
                    {'★'.repeat(venueTestimonials[testimonialIndex].rating)}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="testimonial-dots">
              {venueTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dot-indicator ${idx === testimonialIndex ? 'active' : ''}`}
                  onClick={() => setTestimonialIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            9. FREQUENTLY ASKED QUESTIONS & READY TO PLAY PROMO
           =================================================================== */}
        <section className="venue-faqs-section">
          <div className="faqs-grid-layout">
            
            {/* Left FAQ Accordion */}
            <div className="faqs-accordion-col">
              <div className="section-mini-tag">
                <span className="tag-line" />
                <span className="tag-label">GOT QUESTIONS?</span>
              </div>
              <h2 className="faqs-title">FREQUENTLY ASKED QUESTIONS</h2>
              <p className="faqs-subtitle">
                Clear answers regarding booking timelines, rainout guarantees, match equipment, and tournament setups.
              </p>

              <div className="accordion-list">
                {venueFaqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        className="accordion-trigger"
                        onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-q-text">{faq.question}</span>
                        <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="accordion-content">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Ready to Play Promo Card with Red Cricket Ball Graphic */}
            <div className="faqs-promo-col">
              <div className="ready-promo-card">
                <div
                  className="ready-promo-bg"
                  style={{ backgroundImage: `url(${venueImages.faqBallPromo})` }}
                  aria-hidden="true"
                />
                <div className="ready-promo-overlay" />

                <div className="ready-promo-content">
                  <span className="promo-badge">READY TO PLAY?</span>
                  <h3 className="promo-title">HOST YOUR TOURNAMENT WITH US</h3>
                  <p className="promo-text">
                    Organizing an inter-corporate trophy or league? We supply certified umpires, live streaming scoreboards, match balls, and player catering.
                  </p>
                  <Link to="/#contact" className="promo-cta-btn">
                    <span>CONTACT CONCIERGE</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================================
            10. FINAL CALL TO ACTION (CTA BANNER)
           =================================================================== */}
        <section className="venue-final-cta">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <div className="section-mini-tag">
                <span className="tag-line" />
                <span className="tag-label">GET ON THE PITCH</span>
              </div>
              <h2 className="cta-banner-heading">
                HOST YOUR NEXT GAME AT THE PERFECT VENUE
              </h2>
              <p className="cta-banner-desc">
                From friendly weekend derbies to high-stakes corporate cups, reserve Chennai's premier cricket grounds in under two minutes.
              </p>
              
              <div className="cta-btn-group">
                <button
                  type="button"
                  className="cta-primary-btn"
                  onClick={() => {
                    if (featuredSectionRef.current) {
                      featuredSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <span>EXPLORE VENUES</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <Link to="/#contact" className="cta-secondary-btn">
                  <span>TALK TO VENUE DESK</span>
                </Link>
              </div>
            </div>

            {/* Batsman Silhouette Cutout */}
            <div className="cta-banner-visual">
              <img
                src={batsmanCutoutImg}
                alt="Cricket batsman playing a shot"
                className="cta-batsman-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

      </div>

      {/* ===================================================================
          11. INTERACTIVE VENUE DETAILS & SLOT BOOKING MODAL
         =================================================================== */}
      {selectedVenue && (
        <div className="venue-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="venue-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-venue-title"
          >
            {/* Close Button */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close venue details modal"
            >
              ✕
            </button>

            {bookingSuccess ? (
              /* Success Confirmation View */
              <div className="modal-success-box">
                <div className="success-icon-badge">✓</div>
                <h3 className="success-title">RESERVATION REQUEST CONFIRMED!</h3>
                <p className="success-desc">
                  Thank you, <strong>{captainName}</strong>! Your slot request for <strong>{selectedVenue.name}</strong> on <strong>{bookingDate}</strong> ({selectedSlot?.label}) has been securely logged.
                </p>
                <div className="success-ticket-summary">
                  <div className="ticket-row">
                    <span>Venue:</span>
                    <strong>{selectedVenue.name}</strong>
                  </div>
                  <div className="ticket-row">
                    <span>Location:</span>
                    <strong>{selectedVenue.location}</strong>
                  </div>
                  <div className="ticket-row">
                    <span>Slot Timing:</span>
                    <strong>{selectedSlot?.time}</strong>
                  </div>
                  <div className="ticket-row">
                    <span>Estimated Amount:</span>
                    <strong className="ticket-price">₹{selectedSlot?.price.toLocaleString()}</strong>
                  </div>
                </div>
                <p className="success-subtext">
                  Our ground operations manager is sending digital entry QR passes and pitch gate codes to <strong>{phoneNumber}</strong> on WhatsApp right now.
                </p>
                <button type="button" className="success-done-btn" onClick={handleCloseModal}>
                  DONE & RETURN TO VENUES
                </button>
              </div>
            ) : (
              /* Interactive Booking Form View */
              <div className="modal-content-layout">
                {/* Modal Header Media & Specs */}
                <div className="modal-media-pane">
                  <img
                    src={selectedVenue.image}
                    alt={selectedVenue.name}
                    className="modal-venue-photo"
                  />
                  <div className="modal-venue-header-info">
                    <span className="modal-badge">{selectedVenue.badge}</span>
                    <h3 id="modal-venue-title" className="modal-venue-name">{selectedVenue.name}</h3>
                    <div className="modal-venue-loc">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{selectedVenue.location}</span>
                      <span className="modal-rating-score">★ {selectedVenue.rating}</span>
                    </div>
                  </div>

                  <div className="modal-specs-list">
                    <div className="modal-spec-item">
                      <span className="modal-spec-label">Boundary Dimension:</span>
                      <span className="modal-spec-value">{selectedVenue.boundary}</span>
                    </div>
                    <div className="modal-spec-item">
                      <span className="modal-spec-label">Pitch Standard:</span>
                      <span className="modal-spec-value">{selectedVenue.pitchType}</span>
                    </div>
                    <div className="modal-spec-item">
                      <span className="modal-spec-label">Floodlight Setup:</span>
                      <span className="modal-spec-value">{selectedVenue.lighting}</span>
                    </div>
                  </div>

                  <div className="modal-features-checklist">
                    <h4>FACILITY AMENITIES</h4>
                    <ul>
                      {selectedVenue.features.map((feature, i) => (
                        <li key={i}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Slot Selection & Booking Form */}
                <form className="modal-form-pane" onSubmit={handleConfirmBooking}>
                  <h4 className="form-pane-title">SELECT MATCH SLOT & CONFIRM</h4>

                  {/* Match Date Picker */}
                  <div className="form-input-block">
                    <label className="input-label">PLAY DATE</label>
                    <input
                      type="date"
                      className="modal-text-input"
                      value={bookingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Available Time Slots */}
                  <div className="form-input-block">
                    <label className="input-label">AVAILABLE TIME SLOTS</label>
                    <div className="slots-selection-grid">
                      {selectedVenue.slots.map((slot) => {
                        const isSelected = selectedSlotId === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            className={`slot-option-btn ${isSelected ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlotId(slot.id)}
                          >
                            <div className="slot-btn-top">
                              <span className="slot-name">{slot.label}</span>
                              <span className="slot-status">
                                {slot.available ? 'AVAILABLE' : 'BOOKED'}
                              </span>
                            </div>
                            <div className="slot-btn-bottom">
                              <span className="slot-hours">{slot.time}</span>
                              <span className="slot-fee">₹{slot.price.toLocaleString()}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Team & Contact Details */}
                  <div className="form-row-two-col">
                    <div className="form-input-block">
                      <label className="input-label">CAPTAIN / BOOKER NAME</label>
                      <input
                        type="text"
                        className="modal-text-input"
                        placeholder="e.g. Rahul Sharma"
                        value={captainName}
                        onChange={(e) => setCaptainName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-input-block">
                      <label className="input-label">TEAM / COMPANY NAME</label>
                      <input
                        type="text"
                        className="modal-text-input"
                        placeholder="e.g. Royal Strikers CC"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-input-block">
                    <label className="input-label">WHATSAPP / PHONE NUMBER (FOR ENTRY PASS)</label>
                    <input
                      type="tel"
                      className="modal-text-input"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  {/* Price Summary */}
                  <div className="modal-price-calc-strip">
                    <div className="calc-item">
                      <span>Base Slot Fee</span>
                      <span>₹{selectedSlot ? selectedSlot.price.toLocaleString() : '0'}</span>
                    </div>
                    <div className="calc-item">
                      <span>Ground Curator Prep</span>
                      <span className="prep-free">FREE</span>
                    </div>
                    <div className="calc-item total">
                      <span>TOTAL ESTIMATE</span>
                      <span className="total-amount">
                        ₹{selectedSlot ? selectedSlot.price.toLocaleString() : '0'}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="modal-confirm-submit-btn">
                    <span>LOCK SLOT & CONFIRM RESERVATION</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <p className="modal-security-note">
                    🔒 Instant slot hold. Zero cancellation fee if rescheduled up to 48 hours before match time.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
