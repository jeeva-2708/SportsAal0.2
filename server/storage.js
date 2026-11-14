import fs from 'fs';
import path from 'path';
import { GALLERY_UPLOADS_DIR } from './config.js';

const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '').trim();
const STORAGE_BUCKET = (process.env.SUPABASE_STORAGE_BUCKET || 'sportsaal-media').trim();

export function isSupabaseStorageEnabled() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export function getPublicStorageUrl(objectPath) {
  const cleanPath = objectPath.replace(/^\/+/, '');
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanPath}`;
}

let bucketEnsured = false;

/**
 * Checks if the public storage bucket exists in Supabase.
 * If not, attempts to auto-create it with public read access.
 */
export async function ensureStorageBucket() {
  if (!isSupabaseStorageEnabled() || bucketEnsured) return;

  try {
    const checkRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket/${STORAGE_BUCKET}`, {
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        apikey: SUPABASE_KEY,
      },
    });

    if (checkRes.ok) {
      bucketEnsured = true;
      return;
    }

    if (checkRes.status === 404) {
      const createRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: STORAGE_BUCKET,
          name: STORAGE_BUCKET,
          public: true,
          file_size_limit: 15 * 1024 * 1024,
          allowed_mime_types: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'image/svg+xml',
            'image/avif',
          ],
        }),
      });

      if (createRes.ok) {
        console.log(`Created public Supabase storage bucket "${STORAGE_BUCKET}".`);
        bucketEnsured = true;
      } else {
        const text = await createRes.text();
        console.warn(
          `Could not auto-create Supabase bucket "${STORAGE_BUCKET}" (${createRes.status}: ${text}). ` +
          `Please ensure a public bucket named "${STORAGE_BUCKET}" exists in your Supabase dashboard.`
        );
      }
    }
  } catch (err) {
    console.warn('Supabase bucket check notice:', err.message);
  }
}

/**
 * Saves a media file buffer either to Supabase Storage (if configured)
 * or to local filesystem storage (fallback for local development).
 */
export async function saveMediaFile({ filename, buffer, mimeType = 'image/webp' }) {
  if (isSupabaseStorageEnabled()) {
    await ensureStorageBucket();

    const objectPath = `gallery/${filename}`;
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${objectPath}`;

    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        apikey: SUPABASE_KEY,
        'Content-Type': mimeType,
        'x-upsert': 'true',
      },
      body: buffer,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Supabase Storage upload failed (${res.status}): ${errText || res.statusText}`);
    }

    return {
      fileUrl: getPublicStorageUrl(objectPath),
      storage: 'supabase',
      filename,
    };
  }

  // Local filesystem fallback
  if (!fs.existsSync(GALLERY_UPLOADS_DIR)) {
    fs.mkdirSync(GALLERY_UPLOADS_DIR, { recursive: true });
  }

  const outPath = path.join(GALLERY_UPLOADS_DIR, filename);
  fs.writeFileSync(outPath, buffer);

  return {
    fileUrl: `/uploads/gallery/${filename}`,
    storage: 'local',
    filename,
  };
}

/**
 * Deletes a media file either from Supabase Storage or from local filesystem.
 */
export async function deleteMediaFile(fileUrl) {
  if (!fileUrl) return;

  // Supabase Storage URL
  if (isSupabaseStorageEnabled() && fileUrl.includes(`/storage/v1/object/public/${STORAGE_BUCKET}/`)) {
    try {
      const prefix = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
      const idx = fileUrl.indexOf(prefix);
      if (idx !== -1) {
        const objectPath = fileUrl.slice(idx + prefix.length);
        const delRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${SUPABASE_KEY}`,
            apikey: SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prefixes: [objectPath] }),
        });
        if (!delRes.ok) {
          console.warn(`Supabase storage delete response (${delRes.status}):`, await delRes.text());
        }
      }
    } catch (err) {
      console.warn('Supabase storage delete error:', err.message);
    }
    return;
  }

  // Local filesystem URL
  if (fileUrl.startsWith('/uploads/gallery/')) {
    const safeName = path.basename(fileUrl);
    const fullPath = path.join(GALLERY_UPLOADS_DIR, safeName);
    if (fullPath.startsWith(GALLERY_UPLOADS_DIR) && fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.warn('Local file unlink error:', err.message);
      }
    }
  }
}
