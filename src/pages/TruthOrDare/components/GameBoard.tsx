import React, { useState } from 'react';
import { Sparkles, Zap, Brain, Users, Dumbbell, Palette, RefreshCw, Plus, MessageCircle, ArrowLeft } from 'lucide-react';
import { useGameQuestions } from '../hooks/useGameQuestions';
import AddQuestionModal from './AddQuestionModal';
import { Question, QuestionType, QuestionCategory } from '../types/game';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import toast from 'react-hot-toast';

interface GameBoardProps {
  players: string[];
  onEndGame: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ players, onEndGame }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const { getRandomQuestion, addCustomQuestion } = useGameQuestions();

  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playSelect] = useSound('/select.mp3', { volume: 0.5 });

  const currentPlayer = players[currentPlayerIndex];

  const selectType = (type: QuestionType) => {
    playSelect();
    setSelectedType(type);
    setSelectedCategory(null);
    setCurrentQuestion(null);
  };

  const generateQuestion = (type: QuestionType, category: QuestionCategory) => {
    const question = getRandomQuestion(type, category, currentPlayer);
    if (!question) {
      toast.error('No questions available for this category!');
      return null;
    }
    return question;
  };

  const handleSelectCategory = (category: QuestionCategory) => {
    if (!selectedType) return;
    
    playSelect();
    setSelectedCategory(category);
    const question = generateQuestion(selectedType, category);
    if (question) {
      setCurrentQuestion(question);
    }
  };

  const refreshQuestion = () => {
    if (!selectedType || !selectedCategory) return;
    
    playSelect();
    const question = generateQuestion(selectedType, selectedCategory);
    if (question) {
      setCurrentQuestion(question);
    }
  };

  const nextTurn = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);
    setSelectedType(null);
    setSelectedCategory(null);
    setCurrentQuestion(null);
    toast.success(`${players[nextIndex]}'s turn!`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'spicy': return <Zap className="w-8 h-8" />;
      case 'funny': return <Sparkles className="w-8 h-8" />;
      case 'deep': return <Brain className="w-8 h-8" />;
      case 'social': return <Users className="w-8 h-8" />;
      case 'physical': return <Dumbbell className="w-8 h-8" />;
      case 'creative': return <Palette className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center relative">
      <div className="mb-8">
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 text-white"
          >
            <Plus size={20} />
            Add Question
          </button>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          {currentPlayer}'s Turn
        </h2>
        <p className="text-white/60">Choose your challenge!</p>
      </div>

      {/* Game Type Selection */}
      {!selectedType && (
        <div className="flex justify-center gap-4 mb-8">
          <GameOption
            label="Truth"
            onClick={() => selectType('truth')}
            onHover={() => playHover()}
          />
          <GameOption
            label="Dare"
            onClick={() => selectType('dare')}
            onHover={() => playHover()}
          />
        </div>
      )}

      {/* Category Selection */}
      {selectedType && !selectedCategory && (
        <div>
          <div className="flex justify-center gap-4 mb-6">
            {selectedType === 'truth' ? (
              <>
                <CategoryButton
                  label="Deep"
                  onClick={() => handleSelectCategory('deep')}
                  onHover={playHover}
                />
                <CategoryButton
                  label="Funny"
                  onClick={() => handleSelectCategory('funny')}
                  onHover={playHover}
                />
                <CategoryButton
                  label="Spicy"
                  onClick={() => handleSelectCategory('spicy')}
                  onHover={playHover}
                />
              </>
            ) : (
              <>
                <CategoryButton
                  label="Social"
                  onClick={() => handleSelectCategory('social')}
                  onHover={playHover}
                />
                <CategoryButton
                  label="Physical"
                  onClick={() => handleSelectCategory('physical')}
                  onHover={playHover}
                />
                <CategoryButton
                  label="Creative"
                  onClick={() => handleSelectCategory('creative')}
                  onHover={playHover}
                />
              </>
            )}
          </div>

          <button
            onClick={() => setSelectedType(null)}
            className="mt-4 px-6 py-2 text-white/60 hover:text-white transition-colors flex items-center gap-2 justify-center mx-auto"
          >
            <RefreshCw size={20} />
            Change Type
          </button>
        </div>
      )}

      {/* Question Display */}
      {currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 w-full max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 relative">
            <button
              onClick={refreshQuestion}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Get new question"
            >
              <RefreshCw className="w-5 h-5 text-white/60 hover:text-white" />
            </button>
            <div className="flex items-center justify-center min-h-[120px]">
              <p className="text-2xl font-medium text-white text-center">
                {currentQuestion.content}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={nextTurn}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next Player
            </button>
          </div>
        </motion.div>
      )}

      {/* Add Question Modal */}
      <AddQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onAdd={(question) => {
          addCustomQuestion(question);
          setIsQuestionModalOpen(false);
        }}
      />

      {/* Back and End Game Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEndGame}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold shadow-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Players
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEndGame}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold shadow-lg"
        >
          End Game
        </motion.button>
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  label: string;
  onClick: () => void;
  onHover: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  onClick,
  onHover,
}) => {
  const getBackgroundColor = () => {
    switch (label.toLowerCase()) {
      case 'spicy':
        return 'bg-purple-700 hover:bg-purple-800';
      case 'funny':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'deep':
        return 'bg-purple-400 hover:bg-purple-500';
      default:
        return 'bg-purple-600 hover:bg-purple-700';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={onHover}
      className={`w-[200px] h-[100px] flex items-center justify-center rounded-xl shadow-lg transition-colors ${getBackgroundColor()}`}
    >
      <span className="text-2xl font-bold text-white">{label}</span>
    </motion.button>
  );
};

interface GameOptionProps {
  label: string;
  onClick: () => void;
  onHover: () => void;
}

const GameOption: React.FC<GameOptionProps> = ({
  label,
  onClick,
  onHover,
}) => (
  <motion.button
    onClick={onClick}
    onMouseEnter={onHover}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`w-[300px] h-[100px] flex items-center justify-center rounded-xl shadow-lg transition-colors ${
      label === 'Truth' 
        ? 'bg-blue-500 hover:bg-blue-600' 
        : 'bg-purple-500 hover:bg-purple-600'
    }`}
  >
    <span className="text-3xl font-bold text-white">{label}</span>
  </motion.button>
);