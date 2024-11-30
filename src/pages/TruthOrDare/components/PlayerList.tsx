import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from '../../../components/icons';
import { Player } from '../types/game';

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
  onRemovePlayer: (id: string) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({ players, currentPlayerId, onRemovePlayer }) => {
  const renderPlayerStats = (player: Player) => (
    <div className="flex gap-2 text-sm text-white/80">
      <span>Score: {player.score}</span>
      <span>|</span>
      <span>Truth: {player.truthCount || 0}</span>
      <span>|</span>
      <span>Dare: {player.dareCount || 0}</span>
      <span>|</span>
      <span>WYR: {player.wouldYouRatherCount || 0}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white text-center">Players</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`relative p-4 rounded-lg ${
                player.id === currentPlayerId
                  ? 'bg-purple-500'
                  : 'bg-white/10'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white">
                    {player.name}
                    {player.id === currentPlayerId && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </h4>
                  {renderPlayerStats(player)}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemovePlayer(player.id)}
                  className="text-white/60 hover:text-white/90 transition-colors"
                >
                  <CloseIcon size={16} />
                </motion.button>
              </div>

              {player.id === currentPlayerId && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-white/30"
                  layoutId="playerIndicator"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
