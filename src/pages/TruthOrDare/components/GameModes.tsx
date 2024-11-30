import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Sparkle, Lightning } from '@phosphor-icons/react';

interface GameModesProps {
  onSelect: () => void;
  selectedType: string | null;
}

export const GameModes: React.FC<GameModesProps> = ({ onSelect, selectedType }) => {
  const { setMode, startGame } = useGameStore();

  const handleModeSelect = (mode: string) => {
    setMode(mode);
    startGame();
    onSelect();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        onClick={() => handleModeSelect('classic')}
        className={`p-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 ${
          selectedType === 'classic' ? 'ring-4 ring-white' : ''
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <Sparkle size={48} weight="fill" className="text-white" />
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Classic Mode</h3>
            <p className="text-sm opacity-90">
              The traditional game with truth, dare, and would you rather questions
            </p>
          </div>
        </div>
      </button>

      <button
        onClick={() => handleModeSelect('chaos')}
        className={`p-6 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 ${
          selectedType === 'chaos' ? 'ring-4 ring-white' : ''
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <Lightning size={48} weight="fill" className="text-white" />
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Chaos Mode</h3>
            <p className="text-sm opacity-90">
              A wild version where players vote and chaos reigns supreme
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};