import React from 'react';
import { useGameStore } from '../store/gameStore';
import { PlayerList } from './PlayerList';
import { Question } from './Question';
import { GameControls } from './GameControls';

export const GameBoard: React.FC = () => {
  const { currentQuestion, currentPlayerIndex, players } = useGameStore();
  
  const currentPlayer = players[currentPlayerIndex];

  if (!currentPlayer) {
    return null;
  }

  return (
    <div className="space-y-8">
      <PlayerList 
        players={players} 
        currentPlayerId={currentPlayer.id}
        onRemovePlayer={(id: string) => useGameStore.getState().removePlayer(id)} 
      />
      
      {currentQuestion && (
        <Question 
          question={currentQuestion}
          onComplete={() => {
            const store = useGameStore.getState();
            store.nextPlayer();
            store.setCurrentQuestion(store.getRandomQuestion());
          }}
        />
      )}
      
      <GameControls />
    </div>
  );
};