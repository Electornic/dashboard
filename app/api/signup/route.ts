import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await supabase.auth.signInWithPassword({
    email: process.env.SUPABASE_USER_EMAIL!,
    password: process.env.SUPABASE_USER_PASSWORD!,
  });

  // 유효성 검사
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: '모든 필드를 입력해주세요.' },
      { status: 400 },
    );
  }

  try {
    // 비밀번호 해시화 (bcrypt 사용)
    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 10);

    // Supabase 데이터를 삽입
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password_hash: passwordHash }]);

    // 중복 이메일 등 에러 처리
    if (error) {
      if (error.code === '23505') {
        // Unique violation (PostgreSQL error code)
        return NextResponse.json(
          { message: '이미 등록된 이메일입니다.' },
          { status: 409 },
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: '회원가입 성공!', user: data },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: '서버 오류. 나중에 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
