import { motion } from 'framer-motion';
import { FaFireFlameCurved, FaShuffle, FaUsers, FaGhost } from "react-icons/fa6";
import { FloatingBackground } from './FloatingBackground';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import type { GameMode } from '../types';

interface GameModesProps {
  onSelect: (selectedMode: GameMode) => void;
}

const GameModes: React.FC<GameModesProps> = ({ onSelect }) => {
  const navigate = useNavigate();
  const { setMode, startGame } = useGameStore();

  const handleModeSelect = (mode: GameMode) => {
    setMode(mode);
    startGame();
    onSelect(mode);
    navigate('/play');
  };

  const modes = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'The original Would You Rather experience',
      icon: FaUsers,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'spicy',
      name: 'Spicy',
      description: 'More challenging and thought-provoking questions',
      icon: FaFireFlameCurved,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
    },
    {
      id: 'random',
      name: 'Random',
      description: 'Mix of all question types',
      icon: FaShuffle,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      id: 'chaos',
      name: 'Chaos',
      description: 'Expect the unexpected with random events',
      icon: FaGhost,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
  ] as const;

  return (
    <div className="relative min-h-screen bg-gray-900 text-white py-12 px-4">
      <FloatingBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Choose Your Game Mode
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleModeSelect(mode.id as GameMode)}
                className={`${mode.color} ${mode.hoverColor} p-6 rounded-xl text-left transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">{mode.name}</h3>
                    <p className="text-white/80">{mode.description}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameModes;
