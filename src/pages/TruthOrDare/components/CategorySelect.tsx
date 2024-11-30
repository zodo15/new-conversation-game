import React from 'react';
import { Flame, Heart, Skull } from '@phosphor-icons/react';
import { QuestionCategory } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';
import useSound from 'use-sound';

interface CategorySelectProps {
  onSelect: (category: QuestionCategory) => void;
  selectedCategory: QuestionCategory | null;
}

const categories: {
  type: QuestionCategory;
  icon: React.ReactNode;
  label: string;
  description: string;
}[] = [
  {
    type: 'mild',
    icon: <Heart size={32} weight="fill" />,
    label: 'Mild',
    description: 'Light and fun questions',
  },
  {
    type: 'spicy',
    icon: <Flame size={32} weight="fill" />,
    label: 'Spicy',
    description: 'More challenging questions',
  },
  {
    type: 'extreme',
    icon: <Skull size={32} weight="fill" />,
    label: 'Extreme',
    description: 'Most daring questions',
  },
  {
    type: 'deep' as QuestionCategory,
    icon: <Skull size={32} weight="fill" />,
    label: 'Deep',
    description: 'More personal questions',
  },
  {
    type: 'social' as QuestionCategory,
    icon: <Skull size={32} weight="fill" />,
    label: 'Social',
    description: 'Questions about relationships',
  },
  {
    type: 'physical' as QuestionCategory,
    icon: <Skull size={32} weight="fill" />,
    label: 'Physical',
    description: 'Questions about physical challenges',
  },
  {
    type: 'creative' as QuestionCategory,
    icon: <Skull size={32} weight="fill" />,
    label: 'Creative',
    description: 'Questions that challenge your creativity',
  },
  {
    type: 'funny' as QuestionCategory,
    icon: <Skull size={32} weight="fill" />,
    label: 'Funny',
    description: 'Humorous questions',
  },
  {
    type: 'hot' as QuestionCategory,
    icon: <Skull size={32} weight="fill" />,
    label: 'Hot',
    description: 'Questions that will make you blush',
  }
];

export const CategorySelect: React.FC<CategorySelectProps> = ({
  onSelect,
  selectedCategory,
}) => {
  const setCategory = useGameStore((state: any) => state.setCategory);
  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playSelect] = useSound('/select.mp3', { volume: 0.5 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const handleSelect = (category: QuestionCategory) => {
    playSelect();
    setCategory(category);
    onSelect(category);
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-6 p-8 max-w-4xl mx-auto"
    >
      {categories.map(({ type, icon, label, description }) => (
        <motion.button
          key={type}
          variants={item}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(147,51,234,0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect(type)}
          onMouseEnter={() => playHover()}
          className={`p-6 rounded-lg flex flex-col items-center gap-4 transition-colors ${
            selectedCategory === type
              ? 'bg-primary text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {icon}
          <div className="text-center">
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};