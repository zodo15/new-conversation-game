import React from 'react';
import { motion } from 'framer-motion';

interface ChoiceCardProps {
  option: string;
  percentage?: number;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  isAnswer?: boolean;
}

export const ChoiceCard = ({
  option,
  percentage,
  onClick,
  disabled,
  selected,
  isAnswer,
}: ChoiceCardProps) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        relative w-full p-6 rounded-xl text-left
        ${selected 
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ring-2 ring-purple-400/50' 
          : 'bg-white/10 hover:bg-white/20'
        }
        ${disabled ? 'cursor-default' : 'cursor-pointer'}
        transition-all duration-300
      `}
      disabled={disabled}
    >
      <div className="relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            text-xl font-semibold mb-2
            ${selected ? 'text-white' : 'text-white/90'}
          `}
        >
          {option}
        </motion.p>
        {percentage !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-bold text-lg"
          >
            {percentage}%
          </motion.div>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-4 top-4 bg-white/20 p-2 rounded-full"
        >
          <div className="text-white text-lg">✓</div>
        </motion.div>
      )}
    </motion.button>
  );
};