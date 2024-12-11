import React from 'react';
import { motion } from 'framer-motion';
import type { Question, Vote, VoteMap, Player } from '../types';

interface QuestionDisplayProps {
  question: Question;
  votes: VoteMap;
  players: Player[];
  onVote: (choice: Vote) => void;
  currentPlayerId: string;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  votes,
  players,
  onVote,
  currentPlayerId
}) => {
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const hasVoted = currentPlayerId in votes;

  if (!currentPlayer) return null;

  const getVotePercentage = (choice: Vote) => {
    const totalVotes = Object.values(votes).length;
    if (totalVotes === 0) return 0;
    
    const choiceVotes = Object.values(votes).filter(vote => vote === choice).length;
    return Math.round((choiceVotes / totalVotes) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-8"
      >
        {question.question}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-xl transition-colors ${
            hasVoted ? 'bg-purple-700/30 cursor-default' : 'bg-purple-700/50 hover:bg-purple-600/50'
          }`}
          onClick={() => !hasVoted && onVote('A')}
          disabled={hasVoted}
        >
          <h3 className="text-xl font-bold mb-2">{question.optionA}</h3>
          {hasVoted && (
            <div className="mt-4">
              <div className="h-2 bg-purple-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${getVotePercentage('A')}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-right mt-1 text-purple-300">{getVotePercentage('A')}%</p>
            </div>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-xl transition-colors ${
            hasVoted ? 'bg-purple-700/30 cursor-default' : 'bg-purple-700/50 hover:bg-purple-600/50'
          }`}
          onClick={() => !hasVoted && onVote('B')}
          disabled={hasVoted}
        >
          <h3 className="text-xl font-bold mb-2">{question.optionB}</h3>
          {hasVoted && (
            <div className="mt-4">
              <div className="h-2 bg-purple-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${getVotePercentage('B')}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-right mt-1 text-purple-300">{getVotePercentage('B')}%</p>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
};
