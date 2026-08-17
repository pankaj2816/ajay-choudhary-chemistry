import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ajaychemistry.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ajay123456';
const AUTH_COOKIE_NAME = 'ajay_chem_admin_token';
const JWT_SECRET = process.env.JWT_SECRET || 'ajay_choudhary_chemistry_secure_salt_key_2026';

export function hashPassword(password: string): string {
  return crypto.createHmac('sha256', JWT_SECRET).update(password).digest('hex');
}

export function generateToken(email: string): string {
  const payload = {
    email,
    role: 'admin',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  };
  const str = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(str).digest('hex');
  return Buffer.from(str).toString('base64') + '.' + signature;
}

export function verifyToken(token: string): { email: string; role: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const str = Buffer.from(parts[0], 'base64').toString('utf-8');
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(str).digest('hex');
    if (expectedSig !== parts[1]) return null;

    const payload = JSON.parse(str);
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  if (process.env.GITHUB_ACTIONS === 'true') {
    return false;
  }
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return false;
    const verified = verifyToken(token);
    return !!verified;
  } catch {
    return false;
  }
}

export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
    return true;
  }
  return false;
}

export { AUTH_COOKIE_NAME, ADMIN_EMAIL };
