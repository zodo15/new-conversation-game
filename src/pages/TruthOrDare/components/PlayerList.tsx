import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../types/game';
import { X } from '@phosphor-icons/react';

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
  onRemovePlayer: (id: string) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  currentPlayerId,
  onRemovePlayer,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {players.map((player) => (
        <motion.div
          key={player.id}
          className={`relative p-4 rounded-lg ${
            player.id === currentPlayerId
              ? 'bg-purple-600'
              : 'bg-white/10 backdrop-blur-sm'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <button
            onClick={() => onRemovePlayer(player.id)}
            className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center">
            <h3 className="font-bold truncate">{player.name}</h3>
            <div className="text-sm opacity-80 space-y-1">
              <p>Score: {player.score}</p>
              <p>Streak: {player.streak}</p>
              <div className="text-xs space-x-2">
                <span>T: {player.choices.truth}</span>
                <span>D: {player.choices.dare}</span>
                <span>W: {player.choices['would-you-rather']}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
