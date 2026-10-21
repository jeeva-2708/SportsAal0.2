import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { servicesData, allServicesList } from '../../data/servicesData';
import './ServiceDetail.css';

// Feature SVG Icons Helper
function ServiceFeatureIcon({ type }) {
  const stroke = 'var(--color-primary, #EF1C24)';
  const strokeWidth = 2;

  switch (type) {
    case 'trophy':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7v3h10v-3h-2c-.55 0-1-.45-1-1v-2.34" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        </svg>
      );
    case 'video':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'award':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    case 'field':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V10a7 7 0 0 1 14 0v11" />
          <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
          <path d="M2 10h20" />
          <path d="M12 3v3" />
        </svg>
      );
    case 'calendar':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'zap':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'users':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'activity':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'target':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'compass':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
  }
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData[slug];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  // Filter other services for bottom switcher
  const otherServices = allServicesList.filter((item) => item.slug !== service.slug);

  return (
    <article className="service-detail-page">
      {/* 1. Top Horizon Ambient Spotlight */}
      <div className="service-top-ambient" aria-hidden="true" />

      <div className="container service-detail-container">
        
        {/* 2. Breadcrumb Navigation Bar */}
        <nav className="service-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">HOME</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/#services" className="breadcrumb-link">SERVICES</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">{service.title}</span>
        </nav>

        {/* 3. Hero Showcase Section */}
        <section className="service-hero-grid">
          <div className="service-hero-copy">
            <div className="service-category-badge">
              <span className="badge-pulse-dot" />
              <span className="badge-label">{service.category}</span>
            </div>

            <h1 className="service-hero-heading">
              <span className="heading-primary">{service.title.split(' ')[0]}</span>{' '}
              <span className="heading-accent">{service.title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="service-hero-tagline">{service.tagline}</p>
            <p className="service-hero-intro">{service.shortDescription}</p>

            <div className="service-hero-actions">
              <a href="#inquire" className="btn-service-primary">
                <span>INQUIRE ABOUT THIS SERVICE</span>
                <span className="btn-arrow">→</span>
              </a>
              <a href="#features" className="btn-service-ghost">
                <span>EXPLORE CAPABILITIES</span>
              </a>
            </div>
          </div>

          <div className="service-hero-visual-card">
            <div 
              className="service-hero-img-backdrop" 
              style={{ backgroundImage: `url(${service.heroImage})` }} 
              role="img" 
              aria-label={service.title}
            />
            <div className="service-hero-gradient-overlay" />
            
            <div className="service-hero-floating-badge">
              <div className="badge-stat-box">
                <span className="badge-stat-val">{service.stats[0]?.value}</span>
                <span className="badge-stat-lbl">{service.stats[0]?.label}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Stats Counter Bar */}
        <section className="service-stats-strip" aria-label="Service metrics">
          {service.stats.map((stat, idx) => (
            <div key={idx} className="service-stat-item">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* 5. In-Depth Narrative Section */}
        <section className="service-narrative-section">
          <div className="narrative-header">
            <div className="narrative-tag">
              <span className="tag-line" />
              <span className="tag-title">SERVICE OVERVIEW</span>
            </div>
            <h2 className="narrative-heading">
              PRECISION EXECUTION. <span className="text-red">UNCOMPROMISING STANDARDS.</span>
            </h2>
          </div>

          <div className="narrative-body-grid">
            <div className="narrative-paragraphs">
              {service.fullDescription.map((para, i) => (
                <p key={i} className="narrative-para">{para}</p>
              ))}
            </div>

            <div className="narrative-highlights-box">
              <h3 className="highlights-box-title">WHY CHOOSE SPORTSAAL</h3>
              <ul className="highlights-list">
                {service.highlights.map((item, idx) => (
                  <li key={idx} className="highlight-item">
                    <span className="highlight-check-icon">✓</span>
                    <span className="highlight-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Core Pillars / Features Grid */}
        <section className="service-features-section" id="features">
          <div className="features-header">
            <div className="narrative-tag">
              <span className="tag-line" />
              <span className="tag-title">KEY CAPABILITIES</span>
            </div>
            <h2 className="features-heading">
              WHAT SETS OUR <span className="text-red">SOLUTION APART</span>
            </h2>
          </div>

          <div className="service-features-grid">
            {service.features.map((feat, idx) => (
              <div key={idx} className="service-feature-card">
                <div className="feature-icon-wrapper">
                  <ServiceFeatureIcon type={feat.icon} />
                </div>
                <h3 className="feature-card-title">{feat.title}</h3>
                <p className="feature-card-desc">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. How We Deliver / Workflow Steps */}
        <section className="service-workflow-section">
          <div className="workflow-header">
            <div className="narrative-tag">
              <span className="tag-line" />
              <span className="tag-title">OUR PROCESS</span>
            </div>
            <h2 className="workflow-heading">
              HOW WE DELIVER <span className="text-red">CONSISTENT EXCELLENCE</span>
            </h2>
          </div>

          <div className="service-workflow-grid">
            {service.workflow.map((step, idx) => (
              <div key={idx} className="service-workflow-card">
                <div className="step-number-badge">{step.step}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
                {idx < service.workflow.length - 1 && (
                  <div className="step-connector-line" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. Secondary Atmospheric Media Showcase */}
        <section className="service-media-banner">
          <div 
            className="media-banner-bg" 
            style={{ backgroundImage: `url(${service.secondaryImage || service.heroImage})` }} 
          />
          <div className="media-banner-overlay" />
          <div className="media-banner-content">
            <span className="media-banner-pill">ENGINEERED FOR THE MODERN GAME</span>
            <h2 className="media-banner-title">
              READY TO BRING WORLD-CLASS CRICKET TO YOUR ORGANIZATION?
            </h2>
            <p className="media-banner-subtitle">
              Partner with Sportsaal to execute memorable sports events, elite infrastructure, and performance solutions.
            </p>
            <div className="media-banner-actions">
              <a href="#inquire" className="btn-service-primary">
                <span>SCHEDULE A STRATEGY CALL</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 9. High-Conversion Inquiry / Contact Anchor Section */}
        <section className="service-inquire-section" id="inquire">
          <div className="inquire-card-container">
            <div className="inquire-card-glow" />
            <div className="inquire-card-content">
              <div className="inquire-badge">CONNECT WITH OUR OPERATIONS TEAM</div>
              <h2 className="inquire-title">
                LET'S DISCUSS YOUR <span className="text-red">{service.title}</span> NEEDS
              </h2>
              <p className="inquire-desc">
                Our specialists are on standby to structure custom pricing, venue slots, tournament proposals, or equipment packages tailored to your exact specifications.
              </p>

              <div className="inquire-contact-tiles">
                <div className="inquire-tile">
                  <span className="tile-icon">📞</span>
                  <div className="tile-info">
                    <span className="tile-label">DIRECT CALL</span>
                    <a href="tel:+919876543210" className="tile-value">+91 98765 43210</a>
                  </div>
                </div>

                <div className="inquire-tile">
                  <span className="tile-icon">✉️</span>
                  <div className="tile-info">
                    <span className="tile-label">EMAIL INQUIRY</span>
                    <a href="mailto:info@sportsaal.com" className="tile-value">info@sportsaal.com</a>
                  </div>
                </div>

                <div className="inquire-tile">
                  <span className="tile-icon">📍</span>
                  <div className="tile-info">
                    <span className="tile-label">OPERATIONS HUB</span>
                    <span className="tile-value">Chennai, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              <div className="inquire-bottom-actions">
                <Link to="/#contact" className="btn-service-primary btn-inquire-large">
                  <span>OPEN FULL CONTACT FORM</span>
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Explore Other Services Switcher */}
        <section className="related-services-section">
          <div className="related-header">
            <div className="narrative-tag">
              <span className="tag-line" />
              <span className="tag-title">EXPLORE MORE</span>
            </div>
            <h2 className="related-heading">
              DISCOVER OUR OTHER <span className="text-red">SERVICES</span>
            </h2>
          </div>

          <div className="related-services-grid">
            {otherServices.map((item) => (
              <Link key={item.slug} to={item.path} className="related-service-card">
                <div className="related-card-content">
                  <span className="related-card-title">{item.title}</span>
                  <span className="related-card-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}
