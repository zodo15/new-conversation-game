import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Shuffle } from 'lucide-react';
import { GameProps, Question, Vote, ChaosEvent } from '../types';
import { useGameStore } from '../store/gameStore';
import { Timer } from './Timer';
import { QuestionDisplay } from './QuestionDisplay';
import { ChaosMaster } from './ChaosMaster';

export const Game: React.FC<GameProps> = ({ onBack }) => {
  const {
    questions,
    players,
    currentPlayerIndex,
    mode,
    chaosMode,
    usedQuestionIds,
    setCurrentPlayerIndex
  } = useGameStore();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [showChaosMaster, setShowChaosMaster] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!currentQuestion) {
      getNextQuestion();
    }
  }, []);

  const getNextQuestion = () => {
    const availableQuestions = questions.filter(q => 
      q.mode === mode && !usedQuestionIds.includes(q.id)
    );

    if (availableQuestions.length === 0) {
      toast.error('No more questions available!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    setCurrentQuestion(question);
    setVotes([]);
    setTimer(30);

    if (chaosMode && Math.random() > 0.7) {
      setShowChaosMaster(true);
    }
  };

  const handleVote = (choice: 'A' | 'B') => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer || !currentQuestion) return;

    const newVote: Vote = {
      playerId: currentPlayer.id,
      choice,
      timestamp: Date.now()
    };

    setVotes(prev => [...prev, newVote]);

    // Move to next player
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);

    // If all players have voted, wait a bit then move to next question
    if (nextIndex === 0) {
      setTimeout(getNextQuestion, 3000);
    }
  };

  const handleChaosEvent = (event: ChaosEvent) => {
    switch (event.type) {
      case 'swap':
        const newIndex = Math.floor(Math.random() * players.length);
        setCurrentPlayerIndex(newIndex);
        break;
      case 'skip':
        getNextQuestion();
        break;
      case 'reverse':
        setVotes(prev => [...prev].reverse());
        break;
      case 'double':
        setTimer(prev => prev * 2);
        break;
      case 'timeout':
        setTimer(10);
        break;
    }
    toast.success(event.description);
    setShowChaosMaster(false);
  };

  const handleTimerComplete = () => {
    if (!currentQuestion) return;
    
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer) return;

    // Auto-generate a random vote if player didn't vote in time
    const randomChoice: 'A' | 'B' = Math.random() > 0.5 ? 'A' : 'B';
    handleVote(randomChoice);
    toast.error(`${currentPlayer.name} took too long to decide!`);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Setup
          </button>

          <Timer duration={timer} onComplete={handleTimerComplete} />

          <button
            onClick={getNextQuestion}
            className="text-white/80 hover:text-white flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Skip Question
          </button>
        </div>

        <QuestionDisplay
          question={currentQuestion}
          votes={votes}
          players={players}
          onVote={handleVote}
          currentPlayerId={players[currentPlayerIndex]?.id}
        />

        {showChaosMaster && (
          <ChaosMaster
            isVisible={showChaosMaster}
            onClose={() => setShowChaosMaster(false)}
            onComplete={handleChaosEvent}
          />
        )}
      </div>
    </motion.div>
  );
};
