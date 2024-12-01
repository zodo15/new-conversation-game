import React from 'react';
import { motion } from 'framer-motion';
import { Player, Question, Vote } from '../types';
import { ChoiceCard } from './ChoiceCard';
import { useGameStore } from '../store/gameStore';
import { Timer } from './Timer';
import { ShareButton } from './ShareButton';

interface QuestionDisplayProps {
  question: Question;
  votes: Vote[];
  players: Player[];
  currentPlayerId?: string;
  onVote: (choice: 'A' | 'B') => void;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  votes,
  players,
  currentPlayerId,
  onVote,
}) => {
  const {
    currentQuestion,
    currentPlayerIndex,
    players: gamePlayers,
    votes: gameVotes,
    mode,
    addVote,
    updateScore,
    updateStreak,
    setCurrentPlayerIndex,
    setCurrentQuestion,
    clearVotes,
    addUsedQuestionId,
  } = useGameStore();

  const totalVotes = gameVotes.length;
  const optionAVotes = gameVotes.filter(v => v.choice === 'A').length;
  const optionBVotes = gameVotes.filter(v => v.choice === 'B').length;
  const hasVoted = currentPlayerId ? gameVotes.some(v => v.playerId === currentPlayerId) : false;

  const getVotePercentage = (voteCount: number): number => {
    if (totalVotes === 0) return 0;
    return Math.round((voteCount / totalVotes) * 100);
  };

  const handleVote = (choice: 'A' | 'B') => {
    if (hasVoted) return;

    // Add vote and update player stats
    addVote(currentPlayerId, choice);
    updateScore(currentPlayerId, 1);
    updateStreak(currentPlayerId, choice);

    // Move to next player or reset round
    const nextIndex = (currentPlayerIndex + 1) % gamePlayers.length;
    if (nextIndex === 0) {
      // End of round, clear votes and get new question
      clearVotes();
      const newQuestion = getRandomQuestion(mode);
      if (newQuestion) {
        addUsedQuestionId(newQuestion.id);
        setCurrentQuestion(newQuestion);
      }
    }
    setCurrentPlayerIndex(nextIndex);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Would You Rather...
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={!hasVoted ? { scale: 1.02 } : {}}
          className="relative"
        >
          <ChoiceCard
            text={currentQuestion.optionA}
            onClick={() => !hasVoted && handleVote('A')}
            isOptionA
            disabled={hasVoted}
          />
          {hasVoted && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <span className="text-4xl font-bold text-white">
                {getVotePercentage(optionAVotes)}%
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          whileHover={!hasVoted ? { scale: 1.02 } : {}}
          className="relative"
        >
          <ChoiceCard
            text={currentQuestion.optionB}
            onClick={() => !hasVoted && handleVote('B')}
            isOptionA={false}
            disabled={hasVoted}
          />
          {hasVoted && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <span className="text-4xl font-bold text-white">
                {getVotePercentage(optionBVotes)}%
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {hasVoted && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Current Votes
          </h3>
          <div className="flex justify-center gap-4">
            {gameVotes.map((vote, index) => {
              const player = gamePlayers.find(p => p.id === vote.playerId);
              if (!player) return null;
              return (
                <div
                  key={vote.playerId}
                  className="flex items-center gap-2 bg-purple-700/30 px-3 py-1 rounded-full"
                >
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-white text-sm">
                    {player.name}: {vote.choice}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mode === 'friends' && (
        <div className="flex justify-between items-center">
          <Timer duration={30} onComplete={() => {}} />
          <ShareButton 
            question={currentQuestion}
            playerChoice={gameVotes.find(v => v.playerId === currentPlayerId)?.choice}
          />
        </div>
      )}
    </div>
  );
};
