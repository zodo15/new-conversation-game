import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { House, Gear, Plus } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export const GameControls: React.FC = () => {
  const navigate = useNavigate();
  const { resetGame, setShowSettings, setShowAddQuestion } = useGameStore();

  return (
    <div className="flex justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          resetGame();
          navigate('/');
        }}
        className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      >
        <House className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSettings(true)}
        className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      >
        <Gear className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAddQuestion(true)}
        className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
