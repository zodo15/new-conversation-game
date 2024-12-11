import React from 'react';
import { motion } from 'framer-motion';
import type { FriendMode } from '../types';

interface FriendGameModesProps {
  onSelect: (mode: FriendMode) => void;
}

export const FriendGameModes: React.FC<FriendGameModesProps> = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Choose Game Mode</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-6 bg-purple-700/50 rounded-xl hover:bg-purple-600/50 transition-colors"
          onClick={() => onSelect('offline')}
        >
          <h3 className="text-xl font-bold mb-2">Local Game</h3>
          <p className="text-purple-200">Play with friends on the same device</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-6 bg-purple-700/50 rounded-xl hover:bg-purple-600/50 transition-colors"
          onClick={() => onSelect('online')}
        >
          <h3 className="text-xl font-bold mb-2">Online Game</h3>
          <p className="text-purple-200">Play with friends over the internet</p>
        </motion.button>
      </div>
    </div>
  );
};