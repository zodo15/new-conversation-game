import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { QuestionDisplay } from './QuestionDisplay';
import { ChaosMasterWheel } from './ChaosMasterWheel';
import { AddQuestionModal } from './AddQuestionModal';
import { Timer } from './Timer';
import { toast } from 'react-hot-toast';
import { GameMode, Question } from '../types';
import { defaultQuestions, spicyQuestions, chaosQuestions } from '../data/questions';

interface GameProps {
  onBack?: () => void;
}

export const Game: React.FC<GameProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const {
    mode,
    gameStarted,
    players,
    currentPlayerIndex,
    currentQuestion,
    votes,
    showChaosMasterWheel,
    showAddQuestion,
    timer,
    setShowChaosMasterWheel,
    setShowAddQuestion,
    resetGame,
    setCurrentQuestion,
    setCurrentPlayerIndex,
    addVote,
    clearVotes,
    triggerChaosEvent,
  } = useGameStore();

  useEffect(() => {
    // Initialize with appropriate questions based on mode
    const getQuestionsByMode = (mode: GameMode): Question[] => {
      switch (mode) {
        case GameMode.SPICY:
          return spicyQuestions;
        case GameMode.CHAOS:
          return chaosQuestions;
        default:
          return defaultQuestions;
      }
    };

    const questions = getQuestionsByMode(mode);
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);
    }
  }, [mode, setCurrentQuestion]);

  const handleVote = (choice: 'A' | 'B') => {
    if (!currentQuestion || !players[currentPlayerIndex]) return;
    
    addVote(players[currentPlayerIndex].id, choice);
    
    // Get next question
    const questions = mode === GameMode.SPICY ? spicyQuestions : 
                     mode === GameMode.CHAOS ? chaosQuestions : 
                     defaultQuestions;
                     
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);
    }

    clearVotes();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-purple-300 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-white">
          {mode} Mode
        </h2>
      </div>

      {/* Timer */}
      {timer > 0 && (
        <div className="mb-6">
          <Timer duration={timer} />
        </div>
      )}

      {/* Current Player */}
      {players[currentPlayerIndex] && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 bg-purple-700/50 px-6 py-2 rounded-full">
            <img
              src={players[currentPlayerIndex].avatar}
              alt={players[currentPlayerIndex].name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-xl font-medium text-white">
              {players[currentPlayerIndex].name}'s Turn
            </span>
            {players[currentPlayerIndex].streak > 1 && (
              <span className="text-yellow-400">
                🔥 {players[currentPlayerIndex].streak}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Question Display */}
      {currentQuestion && (
        <QuestionDisplay
          question={currentQuestion}
          votes={votes}
          players={players}
          onVote={handleVote}
          currentPlayerId={players[currentPlayerIndex]?.id}
        />
      )}

      {/* Chaos Master Wheel */}
      {showChaosMasterWheel && (
        <ChaosMasterWheel
          isVisible={showChaosMasterWheel}
          onClose={() => setShowChaosMasterWheel(false)}
          onComplete={triggerChaosEvent}
        />
      )}

      {/* Add Question Modal */}
      {showAddQuestion && (
        <AddQuestionModal
          onClose={() => setShowAddQuestion(false)}
          onSubmit={(question: Question) => {
            setShowAddQuestion(false);
          }}
        />
      )}
    </div>
  );
};
