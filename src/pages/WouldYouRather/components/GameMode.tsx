import React from 'react';
import { motion } from 'framer-motion';
import { GameMode as GameModeType } from '../types';

interface GameModeProps {
  mode: GameModeType;
  onModeSelect: (mode: GameModeType) => void;
  disabled?: boolean;
}

const modeInfo = {
  classic: {
    title: 'Classic',
    description: 'Traditional Would You Rather questions',
    color: 'bg-blue-500',
  },
  spicy: {
    title: 'Spicy',
    description: 'More challenging and controversial questions',
    color: 'bg-red-500',
  },
  friends: {
    title: 'Friends',
    description: 'Questions about your friend group',
    color: 'bg-purple-500',
  },
  chaos: {
    title: 'Chaos',
    description: 'Random mix of all question types',
    color: 'bg-yellow-500',
  },
};

export const GameMode: React.FC<GameModeProps> = ({
  mode,
  onModeSelect,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select Game Mode</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.keys(modeInfo) as GameModeType[]).map((modeKey) => {
          const info = modeInfo[modeKey];
          const isSelected = mode === modeKey;

          return (
            <motion.button
              key={modeKey}
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
              onClick={() => !disabled && onModeSelect(modeKey)}
              disabled={disabled}
              className={`
                p-6 rounded-xl text-left
                ${isSelected ? info.color + ' text-white' : 'bg-white hover:bg-gray-50'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                transition-colors duration-200
              `}
            >
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-sm opacity-80">{info.description}</p>
              {isSelected && (
                <motion.div
                  layoutId="mode-selection"
                  className="absolute inset-0 border-2 border-white rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
