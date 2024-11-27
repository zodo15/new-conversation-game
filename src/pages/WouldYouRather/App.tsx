import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { type Question, type CustomQuestion } from './types';
import { GameMode } from './types';
import { Timer } from './components/Timer';
import { AddQuestionModal } from './components/AddQuestionModal';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { FriendGameModes } from './components/FriendGameModes';
import { ChoiceCard } from './components/ChoiceCard';
import { ShareButton } from './components/ShareButton';
import { getRandomQuestion } from './data/questions';
import { toast } from 'react-hot-toast';

const WouldYouRatherApp: React.FC = () => {
  const gameState = useGameStore();
  const {
    mode,
    players,
    currentPlayerIndex,
    currentQuestion,
    votes,
    showChaosMasterWheel,
    showAddQuestion,
  } = gameState;

  const handleVote = (choice: 'option1' | 'option2') => {
    if (currentQuestion && players[currentPlayerIndex]) {
      gameState.addVote(players[currentPlayerIndex], choice);
      gameState.setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      if ((currentPlayerIndex + 1) % players.length === 0) {
        gameState.setCurrentQuestion(getRandomQuestion(mode));
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
                gameState.setCurrentQuestion(getRandomQuestion('classic'));
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
                gameState.setCurrentQuestion(getRandomQuestion('spicy'));
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
              gameState.setCurrentQuestion(getRandomQuestion('classic'));
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
          className="mb-8 px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
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

        {showAddQuestion && (
          <AddQuestionModal
            onClose={() => gameState.setShowAddQuestion(false)}
            onAdd={handleAddQuestion}
          />
        )}

        {showChaosMasterWheel && (
          <ChaosMasterWheel
            onClose={() => gameState.setShowChaosMasterWheel(false)}
            onSpin={handleChaosMasterSpin}
          />
        )}
      </div>
    </div>
  );
};

export default WouldYouRatherApp;