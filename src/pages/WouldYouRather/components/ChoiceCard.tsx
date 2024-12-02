import React from 'react';
import { motion } from 'framer-motion';
import { ChoiceCardProps } from '../types';

interface ChoiceCardProps {
  option: string;
  consequence?: string;
  votes?: number;
  totalVotes?: number;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  option,
  consequence,
  votes = 0,
  totalVotes = 0,
  selected = false,
  onClick,
  disabled = false,
}) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <motion.div
      whileHover={!disabled && !selected ? { scale: 1.02 } : {}}
      whileTap={!disabled && !selected ? { scale: 0.98 } : {}}
      className={`
        relative w-full p-6 rounded-xl cursor-pointer
        ${selected 
          ? 'bg-purple-600 text-white ring-2 ring-white' 
          : disabled 
            ? 'bg-white/10 text-white/60 cursor-not-allowed'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }
      `}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Main Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-2">{option}</h3>
        {consequence && (
          <p className="text-sm opacity-75 mt-2">
            Consequence: {consequence}
          </p>
        )}
      </div>

      {/* Vote Stats */}
      {totalVotes > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>{votes} votes</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-purple-400"
            />
          </div>
        </div>
      )}

      {/* Selection Indicator */}
      {selected && (
        <motion.div
          layoutId="selection-indicator"
          className="absolute inset-0 border-2 border-white rounded-xl"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      {/* Disabled Overlay */}
      {disabled && !selected && (
        <div className="absolute inset-0 bg-black/20 rounded-xl" />
      )}
    </motion.div>
  );
};