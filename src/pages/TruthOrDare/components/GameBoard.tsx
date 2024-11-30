import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Question, Player } from '../types/game';
import { CategorySelect } from './CategorySelect';
import { Reactions } from './Reactions';
import { AddQuestionModal } from './AddQuestionModal';

interface GameBoardProps {
  onBack: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onBack }) => {
  const {
    players,
    currentPlayerIndex,
    currentQuestion,
    addCustomQuestion,
    setCurrentQuestion,
    nextPlayer,
    updateScore,
    updateStreak,
    getRandomQuestion,
  } = useGameStore();

  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    if (!currentQuestion) {
      const question = getRandomQuestion();
      if (question) {
        setCurrentQuestion(question);
      }
    }
  }, [currentQuestion, getRandomQuestion, setCurrentQuestion]);

  const handleNext = () => {
    nextPlayer();
    const question = getRandomQuestion();
    if (question) {
      setCurrentQuestion(question);
    }
  };

  const handleComplete = () => {
    if (currentPlayer) {
      updateScore(currentPlayer.id, 1);
      updateStreak(currentPlayer.id);
    }
    handleNext();
  };

  if (!currentPlayer || !currentQuestion) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setShowAddQuestion(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Question
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentPlayer.name}'s Turn
          </h2>
          <span className="text-gray-500">
            Score: {currentPlayer.score} | Streak: {currentPlayer.streak || 0}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            {currentQuestion.type === 'truth'
              ? 'Truth'
              : currentQuestion.type === 'dare'
              ? 'Dare'
              : 'Would You Rather'}
          </h3>
          <p className="text-lg text-gray-600">{currentQuestion.text}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleComplete}
            className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Complete
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Category</h3>
        <CategorySelect
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Reactions</h3>
        <Reactions currentPlayer={currentPlayer} players={players} />
      </div>

      {showAddQuestion && (
        <AddQuestionModal onClose={() => setShowAddQuestion(false)} />
      )}
    </div>
  );
};