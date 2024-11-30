import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionCategory, QuestionType } from '../types';

interface CategorySelectorProps {
  onSelectCategory: (category: QuestionCategory) => void;
  selectedCategory?: QuestionCategory;
  gameType: QuestionType;
}

const categories: QuestionCategory[] = ['would-you-rather', 'truth', 'dare'];

const categoryEmojis: Record<QuestionCategory, string> = {
  'would-you-rather': '🤔',
  truth: '💡',
  dare: '🔥'
};

const categoryDescriptions: Record<QuestionCategory, string> = {
  'would-you-rather': 'Choose between two difficult options',
  truth: 'Answer truthfully to a personal question',
  dare: 'Take a risk and do something challenging'
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelectCategory,
  selectedCategory,
  gameType
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<QuestionCategory | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
        Select a Category
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category)}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`relative p-6 rounded-xl transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE]'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">{categoryEmojis[category]}</span>
              <span className="font-semibold capitalize">{category.replace('-', ' ')}</span>
            </div>
            {hoveredCategory === category && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-10"
              >
                {categoryDescriptions[category]}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-gray-900" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => gameType === 'classic' ? null : null}
          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            gameType === 'classic'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Classic
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => gameType === 'spicy' ? null : null}
          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            gameType === 'spicy'
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Spicy 🌶️
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => gameType === 'extreme' ? null : null}
          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            gameType === 'extreme'
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
