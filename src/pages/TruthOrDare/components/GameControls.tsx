import React from 'react';
import { useGameStore } from '../store/gameStore';
import { QuestionType, QuestionCategory } from '../types/game';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const GameControls: React.FC = () => {
  const {
    selectedType,
    selectedCategory,
    setSelectedType,
    setSelectedCategory,
    currentQuestion,
    nextPlayer,
    setCurrentQuestion,
    addUsedQuestionId
  } = useGameStore();

  const handleTypeSelect = (type: QuestionType) => {
    setSelectedType(type);
  };

  const handleCategorySelect = (category: QuestionCategory) => {
    setSelectedCategory(category);
  };

  const handleSkip = () => {
    if (currentQuestion) {
      addUsedQuestionId(currentQuestion.id);
    }
    nextPlayer();
    setCurrentQuestion(null);
    toast('Question skipped', { icon: '⏭️' });
  };

  const handleComplete = () => {
    if (currentQuestion) {
      addUsedQuestionId(currentQuestion.id);
      nextPlayer();
      setCurrentQuestion(null);
      toast('Question completed!', { icon: '✅' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTypeSelect('truth')}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedType === 'truth'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Truth
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTypeSelect('dare')}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedType === 'dare'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Dare
        </motion.button>
      </div>

      {currentQuestion && (
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkip}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold"
          >
            Skip
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold"
          >
            Complete
          </motion.button>
        </div>
      )}
    </div>
  );
};
