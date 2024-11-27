import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { GameCard } from './components/GameCard';
import { ChaosButton } from './components/ChaosButton';
import { GameMode, GameState, Question, CustomQuestion } from './types';
import { allQuestions, shuffleArray } from './data/questions';
import { 
  SparklesIcon, 
  UserGroupIcon, 
  PuzzlePieceIcon,
  ArrowLeftIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { FriendGameModes } from './components/FriendGameModes';
import { OfflineGameSetup } from './components/OfflineGameSetup';
import { Timer } from './components/Timer';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { AddQuestion } from './components/AddQuestion';
import { useNavigate } from 'react-router-dom';
import { FloatingBackground } from './components/FloatingBackground';

export const WouldYouRatherApp = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    mode: GameMode.NONE,
    players: [],
    currentPlayerIndex: 0,
    isTimerRunning: false,
    showAddQuestion: false,
    chaosMaster: undefined,
    customQuestions: [],
    currentQuestion: undefined
  });

  const [showChaosMasterWheel, setShowChaosMasterWheel] = useState(false);

  const handleVote = (choice: 'A' | 'B') => {
    if (!gameState.currentQuestion) return;
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const questions = gameState.mode === GameMode.SPICY 
      ? allQuestions.filter(q => q.type === 'spicy')
      : allQuestions.filter(q => q.type === 'classic');
    
    const randomQuestion = shuffleArray(questions)[0];
    setGameState(prev => ({
      ...prev,
      currentQuestion: randomQuestion,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % Math.max(prev.players.length, 1)
    }));
  };

  const handleModeSelect = (mode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      mode,
      players: [],
      currentPlayerIndex: 0,
      currentQuestion: undefined,
      chaosMaster: undefined
    }));
    if (mode === GameMode.CLASSIC || mode === GameMode.SPICY) {
      handleNextQuestion();
    }
  };

  const handleStartOfflineGame = (players: string[]) => {
    if (players.length < 2) return;
    
    const chaosMasterIndex = Math.floor(Math.random() * players.length);
    setGameState(prev => ({
      ...prev,
      mode: GameMode.OFFLINE,
      players,
      currentPlayerIndex: 0,
      chaosMaster: players[chaosMasterIndex]
    }));
    handleNextQuestion();
  };

  const isCurrentPlayerChaosMaster = gameState.players.length > 0 && 
    gameState.chaosMaster === gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8 relative overflow-hidden">
      <FloatingBackground />
      <div className="relative z-10">
        <Toaster position="top-center" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white absolute left-0"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Dashboard
            </motion.button>
            <h1 className="text-4xl font-bold w-full text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Would You Rather?
            </h1>
          </div>

          {gameState.mode === GameMode.NONE && (
            <div className="grid grid-cols-1 gap-6">
              <GameCard
                title="Classic Mode"
                description="The original Would You Rather experience. Choose between two challenging options!"
                icon={PuzzlePieceIcon}
                onClick={() => handleModeSelect(GameMode.CLASSIC)}
                className="backdrop-blur-sm bg-white/10 hover:bg-white/20"
              />
              <GameCard
                title="Spicy Mode"
                description="Not for the faint of heart. More challenging and controversial options!"
                icon={SparklesIcon}
                onClick={() => handleModeSelect(GameMode.SPICY)}
                className="backdrop-blur-sm bg-white/10 hover:bg-white/20"
              />
              <GameCard
                title="Friends Mode"
                description="Play with friends! Create custom questions and vote together."
                icon={UserGroupIcon}
                onClick={() => handleModeSelect(GameMode.FRIENDS)}
                className="backdrop-blur-sm bg-white/10 hover:bg-white/20"
              />
            </div>
          )}

          {(gameState.mode === GameMode.CLASSIC || gameState.mode === GameMode.SPICY || gameState.mode === GameMode.OFFLINE) && gameState.currentQuestion && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleModeSelect(GameMode.NONE)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  Back
                </button>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGameState(prev => ({ ...prev, showAddQuestion: true }))}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Add Question
                  </button>
                  {gameState.players.length > 0 && (
                    <div className="text-lg font-medium text-blue-400">
                      {gameState.players[gameState.currentPlayerIndex]}'s Turn
                      {isCurrentPlayerChaosMaster && (
                        <span className="ml-2 text-pink-400">(Chaos Master)</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote('A')}
                  className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 hover:from-blue-600/30 hover:to-blue-800/30 transition-colors"
                >
                  <p className="text-xl">{gameState.currentQuestion.option1}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote('B')}
                  className="p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 hover:from-purple-600/30 hover:to-purple-800/30 transition-colors"
                >
                  <p className="text-xl">{gameState.currentQuestion.option2}</p>
                </motion.button>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Next Question
                </motion.button>
              </div>
            </div>
          )}

          {gameState.mode === GameMode.FRIENDS && (
            <FriendGameModes
              onBack={() => handleModeSelect(GameMode.NONE)}
              onStartOfflineGame={handleStartOfflineGame}
            />
          )}

          {gameState.showAddQuestion && (
            <AddQuestion
              onClose={() => setGameState(prev => ({ ...prev, showAddQuestion: false }))}
              onAdd={(question) => {
                setGameState(prev => ({
                  ...prev,
                  customQuestions: [...prev.customQuestions, question],
                  showAddQuestion: false
                }));
              }}
            />
          )}

          {showChaosMasterWheel && (
            <ChaosMasterWheel
              onClose={() => setShowChaosMasterWheel(false)}
              onSpin={(action) => {
                setShowChaosMasterWheel(false);
                if (action === 'timer') {
                  setGameState(prev => ({ ...prev, isTimerRunning: true }));
                }
              }}
            />
          )}

          {gameState.isTimerRunning && (
            <Timer
              duration={30}
              onComplete={() => setGameState(prev => ({ ...prev, isTimerRunning: false }))}
            />
          )}
        </div>
      </div>
    </div>
  );
};