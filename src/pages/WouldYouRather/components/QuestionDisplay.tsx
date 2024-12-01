import React from 'react';
import { motion } from 'framer-motion';
import { QuestionDisplayProps } from '../types';
import { ChoiceCard } from './ChoiceCard';
import { ShareButton } from './ShareButton';

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  votes,
  players,
  onVote,
  currentPlayerId
}) => {
  const hasVoted = currentPlayerId ? votes.some(v => v.playerId === currentPlayerId) : false;
  const totalVotes = votes.length;
  const votesA = votes.filter(v => v.choice === 'A').length;
  const votesB = votes.filter(v => v.choice === 'B').length;

  const shareText = `Would you rather...
${question.optionA} 
OR
${question.optionB}
${totalVotes > 0 ? `\nResults: ${votesA} vs ${votesB}` : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Would You Rather...
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChoiceCard
          choice="A"
          text={question.optionA}
          onClick={() => onVote('A')}
          disabled={hasVoted}
          selected={hasVoted && votes.some(v => v.playerId === currentPlayerId && v.choice === 'A')}
          consequences={question.consequences?.A}
          votes={votesA}
          totalVotes={totalVotes}
        />
        <ChoiceCard
          choice="B"
          text={question.optionB}
          onClick={() => onVote('B')}
          disabled={hasVoted}
          selected={hasVoted && votes.some(v => v.playerId === currentPlayerId && v.choice === 'B')}
          consequences={question.consequences?.B}
          votes={votesB}
          totalVotes={totalVotes}
        />
      </div>

      <div className="flex justify-center">
        <ShareButton text={shareText} />
      </div>
    </motion.div>
  );
};
