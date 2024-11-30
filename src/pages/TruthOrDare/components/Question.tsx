import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question as QuestionType } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { Timer } from './Timer';
import { Reactions } from './Reactions';

interface QuestionProps {
  question: QuestionType;
  onComplete: () => void;
}

export const Question: React.FC<QuestionProps> = ({ question, onComplete }) => {
  const [showTimer, setShowTimer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { currentPlayerIndex, players } = useGameStore();

  const currentPlayer = players[currentPlayerIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (question.type === 'would-you-rather') {
      useGameStore.getState().addVote(currentPlayer.id, option as 'optionA' | 'optionB');
    }
  };

  const handleComplete = () => {
    if (selectedOption) {
      useGameStore.getState().updateScore(currentPlayer.id, 1);
      useGameStore.getState().updateStreak(currentPlayer.id);
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-white/10 backdrop-blur-sm rounded-lg"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {currentPlayer.name}'s Turn
        </h2>
        <p className="text-lg text-center">{question.text}</p>

        {question.type === 'would-you-rather' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleOptionSelect('optionA')}
              className={`p-4 rounded-lg transition-colors ${
                selectedOption === 'optionA'
                  ? 'bg-purple-600'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {question.optionA}
            </button>
            <button
              onClick={() => handleOptionSelect('optionB')}
              className={`p-4 rounded-lg transition-colors ${
                selectedOption === 'optionB'
                  ? 'bg-purple-600'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {question.optionB}
            </button>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          {!showTimer && (
            <button
              onClick={() => setShowTimer(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Start Timer
            </button>
          )}
          {showTimer && <Timer duration={30} />}
          <button
            onClick={handleComplete}
            disabled={!selectedOption}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedOption
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-white/10 cursor-not-allowed'
            }`}
          >
            Complete
          </button>
        </div>
      </div>

      <Reactions questionId={question.id} />
    </motion.div>
  );
};