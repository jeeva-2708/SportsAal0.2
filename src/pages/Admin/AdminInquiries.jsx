import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../lib/api.js';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getInquiries();
      setInquiries(res.inquiries || []);
    } catch (err) {
      setError(err.message || 'Unable to load inquiries.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id, status) => {
    try {
      await adminApi.updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status } : x)));
    } catch (err) {
      setError(err.message || 'Status update failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await adminApi.deleteInquiry(id);
      setInquiries((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      setError(err.message || 'Delete failed.');
    }
  };

  const visible =
    filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">CONTACT INQUIRIES INBOX</h1>
          <p className="admin-page-subtitle">
            Messages submitted through the Contact Us section or redirected from Services.
          </p>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="gallery-filter-pills" style={{ marginBottom: '1.25rem' }}>
        {[
          { key: 'all', label: `All (${inquiries.length})` },
          { key: 'new', label: 'New' },
          { key: 'contacted', label: 'Contacted' },
          { key: 'archived', label: 'Archived' },
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            className={`admin-pill-btn ${filter === f.key ? 'is-active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-empty-box">Loading inquiries...</div>
      ) : visible.length === 0 ? (
        <div className="admin-empty-box">No inquiries found in this view.</div>
      ) : (
        <div className="admin-inquiries-list">
          {visible.map((inq) => (
            <div key={inq.id} className="admin-card admin-inquiry-card">
              <div className="inquiry-card-top">
                <div>
                  <span className={`admin-status-badge status-${inq.status}`}>
                    {inq.status.toUpperCase()}
                  </span>
                  <h3 className="inquiry-sender">{inq.name}</h3>
                  <p className="inquiry-contact-meta">
                    <a href={`mailto:${inq.email}`}>{inq.email}</a>
                    {inq.phone ? ` · ${inq.phone}` : ''}
                    {' · '}
                    <strong>{inq.subject}</strong>
                  </p>
                </div>

                <div className="inquiry-actions">
                  <select
                    className="admin-input"
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    type="button"
                    className="admin-btn-ghost-danger"
                    onClick={() => handleDelete(inq.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="inquiry-message-body">{inq.message}</p>
              <span className="inquiry-timestamp">
                Received: {new Date(inq.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
