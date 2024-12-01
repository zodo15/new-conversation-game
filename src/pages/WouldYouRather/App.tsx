import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useGameStore } from './store/gameStore';
import { Game } from './components/Game';
import { GameModes } from './components/GameModes';
import { PlayerInput } from './components/PlayerInput';
import { PlayerList } from './components/PlayerList';
import { GameMode } from './types';
import FloatingBackground from './components/FloatingBackground';

const App: React.FC = () => {
  const {
    mode,
    players,
    isGameStarted,
    addPlayer,
    removePlayer,
    setMode,
    startGame,
    resetGame,
    currentPlayerIndex
  } = useGameStore();

  const handleAddPlayer = (name: string) => {
    addPlayer(name);
  };

  const handleRemovePlayer = (id: string) => {
    removePlayer(id);
  };

  const handleSelectMode = (selectedMode: GameMode) => {
    setMode(selectedMode);
    startGame();
  };

  const handleBack = () => {
    resetGame();
  };

  if (isGameStarted) {
    return <Game onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <Toaster position="top-center" />
      <FloatingBackground />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Would You Rather?</h1>
            <p className="text-lg text-white/80">
              The ultimate decision-making game!
            </p>
          </header>

          {!mode ? (
            <GameModes onSelectMode={handleSelectMode} />
          ) : (
            <div className="space-y-8">
              <PlayerInput
                onAddPlayer={handleAddPlayer}
                currentPlayerCount={players.length}
              />
              
              <PlayerList
                players={players}
                onRemovePlayer={handleRemovePlayer}
                currentPlayerIndex={currentPlayerIndex}
              />

              {players.length >= 2 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => startGame()}
                  className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
                >
                  Start Game
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default App;