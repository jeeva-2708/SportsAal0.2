-- Sportsaal 3.0 MySQL / MariaDB Schema
-- Designed for MySQL 8.0+ / MariaDB 10.4+ / Hostinger phpMyAdmin

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  alt_text VARCHAR(255) NOT NULL DEFAULT '',
  section_tag VARCHAR(100) NOT NULL DEFAULT 'general',
  file_url TEXT NOT NULL,
  original_filename VARCHAR(255) DEFAULT '',
  mime_type VARCHAR(80) DEFAULT 'image/webp',
  width INT DEFAULT 0,
  height INT DEFAULT 0,
  size_bytes INT DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_media_gallery_tag (section_tag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_sections (
  section_key VARCHAR(64) PRIMARY KEY,
  content JSON NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(180) NOT NULL,
  tagline VARCHAR(255) NOT NULL DEFAULT '',
  category VARCHAR(160) NOT NULL DEFAULT '',
  short_description TEXT NULL,
  card_image TEXT NULL,
  card_media_id INT NULL,
  hero_image TEXT NULL,
  hero_media_id INT NULL,
  is_featured_home BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  display_config JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_sort (sort_order, id),
  CONSTRAINT fk_services_card_media FOREIGN KEY (card_media_id) REFERENCES media_gallery(id) ON DELETE SET NULL,
  CONSTRAINT fk_services_hero_media FOREIGN KEY (hero_media_id) REFERENCES media_gallery(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  tag VARCHAR(100) NOT NULL DEFAULT '',
  price_label VARCHAR(100) NOT NULL DEFAULT '',
  description TEXT NULL,
  highlights JSON NULL,
  image_url TEXT NULL,
  media_id INT NULL,
  cta_text VARCHAR(80) NOT NULL DEFAULT 'Inquire Now',
  display_config JSON NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_service_items_service (service_id, sort_order, id),
  CONSTRAINT fk_items_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_media FOREIGN KEY (media_id) REFERENCES media_gallery(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(60) NOT NULL DEFAULT '',
  subject VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_inquiries_status (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

