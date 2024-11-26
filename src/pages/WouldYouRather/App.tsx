import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Crown, RotateCcw, ArrowRight, ArrowLeft, Sparkles, Brain, Zap, Heart, Flame, Star, Users } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { GameCard } from './components/GameCard';
import { ChoiceCard } from './components/ChoiceCard';
import { AddQuestionModal } from './components/AddQuestionModal';
import { allQuestions, getQuestions, getFriendGameQuestions, shuffleArray, type GameMode, type Question } from './data/questions';
import { FriendGameModes } from './components/FriendGameModes';
import { OfflineGameSetup } from './components/OfflineGameSetup';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { ChaosButton } from './components/ChaosButton';
import { Timer } from './components/Timer';
import { useNavigate } from 'react-router-dom';

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
}

const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }: FloatingIconProps) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [-10, 10, -10],
      rotate: [-5, 5, -5]
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      delay 
    }}
    className={`absolute opacity-20 ${className}`}
  >
    <Icon className="w-12 h-12" />
  </motion.div>
);

interface GameState {
  currentQuestion: Question | null;
  usedQuestionIds: Set<number>;
  votes: Record<number, { votesA: number; votesB: number }>;
  chaosMaster: string | null;
  players: string[];
  showChaosMasterWheel: boolean;
}

export const WouldYouRatherApp = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFriendModes, setShowFriendModes] = useState(false);
  const [showOfflineSetup, setShowOfflineSetup] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('classic');

  const handleStartOfflineGame = (players: string[]) => {
    try {
      setGameMode('friends');
      setGameState({
        currentQuestion: null,
        usedQuestionIds: new Set(),
        votes: {},
        chaosMaster: null,
        players,
        showChaosMasterWheel: true
      });
      setShowOfflineSetup(false);
    } catch (error) {
      console.error('Error starting offline game:', error);
    }
  };

  const handleStartGame = (mode: GameMode = 'classic') => {
    try {
      const questions = getQuestions(mode, true);
      if (!questions || questions.length === 0) {
        console.error('No questions available for mode:', mode);
        return;
      }
      
      const firstQuestion = questions[0];
      console.log('Starting game with question:', firstQuestion);
      
      setGameMode(mode);
      setGameState({
        currentQuestion: firstQuestion,
        usedQuestionIds: new Set([firstQuestion.id]),
        votes: {},
        chaosMaster: null,
        players: [],
        showChaosMasterWheel: false
      });
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handleAnswer = (answer: 'A' | 'B') => {
    if (!gameState || selectedAnswer || !gameState.currentQuestion) return;
    
    setSelectedAnswer(answer);
    setGameState(prev => {
      if (!prev || !prev.currentQuestion) return prev;
      const questionId = prev.currentQuestion.id;
      const currentVotes = prev.votes[questionId] || { votesA: 0, votesB: 0 };
      
      return {
        ...prev,
        currentQuestion: {
          ...prev.currentQuestion,
          votesA: answer === 'A' ? prev.currentQuestion.votesA + 1 : prev.currentQuestion.votesA,
          votesB: answer === 'B' ? prev.currentQuestion.votesB + 1 : prev.currentQuestion.votesB
        }
      };
    });
  };

  const handleAddQuestion = (question: Question) => {
    // implement handleAddQuestion logic
  };

  const handleOnlineGame = () => {
    // implement handleOnlineGame logic
  };

  const handleOfflineGame = () => {
    setShowOfflineSetup(true);
    setShowFriendModes(false);
  };

  const handleChaosMasterSelected = (chaosMaster: string) => {
    try {
      const questions = getFriendGameQuestions();
      if (!questions || questions.length === 0) {
        console.error('No questions available for friends mode');
        return;
      }
      
      const firstQuestion = questions[0];
      
      setGameState(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          currentQuestion: firstQuestion,
          usedQuestionIds: new Set([firstQuestion.id]),
          chaosMaster,
          showChaosMasterWheel: false
        };
      });
    } catch (error) {
      console.error('Error setting up game after chaos master selection:', error);
    }
  };

  const handleSkipQuestion = () => {
    handleNextRound();
  };

  const handleNextRound = () => {
    if (!gameState) return;
    
    setSelectedAnswer(null);
    const questions = gameMode === 'friends' ? getFriendGameQuestions() : getQuestions(gameMode, true);
    
    if (questions.length === 0) {
      console.error('No questions available');
      return;
    }

    const unusedQuestions = questions.filter(q => !gameState.usedQuestionIds.has(q.id));
    
    if (unusedQuestions.length === 0) {
      // If we've used all questions, start over with a fresh set
      const freshQuestions = gameMode === 'friends' ? getFriendGameQuestions() : getQuestions(gameMode, true);
      const firstQuestion = freshQuestions[0];
      setGameState(prev => ({
        ...prev!,
        currentQuestion: firstQuestion,
        usedQuestionIds: new Set([firstQuestion.id])
      }));
    } else {
      // Get a random unused question
      const nextQuestion = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
      setGameState(prev => ({
        ...prev!,
        currentQuestion: nextQuestion,
        usedQuestionIds: new Set([...prev!.usedQuestionIds, nextQuestion.id])
      }));
    }
  };

  if (gameState?.showChaosMasterWheel && gameState.players) {
    return (
      <ChaosMasterWheel
        players={gameState.players}
        onComplete={handleChaosMasterSelected}
      />
    );
  }

  if (showFriendModes) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8 z-0 overflow-hidden">
        <div className="relative max-w-4xl mx-auto z-10">
          <FriendGameModes
            onOnlineClick={() => {
              // For now, we'll just use offline mode since online isn't implemented
              setShowOfflineSetup(true);
              setShowFriendModes(false);
            }}
            onOfflineClick={() => {
              setShowOfflineSetup(true);
              setShowFriendModes(false);
            }}
            onBack={() => setShowFriendModes(false)}
          />
        </div>
      </div>
    );
  }

  if (!gameState) {
    if (showOfflineSetup) {
      return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8 z-0 overflow-hidden">
          <FloatingIcon icon={Brain} className="top-20 left-20" delay={0} />
          <FloatingIcon icon={Heart} className="top-40 right-20" delay={1} />
          <FloatingIcon icon={Star} className="bottom-20 left-40" delay={2} />
          <div className="relative max-w-4xl mx-auto z-10">
            <motion.button
              onClick={() => setShowOfflineSetup(false)}
              className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </motion.button>
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

    return (
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8 z-0 overflow-hidden">
        <FloatingIcon icon={Sparkles} className="top-20 left-20" delay={0} />
        <FloatingIcon icon={Brain} className="top-40 right-20" delay={1} />
        <FloatingIcon icon={Flame} className="bottom-20 left-40" delay={2} />
        <FloatingIcon icon={Zap} className="bottom-40 right-40" delay={3} />
        <div className="relative max-w-4xl mx-auto z-10">
          <motion.button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </motion.button>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Would You Rather
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-300 mb-12"
          >
            Choose your game mode and challenge your friends with intriguing dilemmas!
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 gap-6 max-w-lg mx-auto"
          >
            <GameCard
              title="Classic Mode"
              description="Traditional would you rather questions"
              onClick={() => handleStartGame('classic')}
              icon={Brain}
              questionType="classic"
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30"
            />
            <GameCard
              title="Spicy Mode"
              description="More challenging and thought-provoking questions"
              onClick={() => handleStartGame('spicy')}
              icon={Flame}
              questionType="spicy"
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30"
            />
            <GameCard
              title="Mixed Mode"
              description="Mix of both classic and spicy questions"
              onClick={() => handleStartGame('mixed')}
              icon={Star}
              questionType="mixed"
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30"
            />
            <GameCard
              title="Play with Friends"
              description="Challenge your friends online or offline"
              onClick={() => setShowFriendModes(true)}
              icon={Users}
              questionType="friends"
              className="bg-gradient-to-br from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30"
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white relative overflow-hidden">
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

        {gameState?.chaosMaster && (
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
            key={gameState.currentQuestion?.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-8"
          >
            <div className="relative">
              <Timer 
                duration={15} 
                key={gameState.currentQuestion?.id}
              />
              <h2 className="text-3xl font-bold text-center mb-12">
                Would You Rather...
              </h2>
            </div>
            {gameState.currentQuestion && (
              <div className="grid md:grid-cols-2 gap-8">
                <ChoiceCard
                  option={gameState.currentQuestion.optionA}
                  onClick={() => handleAnswer('A')}
                  selected={selectedAnswer === 'A'}
                  disabled={selectedAnswer !== null}
                  percentage={selectedAnswer ? (gameState.currentQuestion.votesA / (gameState.currentQuestion.votesA + gameState.currentQuestion.votesB) * 100) : undefined}
                />
                <ChoiceCard
                  option={gameState.currentQuestion.optionB}
                  onClick={() => handleAnswer('B')}
                  selected={selectedAnswer === 'B'}
                  disabled={selectedAnswer !== null}
                  percentage={selectedAnswer ? (gameState.currentQuestion.votesB / (gameState.currentQuestion.votesA + gameState.currentQuestion.votesB) * 100) : undefined}
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

        {gameState?.chaosMaster && (
          <ChaosButton 
            isChaosMaster={gameState.chaosMaster === gameState.players?.[0]} 
          />
        )}
      </div>
    </div>
  );
};