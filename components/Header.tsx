import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>
          Welcome, <strong>User</strong>!
        </span>
        <button className="bg-blue-800 px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;
