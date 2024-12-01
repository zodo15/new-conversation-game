import React from 'react';
import { motion } from 'framer-motion';
import { ChoiceCardProps } from '../types';

interface ChoiceCardProps {
  option: string;
  votes: number;
  totalVotes: number;
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
  consequence?: string;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  option,
  votes,
  totalVotes,
  selected,
  onSelect,
  disabled,
  consequence
}) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onSelect}
      disabled={disabled}
      className={`
        w-full p-6 rounded-xl shadow-lg
        ${selected 
          ? 'bg-blue-500 text-white' 
          : disabled 
            ? 'bg-gray-100 cursor-not-allowed'
            : 'bg-white hover:bg-blue-50'
        }
        transition-colors duration-200
      `}
    >
      <div className="text-lg font-medium mb-2">{option}</div>
      
      {consequence && (
        <div className="text-sm opacity-75 mb-4">{consequence}</div>
      )}

      {disabled && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-sm mt-2">
            {votes} votes ({percentage}%)
          </div>
        </div>
      )}
    </motion.button>
  );
};