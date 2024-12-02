import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Shuffle, Info, Sparkles, Wifi, WifiOff, ArrowLeft, X, SkipForward, Zap, Plus } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { GameMode, FriendMode } from '../types';
import { useGameStore } from '../store/gameStore';
import { GameModes } from './GameModes';
import { FriendGameModes } from './FriendGameModes';
import { PlayerList } from './PlayerList';
import { QuestionDisplay } from './QuestionDisplay';
import { ChaosMasterWheel } from './ChaosMasterWheel';
import { Timer } from './Timer';
import { AddQuestionModal } from './AddQuestionModal';
import { FloatingBackground } from './FloatingBackground';

export const App: React.FC = () => {
  const {
    mode,
    friendMode,
    gameStarted,
    players,
    currentQuestion,
    votes,
    currentPlayerIndex,
    chaosMaster,
    showChaosMasterWheel,
    chaosEnabled,
    showAddQuestion,
    timer,
    setMode,
    setFriendMode,
    startGame,
    resetGame,
    addPlayer,
    removePlayer,
    addVote,
    setShowChaosMasterWheel,
    setChaosmaster,
    toggleChaosMode,
    setShowAddQuestion,
    setTimer,
    triggerChaosEvent
  } = useGameStore();

  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      toast.error('Please enter a player name');
      return;
    }
    if (players.some(p => p.name === playerName.trim())) {
      toast.error('Player already exists');
      return;
    }
    addPlayer(playerName.trim());
    setPlayerName('');
    toast.success(`Added ${playerName}!`);
  };

  const handleModeSelect = (selectedMode: GameMode) => {
    setMode(selectedMode);
    if (selectedMode === GameMode.FRIEND) {
      setFriendMode(undefined);
    } else {
      startGame();
    }
  };

  const handleFriendModeSelect = (selected: FriendMode) => {
    setFriendMode(selected);
    if (selected === 'offline') {
      setShowAddQuestion(false);
    }
  };

  const handleVote = (choice: 'A' | 'B') => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer || !currentQuestion) return;
    
    addVote(currentPlayer.id, choice);
    
    if (mode === GameMode.CHAOS && chaosEnabled && Math.random() > 0.7) {
      const chaosEffects = [
        { name: 'Dance Break!', message: 'Everyone must dance for 30 seconds! 💃🕺' },
        { name: 'Accent Challenge', message: 'Next player must answer in a funny accent! 🗣️' },
        { name: 'Truth Bomb', message: 'Current player must share an embarrassing story! 😅' },
        { name: 'Switch Seats', message: 'Everyone must switch seats clockwise! 🔄' },
        { name: 'Silent Mode', message: 'Next round must be played in complete silence! 🤫' }
      ];
      
      const effect = chaosEffects[Math.floor(Math.random() * chaosEffects.length)];
      toast(effect.message, { 
        icon: '🎲',
        duration: 5000
      });
    }
  };

  const handleChaosWheelComplete = (event: ChaosEvent) => {
    triggerChaosEvent(event);
    toast.success(`Chaos Effect: ${event.description}`, {
      icon: '🎲',
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900 text-white p-6">
      <FloatingBackground />
      <Toaster position="top-center" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Would You Rather</h1>
          {mode && (
            <div className="flex justify-center items-center gap-4">
              <span className="text-xl">
                Mode: {mode} {friendMode && `(${friendMode})`}
              </span>
              {mode === GameMode.CHAOS && chaosMaster && (
                <span className="text-xl text-purple-300">
                  Chaos Master: {players.find(p => p.id === chaosMaster)?.name}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Game Mode Selection */}
        {!mode && (
          <GameModes onSelect={handleModeSelect} />
        )}

        {/* Friend Mode Selection */}
        {mode === GameMode.FRIEND && !friendMode && (
          <FriendGameModes onSelect={handleFriendModeSelect} />
        )}

        {/* Player Setup */}
        {mode === GameMode.FRIEND && friendMode === 'offline' && !gameStarted && (
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter player name"
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-700/50 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                />
                <button
                  onClick={handleAddPlayer}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <PlayerList
              players={players}
              onRemove={(id) => removePlayer(id)}
            />

            {players.length >= 2 && (
              <button
                onClick={startGame}
                className="w-full mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
              >
                Start Game
              </button>
            )}
          </div>
        )}

        {/* Game Content */}
        {gameStarted && currentQuestion && (
          <>
            {timer > 0 && (
              <div className="mb-6">
                <Timer duration={timer} onComplete={() => {}} />
              </div>
            )}

            {/* Current Player */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 bg-purple-700/50 px-6 py-2 rounded-full">
                <img
                  src={players[currentPlayerIndex].avatar}
                  alt={players[currentPlayerIndex].name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xl font-medium">
                  {players[currentPlayerIndex].name}'s Turn
                </span>
                {players[currentPlayerIndex].streak > 1 && (
                  <span className="text-yellow-400">
                    🔥 {players[currentPlayerIndex].streak}
                  </span>
                )}
              </div>
            </div>

            <QuestionDisplay
              question={currentQuestion}
              votes={votes}
              players={players}
              onVote={handleVote}
              currentPlayerId={players[currentPlayerIndex].id}
            />
          </>
        )}

        {/* Chaos Master Wheel */}
        {showChaosMasterWheel && (
          <ChaosMasterWheel
            isVisible={showChaosMasterWheel}
            onClose={() => setShowChaosMasterWheel(false)}
            onComplete={handleChaosWheelComplete}
          />
        )}

        {/* Add Question Modal */}
        {showAddQuestion && (
          <AddQuestionModal
            isOpen={showAddQuestion}
            onClose={() => setShowAddQuestion(false)}
            onSubmit={(question) => {
              // Handle adding custom question
              setShowAddQuestion(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
