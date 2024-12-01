import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { GameMode, FriendMode } from './types';
import { QuestionDisplay } from './components/QuestionDisplay';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { Timer } from './components/Timer';

export const Game: React.FC = () => {
  const {
    mode,
    friendMode,
    players,
    currentQuestion,
    votes,
    currentPlayerIndex,
    chaosMaster,
    showChaosMasterWheel,
    chaosEnabled,
    timer,
    setCurrentQuestion,
    addVote,
    getRandomQuestion,
    triggerChaosEvent
  } = useGameStore();

  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    if (!currentQuestion) {
      const question = getRandomQuestion(mode);
      if (question) {
        setCurrentQuestion(question);
      }
    }
  }, [currentQuestion, mode, getRandomQuestion, setCurrentQuestion]);

  const handleVote = (choice: 'A' | 'B') => {
    if (!currentPlayer) return;
    addVote(currentPlayer.id, choice);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900 text-white p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Would You Rather</h1>
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
        </div>

        {/* Timer */}
        {timer > 0 && (
          <div className="mb-6">
            <Timer duration={timer} onComplete={() => {}} />
          </div>
        )}

        {/* Current Player */}
        {currentPlayer && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-purple-700/50 px-6 py-2 rounded-full">
              <img
                src={currentPlayer.avatar}
                alt={currentPlayer.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xl font-medium">{currentPlayer.name}'s Turn</span>
              {currentPlayer.streak > 1 && (
                <span className="text-yellow-400">🔥 {currentPlayer.streak}</span>
              )}
            </div>
          </div>
        )}

        {/* Question Display */}
        {currentQuestion && (
          <QuestionDisplay
            question={currentQuestion}
            votes={votes}
            players={players}
            onVote={handleVote}
            currentPlayerId={currentPlayer?.id}
          />
        )}

        {/* Chaos Master Wheel */}
        {showChaosMasterWheel && (
          <ChaosMasterWheel
            isVisible={showChaosMasterWheel}
            onClose={() => {}}
            onComplete={triggerChaosEvent}
          />
        )}

        {/* Player List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Players</h2>
          <div className="flex flex-wrap gap-4">
            {players.map(player => (
              <div
                key={player.id}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  ${player.isChaosmaster ? 'bg-purple-600' : 'bg-purple-700/50'}
                `}
              >
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{player.name}</span>
                <span className="text-purple-300">{player.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
