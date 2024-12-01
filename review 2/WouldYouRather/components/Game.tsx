import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { QuestionDisplay } from './QuestionDisplay';
import { PlayerList } from './PlayerList';
import { CategorySelector } from './CategorySelector';
import { ChaosMasterWheel } from './ChaosMasterWheel';
import { AddQuestionModal } from './AddQuestionModal';
import { Timer } from './Timer';
import { ShareButton } from './ShareButton';
import { toast, Toaster } from 'react-hot-toast';
import { ArrowLeft, Plus, Dice, Sparkles, Shuffle } from 'lucide-react';
import ChoiceCard from './ChoiceCard';
import ChaosButton from './ChaosButton';
import FloatingBackground from './FloatingBackground';

interface GameProps {
  mode: string;
  onBack: () => void;
}

const Game: React.FC = () => {
  const navigate = useNavigate();
  const {
    mode,
    gameStarted,
    players,
    currentPlayerIndex,
    currentQuestion,
    votes,
    showChaosMasterWheel,
    showAddQuestion,
    setShowChaosMasterWheel,
    setShowAddQuestion,
    resetGame,
    setCurrentQuestion,
    addUsedQuestionId,
    setCurrentPlayerIndex,
    addVote,
    updateScore,
    updateStreak,
    clearVotes,
    getRandomQuestion,
  } = useGameStore();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showChaosWheel, setShowChaosWheel] = useState(false);

  useEffect(() => {
    if (!mode || !gameStarted) {
      navigate('/would-you-rather');
    }
  }, [mode, gameStarted, navigate]);

  useEffect(() => {
    setQuestions(getQuestionsByMode(mode));
  }, [mode]);

  const handleVote = (choice: 'option1' | 'option2') => {
    if (!currentQuestion || !players[currentPlayerIndex]) return;

    const player = players[currentPlayerIndex];
    addVote(player.id, choice);
    updateScore(player.id, 1);
    updateStreak(player.id, choice);

    // Move to next player
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    if (nextIndex === 0) {
      // End of round
      clearVotes();
      const newQuestion = getRandomQuestion(mode);
      if (newQuestion) {
        setCurrentQuestion(newQuestion);
        addUsedQuestionId(newQuestion.id);
      }
    }
    setCurrentPlayerIndex(nextIndex);
  };

  const handleChaosMasterSpin = (action: string) => {
    toast.success(`Chaos Master says: ${action}!`);
    setShowChaosMasterWheel(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!mode || !gameStarted) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 p-4">
      <FloatingBackground />
      
      <div className="absolute top-4 left-4 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            resetGame();
            navigate('/would-you-rather');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
          Back to Modes
        </motion.button>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChaosMasterWheel(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white backdrop-blur-sm"
        >
          <Sparkles size={20} />
          Chaos Wheel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddQuestion(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white backdrop-blur-sm"
        >
          <Plus size={20} />
          Add Question
        </motion.button>
      </div>

      {showChaosMasterWheel && (
        <ChaosMasterWheel onClose={() => setShowChaosMasterWheel(false)} onSpin={handleChaosMasterSpin} />
      )}

      {showAddQuestion && (
        <AddQuestionModal
          onClose={() => setShowAddQuestion(false)}
          onAdd={(question) => {
            // Handle adding question
            setShowAddQuestion(false);
            toast.success('Question added successfully!');
          }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-4">
        <div className="w-full max-w-4xl">
          {currentQuestion && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center text-white mb-8">
                Would You Rather...
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChoiceCard
                  text={currentQuestion.optionA}
                  onClick={handleVote.bind(null, 'option1')}
                  isOptionA={true}
                />
                <ChoiceCard
                  text={currentQuestion.optionB}
                  onClick={handleVote.bind(null, 'option2')}
                  isOptionA={false}
                />
              </div>
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg text-white backdrop-blur-sm"
                >
                  <Shuffle size={20} />
                  Skip Question
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
