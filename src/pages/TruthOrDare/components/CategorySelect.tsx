import React from 'react';
import { motion } from 'framer-motion';
import { QuestionCategory } from '../types/game';
import {
  SpicyIcon,
  FunnyIcon,
  DeepIcon,
  PhysicalIcon,
  SocialIcon,
  CreativeIcon,
  CustomIcon
} from '../../../components/icons';

interface CategorySelectProps {
  onSelect: (category: QuestionCategory) => void;
  selected?: QuestionCategory;
}

interface CategoryOption {
  value: QuestionCategory;
  label: string;
  icon: React.ElementType;
  color: string;
}

const categories: CategoryOption[] = [
  { value: 'spicy', label: 'Spicy', icon: SpicyIcon, color: 'text-red-500' },
  { value: 'funny', label: 'Funny', icon: FunnyIcon, color: 'text-yellow-500' },
  { value: 'deep', label: 'Deep', icon: DeepIcon, color: 'text-purple-500' },
  { value: 'physical', label: 'Physical', icon: PhysicalIcon, color: 'text-blue-500' },
  { value: 'social', label: 'Social', icon: SocialIcon, color: 'text-green-500' },
  { value: 'creative', label: 'Creative', icon: CreativeIcon, color: 'text-pink-500' },
  { value: 'custom', label: 'Custom', icon: CustomIcon, color: 'text-gray-500' }
];

export const CategorySelect: React.FC<CategorySelectProps> = ({
  onSelect,
  selected
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map(({ value, label, icon: Icon, color }) => (
        <motion.button
          key={value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(value)}
          className={`flex flex-col items-center justify-center p-4 rounded-lg ${
            selected === value
              ? 'bg-white shadow-lg'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          <Icon
            size={32}
            className={`${color} ${
              selected === value ? 'opacity-100' : 'opacity-60'
            }`}
          />
          <span
            className={`mt-2 font-medium ${
              selected === value ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};