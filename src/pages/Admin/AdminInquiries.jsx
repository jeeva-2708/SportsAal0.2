import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../lib/api.js';
import { useConfirm } from './context/ConfirmContext.jsx';

export default function AdminInquiries() {
  const confirm = useConfirm();
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
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

  const handleStatusChangeRequest = async (inq, nextStatus) => {
    if (!nextStatus || nextStatus === inq.status) return;
    const currentLabel = inq.status ? (inq.status[0].toUpperCase() + inq.status.slice(1)) : 'Unknown';
    const nextLabel = nextStatus[0].toUpperCase() + nextStatus.slice(1);

    const ok = await confirm({
      title: 'Update Inquiry Status',
      message: `Are you sure you want to change the status of this inquiry from "${inq.name}" from ${currentLabel} to ${nextLabel}?`,
      confirmText: `Change to ${nextLabel}`,
      cancelText: `Keep as ${currentLabel}`,
      variant: 'primary',
    });

    if (!ok) return;

    try {
      await adminApi.updateInquiryStatus(inq.id, nextStatus);
      setInquiries((prev) => prev.map((x) => (x.id === inq.id ? { ...x, status: nextStatus } : x)));
    } catch (err) {
      setError(err.message || 'Status update failed.');
    }
  };

  const handleDeleteRequest = async (inq) => {
    const ok = await confirm({
      title: 'Delete Inquiry Permanently',
      message: `Are you sure you want to permanently delete the inquiry from "${inq.name}" (${inq.email})? This action cannot be undone.`,
      confirmText: 'Delete Inquiry',
      cancelText: 'Cancel',
      variant: 'danger',
    });

    if (!ok) return;

    try {
      await adminApi.deleteInquiry(inq.id);
      setInquiries((prev) => prev.filter((x) => x.id !== inq.id));
    } catch (err) {
      setError(err.message || 'Delete failed.');
    }
  };

  const q = search.trim().toLowerCase();
  const visible = inquiries.filter((i) => {
    const matchesStatus = filter === 'all' || i.status === filter;
    const matchesSearch =
      !q ||
      (i.name || '').toLowerCase().includes(q) ||
      (i.email || '').toLowerCase().includes(q) ||
      (i.subject || '').toLowerCase().includes(q) ||
      (i.message || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Contact Inquiries Inbox</h1>
          <p className="admin-page-subtitle">
            Messages submitted through the Contact Us section or redirected from Services.
          </p>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {/* Unified Clean Single-Row Filter + Search Toolbar */}
      <div className="admin-clean-toolbar">
        <div className="toolbar-select-group">
          <label htmlFor="inquiries-status-filter" className="admin-label">
            Status
          </label>
          <select
            id="inquiries-status-filter"
            className="admin-input admin-toolbar-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Inquiries ({inquiries.length})</option>
            <option value="new">
              New ({inquiries.filter((i) => i.status === 'new').length})
            </option>
            <option value="contacted">
              Contacted ({inquiries.filter((i) => i.status === 'contacted').length})
            </option>
            <option value="archived">
              Archived ({inquiries.filter((i) => i.status === 'archived').length})
            </option>
          </select>
        </div>

        <input
          type="search"
          className="admin-input admin-search-input"
          placeholder="Search name, email, or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                    {inq.status ? `${inq.status[0].toUpperCase()}${inq.status.slice(1)}` : ''}
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
                    onChange={(e) => handleStatusChangeRequest(inq, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    type="button"
                    className="admin-btn-ghost-danger admin-btn-sm"
                    onClick={() => handleDeleteRequest(inq)}
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
