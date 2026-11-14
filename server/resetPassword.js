import bcrypt from 'bcryptjs';
import { bootstrapDatabase } from './seed.js';
import { query, pool } from './db.js';
import { ADMIN_DEFAULTS } from './config.js';

function parseArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx !== -1 && process.argv[idx + 1]) {
    return process.argv[idx + 1];
  }
  return '';
}

async function main() {
  const email = (
    parseArg('--email') ||
    process.env.ADMIN_RESET_EMAIL ||
    ADMIN_DEFAULTS.email
  )
    .trim()
    .toLowerCase();
  const newPassword = (
    parseArg('--password') ||
    process.env.ADMIN_NEW_PASSWORD ||
    ''
  ).trim();

  if (!email || newPassword.length < 8) {
    console.error(
      'Usage: npm run admin:reset-password -- --email admin@sportsaal.com --password YourNewPassword8Plus'
    );
    process.exit(1);
  }

  await bootstrapDatabase();
  const passwordHash = await bcrypt.hash(newPassword, 10);

  const res = await query(
    `UPDATE admin_users SET password_hash = $1 WHERE email = $2 RETURNING id, email`,
    [passwordHash, email]
  );

  if (res.rowCount === 0) {
    await query(
      `INSERT INTO admin_users (email, name, password_hash)
       VALUES ($1, $2, $3)`,
      [email, ADMIN_DEFAULTS.name, passwordHash]
    );
    console.log(`Created admin user ${email} with updated bcrypt password hash.`);
  } else {
    console.log(`Updated bcrypt password hash for ${res.rows[0].email}.`);
  }

  await pool.end();
}

main().catch((err) => {
  console.error('Admin password reset failed:', err.message);
  process.exit(1);
});

