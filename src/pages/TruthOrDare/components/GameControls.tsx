import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { QuestionType } from '../types';

const GameControls: React.FC = () => {
  const {
    questionType,
    setQuestionType,
    selectCategory,
    selectedCategory,
    currentQuestion,
    completeChallenge,
    skipChallenge,
    nextPlayer,
  } = useGameStore();

  const handleCategorySelect = (category: 'truth' | 'dare') => {
    selectCategory(category);
  };

  const handleQuestionTypeChange = (type: QuestionType) => {
    setQuestionType(type);
  };

  return (
    <div className="space-y-6">
      {/* Question Type Selector */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Question Type</h3>
        <div className="flex space-x-4">
          {(['mild', 'spicy', 'extreme'] as QuestionType[]).map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuestionTypeChange(type)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                questionType === type
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Truth or Dare Buttons */}
      {!currentQuestion && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Choose Your Fate</h3>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategorySelect('truth')}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
            >
              Truth
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategorySelect('dare')}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-colors"
            >
              Dare
            </motion.button>
          </div>
        </div>
      )}

      {/* Challenge Controls */}
      {currentQuestion && (
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {selectedCategory === 'truth' ? 'Truth' : 'Dare'} Challenge
            </h3>
            <p className="text-lg text-gray-700 mb-6">{currentQuestion.text}</p>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  completeChallenge();
                  nextPlayer();
                }}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors"
              >
                Complete
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  skipChallenge();
                  nextPlayer();
                }}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition-colors"
              >
                Skip (-1 point)
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
