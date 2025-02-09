import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
