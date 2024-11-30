import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Crown, RotateCcw, ArrowRight } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { GameCard } from './components/GameCard';
import { ChoiceCard } from './components/ChoiceCard';
import { AddQuestionModal } from './components/AddQuestionModal';
import { allQuestions, getQuestions, getFriendGameQuestions, shuffleArray } from './data/questions';
import type { Question } from './data/questions';
import { FriendGameModes } from './components/FriendGameModes';
import { OfflineGameSetup } from './components/OfflineGameSetup';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { ChaosButton } from './components/ChaosButton';
import { Timer } from './components/Timer';

type GameMode = 'classic' | 'online' | 'offline';

interface GameState {
  currentQuestion: number;
  gameMode: GameMode;
  answers: Record<string, string>;
  players?: string[];
  currentPlayer?: number;
  chaosMaster?: string;
  showChaosMasterSelection?: boolean;
  questionType?: 'classic' | 'spicy' | 'all';
}

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFriendModes, setShowFriendModes] = useState(false);
  const [showOfflineSetup, setShowOfflineSetup] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);

  const handleStartGame = (type: 'classic' | 'spicy' | 'all' = 'all') => {
    const questions = getQuestions(type, true);
    const firstQuestion = questions[0];
    
    setUsedQuestionIds(new Set([firstQuestion.id]));
    setAvailableQuestions(questions);
    
    setGameState({
      currentQuestion: 0,
      gameMode: 'classic',
      answers: {},
      questionType: type
    });
  };

  const handleAnswer = (answer: 'A' | 'B') => {
    if (!gameState || selectedAnswer) return;
    setSelectedAnswer(answer);
  };

  const handleAddQuestion = (question: Question) => {
    setCustomQuestions(prev => [...prev, { ...question, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleOnlineGame = () => {
    setGameState({
      currentQuestion: 0,
      gameMode: 'online',
      answers: {},
    });
    setShowFriendModes(false);
  };

  const handleOfflineGame = () => {
    setShowOfflineSetup(true);
    setShowFriendModes(false);
  };

  const handleStartOfflineGame = (players: string[]) => {
    setGameState({
      currentQuestion: 0,
      gameMode: 'offline',
      answers: {},
      players: players,
      currentPlayer: 0,
      showChaosMasterSelection: true,
    });
    setShowOfflineSetup(false);
  };

  const handleChaosMasterSelected = (chaosMaster: string) => {
    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        chaosMaster,
        showChaosMasterSelection: false,
        currentPlayer: prev.players?.indexOf(chaosMaster) ?? 0,
      };
    });
  };

  const handleSkipQuestion = () => {
    if (!gameState) return;
    const nextQuestion = getNextQuestion();
    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentQuestion: allQuestions.findIndex(q => q.id === nextQuestion.id),
      };
    });
  };

  const handleNextRound = () => {
    if (!gameState) return;
    setSelectedAnswer(null);
    const nextQuestion = getNextQuestion();
    
    setGameState(prev => {
      if (!prev) return prev;
      
      if (prev.gameMode === 'offline' && prev.players) {
        return {
          ...prev,
          currentQuestion: allQuestions.findIndex(q => q.id === nextQuestion.id),
          showChaosMasterSelection: true,
        };
      }
      
      return {
        ...prev,
        currentQuestion: allQuestions.findIndex(q => q.id === nextQuestion.id),
      };
    });
  };

  const getCurrentQuestions = () => {
    const baseQuestions = getQuestions(gameState?.questionType || 'all', true);
    return [...baseQuestions, ...customQuestions];
  };

  const getNextQuestion = () => {
    const questions = getCurrentQuestions();
    
    if (usedQuestionIds.size >= questions.length) {
      setUsedQuestionIds(new Set());
      setAvailableQuestions(shuffleArray([...questions]));
      return questions[0];
    }

    const unusedQuestions = questions.filter(q => !usedQuestionIds.has(q.id));
    
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const nextQuestion = unusedQuestions[randomIndex];
    
    setUsedQuestionIds(prev => new Set([...prev, nextQuestion.id]));
    
    return nextQuestion;
  };

  const questions = getCurrentQuestions();
  const currentQuestion = gameState ? questions[gameState.currentQuestion % questions.length] : null;

  if (gameState?.showChaosMasterSelection && gameState.players) {
    return (
      <ChaosMasterWheel
        players={gameState.players}
        onComplete={handleChaosMasterSelected}
      />
    );
  }

  if (!gameState) {
    if (showOfflineSetup) {
      return (
        <div className="relative min-h-screen bg-gray-900 text-white p-8 z-0">
          <div className="relative max-w-4xl mx-auto z-10">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Offline Game Setup
            </motion.h1>
            <div className="mt-12">
              <OfflineGameSetup
                onStart={handleStartOfflineGame}
                onBack={() => setShowOfflineSetup(false)}
              />
            </div>
          </div>
        </div>
      );
    }

    if (showFriendModes) {
      return (
        <div className="relative min-h-screen bg-gray-900 text-white p-8 z-0">
          <div className="relative max-w-4xl mx-auto z-10">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Play with Friends
            </motion.h1>
            <div className="mt-12">
              <FriendGameModes
                onOnlineClick={handleOnlineGame}
                onOfflineClick={handleOfflineGame}
                onBack={() => setShowFriendModes(false)}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative min-h-screen bg-gray-900 text-white p-8 z-0">
        <div className="relative max-w-4xl mx-auto z-10">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Would You Rather?
          </motion.h1>
          <div className="mt-12 grid gap-6">
            <GameCard
              title="Play Classic"
              description="Test your choices with interesting dilemmas"
              onClick={() => handleStartGame('classic')}
              questionType="classic"
            />
            <GameCard
              title="Play Spicy"
              description="More challenging and mature questions"
              onClick={() => handleStartGame('spicy')}
              questionType="spicy"
            />
            <GameCard
              title="Play Mixed"
              description="Mix of both classic and spicy questions"
              onClick={() => handleStartGame('all')}
              questionType="all"
            />
            <GameCard
              title="Play with Friends"
              description="Challenge your friends online or offline"
              onClick={() => setShowFriendModes(true)}
              questionType="all"
            />
          </div>
        </div>
        <AddQuestionModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddQuestion}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-8 z-0">
      <Toaster position="top-center" />
      <div className="relative max-w-4xl mx-auto z-10">
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState(null)}
            className="px-4 py-2 bg-gray-700 rounded-lg text-white font-semibold"
          >
            Back to Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </motion.button>
        </div>

        {gameState.gameMode === 'offline' && gameState.chaosMaster && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Chaos Master: {gameState.chaosMaster}
              </span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={gameState.currentQuestion}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-8"
          >
            <div className="relative">
              <Timer 
                duration={15} 
                key={gameState.currentQuestion}
              />
              <h2 className="text-3xl font-bold text-center mb-12">
                Would You Rather...
              </h2>
            </div>
            {currentQuestion && (
              <div className="grid md:grid-cols-2 gap-8">
                <ChoiceCard
                  option={currentQuestion.optionA}
                  onClick={() => handleAnswer('A')}
                  selected={selectedAnswer === 'A'}
                  disabled={selectedAnswer !== null}
                />
                <ChoiceCard
                  option={currentQuestion.optionB}
                  onClick={() => handleAnswer('B')}
                  selected={selectedAnswer === 'B'}
                  disabled={selectedAnswer !== null}
                />
              </div>
            )}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkipQuestion}
                className="px-6 py-3 bg-gray-700 rounded-lg text-white font-semibold flex items-center gap-2"
                disabled={selectedAnswer !== null}
              >
                <RotateCcw className="w-4 h-4" />
                Replace
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextRound}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold flex items-center gap-2"
              >
                Next Round
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
        <AddQuestionModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddQuestion}
        />

        {gameState.gameMode === 'offline' && (
          <ChaosButton 
            isChaosMaster={gameState.chaosMaster === gameState.players?.[gameState.currentPlayer ?? 0]} 
          />
        )}
      </div>
    </div>
  );
}

export default App;