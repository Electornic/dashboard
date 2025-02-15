import React from 'react';

import Link from 'next/link';
import { FaChartPie, FaCog, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white h-screen p-4 space-y-6">
      <nav>
        <ul className="flex flex-col gap-y-[16px]">
          <Link href={'/'} passHref>
            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaHome /> <span>Home</span>
            </li>
          </Link>
          <Link href={'/gallery'} passHref>
            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaHome /> <span>Gallery</span>
            </li>
          </Link>
          <Link href={'/BlackHole'} passHref>
            <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaChartPie /> <span>BlackHole</span>
            </li>
          </Link>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <FaCog /> <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
