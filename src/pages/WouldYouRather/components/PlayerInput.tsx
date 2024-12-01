import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
  disabled?: boolean;
  maxPlayers?: number;
  currentPlayerCount: number;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({
  onAddPlayer,
  disabled = false,
  maxPlayers = 8,
  currentPlayerCount,
}) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !disabled && currentPlayerCount < maxPlayers) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  const remainingSlots = maxPlayers - currentPlayerCount;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          disabled={disabled || remainingSlots <= 0}
          className={`
            w-full px-4 py-2 pr-12
            bg-white/10 rounded-lg
            text-white placeholder-white/50
            focus:outline-none focus:ring-2 focus:ring-white/20
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          maxLength={20}
        />
        
        <motion.button
          type="submit"
          whileHover={!disabled && name.trim() ? { scale: 1.1 } : {}}
          whileTap={!disabled && name.trim() ? { scale: 0.9 } : {}}
          disabled={disabled || !name.trim() || remainingSlots <= 0}
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2
            p-1 rounded-full
            ${name.trim() && !disabled ? 'text-white' : 'text-white/30'}
            disabled:cursor-not-allowed
          `}
        >
          <UserPlus className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="mt-2 text-sm text-white/60">
        {remainingSlots > 0 ? (
          `${remainingSlots} player slot${remainingSlots !== 1 ? 's' : ''} remaining`
        ) : (
          'Maximum players reached'
        )}
      </div>
    </form>
  );
};
