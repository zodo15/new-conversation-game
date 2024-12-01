import React from 'react';
import { motion } from 'framer-motion';
import { ChoiceCard } from './ChoiceCard';
import { Question, Vote, Player } from '../types';
import { ShareButton } from './ShareButton';

interface QuestionDisplayProps {
  question: Question;
  votes: Vote[];
  players: Player[];
  onVote: (choice: 'A' | 'B') => void;
  currentPlayerId?: string;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  votes,
  players,
  onVote,
  currentPlayerId
}) => {
  const totalVotes = votes.length;
  const optionAVotes = votes.filter(v => v.vote === 'A').length;
  const optionBVotes = votes.filter(v => v.vote === 'B').length;
  const hasVoted = currentPlayerId ? votes.some(v => v.playerId === currentPlayerId) : false;

  const shareText = `Would you rather...
${question.optionA} 
OR
${question.optionB}
${totalVotes > 0 ? `\nResults: ${optionAVotes} vs ${optionBVotes}` : ''}`;

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
          selected={hasVoted && votes.some(v => v.playerId === currentPlayerId && v.vote === 'A')}
          consequences={question.consequences?.A}
          votes={optionAVotes}
          totalVotes={totalVotes}
        />
        <ChoiceCard
          choice="B"
          text={question.optionB}
          onClick={() => onVote('B')}
          disabled={hasVoted}
          selected={hasVoted && votes.some(v => v.playerId === currentPlayerId && v.vote === 'B')}
          consequences={question.consequences?.B}
          votes={optionBVotes}
          totalVotes={totalVotes}
        />
      </div>

      <div className="flex justify-center">
        <ShareButton text={shareText} />
      </div>
    </motion.div>
  );
};
