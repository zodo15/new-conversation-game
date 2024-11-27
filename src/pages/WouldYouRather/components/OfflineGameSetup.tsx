import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, ChevronLeft, Plus, X, Users2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGameStore } from '../store/gameStore';

export const OfflineGameSetup: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const { players, addPlayer, removePlayer, startGame } = useGameStore();

  const handleAddPlayer = () => {
    if (players.length >= 12) {
      toast.error('Maximum 12 players allowed');
      return;
    }

    const trimmedName = playerName.trim();
    if (!trimmedName) {
      return;
    }

    if (players.includes(trimmedName)) {
      toast.error('Player name already exists');
      return;
    }

    addPlayer(trimmedName);
    setPlayerName('');
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      toast.error('At least 2 players required');
      return;
    }

    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Users2 className="w-7 h-7 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Players Setup
            </span>
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
              placeholder="Enter player name"
              className="flex-1 bg-white/10 text-white placeholder-white/50 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-white/20"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddPlayer}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Add Player
            </motion.button>
          </div>

          <div className="space-y-3">
            {players.map((player, index) => (
              <motion.div
                key={player}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 rounded-xl p-4 flex items-center justify-between group"
              >
                <span className="text-white/90">{player}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removePlayer(index)}
                  className="p-2 hover:bg-gray-600/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-5 h-5 text-red-400" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartGame}
          disabled={players.length < 2}
          className={`mt-8 w-full px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 ${
            players.length >= 2
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white cursor-pointer'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          <Play className="w-5 h-5" />
          Start Game
        </motion.button>
      </div>
    </div>
  );
};