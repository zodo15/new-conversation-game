import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerInputProps {
  players: string[];
  setPlayers: (players: string[]) => void;
  onStartGame: () => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ players, setPlayers, onStartGame }) => {
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayer.trim() && !players.includes(newPlayer.trim()) && players.length < 10) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const removePlayer = (playerToRemove: string) => {
    setPlayers(players.filter(player => player !== playerToRemove));
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={addPlayer} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Enter player name..."
            className="flex-1 px-4 py-3 bg-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            maxLength={20}
          />
          <button
            type="submit"
            disabled={players.length >= 10}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <AnimatePresence>
          {players.map((player) => (
            <motion.div
              key={player}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
            >
              <span className="text-white">{player}</span>
              <button
                onClick={() => removePlayer(player)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {players.length >= 2 && (
        <button
          onClick={onStartGame}
          className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default PlayerInput;