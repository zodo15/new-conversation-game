import React from 'react';
import { Sparkles, Party, Brain, Users2, Dumbbell, Palette } from 'lucide-react';
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
        { id: 'funny', icon: Party, label: 'Funny' },
        { id: 'spicy', icon: Sparkles, label: 'Spicy' }
      ]
    : [
        { id: 'social', icon: Users2, label: 'Social' },
        { id: 'physical', icon: Dumbbell, label: 'Physical' },
        { id: 'creative', icon: Palette, label: 'Creative' }
      ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {categories.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id as QuestionCategory)}
          className={`px-4 py-3 rounded-lg transition-colors flex flex-col items-center gap-2 ${
            category === id
              ? 'bg-white/20 text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/15'
          }`}
        >
          <Icon className="w-6 h-6" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelect;