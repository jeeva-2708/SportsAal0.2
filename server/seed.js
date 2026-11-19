import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import {
  ADMIN_DEFAULTS,
  DEFAULT_UPLOADS_DIR,
  GALLERY_UPLOADS_DIR,
  UPLOADS_DIR,
} from './config.js';
import { ensureDatabaseExists, initSchema, pool, query } from './db.js';
import {
  buildInitialSections,
  buildInitialServices,
  DEFAULT_MEDIA_ASSETS,
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_ASSETS_DIR = path.resolve(__dirname, '..', 'src', 'assets');

function ensureDirectories() {
  for (const dir of [UPLOADS_DIR, GALLERY_UPLOADS_DIR, DEFAULT_UPLOADS_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

function getMimeFromExt(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'image/jpeg';
}

function syncDefaultFilesToUploads() {
  ensureDirectories();
  const assetFiles = {};

  for (const asset of DEFAULT_MEDIA_ASSETS) {
    const srcPath = path.join(SRC_ASSETS_DIR, asset.srcRel);
    const destPath = path.join(DEFAULT_UPLOADS_DIR, asset.destName);
    let sizeBytes = 0;

    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
      sizeBytes = fs.statSync(destPath).size;
    }

    assetFiles[asset.key] = {
      ...asset,
      fileUrl: `/uploads/defaults/${asset.destName}`,
      mimeType: getMimeFromExt(asset.destName),
      sizeBytes,
    };
  }

  return assetFiles;
}

export async function seedDatabaseIfNeeded() {
  const assetFiles = syncDefaultFilesToUploads();

  // 1. Admin user
  const adminCount = await query('SELECT COUNT(*) AS cnt FROM admin_users');
  if (adminCount.rows[0].cnt === 0) {
    const passwordHash = await bcrypt.hash(ADMIN_DEFAULTS.password, 10);
    await query(
      `INSERT INTO admin_users (email, name, password_hash)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE email = email`,
      [ADMIN_DEFAULTS.email.toLowerCase(), ADMIN_DEFAULTS.name, passwordHash]
    );
    console.log(`Seeded default admin user (${ADMIN_DEFAULTS.email}).`);
  }

  // 2. Media gallery
  const mediaMap = {};
  const existingMedia = await query('SELECT id, title, file_url, section_tag FROM media_gallery');
  if (existingMedia.rowCount === 0) {
    for (const asset of DEFAULT_MEDIA_ASSETS) {
      const info = assetFiles[asset.key];
      const res = await query(
        `INSERT INTO media_gallery (title, alt_text, section_tag, file_url, original_filename, mime_type, size_bytes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          asset.title,
          asset.alt,
          asset.tag,
          info.fileUrl,
          asset.destName,
          info.mimeType,
          info.sizeBytes,
        ]
      );
      mediaMap[asset.key] = { id: res.insertId, file_url: info.fileUrl };
    }
    console.log(`Seeded ${DEFAULT_MEDIA_ASSETS.length} initial gallery items.`);
  } else {
    for (const asset of DEFAULT_MEDIA_ASSETS) {
      const info = assetFiles[asset.key];
      const found = existingMedia.rows.find((row) => row.file_url === info.fileUrl);
      mediaMap[asset.key] = found || { id: null, file_url: info.fileUrl };
    }
  }

  // 3. Site sections (insert missing keys safely without overwriting edited sections)
  const initialSections = buildInitialSections(mediaMap);
  for (const [key, content] of Object.entries(initialSections)) {
    await query(
      `INSERT INTO site_sections (section_key, content)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE section_key = section_key`,
      [key, JSON.stringify(content)]
    );
  }

  // 4. Services & 2 sample items per service
  const svcCount = await query('SELECT COUNT(*) AS cnt FROM services');
  if (svcCount.rows[0].cnt === 0) {
    const initialServices = buildInitialServices(mediaMap);
    for (const svc of initialServices) {
      const svcRes = await query(
        `INSERT INTO services
          (slug, title, tagline, category, short_description, card_image, card_media_id, hero_image, hero_media_id, is_featured_home, is_active, sort_order, display_config)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          svc.slug,
          svc.title,
          svc.tagline,
          svc.category,
          svc.short_description,
          svc.card_image,
          svc.card_media_id,
          svc.hero_image,
          svc.hero_media_id,
          svc.is_featured_home,
          true,
          svc.sort_order,
          JSON.stringify(svc.display_config),
        ]
      );

      const serviceId = svcRes.insertId;
      for (const item of svc.items) {
        await query(
          `INSERT INTO service_items
            (service_id, title, tag, price_label, description, highlights, image_url, media_id, cta_text, is_active, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            serviceId,
            item.title,
            item.tag,
            item.price_label,
            item.description,
            JSON.stringify(item.highlights),
            item.image_url,
            item.media_id,
            item.cta_text,
            true,
            item.sort_order,
          ]
        );
      }
    }
    console.log(`Seeded ${initialServices.length} services with sample items.`);
  }
}

export async function bootstrapDatabase() {
  await ensureDatabaseExists();
  await initSchema();
  await seedDatabaseIfNeeded();
}

// Allow running directly via `node server/seed.js`
const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isDirectRun) {
  bootstrapDatabase()
    .then(() => {
      console.log('MySQL database initialized & seeded successfully.');
      return pool.end();
    })
    .catch((err) => {
      console.error('Database bootstrap failed:', err.message);
      process.exit(1);
    });
}

