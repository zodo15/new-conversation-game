import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../types/game';
import { useGameStore } from '../store/gameStore';
import {
  HeartIcon,
  SpicyIcon,
  FunnyIcon,
  DeepIcon,
  PhysicalIcon,
  SocialIcon,
  CreativeIcon,
} from '../../../components/icons';

interface ReactionOption {
  id: string;
  icon: React.ElementType;
  color: string;
}

interface ReactionsProps {
  currentPlayer: Player;
  players: Player[];
}

const reactionOptions: ReactionOption[] = [
  { id: 'heart', icon: HeartIcon, color: 'text-red-500' },
  { id: 'spicy', icon: SpicyIcon, color: 'text-orange-500' },
  { id: 'funny', icon: FunnyIcon, color: 'text-yellow-500' },
  { id: 'deep', icon: DeepIcon, color: 'text-purple-500' },
  { id: 'physical', icon: PhysicalIcon, color: 'text-blue-500' },
  { id: 'social', icon: SocialIcon, color: 'text-green-500' },
  { id: 'creative', icon: CreativeIcon, color: 'text-pink-500' },
];

export const Reactions: React.FC<ReactionsProps> = ({ currentPlayer, players }) => {
  const addReaction = useGameStore((state) => state.addReaction);

  const handleReaction = (toPlayerId: string, reactionId: string) => {
    if (toPlayerId === currentPlayer.id) return;
    addReaction(currentPlayer.id, toPlayerId, reactionId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {players
        .filter((p) => p.id !== currentPlayer.id)
        .map((player) => (
          <div
            key={player.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-800">{player.name}</h4>
              <span className="text-sm text-gray-500">
                Score: {player.score}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {reactionOptions.map(({ id, icon: Icon, color }) => {
                const reactionCount =
                  player.reactions?.received[currentPlayer.id]?.filter(
                    (r) => r === id
                  ).length || 0;

                return (
                  <motion.button
                    key={id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleReaction(player.id, id)}
                    className={`relative p-2 rounded-full hover:bg-gray-100 transition-colors ${
                      reactionCount > 0 ? color : 'text-gray-400'
                    }`}
                  >
                    <Icon size={24} />
                    {reactionCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {reactionCount}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};