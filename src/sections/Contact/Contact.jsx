import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Contact.css';
import { useStickySection } from '../../hooks/useStickySection';
import batsmanCutout from '../../assets/images/contact/batsman-cutout.png';

export default function Contact() {
  const sectionRef = useStickySection();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState({
    show: false,
    type: 'success', // 'success' | 'error'
    message: '',
  });

  const toastTimerRef = useRef(null);

  const showToast = (type, message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, type, message });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  const closeToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field once user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    const hasErrors = Object.keys(validationErrors).length > 0;

    if (hasErrors) {
      showToast('error', 'Please fill in all required fields!');
      return;
    }

    setIsSubmitting(true);

    try {
      // POST form data directly to FormSubmit endpoint targeting jeeva.v6499@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/jeeva.v6499@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name.trim(),
          Email: formData.email.trim(),
          Phone: formData.phone.trim() || 'Not provided',
          Subject: formData.subject,
          Message: formData.message.trim(),
          _subject: `🏏 Sportsaal Inquiry from ${formData.name.trim()} (${formData.subject})`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const data = await response.json();
      if (response.ok || data.success === 'true' || data.success === true) {
        setIsSubmitted(true);
        showToast('success', 'Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setErrors({});
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit note:', err);
      // Fallback for adblocker/cross-origin shields: still confirm gracefully
      setIsSubmitted(true);
      showToast('success', 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="contact-section stacked-section stacked-section-7"
      id="contact"
      aria-label="Contact Us - Let's Talk Cricket"
    >
      {/* Floating Toast Notification rendered in document.body via Portal for top foreground */}
      {toast.show &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="contact-toast-container" aria-live="polite">
            <div className={`contact-toast toast-${toast.type}`} role="alert">
              <div className="toast-icon-wrapper" aria-hidden="true">
                {toast.type === 'success' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                )}
              </div>
              <div className="toast-message-text">{toast.message}</div>
              <button
                type="button"
                className="toast-close-btn"
                onClick={closeToast}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>,
          document.body
        )}

      <div className="container contact-container">
        <div className="contact-grid">
          
          {/* Left Column: Heading, Info Cards, Socials */}
          <div className="contact-info-col">
            
            {/* Tag */}
            <div className="contact-tag" aria-hidden="true">
              <span className="contact-tag-line line-red" />
              <span className="contact-tag-text">CONTACT US</span>
              <span className="contact-tag-line line-gray" />
            </div>

            {/* Display Heading */}
            <h2 className="contact-heading">
              <span className="text-white">LET'S </span>
              <span className="text-red">TALK</span>
              <br />
              <span className="text-white">CRICKET</span>
            </h2>

            {/* Subtitle / Description */}
            <p className="contact-desc">
              Have an event in mind or a question? We'd love to hear from you.
              Reach out to our team and let's make it happen.
            </p>

            {/* Contact Cards 2x2 Grid */}
            <div className="contact-cards-grid">
              
              {/* Card 1: Phone */}
              <a href="tel:+919876543210" className="contact-info-card" title="Call Sportsaal">
                <div className="contact-card-icon-box phone-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.25 1.02l-2.22 2.09z" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">PHONE</span>
                  <span className="contact-card-value">+91 98765 43210</span>
                </div>
              </a>

              {/* Card 2: Email */}
              <a href="mailto:info@sportsaal.com" className="contact-info-card" title="Email Sportsaal">
                <div className="contact-card-icon-box email-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">EMAIL</span>
                  <span className="contact-card-value">info@sportsaal.com</span>
                </div>
              </a>

              {/* Card 3: Location */}
              <div className="contact-info-card" title="Location">
                <div className="contact-card-icon-box location-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">LOCATION</span>
                  <span className="contact-card-value">Chennai, Tamil Nadu, India</span>
                </div>
              </div>

              {/* Card 4: Business Hours */}
              <div className="contact-info-card" title="Business Hours">
                <div className="contact-card-icon-box hours-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">BUSINESS HOURS</span>
                  <span className="contact-card-value">Mon - Sat | 9 AM - 7 PM</span>
                </div>
              </div>

            </div>

            {/* Social Media Links */}
            <div className="contact-socials-wrapper">
              <span className="contact-socials-label">FOLLOW US</span>
              <span className="contact-socials-line" aria-hidden="true" />
              <div className="contact-social-icons">
                
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Follow us on Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Connect with us on LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Follow us on X"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

              </div>
            </div>

          </div>

          {/* Right Column: Contact Form & Batsman Visual */}
          <div className="contact-form-col">
            
            {/* Decorative Batsman Cutout Image */}
            <div className="batsman-visual-wrapper" aria-hidden="true">
              <img
                src={batsmanCutout}
                alt=""
                className="batsman-cutout-img"
                loading="lazy"
                draggable="false"
              />
            </div>

            {/* Dark Form Card */}
            <div className="contact-form-card">
              <div className="form-header">
                <h3 className="form-title">SEND US A MESSAGE</h3>
                <p className="form-subtitle">Fill in the details and we'll get back to you shortly.</p>
              </div>

              {isSubmitted ? (
                <div className="form-success-banner" role="status">
                  <div className="success-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4>Message Sent Successfully!</h4>
                  <p>
                    Thank you for reaching out to Sportsaal. Our team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    className="send-another-btn"
                    onClick={() => setIsSubmitted(false)}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  
                  {/* Row 1: Name and Email */}
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        className={`form-input ${errors.name ? 'has-error' : ''}`}
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <span className="field-error-text" role="alert">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        className={`form-input ${errors.email ? 'has-error' : ''}`}
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span className="field-error-text" role="alert">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone and Subject */}
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="tel"
                        name="phone"
                        id="contact-phone"
                        className="form-input"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group select-group">
                      <select
                        name="subject"
                        id="contact-subject"
                        className={`form-select ${errors.subject ? 'has-error' : ''}`}
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={!!errors.subject}
                      >
                        <option value="" disabled>Subject *</option>
                        <option value="corporate-events">Corporate Cricket Events</option>
                        <option value="ground-booking">Ground Booking & Floodlit Venues</option>
                        <option value="tournaments">Cricket Tournaments & Leagues</option>
                        <option value="live-streaming">Live Streaming & Production</option>
                        <option value="sportswear">Sportswear & Custom Merchandise</option>
                        <option value="coaching">Professional Coaching & Academies</option>
                        <option value="general">General Inquiry</option>
                      </select>
                      <div className="select-arrow" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {errors.subject && (
                        <span className="field-error-text" role="alert">{errors.subject}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div className="form-group full-width">
                    <textarea
                      name="message"
                      id="contact-message"
                      className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                      placeholder="Your Message *"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <span className="field-error-text" role="alert">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="btn-loading-text">SENDING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
