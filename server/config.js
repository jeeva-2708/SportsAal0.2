import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(ROOT_DIR, '.env') });

export const PORT = Number(process.env.PORT || 5000);
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PROD = NODE_ENV === 'production';

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
export const JWT_SECRET =
  process.env.JWT_SECRET || 'sportsaal_local_dev_jwt_secret_change_me_in_prod';
export const COOKIE_NAME = 'sportsaal_admin_session';

export const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');
export const GALLERY_UPLOADS_DIR = path.join(UPLOADS_DIR, 'gallery');
export const DEFAULT_UPLOADS_DIR = path.join(UPLOADS_DIR, 'defaults');

export const ADMIN_DEFAULTS = {
  email: process.env.ADMIN_EMAIL || 'admin@sportsaal.com',
  name: process.env.ADMIN_NAME || 'Sportsaal Admin',
  password: process.env.ADMIN_DEFAULT_PASSWORD || 'ChangeMe@2026',
};

export function hasDatabaseCredentials() {
  return Boolean(
    (process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0) ||
      (typeof (process.env.MYSQL_PASSWORD ?? process.env.DB_PASSWORD ?? process.env.PGPASSWORD) === 'string')
  );
}

export function getDatabaseConfig(overrideDatabase = null) {
  const isSsl =
    process.env.MYSQL_SSL === 'true' ||
    process.env.DB_SSL === 'true' ||
    process.env.PGSSL === 'true';

  if (process.env.DATABASE_URL && !overrideDatabase) {
    return {
      uri: process.env.DATABASE_URL,
      multipleStatements: true,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: isSsl ? { rejectUnauthorized: false } : undefined,
    };
  }

  return {
    host:
      process.env.MYSQL_HOST ||
      process.env.DB_HOST ||
      process.env.PGHOST ||
      '127.0.0.1',
    port: Number(
      process.env.MYSQL_PORT ||
      process.env.DB_PORT ||
      process.env.PGPORT ||
      3306
    ),
    database:
      overrideDatabase ||
      process.env.MYSQL_DATABASE ||
      process.env.DB_NAME ||
      process.env.PGDATABASE ||
      'sportsaal',
    user:
      process.env.MYSQL_USER ||
      process.env.DB_USER ||
      process.env.PGUSER ||
      'root',
    password:
      process.env.MYSQL_PASSWORD ??
      process.env.DB_PASSWORD ??
      process.env.PGPASSWORD ??
      '',
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: isSsl ? { rejectUnauthorized: false } : undefined,
  };
}

