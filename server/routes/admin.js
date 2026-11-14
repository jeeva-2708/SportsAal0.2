import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { GALLERY_UPLOADS_DIR } from '../config.js';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { DEFAULT_DISPLAY_CONFIG } from '../seedData.js';

const router = Router();
router.use(requireAdmin);

const ALLOWED_SECTION_KEYS = new Set([
  'header',
  'hero',
  'about',
  'services_section',
  'trusted_by',
  'testimonials',
  'contact',
  'footer',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 12 * 1024 * 1024, // 12 MB per image
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'image/avif',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Upload JPG, PNG, WebP, AVIF, GIF, or SVG images.'));
    }
  },
});

function sanitizeSlug(raw) {
  return String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 110);
}

function normalizeDisplayConfig(input) {
  const base = { ...DEFAULT_DISPLAY_CONFIG };
  if (!input || typeof input !== 'object') return base;
  return {
    showImage: input.showImage !== false,
    showTag: input.showTag !== false,
    showPriceOrLabel: input.showPriceOrLabel !== false,
    showDescription: input.showDescription !== false,
    showHighlights: input.showHighlights !== false,
    showContactCta: input.showContactCta !== false,
    showGalleryStrip: input.showGalleryStrip !== false,
    showHeroDescription: input.showHeroDescription !== false,
    showHeroButtons: input.showHeroButtons !== false,
    showHeroVisual: input.showHeroVisual !== false,
    showSectionIntroHeading: input.showSectionIntroHeading !== false,
    cardsPerRow: Number(input.cardsPerRow) === 4 ? 4 : 3,
    emptyMessage:
      typeof input.emptyMessage === 'string' && input.emptyMessage.trim()
        ? input.emptyMessage.trim()
        : base.emptyMessage,
    emptySubtext:
      typeof input.emptySubtext === 'string' && input.emptySubtext.trim()
        ? input.emptySubtext.trim()
        : base.emptySubtext,
  };
}

const ITEM_DISPLAY_KEYS = [
  'showImage',
  'showTag',
  'showPriceOrLabel',
  'showDescription',
  'showHighlights',
  'showContactCta',
];

function normalizeItemDisplayConfig(input) {
  if (!input || typeof input !== 'object') return {};
  const cleaned = {};
  for (const key of ITEM_DISPLAY_KEYS) {
    if (typeof input[key] === 'boolean') {
      cleaned[key] = input[key];
    }
  }
  return cleaned;
}

function normalizeHighlights(raw) {
  if (Array.isArray(raw)) {
    return raw.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}

function removeUploadedFileIfLocalGallery(fileUrl) {
  if (!fileUrl || !fileUrl.startsWith('/uploads/gallery/')) return;
  const safeName = path.basename(fileUrl);
  const fullPath = path.join(GALLERY_UPLOADS_DIR, safeName);
  if (fullPath.startsWith(GALLERY_UPLOADS_DIR) && fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}

/* --------------------------------------------------------------------------
   Dashboard Overview
   -------------------------------------------------------------------------- */
router.get('/dashboard', async (_req, res) => {
  try {
    const [svcStats, itemsStats, mediaStats, inqStats, recentInq, sectionsRes] = await Promise.all([
      query(
        `SELECT COUNT(*)::int AS total,
                COUNT(*) FILTER (WHERE is_active)::int AS active
         FROM services`
      ),
      query(
        `SELECT COUNT(*)::int AS total,
                COUNT(*) FILTER (WHERE is_active)::int AS active
         FROM service_items`
      ),
      query('SELECT COUNT(*)::int AS total FROM media_gallery'),
      query(
        `SELECT COUNT(*)::int AS total,
                COUNT(*) FILTER (WHERE status = 'new')::int AS unread
         FROM contact_inquiries`
      ),
      query(
        `SELECT id, name, email, phone, subject, message, status, created_at
         FROM contact_inquiries
         ORDER BY created_at DESC
         LIMIT 5`
      ),
      query(
        `SELECT section_key, content
         FROM site_sections
         WHERE section_key IN ('trusted_by', 'testimonials', 'hero')`
      ),
    ]);

    const sectionCounts = { partners: 0, testimonials: 0, heroCards: 0 };
    for (const row of sectionsRes.rows) {
      if (row.section_key === 'trusted_by') {
        sectionCounts.partners = Array.isArray(row.content?.logos) ? row.content.logos.length : 0;
      } else if (row.section_key === 'testimonials') {
        sectionCounts.testimonials = Array.isArray(row.content?.items) ? row.content.items.length : 0;
      } else if (row.section_key === 'hero') {
        sectionCounts.heroCards = Array.isArray(row.content?.ribbonPhotos)
          ? row.content.ribbonPhotos.length
          : 0;
      }
    }

    return res.json({
      stats: {
        services: svcStats.rows[0],
        items: itemsStats.rows[0],
        mediaTotal: mediaStats.rows[0].total,
        inquiries: inqStats.rows[0],
        ...sectionCounts,
      },
      recentInquiries: recentInq.rows,
    });
  } catch (err) {
    console.error('Admin dashboard error:', err.message);
    return res.status(500).json({ error: 'Failed to load dashboard overview.' });
  }
});

/* --------------------------------------------------------------------------
   Site Sections CMS (Header, Hero, About, Services Header, Partners, Testimonials, Contact, Footer)
   -------------------------------------------------------------------------- */
router.get('/sections', async (_req, res) => {
  try {
    const result = await query('SELECT section_key, content, updated_at FROM site_sections');
    const sections = {};
    for (const row of result.rows) {
      sections[row.section_key] = {
        content: row.content,
        updatedAt: row.updated_at,
      };
    }
    return res.json({ sections });
  } catch (err) {
    console.error('Get sections error:', err.message);
    return res.status(500).json({ error: 'Failed to load site sections.' });
  }
});

router.put('/sections/:key', async (req, res) => {
  try {
    const key = String(req.params.key || '').trim();
    if (!ALLOWED_SECTION_KEYS.has(key)) {
      return res.status(400).json({ error: `Unsupported section key: ${key}` });
    }

    const content = req.body?.content;
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ error: 'Section content payload must be a JSON object.' });
    }

    const result = await query(
      `INSERT INTO site_sections (section_key, content, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (section_key)
       DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
       RETURNING section_key, content, updated_at`,
      [key, JSON.stringify(content)]
    );

    return res.json({ section: result.rows[0] });
  } catch (err) {
    console.error('Update section error:', err.message);
    return res.status(500).json({ error: 'Failed to save section changes.' });
  }
});

/* --------------------------------------------------------------------------
   Media Gallery Manager & Direct Section Assignment
   -------------------------------------------------------------------------- */
router.get('/gallery', async (req, res) => {
  try {
    const tag = String(req.query?.tag || '').trim();
    const search = String(req.query?.search || '').trim().toLowerCase();

    const params = [];
    const clauses = [];

    if (tag && tag !== 'all') {
      if (tag === 'showcase') {
        clauses.push(`section_tag LIKE 'showcase:%'`);
      } else {
        params.push(tag);
        clauses.push(`section_tag = $${params.length}`);
      }
    }

    if (search) {
      params.push(`%${search}%`);
      clauses.push(
        `(LOWER(title) LIKE $${params.length} OR LOWER(alt_text) LIKE $${params.length} OR LOWER(section_tag) LIKE $${params.length})`
      );
    }

    const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const result = await query(
      `SELECT id, title, alt_text, section_tag, file_url, original_filename, mime_type, width, height, size_bytes, created_at
       FROM media_gallery
       ${whereSql}
       ORDER BY created_at DESC, id DESC`,
      params
    );

    return res.json({ media: result.rows });
  } catch (err) {
    console.error('Gallery list error:', err.message);
    return res.status(500).json({ error: 'Failed to load gallery.' });
  }
});

router.post('/gallery/upload', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please select at least one image file to upload.' });
    }

    if (!fs.existsSync(GALLERY_UPLOADS_DIR)) {
      fs.mkdirSync(GALLERY_UPLOADS_DIR, { recursive: true });
    }

    const sectionTag = String(req.body?.sectionTag || 'general').trim().slice(0, 100);
    const customTitle = String(req.body?.title || '').trim();
    const customAlt = String(req.body?.altText || '').trim();

    const created = [];

    for (const file of files) {
      const baseTitle =
        customTitle ||
        path
          .basename(file.originalname, path.extname(file.originalname))
          .replace(/[-_]+/g, ' ')
          .trim() ||
        'Sportsaal Image';

      const idSuffix = crypto.randomBytes(5).toString('hex');

      if (file.mimetype === 'image/svg+xml') {
        const svgText = file.buffer.toString('utf8');
        if (/<script[\s>]/i.test(svgText) || /javascript:/i.test(svgText)) {
          return res.status(400).json({ error: 'Unsafe SVG content rejected.' });
        }

        const outName = `media-${Date.now()}-${idSuffix}.svg`;
        const outPath = path.join(GALLERY_UPLOADS_DIR, outName);
        fs.writeFileSync(outPath, svgText, 'utf8');

        const insertRes = await query(
          `INSERT INTO media_gallery (title, alt_text, section_tag, file_url, original_filename, mime_type, size_bytes)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *`,
          [
            baseTitle.slice(0, 180),
            (customAlt || baseTitle).slice(0, 255),
            sectionTag,
            `/uploads/gallery/${outName}`,
            file.originalname.slice(0, 255),
            'image/svg+xml',
            Buffer.byteLength(svgText, 'utf8'),
          ]
        );
        created.push(insertRes.rows[0]);
      } else {
        const outName = `media-${Date.now()}-${idSuffix}.webp`;
        const outPath = path.join(GALLERY_UPLOADS_DIR, outName);

        const info = await sharp(file.buffer)
          .rotate()
          .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 84 })
          .toFile(outPath);

        const insertRes = await query(
          `INSERT INTO media_gallery (title, alt_text, section_tag, file_url, original_filename, mime_type, width, height, size_bytes)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *`,
          [
            baseTitle.slice(0, 180),
            (customAlt || baseTitle).slice(0, 255),
            sectionTag,
            `/uploads/gallery/${outName}`,
            file.originalname.slice(0, 255),
            'image/webp',
            info.width || 0,
            info.height || 0,
            info.size || 0,
          ]
        );
        created.push(insertRes.rows[0]);
      }
    }

    return res.status(201).json({ uploaded: created });
  } catch (err) {
    console.error('Gallery upload error:', err.message);
    return res.status(500).json({ error: err.message || 'Image upload failed.' });
  }
});

router.patch('/gallery/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid media ID.' });
    }

    const existing = await query('SELECT * FROM media_gallery WHERE id = $1', [id]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ error: 'Media item not found.' });
    }

    const cur = existing.rows[0];
    const title = req.body?.title !== undefined ? String(req.body.title).trim() : cur.title;
    const altText =
      req.body?.alt_text !== undefined ? String(req.body.alt_text).trim() : cur.alt_text;
    const sectionTag =
      req.body?.section_tag !== undefined ? String(req.body.section_tag).trim() : cur.section_tag;

    const updated = await query(
      `UPDATE media_gallery
       SET title = $1, alt_text = $2, section_tag = $3
       WHERE id = $4
       RETURNING *`,
      [title.slice(0, 180), altText.slice(0, 255), sectionTag.slice(0, 100), id]
    );

    return res.json({ media: updated.rows[0] });
  } catch (err) {
    console.error('Gallery update error:', err.message);
    return res.status(500).json({ error: 'Failed to update media metadata.' });
  }
});

/**
 * Direct one-click assignment of any Gallery photo to a target website slot.
 */
router.post('/gallery/:id/assign', async (req, res) => {
  try {
    const mediaId = Number(req.params.id);
    const target = String(req.body?.target || '').trim();
    if (!Number.isInteger(mediaId) || !target) {
      return res.status(400).json({ error: 'Media ID and target assignment are required.' });
    }

    const mediaRes = await query('SELECT * FROM media_gallery WHERE id = $1', [mediaId]);
    if (mediaRes.rowCount === 0) {
      return res.status(404).json({ error: 'Gallery media not found.' });
    }
    const media = mediaRes.rows[0];

    if (target === 'about.poster') {
      const sec = await query(`SELECT content FROM site_sections WHERE section_key = 'about'`);
      const content = sec.rows[0]?.content || {};
      const next = {
        ...content,
        posterSrc: media.file_url,
        posterMediaId: media.id,
        posterAlt: media.alt_text || media.title,
      };
      await query(
        `UPDATE site_sections SET content = $1::jsonb, updated_at = NOW() WHERE section_key = 'about'`,
        [JSON.stringify(next)]
      );
      return res.json({ ok: true, message: 'Assigned image to About poster.' });
    }

    if (target === 'hero.addCard') {
      const sec = await query(`SELECT content FROM site_sections WHERE section_key = 'hero'`);
      const content = sec.rows[0]?.content || {};
      const ribbon = Array.isArray(content.ribbonPhotos) ? [...content.ribbonPhotos] : [];
      ribbon.push({
        id: `photo-${Date.now()}`,
        src: media.file_url,
        alt: media.alt_text || media.title,
        mediaId: media.id,
      });
      await query(
        `UPDATE site_sections SET content = $1::jsonb, updated_at = NOW() WHERE section_key = 'hero'`,
        [JSON.stringify({ ...content, ribbonPhotos: ribbon })]
      );
      return res.json({ ok: true, message: 'Added image card to Hero ribbon.' });
    }

    if (target === 'trusted_by.addLogo') {
      const sec = await query(`SELECT content FROM site_sections WHERE section_key = 'trusted_by'`);
      const content = sec.rows[0]?.content || {};
      const logos = Array.isArray(content.logos) ? [...content.logos] : [];
      logos.push({
        id: `partner-${Date.now()}`,
        name: media.title || 'Partner',
        src: media.file_url,
        mediaId: media.id,
      });
      await query(
        `UPDATE site_sections SET content = $1::jsonb, updated_at = NOW() WHERE section_key = 'trusted_by'`,
        [JSON.stringify({ ...content, logos })]
      );
      return res.json({ ok: true, message: 'Added logo to Trusted By partners.' });
    }

    if (target.startsWith('service.card:') || target.startsWith('service.hero:')) {
      const isHero = target.startsWith('service.hero:');
      const serviceId = Number(target.split(':')[1]);
      if (!Number.isInteger(serviceId)) {
        return res.status(400).json({ error: 'Invalid service ID for image assignment.' });
      }
      if (isHero) {
        await query(
          'UPDATE services SET hero_image = $1, hero_media_id = $2, updated_at = NOW() WHERE id = $3',
          [media.file_url, media.id, serviceId]
        );
      } else {
        await query(
          'UPDATE services SET card_image = $1, card_media_id = $2, updated_at = NOW() WHERE id = $3',
          [media.file_url, media.id, serviceId]
        );
      }
      return res.json({
        ok: true,
        message: isHero ? 'Assigned as Service hero banner.' : 'Assigned as Service card image.',
      });
    }

    if (target.startsWith('showcase:')) {
      await query('UPDATE media_gallery SET section_tag = $1 WHERE id = $2', [
        target.slice(0, 100),
        media.id,
      ]);
      return res.json({ ok: true, message: 'Tagged image to Service showcase strip.' });
    }

    return res.status(400).json({ error: `Unknown assignment target: ${target}` });
  } catch (err) {
    console.error('Assign gallery media error:', err.message);
    return res.status(500).json({ error: 'Failed to assign image to section.' });
  }
});

router.delete('/gallery/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid media ID.' });
    }

    const resDel = await query('DELETE FROM media_gallery WHERE id = $1 RETURNING file_url', [id]);
    if (resDel.rowCount === 0) {
      return res.status(404).json({ error: 'Media item not found.' });
    }

    removeUploadedFileIfLocalGallery(resDel.rows[0].file_url);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Gallery delete error:', err.message);
    return res.status(500).json({ error: 'Failed to delete media.' });
  }
});

/* --------------------------------------------------------------------------
   Services CRUD (plus View Page Display Config toggles)
   -------------------------------------------------------------------------- */
router.get('/services', async (_req, res) => {
  try {
    const result = await query(
      `SELECT s.*,
              COUNT(i.id)::int AS items_count,
              COUNT(i.id) FILTER (WHERE i.is_active)::int AS active_items_count
       FROM services s
       LEFT JOIN service_items i ON i.service_id = s.id
       GROUP BY s.id
       ORDER BY s.sort_order ASC, s.id ASC`
    );
    return res.json({ services: result.rows });
  } catch (err) {
    console.error('Admin get services error:', err.message);
    return res.status(500).json({ error: 'Failed to load services.' });
  }
});

router.post('/services', async (req, res) => {
  try {
    const title = String(req.body?.title || '').trim();
    if (!title) {
      return res.status(400).json({ error: 'Service title is required.' });
    }

    const slug = sanitizeSlug(req.body?.slug || title);
    if (!slug) {
      return res.status(400).json({ error: 'A valid URL slug is required.' });
    }

    const existing = await query('SELECT id FROM services WHERE slug = $1', [slug]);
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: `A service with slug "${slug}" already exists.` });
    }

    const tagline = String(req.body?.tagline || '').trim();
    const category = String(req.body?.category || '').trim();
    const shortDescription = String(req.body?.short_description || '').trim();
    const cardImage = String(req.body?.card_image || '').trim();
    const cardMediaId = req.body?.card_media_id ? Number(req.body.card_media_id) : null;
    const heroImage = String(req.body?.hero_image || cardImage).trim();
    const heroMediaId = req.body?.hero_media_id ? Number(req.body.hero_media_id) : cardMediaId;
    const isActive = req.body?.is_active !== false;
    const isFeaturedHome =
      req.body?.is_featured_home !== undefined ? Boolean(req.body.is_featured_home) : isActive;
    const sortOrder = Number.isFinite(Number(req.body?.sort_order))
      ? Number(req.body.sort_order)
      : 99;
    const displayConfig = normalizeDisplayConfig(req.body?.display_config);

    const inserted = await query(
      `INSERT INTO services
        (slug, title, tagline, category, short_description, card_image, card_media_id, hero_image, hero_media_id, is_featured_home, is_active, sort_order, display_config)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb)
       RETURNING *`,
      [
        slug,
        title,
        tagline,
        category,
        shortDescription,
        cardImage,
        cardMediaId,
        heroImage,
        heroMediaId,
        isFeaturedHome,
        isActive,
        sortOrder,
        JSON.stringify(displayConfig),
      ]
    );

    return res.status(201).json({ service: inserted.rows[0] });
  } catch (err) {
    console.error('Create service error:', err.message);
    return res.status(500).json({ error: 'Failed to create service.' });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid service ID.' });
    }

    const existing = await query('SELECT * FROM services WHERE id = $1', [id]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    const cur = existing.rows[0];

    const title = req.body?.title !== undefined ? String(req.body.title).trim() : cur.title;
    if (!title) {
      return res.status(400).json({ error: 'Service title cannot be empty.' });
    }

    const nextSlug =
      req.body?.slug !== undefined ? sanitizeSlug(req.body.slug) : cur.slug;
    if (!nextSlug) {
      return res.status(400).json({ error: 'A valid URL slug is required.' });
    }

    if (nextSlug !== cur.slug) {
      const collision = await query('SELECT id FROM services WHERE slug = $1 AND id <> $2', [
        nextSlug,
        id,
      ]);
      if (collision.rowCount > 0) {
        return res.status(409).json({ error: `Slug "${nextSlug}" is already in use.` });
      }
    }

    const displayConfig =
      req.body?.display_config !== undefined
        ? normalizeDisplayConfig({ ...cur.display_config, ...req.body.display_config })
        : cur.display_config;

    const updated = await query(
      `UPDATE services
       SET slug = $1,
           title = $2,
           tagline = $3,
           category = $4,
           short_description = $5,
           card_image = $6,
           card_media_id = $7,
           hero_image = $8,
           hero_media_id = $9,
           is_featured_home = $10,
           is_active = $11,
           sort_order = $12,
           display_config = $13::jsonb,
           updated_at = NOW()
       WHERE id = $14
       RETURNING *`,
      [
        nextSlug,
        title,
        req.body?.tagline !== undefined ? String(req.body.tagline).trim() : cur.tagline,
        req.body?.category !== undefined ? String(req.body.category).trim() : cur.category,
        req.body?.short_description !== undefined
          ? String(req.body.short_description).trim()
          : cur.short_description,
        req.body?.card_image !== undefined
          ? String(req.body.card_image).trim()
          : cur.card_image,
        req.body?.card_media_id !== undefined
          ? req.body.card_media_id
            ? Number(req.body.card_media_id)
            : null
          : cur.card_media_id,
        req.body?.hero_image !== undefined
          ? String(req.body.hero_image).trim()
          : cur.hero_image,
        req.body?.hero_media_id !== undefined
          ? req.body.hero_media_id
            ? Number(req.body.hero_media_id)
            : null
          : cur.hero_media_id,
        req.body?.is_featured_home !== undefined
          ? Boolean(req.body.is_featured_home)
          : req.body?.is_active !== undefined
            ? Boolean(req.body.is_active)
            : cur.is_featured_home,
        req.body?.is_active !== undefined ? Boolean(req.body.is_active) : cur.is_active,
        req.body?.sort_order !== undefined && Number.isFinite(Number(req.body.sort_order))
          ? Number(req.body.sort_order)
          : cur.sort_order,
        JSON.stringify(displayConfig),
        id,
      ]
    );

    return res.json({ service: updated.rows[0] });
  } catch (err) {
    console.error('Update service error:', err.message);
    return res.status(500).json({ error: 'Failed to update service.' });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid service ID.' });
    }

    const del = await query('DELETE FROM services WHERE id = $1 RETURNING id', [id]);
    if (del.rowCount === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('Delete service error:', err.message);
    return res.status(500).json({ error: 'Failed to delete service.' });
  }
});

/**
 * Reset per-card display overrides on a service's offerings so they inherit
 * the service-wide toggle configuration cleanly.
 */
router.post('/services/:id/reset-item-overrides', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid service ID.' });
    }

    const fieldKey = req.body?.fieldKey ? String(req.body.fieldKey).trim() : null;
    if (fieldKey && ITEM_DISPLAY_KEYS.includes(fieldKey)) {
      await query(
        `UPDATE service_items
         SET display_config = COALESCE(display_config, '{}'::jsonb) - $1,
             updated_at = NOW()
         WHERE service_id = $2`,
        [fieldKey, id]
      );
    } else {
      await query(
        `UPDATE service_items
         SET display_config = '{}'::jsonb,
             updated_at = NOW()
         WHERE service_id = $1`,
        [id]
      );
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('Reset item overrides error:', err.message);
    return res.status(500).json({ error: 'Failed to reset card overrides.' });
  }
});

/* --------------------------------------------------------------------------
   Service Offerings / Items CRUD (Per-Service View Data)
   -------------------------------------------------------------------------- */
router.get('/service-items', async (req, res) => {
  try {
    const serviceId = req.query?.serviceId ? Number(req.query.serviceId) : null;
    if (serviceId && Number.isInteger(serviceId)) {
      const result = await query(
        `SELECT * FROM service_items WHERE service_id = $1 ORDER BY sort_order ASC, id ASC`,
        [serviceId]
      );
      return res.json({ items: result.rows });
    }
    const result = await query(
      `SELECT i.*, s.title AS service_title, s.slug AS service_slug
       FROM service_items i
       JOIN services s ON s.id = i.service_id
       ORDER BY s.sort_order ASC, i.sort_order ASC, i.id ASC`
    );
    return res.json({ items: result.rows });
  } catch (err) {
    console.error('Admin get service-items error:', err.message);
    return res.status(500).json({ error: 'Failed to load service items.' });
  }
});

router.post('/service-items', async (req, res) => {
  try {
    const serviceId = Number(req.body?.service_id);
    const title = String(req.body?.title || '').trim();
    if (!Number.isInteger(serviceId) || !title) {
      return res.status(400).json({ error: 'Valid service and item title are required.' });
    }

    const svcExists = await query('SELECT id FROM services WHERE id = $1', [serviceId]);
    if (svcExists.rowCount === 0) {
      return res.status(404).json({ error: 'Parent service not found.' });
    }

    const inserted = await query(
      `INSERT INTO service_items
        (service_id, title, tag, price_label, description, highlights, image_url, media_id, cta_text, display_config, is_active, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10::jsonb, $11, $12)
       RETURNING *`,
      [
        serviceId,
        title,
        String(req.body?.tag || '').trim(),
        String(req.body?.price_label || '').trim(),
        String(req.body?.description || '').trim(),
        JSON.stringify(normalizeHighlights(req.body?.highlights)),
        String(req.body?.image_url || '').trim(),
        req.body?.media_id ? Number(req.body.media_id) : null,
        String(req.body?.cta_text || 'Inquire Now').trim() || 'Inquire Now',
        JSON.stringify(normalizeItemDisplayConfig(req.body?.display_config)),
        req.body?.is_active !== false,
        Number.isFinite(Number(req.body?.sort_order)) ? Number(req.body.sort_order) : 99,
      ]
    );

    return res.status(201).json({ item: inserted.rows[0] });
  } catch (err) {
    console.error('Create service-item error:', err.message);
    return res.status(500).json({ error: 'Failed to create service item.' });
  }
});

router.put('/service-items/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid item ID.' });
    }

    const existing = await query('SELECT * FROM service_items WHERE id = $1', [id]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ error: 'Service item not found.' });
    }
    const cur = existing.rows[0];

    const title = req.body?.title !== undefined ? String(req.body.title).trim() : cur.title;
    if (!title) {
      return res.status(400).json({ error: 'Item title cannot be empty.' });
    }

    const itemDisplayConfig =
      req.body?.display_config !== undefined
        ? normalizeItemDisplayConfig(req.body.display_config)
        : cur.display_config || {};

    const updated = await query(
      `UPDATE service_items
       SET service_id = $1,
           title = $2,
           tag = $3,
           price_label = $4,
           description = $5,
           highlights = $6::jsonb,
           image_url = $7,
           media_id = $8,
           cta_text = $9,
           display_config = $10::jsonb,
           is_active = $11,
           sort_order = $12,
           updated_at = NOW()
       WHERE id = $13
       RETURNING *`,
      [
        req.body?.service_id !== undefined ? Number(req.body.service_id) : cur.service_id,
        title,
        req.body?.tag !== undefined ? String(req.body.tag).trim() : cur.tag,
        req.body?.price_label !== undefined
          ? String(req.body.price_label).trim()
          : cur.price_label,
        req.body?.description !== undefined
          ? String(req.body.description).trim()
          : cur.description,
        JSON.stringify(
          req.body?.highlights !== undefined
            ? normalizeHighlights(req.body.highlights)
            : cur.highlights
        ),
        req.body?.image_url !== undefined ? String(req.body.image_url).trim() : cur.image_url,
        req.body?.media_id !== undefined
          ? req.body.media_id
            ? Number(req.body.media_id)
            : null
          : cur.media_id,
        req.body?.cta_text !== undefined
          ? String(req.body.cta_text).trim() || 'Inquire Now'
          : cur.cta_text,
        JSON.stringify(itemDisplayConfig),
        req.body?.is_active !== undefined ? Boolean(req.body.is_active) : cur.is_active,
        req.body?.sort_order !== undefined && Number.isFinite(Number(req.body.sort_order))
          ? Number(req.body.sort_order)
          : cur.sort_order,
        id,
      ]
    );

    return res.json({ item: updated.rows[0] });
  } catch (err) {
    console.error('Update service-item error:', err.message);
    return res.status(500).json({ error: 'Failed to update service item.' });
  }
});

router.delete('/service-items/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid item ID.' });
    }
    const del = await query('DELETE FROM service_items WHERE id = $1 RETURNING id', [id]);
    if (del.rowCount === 0) {
      return res.status(404).json({ error: 'Service item not found.' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('Delete service-item error:', err.message);
    return res.status(500).json({ error: 'Failed to delete service item.' });
  }
});

/* --------------------------------------------------------------------------
   Contact Inquiries Inbox
   -------------------------------------------------------------------------- */
router.get('/inquiries', async (_req, res) => {
  try {
    const result = await query(
      `SELECT id, name, email, phone, subject, message, status, created_at
       FROM contact_inquiries
       ORDER BY created_at DESC`
    );
    return res.json({ inquiries: result.rows });
  } catch (err) {
    console.error('Get inquiries error:', err.message);
    return res.status(500).json({ error: 'Failed to load inquiries.' });
  }
});

router.patch('/inquiries/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const status = String(req.body?.status || '').trim();
    if (!Number.isInteger(id) || !['new', 'contacted', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Valid inquiry ID and status are required.' });
    }
    const updated = await query(
      `UPDATE contact_inquiries SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (updated.rowCount === 0) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    return res.json({ inquiry: updated.rows[0] });
  } catch (err) {
    console.error('Update inquiry status error:', err.message);
    return res.status(500).json({ error: 'Failed to update inquiry status.' });
  }
});

router.delete('/inquiries/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid inquiry ID.' });
    }
    const del = await query('DELETE FROM contact_inquiries WHERE id = $1 RETURNING id', [id]);
    if (del.rowCount === 0) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('Delete inquiry error:', err.message);
    return res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

export default router;

