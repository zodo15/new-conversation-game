import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { ChoiceCard } from './ChoiceCard';
import { Timer } from './Timer';

export const QuestionDisplay: React.FC = () => {
  const {
    currentQuestion,
    currentPlayerIndex,
    players,
    mode,
    setCurrentPlayerIndex,
    setCurrentQuestion,
    addUsedQuestionId,
  } = useGameStore();

  if (!currentQuestion || !players[currentPlayerIndex]) {
    return null;
  }

  const currentPlayer = players[currentPlayerIndex];

  const handleChoice = (p0: string) => {
    // Move to next player or reset round
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    if (nextIndex === 0) {
      // End of round, get new question
      const newQuestion = getRandomQuestion(mode);
      if (newQuestion) {
        addUsedQuestionId(newQuestion.id);
        setCurrentQuestion(newQuestion);
      }
    }
    setCurrentPlayerIndex(nextIndex);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-white mb-2"
        >
          {currentPlayer.name}'s Turn
        </motion.h2>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-white/60"
        >
          Choose wisely...
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChoiceCard
          option={currentQuestion.optionA}
          consequence={currentQuestion.consequences?.optionA}
          onClick={() => handleChoice('optionA')}
        />
        <ChoiceCard
          option={currentQuestion.optionB}
          consequence={currentQuestion.consequences?.optionB}
          onClick={() => handleChoice('optionB')}
        />
      </div>

      {mode === 'friends' && (
        <div className="flex justify-center items-center">
          <Timer duration={30} />
        </div>
      )}
    </div>
  );
};

function getRandomQuestion(_mode: string) {
  const questions: Question[] = [
    { id: '1', optionA: 'Fight a horse-sized duck', optionB: 'Fight a hundred duck-sized horses', mode: 'classic' },
    { id: '2', optionA: 'Have the ability to fly', optionB: 'Be invisible', mode: 'spicy' },
    { id: '3', optionA: 'Always be 10 minutes late', optionB: 'Always be 20 minutes early', mode: 'extreme' },
  ];
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}
