import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question as QuestionType } from '../types/game';
import { useGameStore } from '../store/gameStore';
import useSound from 'use-sound';
import { Reactions } from './Reactions';
import { PlotTwist } from './PlotTwist';
import { Timer } from './Timer';

interface QuestionProps {
  question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [showPlotTwist, setShowPlotTwist] = useState(false);
  const { addVote, timerMode } = useGameStore();
  const [playVote] = useSound('/vote.mp3', { volume: 0.5 });
  const [playPlotTwist] = useSound('/plottwist.mp3', { volume: 0.5 });

  const handleVote = (option: 1 | 2) => {
    if (!hasVoted) {
      playVote();
      addVote(question.id, option);
      setHasVoted(true);
      setTimeout(() => {
        if (question.plotTwist) {
          playPlotTwist();
          setShowPlotTwist(true);
        }
      }, 1000);
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
        {[ 
          { option: 1, text: question.option1 },
          { option: 2, text: question.option2 }
        ].map(({ option, text }) => (
          <motion.button
            key={option}
            onClick={() => handleVote(option as 1 | 2)}
            whileHover={{ scale: hasVoted ? 1 : 1.05 }}
            whileTap={{ scale: hasVoted ? 1 : 0.95 }}
            className={`flex-1 p-6 rounded-lg border-2 transition-colors ${
              hasVoted
                ? 'border-gray-300 cursor-default'
                : 'border-purple-500 hover:border-purple-600 cursor-pointer'
            }`}
          >
            <p className="text-lg">{text}</p>
          </motion.button>
        ))}
      </motion.div>

      {hasVoted && (
        <>
          <Reactions questionId={question.id} />
          {showPlotTwist && question.plotTwist && (
            <PlotTwist twist={question.plotTwist} isVisible={false} onClose={function (): void {
              throw new Error('Function not implemented.');
            } } />
          )}
        </>
      )}
    </div>
  );
};

export default Question;