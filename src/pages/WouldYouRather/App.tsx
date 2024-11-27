import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { type CustomQuestion } from './types';
import { AddQuestionModal } from './components/AddQuestionModal';
import { FriendGameModes } from './components/FriendGameModes';
import { ChoiceCard } from './components/ChoiceCard';
import { ShareButton } from './components/ShareButton';
import { getRandomQuestion } from './data/questions';
import { toast } from 'react-hot-toast';
import { ChevronLeft } from 'lucide-react';
import { Timer } from './components/Timer';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';

const WouldYouRatherApp: React.FC = () => {
  const gameState = useGameStore();
  const {
    mode,
    currentQuestion,
    players,
    currentPlayerIndex,
    votes,
    showAddQuestion,
    usedQuestionIds,
    showChaosMasterWheel,
  } = gameState;

  const handleVote = (choice: 'option1' | 'option2') => {
    if (currentQuestion && players[currentPlayerIndex]) {
      gameState.addVote(players[currentPlayerIndex], choice);
      gameState.setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      if ((currentPlayerIndex + 1) % players.length === 0) {
        if (mode === 'classic' || mode === 'spicy') {
          gameState.setCurrentQuestion(getRandomQuestion(mode, gameState.usedQuestionIds));
        }
        gameState.clearVotes();
      }
    }
  };

  const handleAddQuestion = (question: CustomQuestion) => {
    gameState.addCustomQuestion(question);
    gameState.setShowAddQuestion(false);
    toast.success('Question added successfully!');
  };

  const handleChaosMasterSpin = (action: string) => {
    toast.success(action);
    gameState.setShowChaosMasterWheel(false);
  };

  const handleTimerComplete = () => {
    if (currentQuestion && players[currentPlayerIndex]) {
      const randomChoice = Math.random() < 0.5 ? 'option1' : 'option2';
      handleVote(randomChoice);
      toast.error('Time\'s up! Random choice made!');
    }
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-12">
            Would You Rather?
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                gameState.setMode('classic');
                gameState.setCurrentQuestion(getRandomQuestion('classic', gameState.usedQuestionIds));
              }}
              className="p-6 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-2xl font-bold mb-2">Classic Mode</h2>
              <p className="text-gray-600">Traditional would you rather questions</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                gameState.setMode('spicy');
                gameState.setCurrentQuestion(getRandomQuestion('spicy', gameState.usedQuestionIds));
              }}
              className="p-6 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-2xl font-bold mb-2">Spicy Mode</h2>
              <p className="text-gray-600">More challenging and controversial questions</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => gameState.setMode('friends')}
              className="p-6 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors md:col-span-2"
            >
              <h2 className="text-2xl font-bold mb-2">Friends Mode</h2>
              <p className="text-gray-600">Play with friends online or offline</p>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'friends' && players.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <FriendGameModes
            onBack={() => gameState.setMode(undefined)}
            onStartOfflineGame={(players) => {
              gameState.setPlayers(players);
              gameState.setCurrentQuestion(getRandomQuestion('classic', gameState.usedQuestionIds));
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => gameState.resetGame()}
          className="mb-8 px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Menu
        </motion.button>

        {currentQuestion && (
          <>
            <Timer duration={30} onComplete={handleTimerComplete} />
            <ShareButton votes={votes} />
            <div className="space-y-8">
              <ChoiceCard
                choice={currentQuestion.option1}
                onClick={() => handleVote('option1')}
                votes={Object.values(votes).filter((v) => v === 'option1').length}
                totalVotes={Object.keys(votes).length}
                disabled={!!votes[players[currentPlayerIndex]]}
              />
              <ChoiceCard
                choice={currentQuestion.option2}
                onClick={() => handleVote('option2')}
                votes={Object.values(votes).filter((v) => v === 'option2').length}
                totalVotes={Object.keys(votes).length}
                disabled={!!votes[players[currentPlayerIndex]]}
              />
            </div>
          </>
        )}

        {showChaosMasterWheel && (
          <ChaosMasterWheel 
            onSpin={handleChaosMasterSpin} 
            onClose={() => gameState.setShowChaosMasterWheel(false)}
          />
        )}

        {showAddQuestion && (
          <AddQuestionModal
            onClose={() => gameState.setShowAddQuestion(false)}
            onSubmit={handleAddQuestion}
          />
        )}
      </div>
    </div>
  );
};

export { WouldYouRatherApp };