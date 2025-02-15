'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 로그아웃 API 요청
      const res = await fetch('/api/logout', {
        method: 'POST',
      });

      if (res.ok) {
        // 로그아웃 성공 시 로그인 페이지로 이동
        router.push('/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>
          Welcome, <strong>User</strong>!
        </span>
        <button
          className="bg-blue-800 px-3 py-1 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
