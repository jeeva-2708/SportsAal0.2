import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { query } from '../db.js';
import {
  clearSessionCookie,
  requireAdmin,
  setSessionCookie,
  signAdminToken,
} from '../middleware/auth.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please wait 15 minutes and try again.' },
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const result = await query(
      'SELECT id, email, name, password_hash FROM admin_users WHERE email = ?',
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    await query('UPDATE admin_users SET last_login_at = NOW() WHERE id = ?', [user.id]);

    const admin = { id: user.id, email: user.email, name: user.name };
    const token = signAdminToken(admin);
    setSessionCookie(res, token);

    return res.json({ admin });
  } catch (err) {
    console.error('Admin login error:', err.message);
    return res.status(500).json({ error: 'Unable to sign in right now.' });
  }
});

router.post('/logout', (_req, res) => {
  clearSessionCookie(res);
  return res.json({ ok: true });
});

router.get('/me', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      'SELECT id, email, name, last_login_at FROM admin_users WHERE id = ?',
      [req.admin.id]
    );
    if (result.rowCount === 0) {
      clearSessionCookie(res);
      return res.status(401).json({ error: 'Admin account not found.' });
    }
    return res.json({ admin: result.rows[0] });
  } catch (err) {
    console.error('Auth session lookup failed:', err.message);
    return res.status(500).json({ error: 'Failed to verify session.' });
  }
});

router.put('/password', requireAdmin, async (req, res) => {
  try {
    const currentPassword = String(req.body?.currentPassword || '');
    const newPassword = String(req.body?.newPassword || '');

    if (!currentPassword || newPassword.length < 8) {
      return res.status(400).json({
        error: 'Provide current password and a new password of at least 8 characters.',
      });
    }

    const result = await query(
      'SELECT id, password_hash FROM admin_users WHERE id = ?',
      [req.admin.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Admin account not found.' });
    }

    const matches = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
    if (!matches) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    const updatedHash = await bcrypt.hash(newPassword, 10);
    await query('UPDATE admin_users SET password_hash = ? WHERE id = ?', [
      updatedHash,
      req.admin.id,
    ]);

    return res.json({ ok: true, message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Password update error:', err.message);
    return res.status(500).json({ error: 'Failed to update password.' });
  }
});

export default router;

