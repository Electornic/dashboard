// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 정적 파일과 API 경로는 처리하지 않음
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Get access_token and refresh_token from cookies
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (accessToken) {
    // Access Token이 유효한 경우 요청 계속
    return NextResponse.next();
  }

  if (!refreshToken) {
    // Refresh Token도 없으면 로그인으로 리다이렉트
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Refresh token이 있을 경우 토큰 갱신 시도
  try {
    // Refresh 토큰으로 새 토큰 요청 (예: /api/auth/refresh 호출)
    const response = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    // 새 Access Token과 쿠키 설정
    const data = await response.json();
    const newAccessToken = data.accessToken;

    const nextResponse = NextResponse.next(); // 요청을 계속 진행
    nextResponse.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1시간
    });

    return nextResponse;
  } catch (error) {
    console.error('Error refreshing token:', error);

    // Refresh 실패 시 로그인으로 리다이렉트
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// 보호할 경로 설정
export const config = {
  // 해당 경로들에 대해 미들웨어를 활성화
  matcher: [
    /*
      • 모든 페이지를 매칭하지만 제외할 페이지는 `if` 조건문에서 처리
      • 여기선 `/api/**` 같은 API 경로를 제외하는 것도 가능합니다.
    */
    '/:path*',
  ],
};
