import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question as QuestionType } from '../types/game';
import { useGameStore } from '../store/gameStore';
import useSound from 'use-sound';
import { Reactions } from './Reactions';
import { Timer } from './Timer';

interface QuestionProps {
  question: QuestionType;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const { addVote, timerMode } = useGameStore();
  const [playVote] = useSound('/vote.mp3', { volume: 0.5 });

  const handleVote = (option: 1 | 2) => {
    if (!hasVoted) {
      playVote();
      addVote(question.id.toString(), option);
      setHasVoted(true);
    }
  };

  const shakeAnimation = hasVoted ? {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      repeat: 0,
      repeatType: "mirror" as const
    }
  } : undefined;

  return (
    <div className="space-y-6">
      {timerMode && <Timer onTimeout={() => {}} isActive={!hasVoted} />}
      <motion.div 
        animate={shakeAnimation}
        className="flex flex-col md:flex-row gap-6"
      >
        {[question.options[0], question.options[1]].map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleVote(index + 1)}
            whileHover={{ scale: hasVoted ? 1 : 1.05 }}
            whileTap={{ scale: hasVoted ? 1 : 0.95 }}
            className={`flex-1 p-6 rounded-lg border-2 transition-colors ${
              hasVoted
                ? 'border-gray-300 cursor-default'
                : 'border-purple-500 hover:border-purple-600 cursor-pointer'
            }`}
          >
            <p className="text-lg">{option}</p>
          </motion.button>
        ))}
      </motion.div>

      {hasVoted && <Reactions questionId={question.id.toString()} />}
    </div>
  );
};