import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Zap, Flame } from 'lucide-react';
import FloatingBackground from './FloatingBackground';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { GameMode } from '../types';

interface GameModesProps {
  onSelectMode: (mode: GameMode) => void;
}

const GameModes = ({ onSelectMode }: GameModesProps) => {
  const navigate = useNavigate();
  const { setGameMode, startGame } = useGameStore();

  const modes = [
    {
      id: GameMode.CLASSIC,
      name: 'Classic Mode',
      description: 'The original Would You Rather experience',
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      gradient: 'from-blue-500 to-purple-600',
      hoverGradient: 'from-blue-600 to-purple-700'
    },
    {
      id: GameMode.SPICY,
      name: 'Spicy Mode',
      description: 'More challenging and controversial choices',
      icon: <Flame className="w-8 h-8 text-orange-400" />,
      gradient: 'from-orange-500 to-red-600',
      hoverGradient: 'from-orange-600 to-red-700'
    },
    {
      id: GameMode.FRIEND,
      name: 'Friend Mode',
      description: 'Play with friends and track turns',
      icon: <Users className="w-8 h-8 text-green-400" />,
      gradient: 'from-green-500 to-teal-600',
      hoverGradient: 'from-green-600 to-teal-700'
    },
    {
      id: GameMode.CHAOS,
      name: 'Chaos Mode',
      description: 'Random events and crazy consequences',
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      gradient: 'from-purple-500 to-pink-600',
      hoverGradient: 'from-purple-600 to-pink-700'
    }
  ];

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    startGame();
    navigate('game');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 p-4">
      <FloatingBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Choose Your Mode
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {modes.map((mode) => (
            <motion.button
              key={mode.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeSelect(mode.id)}
              className={`
                relative overflow-hidden rounded-xl p-6
                bg-gradient-to-br ${mode.gradient}
                hover:bg-gradient-to-br ${mode.hoverGradient}
                transition-all duration-300
                group
              `}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-white gap-4">
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                  {mode.icon}
                </div>
                <h3 className="text-xl font-bold">{mode.name}</h3>
                <p className="text-sm text-white/80 text-center">
                  {mode.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameModes;
