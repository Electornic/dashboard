// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createAccessToken, verifyToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh_token')?.value;
  if (!refreshToken) {
    return NextResponse.json(
      { message: 'Refresh token missing' },
      { status: 401 },
    );
  }

  try {
    // Refresh Token 검증
    const userData = verifyToken(refreshToken, 'refresh');

    if (typeof userData === 'string') {
      const response = NextResponse.json(
        { message: 'Invalid Account' },
        { status: 401 },
      );

      response.cookies.delete('refresh_token');

      return response;
    }

    const newAccessToken = createAccessToken({
      id: userData.id,
      email: userData.email,
    });

    // 새로운 Access Token 설정
    const response = NextResponse.json({ message: 'Token refreshed' });
    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1일 (초 단위)
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Invalid refresh token' },
      { status: 401 },
    );
  }
}
