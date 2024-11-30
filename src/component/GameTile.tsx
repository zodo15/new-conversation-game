import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GameTileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  route: string;
}

const GameTile: React.FC<GameTileProps> = ({
  title,
  description,
  icon,
  gradient,
  route,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full h-64 rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white 
        transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl
        flex flex-col items-center justify-center text-center space-y-4
        border border-white/10 backdrop-blur-sm cursor-pointer`}
    >
      <div className="bg-white/10 p-4 rounded-full">{icon}</div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-white/80 max-w-xs">{description}</p>
    </div>
  );
};

export default GameTile;