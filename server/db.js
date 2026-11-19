import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import { getDatabaseConfig, hasDatabaseCredentials } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pool = mysql.createPool(getDatabaseConfig());

function assertCredentialsConfigured() {
  if (!hasDatabaseCredentials()) {
    throw new Error(
      'Missing MySQL password: set MYSQL_PASSWORD (or DATABASE_URL) in SportsAal0.2/.env and restart.'
    );
  }
}

/**
 * Standardized query helper that executes parameterized MySQL queries
 * and normalizes the return shape into { rows, rowCount, insertId }.
 * Supports both MySQL (?) and legacy PostgreSQL ($1, $2) placeholder formats.
 */
export async function query(text, params = []) {
  assertCredentialsConfigured();

  // Convert PostgreSQL-style $1, $2 placeholders to MySQL ? if present
  let formattedSql = text;
  if (Array.isArray(params) && params.length > 0 && /\$\d+/.test(formattedSql)) {
    formattedSql = formattedSql.replace(/\$(\d+)/g, '?');
  }

  const [results] = await pool.query(formattedSql, params);

  if (Array.isArray(results)) {
    return {
      rows: results,
      rowCount: results.length,
      insertId: 0,
    };
  }

  // ResultSetHeader for INSERT, UPDATE, DELETE
  return {
    rows: [],
    rowCount: results?.affectedRows ?? 0,
    insertId: results?.insertId ?? 0,
  };
}

/**
 * Ensures the target MySQL database exists.
 * Safely skipped if connecting via DATABASE_URL.
 */
export async function ensureDatabaseExists() {
  assertCredentialsConfigured();
  if (process.env.DATABASE_URL) return;

  const targetDb =
    process.env.MYSQL_DATABASE ||
    process.env.DB_NAME ||
    process.env.PGDATABASE ||
    'sportsaal';

  if (!/^[a-zA-Z0-9_]+$/.test(targetDb)) {
    throw new Error(`Invalid MySQL database identifier: ${targetDb}`);
  }

  const baseConfig = getDatabaseConfig();
  const adminConfig = { ...baseConfig };
  delete adminConfig.database;

  let adminConn;
  try {
    adminConn = await mysql.createConnection(adminConfig);
    await adminConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${targetDb}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log(`Verified MySQL database "${targetDb}".`);
  } catch (err) {
    // If user lacks permission to create DB (e.g. Hostinger phpMyAdmin where DB is pre-created), log warning
    console.warn(`Database check note: ${err.message}`);
  } finally {
    if (adminConn) await adminConn.end();
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

