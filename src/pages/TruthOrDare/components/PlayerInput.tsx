import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { UserPlus2, PlayCircle } from 'lucide-react';

interface Props {
  players: string[];
  setPlayers: (players: string[]) => void;
  onStart: () => void;
}

const PlayerInput: React.FC<Props> = ({ players, setPlayers, onStart }) => {
  const [newPlayer, setNewPlayer] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPlayer.trim()) {
      toast.error('Please enter a player name');
      return;
    }

    if (players.includes(newPlayer.trim())) {
      toast.error('Player already exists');
      return;
    }

    if (players.length >= 8) {
      toast.error('Maximum 8 players allowed');
      return;
    }

    setPlayers([...players, newPlayer.trim()]);
    setNewPlayer('');
    toast.success('Player added!');
  };

  const removePlayer = (playerToRemove: string) => {
    setPlayers(players.filter(player => player !== playerToRemove));
    toast.success('Player removed');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <h1 className="text-4xl font-bold text-center mb-8">Truth or Dare</h1>

      <form onSubmit={handleAddPlayer} className="flex gap-4">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="Enter player name..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="p-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <UserPlus2 className="w-6 h-6" />
        </button>
      </form>

      {players.length > 0 && (
        <div className="flex flex-col gap-2">
          {players.map((player) => (
            <motion.div
              key={player}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/10 p-4 rounded-lg flex items-center justify-between"
            >
              <span>{player}</span>
              <button
                onClick={() => removePlayer(player)}
                className="text-red-400 hover:text-red-300 px-2"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {players.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <PlayCircle className="w-6 h-6" />
            Start Game
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlayerInput;