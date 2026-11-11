import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { useStickySection } from '../../hooks/useStickySection';
import { useSiteData } from '../../context/SiteDataContext.jsx';

export default function Services() {
  const sectionRef = useStickySection();
  const { sections, services } = useSiteData();
  const headerCfg = sections?.services_section || {};

  const featured = services.filter((s) => s.is_featured_home !== false);
  const displayServices = featured.length > 0 ? featured : services;

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

        {/* Service Cards Grid */}
        <div className="services-grid">
          {displayServices.map((svc) => (
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
