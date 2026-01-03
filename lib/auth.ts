import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

// Configuration Secrets (A récupérer depuis process.env en prod)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret-key-pour-dev-uniquement-a-changer');
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET || 'refresh-secret-key-a-changer');

export const SALT_ROUNDS = 12; // Coût élevé pour la sécurité

/**
 * Hachage sécurisé du mot de passe
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Vérification du mot de passe
 */
export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

/**
 * Génération du token d'accès (durée courte : 15min)
 */
export async function signAccessToken(payload: { userId: string; role?: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(JWT_SECRET);
}

/**
 * Génération du token de rafraîchissement (durée longue : 7j)
 */
export async function signRefreshToken(payload: { userId: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(REFRESH_SECRET);
}

/**
 * Vérification du token d'accès
 */
export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Vérification du token de rafraîchissement
 */
export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}