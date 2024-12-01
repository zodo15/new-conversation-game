import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  currentPlayerIndex: number;
  onRemovePlayer?: (id: string) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  currentPlayerIndex,
  onRemovePlayer
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {players.map((player, index) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
          className={`relative p-4 rounded-lg backdrop-blur-sm ${
            index === currentPlayerIndex
              ? 'bg-white/20 ring-2 ring-white'
              : 'bg-white/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{player.name}</span>
              {player.score > 0 && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">{player.score}</span>
                </div>
              )}
            </div>
            {onRemovePlayer && (
              <button
                onClick={() => onRemovePlayer(player.id)}
                className="text-white/60 hover:text-white/90 transition-colors"
              >
                ×
              </button>
            )}
          </div>
          {player.streak > 1 && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
              {player.streak}🔥
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
