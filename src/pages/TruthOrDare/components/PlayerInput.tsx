import React, { useState } from 'react';
import { Plus, ArrowLeft } from '@phosphor-icons/react';
import { useGameStore } from '../store/gameStore';
import { toast } from 'react-hot-toast';

interface Props {
  onStartGame: () => void;
  onBack: () => void;
  players: string[];
}

export const PlayerInput: React.FC<Props> = ({ onStartGame, onBack, players }) => {
  const [playerName, setPlayerName] = useState('');
  const { addPlayer, startGame } = useGameStore();

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      toast.error('Please enter a player name');
      return;
    }

    addPlayer(playerName);
    setPlayerName('');
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      toast.error('Need at least 2 players to start');
      return;
    }

    startGame();
    onStartGame();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold">Add Players</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter player name"
            className="flex-1 px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddPlayer}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {players.map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/20 rounded px-4 py-2"
            >
              <span>{name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleStartGame}
          disabled={players.length < 2}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};