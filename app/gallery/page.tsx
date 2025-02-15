'use client';
import React, { useState } from 'react';

import Link from 'next/link';

const GalleryPage: React.FC = () => {
  // 초기 이미지 상태 (서버나 API에서 받아오는 형식으로 대체 가능)
  const [images] = useState<string[]>([
    'https://source.unsplash.com/random/400x300/?nature,1',
    'https://source.unsplash.com/random/400x300/?nature,2',
    'https://source.unsplash.com/random/400x300/?nature,3',
  ]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow w-full">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>

      {/* 관리 페이지 이동 버튼 */}
      <div className="mb-6">
        <Link href="/manage-gallery" passHref>
          <span className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow">
            Manage Gallery
          </span>
        </Link>
      </div>

      {/* 갤러리 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {images.map((src, index) => {
          return (
            <div key={index} className="rounded-lg shadow-md bg-white p-4" />
          );

          // return (
          // <div key={index} className="rounded-lg shadow-md bg-white p-4">
          // <img
          //       src={src}
          //       alt={`Gallery image ${index + 1}`}
          //       className="w-full h-48 object-cover rounded-lg"
          //     />
          //   </div>
          // )
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
