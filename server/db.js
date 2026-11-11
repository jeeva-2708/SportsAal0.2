import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { getDatabaseConfig, hasDatabaseCredentials } from './config.js';

const { Pool, Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pool = new Pool(getDatabaseConfig());

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err.message);
});

function assertCredentialsConfigured() {
  if (!hasDatabaseCredentials()) {
    throw new Error(
      'Missing PostgreSQL password: set PGPASSWORD (or DATABASE_URL) in SportsAal0.2/.env (not .env.example) and restart.'
    );
  }
}

export async function query(text, params = []) {
  assertCredentialsConfigured();
  return pool.query(text, params);
}

/**
 * Ensures the target PostgreSQL database exists (for local / VPS Postgres instances).
 * Safely skipped if connecting via a managed single-DB connectionString (DATABASE_URL).
 */
export async function ensureDatabaseExists() {
  assertCredentialsConfigured();
  if (process.env.DATABASE_URL) return;

  const targetDb = process.env.PGDATABASE || 'sportsaal';
  if (!/^[a-zA-Z0-9_]+$/.test(targetDb)) {
    throw new Error(`Invalid PostgreSQL database identifier: ${targetDb}`);
  }

  const adminClient = new Client(getDatabaseConfig('postgres'));
  await adminClient.connect();
  try {
    const check = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [targetDb]
    );
    if (check.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`Created PostgreSQL database "${targetDb}".`);
    }
  } finally {
    await adminClient.end();
  }
}

export async function initSchema() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  await pool.query(sql);
}

export async function testConnection() {
  assertCredentialsConfigured();
  await pool.query('SELECT 1');
}

