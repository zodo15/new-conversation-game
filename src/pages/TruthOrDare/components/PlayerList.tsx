import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Player } from '../types/game';

export const PlayerList: React.FC = () => {
  const players = useGameStore((state) => state.players);
  const currentPlayer = useGameStore((state) => state.currentPlayer);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Players</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {players.map((player) => (
          <motion.div
            key={player}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              player === currentPlayer
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{player}</span>
              {player === currentPlayer && (
                <span className="text-sm bg-white/20 px-2 py-1 rounded">
                  Current Turn
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
