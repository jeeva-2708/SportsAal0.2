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
      .catch((err) => setError(err.message || 'Unable to load dashboard metrics.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="admin-empty-box">Loading dashboard...</div>;
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
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">
            Quick summary of your website content, media, and visitor inquiries.
          </p>
        </div>
      </div>

      {/* Focused 4-Card KPI Row */}
      <div className="admin-stats-grid">
        <Link to="/admin-portal/services" className="admin-stat-card">
          <span className="stat-card-label">Services</span>
          <strong className="stat-card-num">{stats.services?.total ?? 0}</strong>
          <span className="stat-card-sub">{stats.services?.active ?? 0} active on site</span>
        </Link>

        <Link to="/admin-portal/service-items" className="admin-stat-card">
          <span className="stat-card-label">Service Offerings</span>
          <strong className="stat-card-num">{stats.items?.total ?? 0}</strong>
          <span className="stat-card-sub">{stats.items?.active ?? 0} active items</span>
        </Link>

        <Link to="/admin-portal/gallery" className="admin-stat-card">
          <span className="stat-card-label">Gallery Media</span>
          <strong className="stat-card-num">{stats.mediaTotal ?? 0}</strong>
          <span className="stat-card-sub">
            {stats.heroCards ?? 0} hero · {stats.partners ?? 0} partners
          </span>
        </Link>

        <Link to="/admin-portal/inquiries" className="admin-stat-card is-highlight">
          <span className="stat-card-label">Unread Inquiries</span>
          <strong className="stat-card-num">{stats.inquiries?.unread ?? 0}</strong>
          <span className="stat-card-sub">{stats.inquiries?.total ?? 0} total received</span>
        </Link>
      </div>

      <div className="admin-dashboard-split">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Quick Shortcuts</h2>
          </div>
          <div className="admin-quick-links">
            <Link to="/admin-portal/services" className="admin-quick-tile">
              <strong>Services &amp; View Page Toggles</strong>
              <span>Add/edit services or adjust header and grid layout</span>
            </Link>
            <Link to="/admin-portal/service-items" className="admin-quick-tile">
              <strong>Service Data &amp; Offerings</strong>
              <span>Manage venue and service cards (0 items shows Coming Soon)</span>
            </Link>
            <Link to="/admin-portal/gallery" className="admin-quick-tile">
              <strong>Media Gallery</strong>
              <span>Upload images and assign them to any section</span>
            </Link>
            <Link to="/admin-portal/sections/hero" className="admin-quick-tile">
              <strong>Hero &amp; About Sections</strong>
              <span>Update Hero card count/order or About poster photo</span>
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Inquiries</h2>
            <Link to="/admin-portal/inquiries" className="admin-link-sm">
              View All →
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="admin-empty-inline">
              No inquiries yet. Messages from the Contact Us form will appear here.
            </div>
          ) : (
            <div className="admin-recent-list">
              {recent.map((inq) => (
                <div key={inq.id} className="admin-recent-row">
                  <div style={{ minWidth: 0 }}>
                    <strong>{inq.name}</strong>
                    <span className="recent-meta"> · {inq.subject}</span>
                    <p className="recent-msg">{inq.message}</p>
                  </div>
                  <span className={`admin-status-badge status-${inq.status}`}>
                    {inq.status ? `${inq.status[0].toUpperCase()}${inq.status.slice(1)}` : ''}
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
