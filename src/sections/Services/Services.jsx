import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { useStickySection } from '../../hooks/useStickySection';
import { useSiteData } from '../../context/SiteDataContext.jsx';

const CARDS_PER_PAGE = 6;

export default function Services() {
  const sectionRef = useStickySection();
  const { sections, services } = useSiteData();
  const headerCfg = sections?.services_section || {};

  const activeServices = services.filter((s) => s.is_active !== false);
  const totalPages = Math.max(1, Math.ceil(activeServices.length / CARDS_PER_PAGE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage((prev) => (prev >= totalPages ? Math.max(0, totalPages - 1) : prev));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages - 1);
  const hasMultiplePages = activeServices.length > CARDS_PER_PAGE;
  const visibleServices = activeServices.slice(
    safePage * CARDS_PER_PAGE,
    (safePage + 1) * CARDS_PER_PAGE
  );

  return (
    <section ref={sectionRef} className="services-section stacked-section stacked-section-3" id="services">
      <div className="container services-container">
        {/* Centered Section Header */}
        <div className="services-header">
          <div className="services-tag">
            <span className="services-tag-line"></span>
            <span className="services-tag-text">{headerCfg.tagText || 'OUR SERVICES'}</span>
          </div>

          <h2 className="services-title">
            <span className="title-navy">{headerCfg.titlePrimary || 'COMPLETE SOLUTIONS.'}</span>{' '}
            <span className="title-red">{headerCfg.titleAccent || 'BUILT FOR SPORT.'}</span>
          </h2>

          <p className="services-description">
            {headerCfg.description ||
              'From world-class venues to professional tournaments and expert coaching, we deliver end-to-end sports solutions tailored to your goals.'}
          </p>
        </div>

        {/* 3x2 Service Cards Grid (Max 6 per page) */}
        <div className="services-grid">
          {visibleServices.map((svc) => (
            <Link key={svc.id || svc.slug} to={`/services/${svc.slug}`} className="service-card">
              <div
                className="card-bg-image"
                style={{ backgroundImage: `url(${svc.card_image || svc.hero_image || ''})` }}
              ></div>
              <div className="card-gradient-overlay"></div>

              <div className="card-content">
                <h3 className="card-title">
                  {svc.title}
                  <span className="card-title-arrow">→</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Arrow Pagination Controls (Shown automatically when > 6 active services) */}
        {hasMultiplePages && (
          <div className="services-pagination" role="navigation" aria-label="Services pages">
            <button
              type="button"
              className="services-nav-arrow"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              aria-label="Previous services"
              title="Previous services"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="services-page-dots" role="tablist" aria-label="Service page selector">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={safePage === idx}
                  aria-label={`Show services page ${idx + 1} of ${totalPages}`}
                  className={`services-page-dot ${safePage === idx ? 'is-active' : ''}`}
                  onClick={() => setPage(idx)}
                />
              ))}
            </div>

            <button
              type="button"
              className="services-nav-arrow"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              aria-label="Next remaining services"
              title="Next remaining services"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Center Bottom Action CTA Button */}
        <div className="services-bottom-cta">
          <Link to={headerCfg.ctaHref || '/services/corporate-events'} className="btn-services-cta">
            <span>{headerCfg.ctaText || 'ALL SERVICES'}</span>
            <span className="cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
