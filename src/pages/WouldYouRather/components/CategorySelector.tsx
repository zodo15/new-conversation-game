import React from 'react';
import { motion } from 'framer-motion';
import { QuestionCategory, QuestionType } from '../types';

interface CategorySelectorProps {
  selectedCategory: QuestionCategory | null;
  onSelect: (category: QuestionCategory) => void;
  questionType: QuestionType;
  onTypeChange: (type: QuestionType) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelect,
  questionType,
  onTypeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('would-you-rather')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            selectedCategory === 'would-you-rather'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Would You Rather
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('truth')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            selectedCategory === 'truth'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Truth
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('dare')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            selectedCategory === 'dare'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Dare
        </motion.button>
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTypeChange('classic')}
          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            questionType === 'classic'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Classic
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTypeChange('spicy')}
          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            questionType === 'spicy'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Spicy 🌶️
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTypeChange('extreme')}
          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            questionType === 'extreme'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Extreme 🔥
        </motion.button>
      </div>
    </div>
  );
};
