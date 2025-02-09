import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // 요청 바디를 JSON으로 파싱
    const { email, password } = body;

    await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_USER_EMAIL!,
      password: process.env.SUPABASE_USER_PASSWORD!,
    });

    // 이메일과 비밀번호가 비어있는 경우 방어 로직 추가
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 },
      );
    }

    // Supabase에서 사용자 조회
    const { data, error } = await supabase
      .from('users') // users 테이블 사용
      .select('id, email, password_hash') // 필요한 필드만 가져옴
      .eq('email', email) // 이메일로만 조회
      .single(); // 이메일은 고유해야 하므로 single() 사용

    // 데이터가 없거나 오류가 발생한 경우
    if (error || !data) {
      return NextResponse.json(
        { error: '잘못된 이메일 또는 비밀번호입니다.' },
        { status: 401 },
      );
    }

    const user = data;

    console.log('password', password, user.password_hash);
    // 비밀번호 비교 (입력 비밀번호와 해시된 비밀번호)
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return NextResponse.json(
        { error: '잘못된 이메일 또는 비밀번호입니다.' },
        { status: 401 },
      );
    }

    // 인증 성공
    return NextResponse.json(
      {
        message: '로그인 성공!',
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('로그인 에러:', err);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
