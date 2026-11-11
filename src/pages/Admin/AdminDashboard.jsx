import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../lib/api.js';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi
      .getDashboard()
      .then((res) => setData(res))
      .catch((err) => setError(err.message || 'Unable to load dashboard stats.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="admin-empty-box">Loading dashboard metrics...</div>;
  }

  if (error) {
    return <div className="admin-alert admin-alert-error">{error}</div>;
  }

  const stats = data?.stats || {};
  const recent = data?.recentInquiries || [];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">DASHBOARD OVERVIEW</h1>
          <p className="admin-page-subtitle">
            Control all website sections, service categories, service view offerings, and gallery media from one portal.
          </p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <Link to="/admin-login/services" className="admin-stat-card">
          <span className="stat-card-label">SERVICES</span>
          <strong className="stat-card-num">{stats.services?.total ?? 0}</strong>
          <span className="stat-card-sub">{stats.services?.active ?? 0} active on site</span>
        </Link>

        <Link to="/admin-login/service-items" className="admin-stat-card">
          <span className="stat-card-label">SERVICE OFFERINGS</span>
          <strong className="stat-card-num">{stats.items?.total ?? 0}</strong>
          <span className="stat-card-sub">{stats.items?.active ?? 0} active items</span>
        </Link>

        <Link to="/admin-login/gallery" className="admin-stat-card">
          <span className="stat-card-label">GALLERY ASSETS</span>
          <strong className="stat-card-num">{stats.mediaTotal ?? 0}</strong>
          <span className="stat-card-sub">Ready for section picker</span>
        </Link>

        <Link to="/admin-login/inquiries" className="admin-stat-card is-highlight">
          <span className="stat-card-label">INQUIRIES INBOX</span>
          <strong className="stat-card-num">{stats.inquiries?.unread ?? 0}</strong>
          <span className="stat-card-sub">{stats.inquiries?.total ?? 0} total messages</span>
        </Link>

        <Link to="/admin-login/sections/hero" className="admin-stat-card">
          <span className="stat-card-label">HERO CARDS</span>
          <strong className="stat-card-num">{stats.heroCards ?? 0}</strong>
          <span className="stat-card-sub">Panorama ribbon photos</span>
        </Link>

        <Link to="/admin-login/sections/trusted_by" className="admin-stat-card">
          <span className="stat-card-label">PARTNERS &amp; REVIEWS</span>
          <strong className="stat-card-num">
            {(stats.partners ?? 0) + (stats.testimonials ?? 0)}
          </strong>
          <span className="stat-card-sub">
            {stats.partners ?? 0} logos · {stats.testimonials ?? 0} reviews
          </span>
        </Link>
      </div>

      <div className="admin-dashboard-split">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">QUICK ACTIONS</h2>
          </div>
          <div className="admin-quick-links">
            <Link to="/admin-login/services" className="admin-quick-tile">
              <strong>Manage Services &amp; Display Toggles</strong>
              <span>Add, edit, delete services &amp; toggle fields on public view pages</span>
            </Link>
            <Link to="/admin-login/service-items" className="admin-quick-tile">
              <strong>Add / Edit Service Items</strong>
              <span>Manage offerings inside each service (0 items shows Coming Soon)</span>
            </Link>
            <Link to="/admin-login/gallery" className="admin-quick-tile">
              <strong>Upload to Gallery &amp; Assign to Sections</strong>
              <span>Upload optimized photos &amp; assign them to Hero, About, or Services</span>
            </Link>
            <Link to="/admin-login/sections/about" className="admin-quick-tile">
              <strong>Edit About &amp; Hero Content</strong>
              <span>Update headlines, narratives, badges, and ribbon cards</span>
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">RECENT INQUIRIES</h2>
            <Link to="/admin-login/inquiries" className="admin-link-sm">View All →</Link>
          </div>
          {recent.length === 0 ? (
            <div className="admin-empty-inline">
              No inquiries received yet. When visitors click a Service or submit Contact Us, inquiries appear here.
            </div>
          ) : (
            <div className="admin-recent-list">
              {recent.map((inq) => (
                <div key={inq.id} className="admin-recent-row">
                  <div>
                    <strong>{inq.name}</strong>
                    <span className="recent-meta"> · {inq.subject}</span>
                    <p className="recent-msg">{inq.message}</p>
                  </div>
                  <span className={`admin-status-badge status-${inq.status}`}>
                    {inq.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
