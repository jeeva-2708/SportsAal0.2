import React, { useRef, useEffect, useState } from 'react';
import './TrustedBy.css';
import cricketFieldBg from '../../assets/images/trusted-by/cricket-field-bg.png';

// Partner SVG logos from src/assets/logos/trusted-by/
import aionionLogo from '../../assets/logos/trusted-by/Aionion_Logo.svg';
import allcargoLogo from '../../assets/logos/trusted-by/Allcargo_Logo.svg';
import iknEngineeringLogo from '../../assets/logos/trusted-by/IKN_Engineering_Logo.svg';
import walmartLogo from '../../assets/logos/trusted-by/WMT-Wordmark-Standard-TrueBlue-RGB.svg';
import infosysLogo from '../../assets/logos/trusted-by/infosys-logo-svg.svg';

const PARTNER_LOGOS = [
  { id: 'allcargo', name: 'Allcargo', src: allcargoLogo },
  { id: 'infosys', name: 'Infosys', src: infosysLogo },
  { id: 'walmart', name: 'Walmart', src: walmartLogo },
  { id: 'aionion', name: 'Aionion', src: aionionLogo },
  { id: 'ikn-engineering', name: 'IKN Engineering', src: iknEngineeringLogo },
];

export default function TrustedBy() {
  // Repeat array so each half has 15 items (30 items total) for an infinite, continuous loop
  const baseLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];
  const marqueeItems = [...baseLogos, ...baseLogos];

  const containerRef = useRef(null);
  const scrollPosRef = useRef(0);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const resumeTimeoutRef = useRef(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Smooth, continuous auto-scroll at a relaxed, reduced speed (~45px/s)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    // Slower, gentle speed (0.48px per frame ≈ 28px/second)
    const speed = 0.48;

    const tick = () => {
      if (!isInteractingRef.current && container) {
        scrollPosRef.current += speed;

        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0) {
          if (scrollPosRef.current >= halfWidth) {
            scrollPosRef.current -= halfWidth;
          } else if (scrollPosRef.current <= 0) {
            scrollPosRef.current += halfWidth;
          }
          container.scrollLeft = scrollPosRef.current;
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Seamless wrap-around when user scrolls or swipes manually
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const halfWidth = container.scrollWidth / 2;
    if (halfWidth <= 0) return;

    if (isInteractingRef.current) {
      scrollPosRef.current = container.scrollLeft;
    }

    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
      scrollPosRef.current = container.scrollLeft;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += halfWidth;
      scrollPosRef.current = container.scrollLeft;
    }
  };

  // Touch handlers for Mobile and Tablet (natural swipe gesture)
  const handleTouchStart = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
      isInteractingRef.current = false;
    }, 1200);
  };

  // Mouse Drag handlers for Desktop (click-and-drag)
  const handleMouseDown = (e) => {
    isInteractingRef.current = true;
    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollStartRef.current = containerRef.current.scrollLeft;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    const newScroll = scrollStartRef.current - walk;
    containerRef.current.scrollLeft = newScroll;
    scrollPosRef.current = newScroll;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsGrabbing(false);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        if (containerRef.current) {
          scrollPosRef.current = containerRef.current.scrollLeft;
        }
        isInteractingRef.current = false;
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsGrabbing(false);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        if (containerRef.current) {
          scrollPosRef.current = containerRef.current.scrollLeft;
        }
        isInteractingRef.current = false;
      }, 1000);
    }
  };

  const handleWheel = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
      isInteractingRef.current = false;
    }, 1200);
  };

  return (
    <section className="trusted-by-section stacked-section stacked-section-5" id="partners" aria-label="Trusted By Partners">
      <div className="container trusted-by-container">
        
        {/* Contained stadium card wrapper (1040px max-width, not full-width) */}
        <div className="trusted-by-card">
          
          {/* Contained Cricket Stadium Background Visual with Grass & Ball */}
          <div 
            className="trusted-by-bg-layer" 
            style={{ backgroundImage: `url(${cricketFieldBg})` }}
            aria-hidden="true"
          />

          {/* Minimal top gradient for clear text readability without darkening field/ball */}
          <div className="trusted-by-overlay" aria-hidden="true" />

          {/* Main Card Content */}
          <div className="trusted-by-content">
            
            {/* Top Centered Section Header */}
            <div className="trusted-header">
              <div className="trusted-accent-line" aria-hidden="true"></div>
              
              <h2 className="trusted-heading">
                <span className="text-white">TRUSTED </span>
                <span className="text-red">BY</span>
              </h2>

              <p className="trusted-subtitle">
                TEAMS • COMPANIES • INSTITUTIONS • COMMUNITIES
              </p>
            </div>

            {/* Continuous auto-scroll marquee + interactive swipe/drag across mobile, tablet, and desktop */}
            <div 
              ref={containerRef}
              className={`trusted-marquee-container ${isGrabbing ? 'is-grabbing' : ''}`}
              role="region" 
              aria-label="Partner logos scrolling carousel"
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onWheel={handleWheel}
            >
              <div className="trusted-marquee-track">
                {marqueeItems.map((logo, index) => (
                  <div 
                    key={`${logo.id}-${index}`} 
                    className="trusted-logo-card"
                    title={logo.name}
                  >
                    <div className="card-logo-wrapper">
                      <img 
                        src={logo.src} 
                        alt={logo.name} 
                        className="partner-logo-img" 
                        loading="lazy"
                        draggable="false"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
