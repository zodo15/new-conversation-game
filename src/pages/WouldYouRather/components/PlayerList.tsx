import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import type { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  onRemove: (playerId: string) => void;
  currentPlayerIndex?: number;
  gameStarted?: boolean;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onRemove,
  currentPlayerIndex = 0,
  gameStarted = false
}) => {
  const renderPlayerStats = (player: Player) => (
    <div className="flex gap-2 text-sm text-white/80">
      <span>Score: {player.score}</span>
      <span>|</span>
      <span>Truth: {player.truthCount}</span>
      <span>|</span>
      <span>Dare: {player.dareCount}</span>
      <span>|</span>
      <span>WYR: {player.wouldYouRatherCount}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white text-center">Players</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {players.map((player, index) => (
            <motion.div
              key={player}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`relative p-4 rounded-lg ${
                index === currentPlayerIndex
                  ? 'bg-purple-500'
                  : 'bg-white/10'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white">
                    {player}
                    {index === currentPlayerIndex && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </h4>
                  {renderPlayerStats(player)}
                </div>

                {!gameStarted && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(player)}
                    className="text-white/60 hover:text-white/90 transition-colors"
                  >
                    <FaXmark size={16} />
                  </motion.button>
                )}
              </div>

              {index === currentPlayerIndex && (
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
