import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
  maxPlayers?: number;
  currentPlayerCount: number;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({
  onAddPlayer,
  maxPlayers = 8,
  currentPlayerCount
}) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && currentPlayerCount < maxPlayers) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  const canAddMore = currentPlayerCount < maxPlayers;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <motion.input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="Enter player name..."
        className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
        disabled={!canAddMore}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.button
        type="submit"
        className={`px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2 transition-colors ${
          canAddMore ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 cursor-not-allowed'
        }`}
        disabled={!canAddMore || !name.trim()}
        whileHover={canAddMore ? { scale: 1.05 } : {}}
        whileTap={canAddMore ? { scale: 0.95 } : {}}
      >
        <UserPlus className="w-5 h-5" />
        Add Player
      </motion.button>
    </form>
  );
};
