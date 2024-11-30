import React from 'react';
import { Flame, Brain, Users, Barbell, PaintBrush, Sparkle, Star, Fire, Skull } from '@phosphor-icons/react';
import { QuestionCategory } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';
import useSound from 'use-sound';

interface CategorySelectProps {
  onSelect: (category: QuestionCategory) => void;
}

const categories = [
  { id: 'spicy' as QuestionCategory, name: 'Spicy', icon: Flame, color: 'text-red-500' },
  { id: 'deep' as QuestionCategory, name: 'Deep', icon: Brain, color: 'text-purple-500' },
  { id: 'social' as QuestionCategory, name: 'Social', icon: Users, color: 'text-blue-500' },
  { id: 'physical' as QuestionCategory, name: 'Physical', icon: Barbell, color: 'text-green-500' },
  { id: 'creative' as QuestionCategory, name: 'Creative', icon: PaintBrush, color: 'text-yellow-500' },
  { id: 'funny' as QuestionCategory, name: 'Funny', icon: Sparkle, color: 'text-pink-500' },
  { id: 'mild' as QuestionCategory, name: 'Mild', icon: Star, color: 'text-orange-500' },
  { id: 'extreme' as QuestionCategory, name: 'Extreme', icon: Skull, color: 'text-black' },
  { id: 'hot' as QuestionCategory, name: 'Hot', icon: Fire, color: 'text-red-500' }
];

export const CategorySelect: React.FC<CategorySelectProps> = ({ onSelect }) => {
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
      {categories.map(({ id, name, icon: Icon, color }) => (
        <motion.button
          key={id}
          variants={item}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(147,51,234,0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect(id)}
          onMouseEnter={() => playHover()}
          className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl
                   border-2 border-purple-500/50 hover:border-purple-500
                   shadow-[0_0_15px_rgba(147,51,234,0.3)]
                   transition-all duration-300 flex flex-col items-center justify-center
                   min-h-[200px] group ${color}`}
        >
          <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
            <Icon weight="bold" className="w-6 h-6" />
          </div>
          <h3 className="text-2xl text-purple-400 group-hover:text-purple-300 font-bold text-center">
            {name}
          </h3>
        </motion.button>
      ))}
    </motion.div>
  );
};