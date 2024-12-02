import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { ChoiceCard } from './ChoiceCard';
import { Timer } from './Timer';
import { ShareButton } from './ShareButton';

export const QuestionDisplay: React.FC = () => {
  const {
    currentQuestion,
    currentPlayerIndex,
    players,
    votes,
    mode,
    addVote,
    updateScore,
    updateStreak,
    setCurrentPlayerIndex,
    setCurrentQuestion,
    clearVotes,
    getRandomQuestion,
  } = useGameStore();

  if (!currentQuestion || !players[currentPlayerIndex]) {
    return null;
  }

  const currentPlayer = players[currentPlayerIndex];
  const totalVotes = votes.length;
  const option1Votes = votes.filter(v => v.choice === 'option1').length;
  const option2Votes = votes.filter(v => v.choice === 'option2').length;
  const hasVoted = votes.some(v => v.playerId === currentPlayer.id);

  const handleVote = (choice: 'option1' | 'option2') => {
    if (hasVoted) return;

    // Add vote and update player stats
    addVote(currentPlayer.id, choice);
    updateScore(currentPlayer.id, 1);
    updateStreak(currentPlayer.id, choice);

    // Move to next player or reset round
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    if (nextIndex === 0) {
      clearVotes();
      const newQuestion = getRandomQuestion(mode);
      if (newQuestion) {
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
          consequence={currentQuestion.consequences?.option1}
          votes={option1Votes}
          totalVotes={totalVotes}
          selected={votes.some(v => v.playerId === currentPlayer.id && v.choice === 'option1')}
          onClick={() => handleVote('option1')}
          disabled={hasVoted}
        />
        <ChoiceCard
          option={currentQuestion.optionB}
          consequence={currentQuestion.consequences?.option2}
          votes={option2Votes}
          totalVotes={totalVotes}
          selected={votes.some(v => v.playerId === currentPlayer.id && v.choice === 'option2')}
          onClick={() => handleVote('option2')}
          disabled={hasVoted}
        />
      </div>

      {mode === 'friend' && (
        <div className="flex justify-between items-center">
          <Timer duration={30} onComplete={() => {}} />
          <ShareButton 
            votes={votes}
          />
        </div>
      )}
    </div>
  );
};
