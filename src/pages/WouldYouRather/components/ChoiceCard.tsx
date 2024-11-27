import React from 'react';
import { motion } from 'framer-motion';

interface ChoiceCardProps {
  choice: string;
  onClick: () => void;
  votes: number;
  totalVotes: number;
  disabled?: boolean;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  choice,
  onClick,
  votes,
  totalVotes,
  disabled = false,
}) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`relative w-full p-6 rounded-lg shadow-lg text-left mb-4 ${
        disabled ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="relative z-10">
        <p className="text-lg font-medium mb-2">{choice}</p>
        {disabled && (
          <p className="text-sm text-gray-600">
            {votes} votes ({percentage}%)
          </p>
        )}
      </div>
      {disabled && (
        <div
          className="absolute inset-0 bg-blue-100 rounded-lg"
          style={{ width: `${percentage}%`, transition: 'width 0.5s ease-out' }}
        />
      )}
    </motion.button>
  );
};