import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question as QuestionType } from '../data/questions';
import { useGameStore } from '../store/gameStore';
import useSound from 'use-sound';
import { Reactions } from './Reactions';
import { PlotTwist } from './PlotTwist';
import { Timer } from './Timer';

interface QuestionProps {
  question: QuestionType;
}

export const Question = ({ question }: QuestionProps) => {
  const { votes, addVote, chaosMode, timerMode } = useGameStore();
  const [playSelect] = useSound('/select.mp3', { volume: 0.5 });
  const [showTwist, setShowTwist] = useState(false);
  
  const questionVotes = votes[question.id] || { option1: 0, option2: 0 };
  const totalVotes = questionVotes.option1 + questionVotes.option2;
  const hasVoted = totalVotes > 0;

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const handleVote = (option: 1 | 2) => {
    if (hasVoted) return;
    playSelect();
    addVote(question.id, option);
    if (question.plotTwist) {
      setTimeout(() => setShowTwist(true), 1000);
    }
  };

  const shakeAnimation = chaosMode ? {
    x: [0, -10, 10, -10, 10, 0],
    transition: { 
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  } : {};

  return (
    <div className="max-w-4xl mx-auto p-6 mb-12">
      {timerMode && <Timer onTimeout={() => {}} isActive={!hasVoted} />}
      <motion.div 
        animate={shakeAnimation}
        className="flex flex-col md:flex-row gap-6"
      >
        {[
          { text: question.option1, option: 1 },
          { text: question.option2, option: 2 },
        ].map(({ text, option }) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVote(option as 1 | 2)}
            className={`flex-1 bg-gradient-to-br from-gray-800 to-gray-900
                     p-8 rounded-xl border-2 ${hasVoted ? 'border-purple-500' : 'border-purple-500/50 hover:border-purple-500'}
                     shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]
                     transition-all duration-300 relative group ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <p className="text-white text-xl mb-6 font-medium">{text}</p>
            <AnimatePresence>
              {hasVoted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-purple-400 text-3xl font-bold absolute bottom-4 right-4"
                >
                  {getPercentage(option === 1 ? questionVotes.option1 : questionVotes.option2)}%
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>
      <Reactions questionId={question.id} />
      <PlotTwist
        twist={question.plotTwist || ''}
        isVisible={showTwist}
        onClose={() => setShowTwist(false)}
      />
    </div>
  );
};