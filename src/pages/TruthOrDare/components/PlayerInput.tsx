import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaPlus, FaPlay } from "react-icons/fa6";
import { Player } from '../types';

interface Props {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  onStart: () => void;
}

const PlayerInput: React.FC<Props> = ({ players, setPlayers, onStart }) => {
  const [newPlayer, setNewPlayer] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPlayer.trim()) {
      toast.error('Please enter a player name', { id: 'empty-name' });
      return;
    }

    if (players.some(p => p.name === newPlayer.trim())) {
      toast.error('Player already exists', { id: 'duplicate-player' });
      return;
    }

    if (players.length >= 8) {
      toast.error('Maximum 8 players allowed', { id: 'max-players' });
      return;
    }

    const player: Player = {
      id: String(Date.now()),
      name: newPlayer.trim(),
      score: 0,
      truthCount: 0,
      dareCount: 0,
      skippedCount: 0,
      completedCount: 0
    };

    setPlayers([...players, player]);
    setNewPlayer('');
    toast.success('Player added!', { id: 'player-added' });
  };

  const removePlayer = (playerToRemove: Player) => {
    setPlayers(players.filter(player => player.id !== playerToRemove.id));
    toast.success('Player removed', { id: 'player-removed' });
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
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add Player
        </motion.button>
      </form>

      {players.length > 0 && (
        <div className="flex flex-col gap-2">
          {players.map((player) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/10 p-4 rounded-lg flex items-center justify-between"
            >
              <span>{player.name}</span>
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
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
          >
            <FaPlay className="w-4 h-4" />
            Start Game
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlayerInput;