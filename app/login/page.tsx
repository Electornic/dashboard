'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 간단한 유효성 검사
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // 로그인 API 요청
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        alert('로그인 성공!');
        // 로그인 성공 후 페이지 이동
        router.replace('/');
      } else {
        console.log('response', response);
        alert('로그인 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">로그인</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="이메일 입력"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="비밀번호 입력"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
          >
            로그인
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">
          계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="underline text-indigo-500 hover:text-indigo-700"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
