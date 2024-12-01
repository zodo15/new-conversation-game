import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy } from 'lucide-react';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
  onRemovePlayer?: (id: string) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  currentPlayerId,
  onRemovePlayer
}) => {
  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const leader = sortedPlayers[0];

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <div className="space-y-2">
        {sortedPlayers.map((player) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              flex items-center justify-between
              p-3 rounded-lg shadow-sm
              ${player.id === currentPlayerId ? 'bg-blue-500 text-white' : 'bg-white'}
              ${player.id === leader.id ? 'ring-2 ring-yellow-400' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              {player.id === leader.id && (
                <Crown className="w-5 h-5 text-yellow-400" />
              )}
              <span className="font-medium">{player.name}</span>
              {player.streak > 2 && (
                <div className="flex items-center gap-1 text-sm bg-white/10 px-2 py-1 rounded">
                  <Trophy className="w-4 h-4" />
                  <span>{player.streak}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold">{player.score}</span>
              {onRemovePlayer && (
                <button
                  onClick={() => onRemovePlayer(player.id)}
                  className="text-sm opacity-60 hover:opacity-100"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
