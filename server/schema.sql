-- Sportsaal 3.0 PostgreSQL Schema
-- Zero SQLite; designed for PostgreSQL 14+ / PostgreSQL 18 / Hostinger KVM VPS / Supabase

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS media_gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  alt_text VARCHAR(255) NOT NULL DEFAULT '',
  section_tag VARCHAR(100) NOT NULL DEFAULT 'general',
  file_url TEXT NOT NULL,
  original_filename VARCHAR(255) DEFAULT '',
  mime_type VARCHAR(80) DEFAULT 'image/webp',
  width INTEGER DEFAULT 0,
  height INTEGER DEFAULT 0,
  size_bytes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_gallery_tag ON media_gallery(section_tag);

CREATE TABLE IF NOT EXISTS site_sections (
  section_key VARCHAR(64) PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(180) NOT NULL,
  tagline VARCHAR(255) NOT NULL DEFAULT '',
  category VARCHAR(160) NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  card_image TEXT NOT NULL DEFAULT '',
  card_media_id INTEGER REFERENCES media_gallery(id) ON DELETE SET NULL,
  hero_image TEXT NOT NULL DEFAULT '',
  hero_media_id INTEGER REFERENCES media_gallery(id) ON DELETE SET NULL,
  is_featured_home BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  display_config JSONB NOT NULL DEFAULT '{
    "showImage": true,
    "showTag": true,
    "showPriceOrLabel": true,
    "showDescription": true,
    "showHighlights": true,
    "showContactCta": true,
    "showGalleryStrip": true,
    "emptyMessage": "GETTING THE ARENA READY. COMING SOON.",
    "emptySubtext": "We are curating championship-grade offerings and specs for this service. Reach out to our operations team for immediate custom inquiries."
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order, id);

CREATE TABLE IF NOT EXISTS service_items (
  id SERIAL PRIMARY KEY,
  service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  tag VARCHAR(100) NOT NULL DEFAULT '',
  price_label VARCHAR(100) NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL DEFAULT '',
  media_id INTEGER REFERENCES media_gallery(id) ON DELETE SET NULL,
  cta_text VARCHAR(80) NOT NULL DEFAULT 'Inquire Now',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_items_service ON service_items(service_id, sort_order, id);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(60) NOT NULL DEFAULT '',
  subject VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status, created_at DESC);
