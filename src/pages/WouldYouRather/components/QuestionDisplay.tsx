import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Question, Vote, Player } from '../types';
import { ChoiceCard } from './ChoiceCard';
import { Timer } from './Timer';
import { ShareButton } from './ShareButton';

interface QuestionDisplayProps {
  question: Question;
  onVote: (choice: 'option1' | 'option2') => void;
  currentPlayer: Player;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, onVote, currentPlayer }) => {
  const {
    votes = [],
    addVote,
    updateScore,
    updateStreak,
    setCurrentPlayerIndex,
    currentPlayerIndex,
    players
  } = useGameStore();

  const totalVotes = votes.length;
  const option1Votes = votes.filter(v => v.choice === 'option1').length;
  const option2Votes = votes.filter(v => v.choice === 'option2').length;
  const hasVoted = votes.some(v => v.playerId === currentPlayer.id);

  const handleVote = (choice: 'option1' | 'option2') => {
    if (hasVoted) return;
    
    addVote(currentPlayer.id, choice);
    updateScore(currentPlayer.id, 1);
    updateStreak(currentPlayer.id, choice);
    
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
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
          option={question.option1}
          consequence={question.consequences?.option1}
          votes={option1Votes}
          totalVotes={totalVotes}
          selected={votes.some(v => v.playerId === currentPlayer.id && v.choice === 'option1')}
          onClick={() => handleVote('option1')}
          disabled={hasVoted}
        />
        <ChoiceCard
          option={question.option2}
          consequence={question.consequences?.option2}
          votes={option2Votes}
          totalVotes={totalVotes}
          selected={votes.some(v => v.playerId === currentPlayer.id && v.choice === 'option2')}
          onClick={() => handleVote('option2')}
          disabled={hasVoted}
        />
      </div>

      <div className="flex justify-between items-center">
        <Timer duration={30} onComplete={() => {}} />
        <ShareButton 
          question={question}
          playerChoice={votes.find(v => v.playerId === currentPlayer.id)?.choice}
        />
      </div>
    </div>
  );
};
