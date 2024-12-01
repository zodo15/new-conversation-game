import React from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import { PlayerList } from './PlayerList';
import { Question } from './Question';
import { GameControls } from './GameControls';
import type { Question as QuestionType } from '../types/game';

export const GameBoard: React.FC = () => {
  const { currentQuestion, currentPlayerIndex, players, removePlayer, nextPlayer, setCurrentQuestion, getRandomQuestion } = useGameStore();
  
  const currentPlayer = players[currentPlayerIndex];

  if (!currentPlayer) {
    return null;
  }

  const handleQuestionComplete = () => {
    nextPlayer();
    const nextQuestion = getRandomQuestion();
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    }
  };

  return (
    <div className="space-y-8">
      <PlayerList 
        players={players} 
        currentPlayerId={currentPlayer.id}
        onRemovePlayer={removePlayer}
      />
      
      {currentQuestion && (
        <Question 
          question={currentQuestion}
          onComplete={handleQuestionComplete}
        />
      )}
      
      <GameControls />
    </div>
  );
};