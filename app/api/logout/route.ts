import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Access Token과 Refresh Token을 제거 (쿠키 삭제)
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');

  return response;
}
