import React from 'react';
import { Link } from 'react-router-dom';

interface GameTileProps {
  title: string;
  description: string;
  to: string;
  gradient: string;
}

export const GameTile: React.FC<GameTileProps> = ({
  title,
  description,
  to,
  gradient,
}) => {
  return (
    <Link
      to={to}
      className={`block p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${gradient}`}
    >
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-white text-opacity-80">{description}</p>
    </Link>
  );
};
