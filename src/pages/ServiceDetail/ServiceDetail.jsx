import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { publicApi } from '../../lib/api.js';
import { useSiteData } from '../../context/SiteDataContext.jsx';
import {
  DEFAULT_DISPLAY_CONFIG,
  resolveItemFieldVisibility,
} from '../../data/fallbackSiteData.js';
import { navigateToContact } from '../../utils/navigation.js';
import './ServiceDetail.css';

export default function ServiceDetail({ forcedSlug = null }) {
  const { slug: paramSlug } = useParams();
  const slug = forcedSlug || paramSlug;
  const navigate = useNavigate();
  const location = useLocation();
  const { services: contextServices } = useSiteData();

  const [serviceState, setServiceState] = useState(null);
  const [otherServicesState, setOtherServicesState] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [activeTagFilter, setActiveTagFilter] = useState('ALL');

  // Always check fallback/context copy immediately, then hydrate from live PostgreSQL API
  useEffect(() => {
    let active = true;
    setNotFound(false);
    setActiveTagFilter('ALL');

    const ctxMatch = contextServices.find((s) => s.slug === slug);
    if (ctxMatch) {
      setServiceState(ctxMatch);
      setOtherServicesState(contextServices.filter((s) => s.slug !== slug));
    }

    publicApi
      .getServiceBySlug(slug)
      .then((res) => {
        if (!active) return;
        if (res?.service) {
          setServiceState(res.service);
          setOtherServicesState(res.otherServices || []);
          setNotFound(false);
        }
      })
      .catch((err) => {
        if (!active) return;
        if (err.status === 404) {
          setNotFound(true);
        } else if (!ctxMatch) {
          setNotFound(true);
        }
      });

    return () => {
      active = false;
    };
  }, [slug, contextServices]);

  if (notFound) {
    return <Navigate to="/" replace />;
  }

  if (!serviceState) {
    return (
      <article className="service-detail-page service-detail-loading">
        <div className="container service-detail-container">
          <div className="service-loading-msg">loading....</div>
        </div>
      </article>
    );
  }

  const service = serviceState;
  const otherServices = otherServicesState || contextServices.filter((s) => s.slug !== service.slug);
  const displayConfig = { ...DEFAULT_DISPLAY_CONFIG, ...(service.display_config || {}) };
  const items = Array.isArray(service.items) ? service.items : [];
  const showcaseMedia = Array.isArray(service.showcaseMedia) ? service.showcaseMedia : [];
  const cardsPerRow = Number(displayConfig.cardsPerRow) === 4 ? 4 : 3;

  // Unique item tags for filter bar (honoring per-card showTag overrides)
  const uniqueTags = Array.from(
    new Set(
      items
        .filter((item) => resolveItemFieldVisibility(displayConfig, item.display_config, 'showTag'))
        .map((item) => item.tag?.trim())
        .filter(Boolean)
    )
  );
  const showTagFilterBar = uniqueTags.length > 1;

  const filteredItems =
    activeTagFilter === 'ALL' || !showTagFilterBar
      ? items
      : items.filter(
          (item) =>
            resolveItemFieldVisibility(displayConfig, item.display_config, 'showTag') &&
            (item.tag || '').trim() === activeTagFilter
        );

  const handleInquiryRedirect = (itemTitle = '') => {
    const message = itemTitle
      ? `Hi Sportsaal team, I would like to inquire about "${itemTitle}" under ${service.title}.`
      : `Hi Sportsaal team, I would like to learn more about your ${service.title} service.`;

    navigateToContact(navigate, location, {
      subject: service.slug,
      message,
    });
  };

  return (
    <article className="service-detail-page">
      <div className="service-top-ambient" aria-hidden="true" />

      <div className="container service-detail-container">
        {/* 1. Breadcrumbs */}
        <nav className="service-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">HOME</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/#services" className="breadcrumb-link">SERVICES</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">{service.title}</span>
        </nav>

        {/* 2. Dynamic Offerings List OR Coming Soon Empty State */}
        <section className="svc-v2-offerings-section" id="offerings">
          <div className="svc-v2-section-header">
            <div>
              <div className="narrative-tag">
                <span className="tag-line" />
                <span className="tag-title">CURATED PACKAGES &amp; OPTIONS</span>
              </div>
              <h1 className="svc-v2-heading svc-v2-page-heading">
                WHAT WE OFFER IN <span className="text-red">{service.title}</span>
              </h1>
            </div>

            {items.length > 0 && showTagFilterBar && (
              <div className="svc-v2-filter-row" role="tablist" aria-label="Filter by category">
                <button
                  type="button"
                  className={`svc-filter-pill ${activeTagFilter === 'ALL' ? 'is-active' : ''}`}
                  onClick={() => setActiveTagFilter('ALL')}
                >
                  ALL ({items.length})
                </button>
                {uniqueTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`svc-filter-pill ${activeTagFilter === tag ? 'is-active' : ''}`}
                    onClick={() => setActiveTagFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <div className="svc-v2-coming-soon">
              <div className="coming-soon-badge">
                <span className="badge-pulse-dot" />
                <span>COMING SOON</span>
              </div>
              <h2 className="coming-soon-title">{displayConfig.emptyMessage}</h2>
              <p className="coming-soon-sub">{displayConfig.emptySubtext}</p>
              <button
                type="button"
                className="btn-service-primary"
                onClick={() => handleInquiryRedirect('')}
              >
                <span>INQUIRE WITH OUR TEAM</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          ) : (
            <div className={`svc-v2-items-grid cols-${cardsPerRow}`}>
                {filteredItems.map((item) => {
                  const showItemImage = resolveItemFieldVisibility(
                    displayConfig,
                    item.display_config,
                    'showImage'
                  );
                  const showItemTag = resolveItemFieldVisibility(
                    displayConfig,
                    item.display_config,
                    'showTag'
                  );
                  const showItemPrice = resolveItemFieldVisibility(
                    displayConfig,
                    item.display_config,
                    'showPriceOrLabel'
                  );
                  const showItemDesc = resolveItemFieldVisibility(
                    displayConfig,
                    item.display_config,
                    'showDescription'
                  );
                  const showItemHighlights = resolveItemFieldVisibility(
                    displayConfig,
                    item.display_config,
                    'showHighlights'
                  );
                  const showItemCta = resolveItemFieldVisibility(
                    displayConfig,
                    item.display_config,
                    'showContactCta'
                  );

                  const hasMetaRow =
                    (showItemTag && item.tag) || (showItemPrice && item.price_label);
                  const highlights = Array.isArray(item.highlights) ? item.highlights : [];

                  return (
                    <div key={item.id} className="svc-v2-item-card">
                      {showItemImage && item.image_url && (
                        <div className="svc-item-media">
                          <img src={item.image_url} alt={item.title} loading="lazy" />
                        </div>
                      )}

                      <div className="svc-item-body">
                        {hasMetaRow && (
                          <div className="svc-item-meta">
                            {showItemTag && item.tag && (
                              <span className="svc-item-tag">{item.tag}</span>
                            )}
                            {showItemPrice && item.price_label && (
                              <span className="svc-item-price">{item.price_label}</span>
                            )}
                          </div>
                        )}

                        <h3 className="svc-item-title">{item.title}</h3>

                        {showItemDesc && item.description && (
                          <p className="svc-item-desc">{item.description}</p>
                        )}

                        {showItemHighlights && highlights.length > 0 && (
                          <ul className="svc-item-highlights">
                            {highlights.map((bullet, bIdx) => (
                              <li key={bIdx}>
                                <span className="bullet-check">✓</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {showItemCta && (
                          <div className="svc-item-actions">
                            <button
                              type="button"
                              className="svc-item-cta-btn"
                              onClick={() => handleInquiryRedirect(item.title)}
                            >
                              <span>{item.cta_text || 'Inquire Now'}</span>
                              <span className="btn-arrow">→</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
          )}
        </section>

        {/* 4. Linked Gallery Showcase Strip (from Admin Media Gallery tagged showcase:<slug>) */}
        {displayConfig.showGalleryStrip && showcaseMedia.length > 0 && (
          <section className="svc-v2-gallery-section">
            <div className="narrative-tag">
              <span className="tag-line" />
              <span className="tag-title">VISUAL SHOWCASE</span>
            </div>
            <h2 className="svc-v2-heading">
              IN <span className="text-red">ACTION</span>
            </h2>
            <div className="svc-v2-gallery-grid">
              {showcaseMedia.map((media) => (
                <div key={media.id} className="svc-v2-gallery-card">
                  <img src={media.file_url} alt={media.alt_text || media.title} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Direct Redirect Strip to Contact Us */}
        <section className="svc-v2-contact-banner">
          <div className="svc-contact-copy">
            <span className="inquire-badge">CUSTOM PROPOSALS &amp; INQUIRIES</span>
            <h2 className="inquire-title">
              NEED A TAILORED <span className="text-red">{service.title}</span> PLAN?
            </h2>
            <p className="inquire-desc">
              No complicated booking checkouts — speak directly with our sports operations specialists and get custom dates, formats, and pricing.
            </p>
          </div>
          <button
            type="button"
            className="btn-service-primary"
            onClick={() => handleInquiryRedirect('')}
          >
            <span>GO TO CONTACT US</span>
            <span className="btn-arrow">→</span>
          </button>
        </section>

        {/* 6. Explore Other Services */}
        {otherServices.length > 0 && (
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
                <Link key={item.slug} to={`/services/${item.slug}`} className="related-service-card">
                  <div className="related-card-content">
                    <span className="related-card-title">{item.title}</span>
                    <span className="related-card-arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
