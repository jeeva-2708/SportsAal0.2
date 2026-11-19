import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

/**
 * Returns full hydrated public website state from PostgreSQL.
 */
router.get('/bootstrap', async (_req, res) => {
  try {
    const [sectionsRes, servicesRes, itemsRes, galleryRes] = await Promise.all([
      query('SELECT section_key, content FROM site_sections'),
      query(
        `SELECT id, slug, title, tagline, category, short_description,
                card_image, hero_image, is_featured_home, sort_order, display_config
         FROM services
         WHERE is_active = TRUE
         ORDER BY sort_order ASC, id ASC`
      ),
      query(
        `SELECT id, service_id, title, tag, price_label, description,
                highlights, image_url, cta_text, sort_order, display_config
         FROM service_items
         WHERE is_active = TRUE
         ORDER BY sort_order ASC, id ASC`
      ),
      query(
        `SELECT id, title, alt_text, section_tag, file_url
         FROM media_gallery
         WHERE section_tag LIKE 'showcase:%'
         ORDER BY created_at DESC`
      ),
    ]);

    const sections = {};
    for (const row of sectionsRes.rows) {
      sections[row.section_key] = row.content;
    }

    const itemsByService = new Map();
    for (const item of itemsRes.rows) {
      if (!itemsByService.has(item.service_id)) {
        itemsByService.set(item.service_id, []);
      }
      itemsByService.get(item.service_id).push(item);
    }

    const showcaseBySlug = {};
    for (const media of galleryRes.rows) {
      const slug = media.section_tag.slice('showcase:'.length);
      if (!showcaseBySlug[slug]) showcaseBySlug[slug] = [];
      showcaseBySlug[slug].push(media);
    }

    const services = servicesRes.rows.map((svc) => ({
      ...svc,
      items: itemsByService.get(svc.id) || [],
      showcaseMedia: showcaseBySlug[svc.slug] || [],
    }));

    return res.json({ sections, services });
  } catch (err) {
    console.error('Public bootstrap error:', err.message);
    return res.status(500).json({ error: 'Failed to load site data.' });
  }
});

router.get('/services/:slug', async (req, res) => {
  try {
    const slug = String(req.params.slug || '').trim().toLowerCase();
    const svcRes = await query(
      `SELECT id, slug, title, tagline, category, short_description,
              card_image, hero_image, is_featured_home, sort_order, display_config
       FROM services
       WHERE slug = ? AND is_active = TRUE`,
      [slug]
    );

    if (svcRes.rowCount === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    const service = svcRes.rows[0];
    const [itemsRes, showcaseRes, otherRes] = await Promise.all([
      query(
        `SELECT id, service_id, title, tag, price_label, description,
                highlights, image_url, cta_text, sort_order, display_config
         FROM service_items
         WHERE service_id = ? AND is_active = TRUE
         ORDER BY sort_order ASC, id ASC`,
        [service.id]
      ),
      query(
        `SELECT id, title, alt_text, file_url
         FROM media_gallery
         WHERE section_tag = ?
         ORDER BY created_at DESC`,
        [`showcase:${service.slug}`]
      ),
      query(
        `SELECT id, slug, title
         FROM services
         WHERE is_active = TRUE AND id <> ?
         ORDER BY sort_order ASC, id ASC`,
        [service.id]
      ),
    ]);

    return res.json({
      service: {
        ...service,
        items: itemsRes.rows,
        showcaseMedia: showcaseRes.rows,
      },
      otherServices: otherRes.rows,
    });
  } catch (err) {
    console.error('Service fetch error:', err.message);
    return res.status(500).json({ error: 'Failed to load service details.' });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim();
    const phone = String(req.body?.phone || '').trim();
    const subject = String(req.body?.subject || '').trim();
    const message = String(req.body?.message || '').trim();

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All required inquiry fields must be provided.' });
    }

    const result = await query(
      `INSERT INTO contact_inquiries (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name.slice(0, 150), email.slice(0, 255), phone.slice(0, 60), subject.slice(0, 160), message]
    );

    return res.status(201).json({
      ok: true,
      inquiry: {
        id: result.insertId,
        name: name.slice(0, 150),
        email: email.slice(0, 255),
        phone: phone.slice(0, 60),
        subject: subject.slice(0, 160),
        message,
        status: 'new',
        created_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('Contact submission DB error:', err.message);
    return res.status(500).json({ error: 'Unable to save inquiry.' });
  }
});

export default router;

