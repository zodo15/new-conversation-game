import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { PlayerInput } from './components/PlayerInput';
import { GameModes } from './components/GameModes';
import { Sparkle, Barbell } from '@phosphor-icons/react';
import { useGameStore } from './store/gameStore';
import { FeedbackButton } from '../../components/FeedbackButton';
import { FloatingBackground } from '../../components/FloatingBackground';

interface Props {
  onBack: () => void;
}

const TruthOrDare: React.FC<Props> = ({ onBack }) => {
  const { players, gameStarted, mode } = useGameStore();
  const [showPlayerInput, setShowPlayerInput] = useState(true);

  const handleStartGame = () => {
    setShowPlayerInput(false);
  };

  const handleBack = () => {
    setShowPlayerInput(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4">
      <FloatingBackground />
      <div className="container mx-auto max-w-4xl relative">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkle weight="fill" className="w-8 h-8" />
            Truth or Dare
            <Barbell weight="fill" className="w-8 h-8" />
          </h1>
          <p className="text-lg opacity-90">
            A fun party game to play with friends!
          </p>
        </header>

        <FeedbackButton onClick={() => {}} />

        <main>
          {showPlayerInput ? (
            <PlayerInput
              players={players.map(p => p.name)}
              onStartGame={handleStartGame}
              onBack={handleBack}
            />
          ) : gameStarted ? (
            <GameBoard />
          ) : (
            <GameModes onSelect={handleStartGame} selectedType={null} />
          )}
        </main>
      </div>
    </div>
  );
};

export default TruthOrDare;