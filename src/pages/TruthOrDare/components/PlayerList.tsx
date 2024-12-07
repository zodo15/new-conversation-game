import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Player } from '../types';

export const PlayerList: React.FC = () => {
  const { players, currentPlayerIndex, removePlayer } = useGameStore();

  const getPlayerStatus = (_player: Player, index: number) => {
    if (index === currentPlayerIndex) return 'Current';
    if (index === (currentPlayerIndex + 1) % players.length) return 'Next';
    return '';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Players</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {players.map((player: Player, index: number) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl shadow-lg ${
              index === currentPlayerIndex
                ? 'bg-purple-500 text-white'
                : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className={`font-semibold text-lg ${
                  index === currentPlayerIndex ? 'text-white' : 'text-gray-800'
                }`}>
                  {player.name}
                </h3>
                {getPlayerStatus(player, index) && (
                  <span className="text-sm font-medium text-white bg-green-500 px-2 py-1 rounded-full">
                    {getPlayerStatus(player, index)}
                  </span>
                )}
              </div>
              <button
                onClick={() => removePlayer(player.id)}
                className={`p-1 rounded-full hover:bg-red-100 transition-colors ${
                  index === currentPlayerIndex ? 'text-white' : 'text-red-500'
                }`}
              >
                ✕
              </button>
            </div>
            
            <div className={`space-y-1 ${
              index === currentPlayerIndex ? 'text-white/90' : 'text-gray-600'
            }`}>
              <p>Score: {player.score}</p>
              <div className="flex space-x-4 text-sm">
                <span>Truths: {player.truthCount}</span>
                <span>Dares: {player.dareCount}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
