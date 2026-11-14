import jwt from 'jsonwebtoken';
import { COOKIE_NAME, IS_PROD, JWT_SECRET } from '../config.js';

export function signAdminToken(admin) {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      name: admin.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: IS_PROD && process.env.ALLOW_INSECURE_COOKIE !== 'true',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

export function extractToken(req) {
  const cookieToken = req.cookies?.[COOKIE_NAME];
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return null;
}

export function requireAdmin(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired admin session' });
  }
}

