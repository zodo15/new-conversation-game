import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ChoiceCardProps {
  choice: 'A' | 'B';
  text: string;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  consequences?: string;
  votes?: number;
  totalVotes?: number;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  choice,
  text,
  onClick,
  disabled = false,
  selected = false,
  consequences,
  votes = 0,
  totalVotes = 0,
}) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full p-6 rounded-xl shadow-lg
        ${selected
          ? 'bg-indigo-600 text-white'
          : disabled
            ? 'bg-gray-700/50 text-gray-300'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }
        transition-colors duration-200
        flex flex-col gap-4
      `}
    >
      <div className="text-sm font-semibold uppercase tracking-wider opacity-70">
        Option {choice}
      </div>
      
      <div className="text-xl font-medium">{text}</div>

      {consequences && (
        <div className="flex items-center gap-2 text-sm text-yellow-300">
          <AlertTriangle className="w-4 h-4" />
          <span>{consequences}</span>
        </div>
      )}

      {disabled && votes !== undefined && totalVotes > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{votes} votes</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-white/30 rounded-full"
            />
          </div>
        </div>
      )}
    </motion.button>
  );
};