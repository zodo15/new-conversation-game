import { useState } from 'react';
import type { FC } from 'react';
import { Sparkles, Zap, Brain, Users, Dumbbell, Palette, RefreshCw, Plus, ArrowLeftIcon, MessageCircle } from 'lucide-react';
import { useGameQuestions } from '../hooks/useGameQuestions';
import { AddQuestionModal } from './AddQuestionModal';
import { Question, QuestionType, QuestionCategory } from '../types/game';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { toast } from 'react-hot-toast';

interface GameBoardProps {
  players: string[];
  onEndGame: () => void;
}

export const GameBoard: FC<GameBoardProps> = ({ players, onEndGame }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const { getRandomQuestion } = useGameQuestions();
  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playSelect] = useSound('/select.mp3', { volume: 0.5 });

  const currentPlayer = players[currentPlayerIndex];

  const handleAddQuestion = (question: Question) => {
    setIsQuestionModalOpen(false);
  };

  const handleNextQuestion = () => {
    if (!selectedType || !selectedCategory) return;
    
    const question = getRandomQuestion(selectedType, selectedCategory);
    if (!question) {
      toast('No questions available for this category!', {
        duration: 2000,
        icon: '⚠️',
        style: {
          background: '#ef4444',
          color: '#fff'
        }
      });
      return null;
    }
    setCurrentQuestion(question);
  };

  const handleTypeSelect = (type: QuestionType) => {
    playSelect();
    setSelectedType(type);
    setSelectedCategory(null);
    setCurrentQuestion(null);
  };

  const handleCategorySelect = (category: QuestionCategory) => {
    playSelect();
    setSelectedCategory(category);
    handleNextQuestion();
  };

  const handleNextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);
    setSelectedType(null);
    setSelectedCategory(null);
    setCurrentQuestion(null);
    toast(`${players[nextIndex]}'s turn!`, {
      duration: 2000,
      icon: '🎮',
      style: {
        background: '#22c55e',
        color: '#fff'
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center relative">
      <div className="mb-8">
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 text-white"
            onMouseEnter={() => playHover()}
          >
            <Plus className="w-5 h-5" />
            Add Question
          </button>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          {currentPlayer}'s Turn
        </h2>

        {!selectedType ? (
          <div className="space-y-6">
            <h3 className="text-xl text-white/80">Choose Type:</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelect('truth')}
                onMouseEnter={() => playHover()}
                className="px-8 py-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white font-bold text-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                Truth
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelect('dare')}
                onMouseEnter={() => playHover()}
                className="px-8 py-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white font-bold text-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                Dare
              </motion.button>
            </div>
          </div>
        ) : !selectedCategory ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center gap-2"
                onMouseEnter={() => playHover()}
              >
                <RefreshCw className="w-4 h-4" />
                Change Type
              </motion.button>
            </div>
            <h3 className="text-xl text-white/80">Choose Category:</h3>
            <div className="grid grid-cols-3 gap-4">
              {selectedType === 'truth' ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect('deep')}
                    onMouseEnter={() => playHover()}
                    className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Brain className="w-8 h-8 mx-auto mb-2" />
                    Deep
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect('funny')}
                    onMouseEnter={() => playHover()}
                    className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Sparkles className="w-8 h-8 mx-auto mb-2" />
                    Funny
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect('spicy')}
                    onMouseEnter={() => playHover()}
                    className="p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Zap className="w-8 h-8 mx-auto mb-2" />
                    Spicy
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect('social')}
                    onMouseEnter={() => playHover()}
                    className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    Social
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect('physical')}
                    onMouseEnter={() => playHover()}
                    className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Dumbbell className="w-8 h-8 mx-auto mb-2" />
                    Physical
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect('creative')}
                    onMouseEnter={() => playHover()}
                    className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Palette className="w-8 h-8 mx-auto mb-2" />
                    Creative
                  </motion.button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center space-x-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center gap-2"
                onMouseEnter={() => playHover()}
              >
                <RefreshCw className="w-4 h-4" />
                New Type
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center gap-2"
                onMouseEnter={() => playHover()}
              >
                <RefreshCw className="w-4 h-4" />
                New Category
              </motion.button>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <p className="text-2xl text-white mb-4">
                {currentQuestion?.content}
              </p>
            </div>
          </div>
        )}

        {currentQuestion && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleNextPlayer}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next Player
            </button>
          </div>
        )}
      </div>

      {isQuestionModalOpen && (
        <AddQuestionModal
          isOpen={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
          onAdd={handleAddQuestion}
        />
      )}

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEndGame}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold shadow-lg flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Players
        </motion.button>
      </div>
    </div>
  );
};