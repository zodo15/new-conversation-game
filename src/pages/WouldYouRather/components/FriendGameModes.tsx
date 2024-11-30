import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CaretLeft, Plus, Minus } from '@phosphor-icons/react';
import { toast } from 'react-hot-toast';

interface FriendGameModesProps {
  onBack: () => void;
  onStartOfflineGame: (players: string[]) => void;
}

export const FriendGameModes: React.FC<FriendGameModesProps> = ({
  onBack,
  onStartOfflineGame,
}) => {
  const [players, setPlayers] = useState<string[]>(['', '']);

  const addPlayer = () => {
    if (players.length < 8) {
      setPlayers([...players, '']);
    } else {
      toast.error('Maximum 8 players allowed!');
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
    } else {
      toast.error('Minimum 2 players required!');
    }
  };

  const updatePlayer = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleStartGame = () => {
    const filledPlayers = players.filter(name => name.trim() !== '');
    if (filledPlayers.length < 2) {
      toast.error('Please add at least 2 players!');
      return;
    }
    
    const uniquePlayers = new Set(filledPlayers);
    if (uniquePlayers.size !== filledPlayers.length) {
      toast.error('Player names must be unique!');
      return;
    }

    onStartOfflineGame(filledPlayers);
  };

  return (
    <div className="space-y-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="mb-8 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center gap-2 transition-colors"
      >
        <CaretLeft className="w-4 h-4" />
        Back
      </motion.button>

      <div className="bg-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Add Players
        </h2>

        <div className="space-y-4">
          {players.map((player, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={player}
                onChange={(e) => updatePlayer(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removePlayer(index)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </motion.button>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addPlayer}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Player
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartGame}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold shadow-lg transition-colors"
          >
            Start Game
          </motion.button>
        </div>
      </div>
    </div>
  );
};