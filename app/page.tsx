'use client';
import React from 'react';

import Card from '@/components/Card';
import Chart from '@/components/Chart';

const Home = () => {
  return (
    <div className="flex-1 bg-gray-100">
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to your Dashboard
        </h2>
        <div className="grid gap-6 grid-cols-3">
          <Card title="Earnings" value="$20,000" />
          <Card title="Users" value="1,200" />
          <Card title="Active Sessions" value="85" />
        </div>
        <div className="mt-6">
          <Chart />
        </div>
      </main>
    </div>
  );
};

export default Home;
