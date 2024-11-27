import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { Question, GameMode, GameState } from './types';
import { 
  IoChevronBack as ArrowLeft,
  IoHeart as Heart,
  IoFlame as Flame,
  IoStar as Star,
  IoAdd as Plus,
  IoShield as Crown,
  IoRefresh as RotateCcw,
  IoChevronForward as ArrowRight,
  IoSparkles as Sparkles,
  IoBulb as Brain,
  IoFlash as Zap,
  IoPeople as Users
} from 'react-icons/io5';
import { GameCard } from './components/GameCard';
import { ChoiceCard } from './components/ChoiceCard';
import { AddQuestionModal } from './components/AddQuestionModal';
import { FriendGameModes } from './components/FriendGameModes';
import { OfflineGameSetup } from './components/OfflineGameSetup';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { ChaosButton } from './components/ChaosButton';
import { Timer } from './components/Timer';
import { useNavigate } from 'react-router-dom';
import * as Questions from './data/questions';

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

export const WouldYouRatherApp = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    usedQuestionIds: new Set(),
    votes: {},
    chaosMaster: null,
    players: [],
    showChaosMasterWheel: false
  });

  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showFriendModes, setShowFriendModes] = useState(false);
  const [showOfflineSetup, setShowOfflineSetup] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'option1' | 'option2' | null>(null);

  const handleStartOfflineGame = (players: string[]) => {
    try {
      setGameMode('friends');
      const questions = Questions.getFriendGameQuestions();
      const firstQuestion = questions[0];
      
      setGameState({
        currentQuestion: firstQuestion,
        usedQuestionIds: new Set([firstQuestion.id]),
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
      const questions = Questions.getQuestions(mode);
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

  const handleAnswer = (answer: 'option1' | 'option2') => {
    if (!gameState?.currentQuestion || selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setGameState(prev => {
      if (!prev?.currentQuestion) return prev;
      
      return {
        ...prev,
        currentQuestion: {
          ...prev.currentQuestion,
          votesA: answer === 'option1' ? prev.currentQuestion.votesA + 1 : prev.currentQuestion.votesA,
          votesB: answer === 'option2' ? prev.currentQuestion.votesB + 1 : prev.currentQuestion.votesB
        }
      };
    });
  };

  const handleAddQuestion = (question: Question) => {
    setShowAddQuestion(false);
  };

  const handleSkipQuestion = () => {
    handleNextRound();
  };

  const handleNextRound = () => {
    if (!gameState) return;
    
    setSelectedAnswer(null);
    const questions = gameMode === 'friends' ? Questions.getFriendGameQuestions() : Questions.getQuestions(gameMode);
    
    if (questions.length === 0) {
      console.error('No questions available');
      return;
    }

    const unusedQuestions = questions.filter(q => !gameState.usedQuestionIds.has(q.id));
    
    if (unusedQuestions.length === 0) {
      // If we've used all questions, start over with a fresh set
      const freshQuestions = gameMode === 'friends' ? Questions.getFriendGameQuestions() : Questions.getQuestions(gameMode);
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

  if (gameState?.showChaosMasterWheel && gameState.players.length > 0) {
    return (
      <ChaosMasterWheel
        players={gameState.players}
        onSelect={(chaosMaster) => {
          setGameState(prev => ({
            ...prev!,
            chaosMaster,
            showChaosMasterWheel: false
          }));
        }}
      />
    );
  }

  if (showFriendModes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
        <FriendGameModes
          onOnlineClick={() => {
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
    );
  }

  if (showOfflineSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
        <OfflineGameSetup
          onStart={handleStartOfflineGame}
          onBack={() => setShowOfflineSetup(false)}
        />
      </div>
    );
  }

  if (!gameState?.currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
        <FloatingIcon icon={Sparkles} className="top-20 left-20" delay={0} />
        <FloatingIcon icon={Brain} className="top-40 right-20" delay={1} />
        <FloatingIcon icon={Heart} className="bottom-20 left-40" delay={2} />
        <FloatingIcon icon={Star} className="top-60 left-1/2" delay={1.5} />
        <FloatingIcon icon={Zap} className="bottom-40 right-40" delay={3} />

        <div className="relative max-w-4xl mx-auto z-10 py-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </motion.button>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent pt-12"
          >
            Would You Rather
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 px-4 max-w-xl mx-auto w-full"
          >
            <GameCard
              title="Classic Mode"
              description="Traditional would you rather questions"
              onClick={() => handleStartGame('classic')}
              icon={Brain}
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 w-full p-6 min-h-[160px]"
            />
            <GameCard
              title="Spicy Mode"
              description="More challenging and thought-provoking questions"
              onClick={() => handleStartGame('spicy')}
              icon={Flame}
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 w-full p-6 min-h-[160px]"
            />
            <GameCard
              title="Play with Friends"
              description="Challenge your friends in person"
              onClick={() => setShowFriendModes(true)}
              icon={Users}
              className="bg-gradient-to-br from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 w-full p-6 min-h-[160px]"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddQuestion(true)}
            className="mt-8 flex items-center mx-auto gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Custom Question
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <Toaster position="top-center" />

      <div className="relative max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState(prev => ({ ...prev!, currentQuestion: null }))}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Back to Menu
          </motion.button>

          {gameState.chaosMaster && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-gradient">
                Chaos Master: {gameState.chaosMaster}
              </span>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={gameState.currentQuestion.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-8"
          >
            <div className="relative">
              <Timer duration={15} key={gameState.currentQuestion.id} />
              <h2 className="text-3xl font-bold text-center mb-12">
                Would You Rather...
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 px-4 max-w-xl mx-auto">
              <ChoiceCard
                option={gameState.currentQuestion.option1}
                onClick={() => handleAnswer('option1')}
                selected={selectedAnswer === 'option1'}
                disabled={selectedAnswer !== null}
                percentage={selectedAnswer ? (gameState.currentQuestion.votesA / (gameState.currentQuestion.votesA + gameState.currentQuestion.votesB) * 100).toFixed(1) : undefined}
                className="w-full p-6 min-h-[140px]"
              />
              <ChoiceCard
                option={gameState.currentQuestion.option2}
                onClick={() => handleAnswer('option2')}
                selected={selectedAnswer === 'option2'}
                disabled={selectedAnswer !== null}
                percentage={selectedAnswer ? (gameState.currentQuestion.votesB / (gameState.currentQuestion.votesA + gameState.currentQuestion.votesB) * 100).toFixed(1) : undefined}
                className="w-full p-6 min-h-[140px]"
              />
            </div>

            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkipQuestion}
                className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                disabled={selectedAnswer !== null}
              >
                <RotateCcw className="w-4 h-4" />
                Skip
              </motion.button>
              
              {selectedAnswer && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextRound}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <AddQuestionModal
          isOpen={showAddQuestion}
          onClose={() => setShowAddQuestion(false)}
          onSubmit={handleAddQuestion}
        />

        {gameState.chaosMaster && (
          <ChaosButton 
            isChaosMaster={gameState.chaosMaster === gameState.players[0]} 
          />
        )}
      </div>
    </div>
  );
};