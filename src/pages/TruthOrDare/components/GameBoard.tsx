import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { GameControls } from './GameControls';
import { PlayerList } from './PlayerList';
import { AddQuestionModal } from './AddQuestionModal';
import { CategorySelect } from './CategorySelect';
import { ArrowLeft, Plus } from '@phosphor-icons/react';
import toast from 'react-hot-toast';

interface GameBoardProps {
  onBack?: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onBack }) => {
  const {
    players,
    currentPlayer,
    currentQuestion,
    selectedType,
    selectedCategory,
    getRandomQuestion,
  } = useGameStore();

  const [showAddQuestion, setShowAddQuestion] = React.useState(false);

  const handleNewQuestion = () => {
    if (!selectedType || !selectedCategory) {
      toast.error('Please select both a type and category first!');
      return;
    }

    if (players.length === 0) {
      toast.error('Please add at least one player to start the game!');
      return;
    }

    const question = getRandomQuestion(selectedType, selectedCategory);
    if (!question) {
      toast.error('No more questions available in this category!');
      return;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {onBack && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>
      )}

      <PlayerList />
      
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {currentPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              {currentPlayer.name}'s Turn
            </h2>
          </motion.div>
        )}

        <GameControls />

        {currentQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-gray-50 rounded-xl"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {selectedType === 'truth' ? 'Truth' : 'Dare'} Question
            </h3>
            <p className="text-lg text-gray-700">{currentQuestion.text}</p>
          </motion.div>
        )}

        {!currentQuestion && (
          <div className="space-y-4">
            <CategorySelect />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewQuestion}
              className="w-full py-3 bg-purple-500 text-white rounded-lg font-semibold"
            >
              Get Question
            </motion.button>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddQuestion(true)}
          className="flex items-center justify-center space-x-2 w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
        >
          <Plus size={20} />
          <span>Add Custom Question</span>
        </motion.button>
      </div>

      {showAddQuestion && (
        <AddQuestionModal onClose={() => setShowAddQuestion(false)} />
      )}
    </div>
  );
};

export default GameBoard;