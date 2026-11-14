import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {
  CORS_ORIGIN,
  IS_PROD,
  PORT,
  UPLOADS_DIR,
} from './config.js';
import { testConnection } from './db.js';
import { bootstrapDatabase } from './seed.js';
import authRoutes from './routes/auth.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : [CORS_ORIGIN];

if (!IS_PROD || process.env.CORS_ORIGIN) {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (!allowedOrigins.length || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );
}

app.use(cookieParser());
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true, limit: '4mb' }));

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(
  '/uploads',
  express.static(UPLOADS_DIR, {
    maxAge: IS_PROD ? '7d' : 0,
  })
);

// Noindex header for admin routes
app.use(['/admin-login', '/admin-portal'], (_req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
});

app.get('/api/health', async (_req, res) => {
  try {
    await testConnection();
    res.json({ ok: true, database: 'postgresql', connected: true });
  } catch (err) {
    res.status(503).json({
      ok: false,
      database: 'postgresql',
      connected: false,
      error: err.message,
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Multer & global error handler
app.use((err, _req, res, next) => {
  if (err) {
    console.error('Server middleware error:', err.message);
    return res.status(err.status || 400).json({ error: err.message });
  }
  next();
});

// Serve built Vite SPA in production (Render Web Service / Node app)
if (IS_PROD && fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
      return next();
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

async function startServer() {
  try {
    await bootstrapDatabase();
    console.log('PostgreSQL connected, schema verified, and initial seed ready.');
  } catch (err) {
    console.warn(
      'PostgreSQL initialization warning (API running, check .env PGPASSWORD / connection):',
      err.message
    );
  }

  const HOST = '0.0.0.0';
  app.listen(PORT, HOST, () => {
    console.log(`Sportsaal backend server listening on http://${HOST}:${PORT}`);
  });
}

startServer();

