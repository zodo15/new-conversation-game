import React from 'react';
import { motion } from 'framer-motion';

interface ChoiceCardProps {
  text: string;
  isOptionA: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  text,
  isOptionA,
  onClick,
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-6 rounded-xl text-left transition-colors
        ${disabled
          ? 'bg-purple-800/30 cursor-not-allowed'
          : 'bg-purple-800/50 hover:bg-purple-700/50 cursor-pointer'
        }
        ${isOptionA ? 'border-l-4 border-blue-400' : 'border-l-4 border-pink-400'}
      `}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/60">
            Option {isOptionA ? 'A' : 'B'}
          </span>
        </div>
        <p className="text-lg font-medium text-white">
          {text}
        </p>
      </div>
    </motion.button>
  );
};