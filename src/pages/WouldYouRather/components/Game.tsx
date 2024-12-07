import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { ChaosMasterWheel } from './ChaosMasterWheel';
import { AddQuestionModal } from './AddQuestionModal';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaPlus, FaShuffle } from "react-icons/fa6";
import { IoSparklesSharp } from "react-icons/io5";
import { ChoiceCard } from './ChoiceCard';
import { FloatingBackground } from './FloatingBackground';


const Game: React.FC = () => {
  const navigate = useNavigate();
  const {
    mode,
    gameStarted,
    players,
    currentPlayerIndex,
    currentQuestion,
    showChaosMasterWheel,
    showAddQuestion,
    setShowChaosMasterWheel,
    setShowAddQuestion,
    setCurrentQuestion,
    setCurrentPlayerIndex,
    setMode,
    addUsedQuestionId,
    getRandomQuestion,
  } = useGameStore();

  useEffect(() => {
    if (!mode || !gameStarted) {
      navigate('/would-you-rather');
    }
  }, [mode, gameStarted, navigate]);

  useEffect(() => {
    const newQuestion = getRandomQuestion(mode);
    setCurrentQuestion(newQuestion);
  }, [mode, setCurrentQuestion, getRandomQuestion]);

  const handleChoice = (_choice: 'optionA' | 'optionB') => {
    if (!currentQuestion || !players[currentPlayerIndex]) return;

    // Move to next player
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);

    // Mark question as used
    if (currentQuestion.id) {
      addUsedQuestionId(currentQuestion.id);
    }

    // Get next question
    const nextQuestion = getRandomQuestion(mode);
    setCurrentQuestion(nextQuestion);

    if (!nextQuestion) {
      toast.error('No more questions available!');
      return;
    }
  };

  const handleNext = () => {
    const nextQuestion = getRandomQuestion(mode);
    setCurrentQuestion(nextQuestion);

    if (!nextQuestion) {
      toast.error('No more questions available!');
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white p-8">
      <FloatingBackground />
      
      <div className="absolute top-8 left-8 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentQuestion(null);
            setCurrentPlayerIndex(0);
            setMode('classic');
            navigate('/would-you-rather');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white backdrop-blur-sm"
        >
          <FaArrowLeft size={20} />
          Back to Modes
        </motion.button>
      </div>

      <div className="absolute top-8 right-8 z-10 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChaosMasterWheel(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white backdrop-blur-sm"
        >
          <IoSparklesSharp size={20} />
          Chaos Wheel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddQuestion(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white backdrop-blur-sm"
        >
          <FaPlus size={20} />
          Add Question
        </motion.button>
      </div>

      <div className="max-w-4xl mx-auto pt-24">
        {currentQuestion ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">
                {players[currentPlayerIndex]}'s Turn
              </h2>
              <p className="text-xl">{currentQuestion.question}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChoiceCard
                option={currentQuestion.optionA}
                onClick={() => handleChoice('optionA')}
              />
              <ChoiceCard
                option={currentQuestion.optionB}
                onClick={() => handleChoice('optionB')}
              />
            </div>

            <div className="flex justify-center">
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg text-white backdrop-blur-sm"
                >
                  <FaShuffle size={20} />
                  Skip Question
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold">No more questions available!</h2>
          </div>
        )}
      </div>

      {showChaosMasterWheel && (
        <ChaosMasterWheel onClose={() => setShowChaosMasterWheel(false)} players={[]} onComplete={function (): void {
          throw new Error('Function not implemented.');
        } } onAction={function (): void {
          throw new Error('Function not implemented.');
        } } />
      )}

      {showAddQuestion && (
        <AddQuestionModal onClose={() => setShowAddQuestion(false)} onAdd={function (): void {
          throw new Error('Function not implemented.');
        } } />
      )}
    </div>
  );
};

export default Game;
