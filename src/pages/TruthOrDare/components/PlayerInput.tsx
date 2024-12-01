import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, PlusIcon } from '../../../components/icons';
import toast from 'react-hot-toast';
import useGameStore from '../store/gameStore';

interface PlayerInputProps {
  onBack: () => void;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({ onBack }) => {
  const [playerName, setPlayerName] = useState('');
  const { players, addPlayer } = useGameStore();

  const handleAddPlayer = () => {
    const trimmedName = playerName.trim();
    
    if (!trimmedName) {
      toast.error('Please enter a player name');
      return;
    }

    if (players.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      toast.error('Player name already exists');
      return;
    }

    addPlayer(trimmedName);
    setPlayerName('');
    toast.success('Player added successfully!');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftIcon size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 ml-4">Add Players</h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter player name"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={20}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddPlayer}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusIcon size={24} />
        </motion.button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Current Players ({players.length})
        </h3>
        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow"
            >
              <span className="text-gray-800">{player.name}</span>
              <button
                onClick={() => useGameStore.getState().removePlayer(player.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};