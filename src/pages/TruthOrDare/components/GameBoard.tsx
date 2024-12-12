import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { RotateCcw, Brain, Sparkles, Zap, Users, Dumbbell, Palette, Plus } from 'lucide-react';
import { FaHouse, FaShuffle } from 'react-icons/fa6';
import { truthQuestions, dareQuestions } from '../data/questions';
import { Player } from '../types';

type QuestionType = 'truth' | 'dare';
type Category = 'deep' | 'funny' | 'spicy' | 'social' | 'physical' | 'creative';

interface Props {
  players: Player[];
  onEndGame: () => void;
}

const GameBoard: React.FC<Props> = ({ players, onEndGame }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [isChoosing, setIsChoosing] = useState(true);
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const currentPlayer = players[currentPlayerIndex];

  const getRandomQuestion = (type: QuestionType, category: Category) => {
    const questions = type === 'truth' ? truthQuestions : dareQuestions;
    const categoryQuestions = questions.filter(q => q.category === category);
    if (categoryQuestions.length === 0) {
      toast.error('No questions available for this category');
      return null;
    }
    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    return categoryQuestions[randomIndex].text;
  };

  const handleChoice = (type: QuestionType) => {
    setSelectedType(type);
    setShowCategories(true);
  };

  const handleCategorySelect = (category: Category) => {
    if (!selectedType) return;
    setSelectedCategory(category);
    const question = getRandomQuestion(selectedType, category);
    if (question) {
      setCurrentQuestion(question);
      setIsChoosing(false);
      setShowCategories(false);
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setIsChoosing(true);
    setSelectedType(null);
    setCurrentQuestion('');
    setShowCategories(false);
  };

  const handleAddQuestion = () => {
    if (!selectedType || !selectedCategory || !newQuestion.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const questionList = selectedType === 'truth' ? truthQuestions : dareQuestions;
    questionList.push({
      text: newQuestion.trim(),
      category: selectedCategory
    });

    toast.success('Question added successfully!');
    setNewQuestion('');
    setShowAddQuestion(false);
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'deep': return Brain;
      case 'funny': return Sparkles;
      case 'spicy': return Zap;
      case 'social': return Users;
      case 'physical': return Dumbbell;
      case 'creative': return Palette;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEndGame}
          className="text-white/80 hover:text-white flex items-center gap-2 order-1 sm:order-none"
        >
          <FaHouse className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">End Game</span>
        </motion.button>
        
        <div className="text-center flex-1 order-0 sm:order-none">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {currentPlayer.name} {selectedType === 'dare' ? 'is Chaos Master' : "'s Turn"}
          </h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddQuestion(true)}
          className="text-white/80 hover:text-white flex items-center gap-2 order-2 sm:order-none"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Add Question</span>
        </motion.button>
      </div>

      {isChoosing ? (
        <div className="space-y-6 sm:space-y-8">
          <h3 className="text-lg sm:text-xl font-semibold text-center text-white/90">
            Choose your challenge
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoice('truth')}
              className="p-4 sm:p-6 bg-purple-600/30 rounded-xl hover:bg-purple-600/40 transition-colors"
            >
              <h4 className="text-base sm:text-lg font-bold mb-2">Truth</h4>
              <p className="text-xs sm:text-sm text-white/70">
                Answer a question truthfully
              </p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoice('dare')}
              className="p-4 sm:p-6 bg-pink-600/30 rounded-xl hover:bg-pink-600/40 transition-colors"
            >
              <h4 className="text-base sm:text-lg font-bold mb-2">Dare</h4>
              <p className="text-xs sm:text-sm text-white/70">
                Complete a challenging dare
              </p>
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/10 p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              {selectedType === 'truth' ? 'Truth' : 'Dare'}
            </h3>
            <p className="text-base sm:text-lg">{currentQuestion}</p>
          </div>
          <div className="flex justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextPlayer}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-lg flex items-center gap-2 text-sm sm:text-base"
            >
              <FaShuffle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Next Player</span>
            </motion.button>
          </div>
        </div>
      )}

      {showCategories && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {(selectedType === 'truth' ? ['deep', 'funny', 'spicy'] : ['social', 'physical', 'creative']).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(category as Category)}
              className="p-3 sm:p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                {React.createElement(getCategoryIcon(category as Category), { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                <span className="capitalize text-sm sm:text-base">{category}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {showAddQuestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 max-w-lg w-full space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Add New Question</h2>
              <p className="text-white/70 text-sm sm:text-base">Create a new question for future games</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-medium mb-1">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedType('truth')}
                    className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      selectedType === 'truth'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <span className="text-sm sm:text-base">Truth</span>
                  </button>
                  <button
                    onClick={() => setSelectedType('dare')}
                    className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      selectedType === 'dare'
                        ? 'bg-pink-600 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <span className="text-sm sm:text-base">Dare</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium mb-1">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(selectedType === 'truth' ? ['deep', 'funny', 'spicy'] : ['social', 'physical', 'creative']).map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category as Category)}
                        className={`p-2 sm:p-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                          selectedCategory === category
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {React.createElement(getCategoryIcon(category as Category), {
                          className: 'w-4 h-4 sm:w-5 sm:h-5'
                        })}
                        <span className="text-sm sm:text-base capitalize">{category}</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium mb-1">Question</label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter your question..."
                  className="w-full p-3 rounded-lg bg-white/10 focus:bg-white/20 transition-colors outline-none text-sm sm:text-base"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddQuestion(false)}
                className="px-4 sm:px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm sm:text-base"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddQuestion}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold shadow-lg text-sm sm:text-base"
              >
                Add Question
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameBoard;