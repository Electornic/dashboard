// components/ProgressScreen.tsx
import React from 'react';

const ProgressScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-xl font-semibold">로딩 중...</p>
    </div>
  );
};

export default ProgressScreen;
