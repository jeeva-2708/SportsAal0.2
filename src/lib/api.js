/**
 * Unified HTTP API client for Sportsaal backend (PostgreSQL + Express).
 * Always includes credentials so HTTP-only admin session cookies persist cleanly on reload.
 */

async function request(url, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = isFormData
    ? { ...(options.headers || {}) }
    : { 'Content-Type': 'application/json', ...(options.headers || {}) };

  const res = await fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || `HTTP ${res.status}` };
  }

  if (!res.ok) {
    const err = new Error(data?.error || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const publicApi = {
  getBootstrap: () => request('/api/public/bootstrap'),
  getServiceBySlug: (slug) => request(`/api/public/services/${encodeURIComponent(slug)}`),
  submitContact: (payload) =>
    request('/api/public/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

export const authApi = {
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    request('/api/auth/logout', {
      method: 'POST',
    }),
  getMe: () => request('/api/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    request('/api/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

export const adminApi = {
  getDashboard: () => request('/api/admin/dashboard'),
  getSections: () => request('/api/admin/sections'),
  updateSection: (key, content) =>
    request(`/api/admin/sections/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    }),
  getGallery: ({ tag = 'all', search = '' } = {}) => {
    const qs = new URLSearchParams();
    if (tag) qs.set('tag', tag);
    if (search) qs.set('search', search);
    return request(`/api/admin/gallery?${qs.toString()}`);
  },
  uploadGalleryFiles: (files, { sectionTag = 'general', title = '', altText = '' } = {}) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('files', file));
    formData.append('sectionTag', sectionTag);
    if (title) formData.append('title', title);
    if (altText) formData.append('altText', altText);
    return request('/api/admin/gallery/upload', {
      method: 'POST',
      body: formData,
    });
  },
  updateMedia: (id, payload) =>
    request(`/api/admin/gallery/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  assignMedia: (id, target) =>
    request(`/api/admin/gallery/${id}/assign`, {
      method: 'POST',
      body: JSON.stringify({ target }),
    }),
  deleteMedia: (id) =>
    request(`/api/admin/gallery/${id}`, {
      method: 'DELETE',
    }),
  getServices: () => request('/api/admin/services'),
  createService: (payload) =>
    request('/api/admin/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateService: (id, payload) =>
    request(`/api/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  resetServiceItemOverrides: (id, fieldKey = null) =>
    request(`/api/admin/services/${id}/reset-item-overrides`, {
      method: 'POST',
      body: JSON.stringify({ fieldKey }),
    }),
  deleteService: (id) =>
    request(`/api/admin/services/${id}`, {
      method: 'DELETE',
    }),
  getServiceItems: (serviceId = null) => {
    const url = serviceId
      ? `/api/admin/service-items?serviceId=${encodeURIComponent(serviceId)}`
      : '/api/admin/service-items';
    return request(url);
  },
  createServiceItem: (payload) =>
    request('/api/admin/service-items', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateServiceItem: (id, payload) =>
    request(`/api/admin/service-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteServiceItem: (id) =>
    request(`/api/admin/service-items/${id}`, {
      method: 'DELETE',
    }),
  getInquiries: () => request('/api/admin/inquiries'),
  updateInquiryStatus: (id, status) =>
    request(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  deleteInquiry: (id) =>
    request(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
    }),
};

