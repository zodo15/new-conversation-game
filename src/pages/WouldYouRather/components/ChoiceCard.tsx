import React from 'react';
import { motion } from 'framer-motion';
import { ChoiceCardProps } from '../types';

interface ChoiceCardProps {
  text: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  votes?: number;
  total?: number;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  text,
  onClick,
  selected = false,
  disabled = false,
  votes = 0,
  total = 0,
}) => {
  const percentage = total > 0 ? Math.round((votes / total) * 100) : 0;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={disabled ? undefined : onClick}
      className={`
        w-full p-8 rounded-xl transition-all relative overflow-hidden group
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${
          selected
            ? 'bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-white'
            : 'bg-white/10 hover:bg-white/20'
        }
      `}
    >
      {/* Background gradient animation */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
          opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine
          ${disabled ? 'hidden' : ''}
        `}
      />

      {/* Vote percentage bar */}
      {total > 0 && (
        <div className="absolute inset-0">
          <div
            className="h-full bg-white/10 transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-semibold text-xl">{text}</span>
        {total > 0 && (
          <span className="ml-4 font-bold text-lg">
            {percentage}%
          </span>
        )}
      </div>

      {/* Vote count */}
      {total > 0 && (
        <div className="relative z-10 mt-2 text-sm opacity-75">
          {votes} votes
        </div>
      )}
    </motion.button>
  );
};