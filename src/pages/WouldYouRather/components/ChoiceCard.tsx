import React from 'react';
import { motion } from 'framer-motion';
import { ChoiceCardProps } from '../types';



export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  option,
  consequence,
  onClick,
  disabled,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-6 rounded-xl text-left transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm
        hover:from-purple-600/30 hover:to-pink-600/30
      `}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">
          {option}
        </h3>
        {consequence && (
          <p className="text-sm text-purple-200/80">
            {consequence}
          </p>
        )}
      </div>
    </motion.button>
  );
};