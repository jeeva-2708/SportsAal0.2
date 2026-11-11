import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Testimonials.css';
import { useStickySection } from '../../hooks/useStickySection';
import { useSiteData } from '../../context/SiteDataContext.jsx';

export default function Testimonials() {
  const sectionRef = useStickySection();
  const { sections } = useSiteData();
  const cfg = sections?.testimonials || {};
  const testimonials = Array.isArray(cfg.items) ? cfg.items : [];
  const totalSlides = testimonials.length || 1;

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (activeSlide >= totalSlides) {
      setActiveSlide(0);
    }
  }, [activeSlide, totalSlides]);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Direct dot click navigation
  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  // Touch swipe support for mobile and tablet
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    // Only swipe if horizontal movement is dominant and substantial
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Clicking the left or right card in the desktop view navigates to it
  const handleCardClick = (cardSlot) => {
    if (cardSlot === 0) {
      handlePrev();
    } else if (cardSlot === 2) {
      handleNext();
    }
  };

  // Build dynamic slide sets safely regardless of item count
  const slides =
    testimonials.length > 0
      ? testimonials.map((_, slideIndex) => ({
          id: slideIndex,
          cards: [
            testimonials[(slideIndex - 1 + testimonials.length) % testimonials.length],
            testimonials[slideIndex % testimonials.length],
            testimonials[(slideIndex + 1) % testimonials.length],
          ],
        }))
      : [];

  return (
    <section
      ref={sectionRef}
      className="testimonials-section stacked-section stacked-section-5"
      id="testimonials"
      aria-label="What Our Clients Say"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Section Content */}
      <div className="container testimonials-container">
        
        {/* Top Header */}
        <div className="testimonials-header">
          {/* Centered tag with red and subtle gray accent lines */}
          <div className="testimonials-tag" aria-hidden="true">
            <span className="testimonials-tag-line line-red" />
            <span className="testimonials-tag-text">{cfg.tagText || 'TESTIMONIALS'}</span>
            <span className="testimonials-tag-line line-gray" />
          </div>

          {/* Bold Display Heading */}
          <h2 className="testimonials-heading">
            <span className="text-white">{cfg.headlineWhite || 'WHAT OUR'}</span>
            <br />
            <span className="text-red">{cfg.headlineRed || 'CLIENTS'}</span>{' '}
            <span className="text-white">SAY</span>
          </h2>

          {/* Subtitle */}
          <p className="testimonials-subtitle">
            {cfg.subtitle || "Here's what our clients and partners say about working with Sportsaal."}
          </p>
        </div>

        {/* Carousel Area */}
        <div className="testimonials-carousel-wrapper">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            className="carousel-control prev-control"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Carousel Viewport */}
          <div
            className="testimonials-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
              }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="testimonials-slide">
                  {slide.cards.map((item, slotIndex) => {
                    const isCenter = slotIndex === 1;
                    return (
                      <div
                        key={`${item.id}-slot-${slotIndex}`}
                        className={`testimonial-card slot-${slotIndex} ${isCenter ? 'is-active' : ''}`}
                        onClick={() => handleCardClick(slotIndex)}
                      >
                        {/* Double Quote Icon */}
                        <div className="testimonial-quote-wrapper" aria-hidden="true">
                          <svg
                            className="testimonial-quote-icon"
                            width="32"
                            height="26"
                            viewBox="0 0 24 20"
                            fill="currentColor"
                          >
                            <path d="M10 0v7.391C10 13.095 6.269 16.961 1.017 18L.022 15.849c2.432-.917 3.995-3.638 3.995-5.849H0V0h10zm14 0v7.391C24 13.095 20.252 16.961 15 18l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849H14V0h10z" />
                          </svg>
                        </div>

                        {/* Testimonial Quote Paragraph */}
                        <p className="testimonial-quote-text">{item.quote}</p>

                        {/* Red Accent Divider Line */}
                        <div className="testimonial-divider" aria-hidden="true" />

                        {/* Client Information */}
                        <div className="testimonial-client">
                          <div className="testimonial-avatar-wrapper">
                            <img
                              src={item.avatarSrc || item.avatar}
                              alt={item.name}
                              className="testimonial-avatar-img"
                              loading="lazy"
                              draggable="false"
                            />
                          </div>
                          <div className="testimonial-client-info">
                            <h3 className="testimonial-client-name">{item.name}</h3>
                            <p className="testimonial-client-role">{item.role}</p>
                            <p className="testimonial-client-company">{item.company}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="carousel-control next-control"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

        </div>

        {/* Carousel Slider Dot Indicators */}
        <div
          className="testimonials-indicators"
          role="tablist"
          aria-label="Testimonial slider navigation"
        >
          {testimonials.map((t, idx) => (
            <button
              key={t.id || idx}
              type="button"
              className={`indicator-dot ${activeSlide === idx ? 'is-active' : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}: ${t.name}`}
              aria-selected={activeSlide === idx}
              role="tab"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
