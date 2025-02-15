// utils/jwt.ts
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

// Access Token 생성 (1일 만료)
export function createAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

// Refresh Token 생성 (7일 만료)
export function createRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

// JWT 검증
export function verifyToken(token: string, type: 'access' | 'refresh') {
  const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
}
