import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { useQuestionsStore } from '../store/questionsStore';
import { Question, GameMode } from '../types';
import { ChoiceCard } from './ChoiceCard';
import { Timer } from './Timer';
import { ChaosMaster } from './ChaosMaster';
import { 
  ArrowLeft, 
  Shuffle, 
  Zap,
  Plus 
} from 'lucide-react';

export const Game: React.FC = () => {
  const {
    currentQuestion,
    players,
    currentPlayerIndex,
    votes,
    mode,
    chaosMode,
    timer,
    setCurrentQuestion,
    addPlayer,
    removePlayer,
    setMode,
    setCurrentPlayerIndex,
    addPlayerVote,
    updatePlayerScore,
    updatePlayerStreak,
    resetGame,
    startGame,
    toggleChaosMode,
    setTimer,
  } = useGameStore();

  const { getQuestionsByMode } = useQuestionsStore();
  const [showChaosMaster, setShowChaosMaster] = useState(false);

  const handleVote = (choice: 'A' | 'B') => {
    if (!currentQuestion || !players[currentPlayerIndex]) return;
    
    addPlayerVote(players[currentPlayerIndex].id, choice);
    updatePlayerScore(players[currentPlayerIndex].id, 1);
    updatePlayerStreak(players[currentPlayerIndex].id);
    
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  const handleChaosEvent = (event: string) => {
    switch (event) {
      case 'Double Points':
        // Double points for next round
        break;
      case 'Reverse Scoring':
        // Reverse scoring for next round
        break;
      case 'Speed Round':
        setTimer(15);
        break;
      case 'Skip Turn':
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(nextPlayerIndex);
        break;
      case 'Switch Players':
        // Randomly reorder players
        break;
    }
  };

  const handleNextQuestion = () => {
    const questions = getQuestionsByMode(mode);
    if (questions.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  useEffect(() => {
    if (mode && !currentQuestion) {
      handleNextQuestion();
    }
  }, [mode, currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setMode('' as GameMode)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <Timer
              duration={timer}
              onComplete={handleNextQuestion}
            />
            
            {chaosMode && (
              <button
                onClick={() => setShowChaosMaster(true)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Chaos!
              </button>
            )}
          </div>
        </div>

        {currentQuestion && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChoiceCard
              choice="A"
              text={currentQuestion.optionA}
              onClick={() => handleVote('A')}
              disabled={votes.some(v => v.playerId === players[currentPlayerIndex]?.id)}
              selected={votes.some(v => v.playerId === players[currentPlayerIndex]?.id && v.vote === 'A')}
              consequences={currentQuestion.consequences?.A}
              votes={votes.filter(v => v.vote === 'A').length}
              totalVotes={votes.length}
            />
            <ChoiceCard
              choice="B"
              text={currentQuestion.optionB}
              onClick={() => handleVote('B')}
              disabled={votes.some(v => v.playerId === players[currentPlayerIndex]?.id)}
              selected={votes.some(v => v.playerId === players[currentPlayerIndex]?.id && v.vote === 'B')}
              consequences={currentQuestion.consequences?.B}
              votes={votes.filter(v => v.vote === 'B').length}
              totalVotes={votes.length}
            />
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Next Question
          </button>

          <button
            onClick={() => setMode('' as GameMode)}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
          >
            End Game
          </button>
        </div>
      </div>

      {showChaosMaster && (
        <ChaosMaster
          onClose={() => setShowChaosMaster(false)}
          onComplete={handleChaosEvent}
          isVisible={showChaosMaster}
        />
      )}
    </div>
  );
};
