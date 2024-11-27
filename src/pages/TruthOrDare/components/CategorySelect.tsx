import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PartyIcon, Brain, Users, Dumbbell, Palette } from 'lucide-react';
import { QuestionCategory } from '../types/game';

interface CategorySelectProps {
  category: QuestionCategory;
  onSelect: (category: QuestionCategory) => void;
  type: 'truth' | 'dare';
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category, onSelect, type }) => {
  const categories = type === 'truth' 
    ? [
        { id: 'deep', icon: Brain, label: 'Deep' },
        { id: 'funny', icon: PartyIcon, label: 'Funny' },
        { id: 'spicy', icon: Sparkles, label: 'Spicy' }
      ]
    : [
        { id: 'social', icon: Users, label: 'Social' },
        { id: 'physical', icon: Dumbbell, label: 'Physical' },
        { id: 'creative', icon: Palette, label: 'Creative' }
      ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {categories.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id as QuestionCategory)}
          className={`px-4 py-3 rounded-lg flex flex-col items-center gap-2 transition-colors ${
            category === id
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelect;