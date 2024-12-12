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
      className="p-8 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEndGame}
          className="text-white/80 hover:text-white flex items-center gap-2"
        >
          <FaHouse className="w-5 h-5" />
          <span>End Game</span>
        </motion.button>
        
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-white">
            {currentPlayer.name} {selectedType === 'dare' ? 'is Chaos Master' : "'s Turn"}
          </h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddQuestion(true)}
          className="text-white/80 hover:text-white flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Question</span>
        </motion.button>
      </div>

      {isChoosing ? (
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-center text-white/90">
            Choose your challenge
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoice('truth')}
              className="p-6 bg-purple-600/30 rounded-xl hover:bg-purple-600/40 transition-colors"
            >
              <h4 className="text-lg font-bold mb-2">Truth</h4>
              <p className="text-sm text-white/70">
                Answer a question truthfully
              </p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoice('dare')}
              className="p-6 bg-pink-600/30 rounded-xl hover:bg-pink-600/40 transition-colors"
            >
              <h4 className="text-lg font-bold mb-2">Dare</h4>
              <p className="text-sm text-white/70">
                Complete a challenging dare
              </p>
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">
              {selectedType === 'truth' ? 'Truth' : 'Dare'}
            </h3>
            <p className="text-lg">{currentQuestion}</p>
          </div>
          <div className="flex justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextPlayer}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-semibold shadow-lg flex items-center gap-2"
            >
              <FaShuffle className="w-4 h-4" />
              <span>Next Player</span>
            </motion.button>
          </div>
        </div>
      )}

      {showCategories && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {(selectedType === 'truth' ? ['deep', 'funny', 'spicy'] : ['social', 'physical', 'creative']).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(category as Category)}
              className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                {category === 'deep' && <Brain className="w-6 h-6" />}
                {category === 'funny' && <Sparkles className="w-6 h-6" />}
                {category === 'spicy' && <Zap className="w-6 h-6" />}
                {category === 'social' && <Users className="w-6 h-6" />}
                {category === 'physical' && <Dumbbell className="w-6 h-6" />}
                {category === 'creative' && <Palette className="w-6 h-6" />}
                <span className="capitalize">{category}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {showAddQuestion && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Add New Question</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType('truth')}
                className={`p-4 rounded-lg ${
                  selectedType === 'truth' ? 'bg-blue-500' : 'bg-white/10'
                }`}
              >
                Truth
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType('dare')}
                className={`p-4 rounded-lg ${
                  selectedType === 'dare' ? 'bg-red-500' : 'bg-white/10'
                }`}
              >
                Dare
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {(selectedType === 'truth' 
                ? ['deep', 'funny', 'spicy'] 
                : ['social', 'physical', 'creative']
              ).map((category) => {
                const Icon = getCategoryIcon(category as Category);
                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category as Category)}
                    className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
                      selectedCategory === category ? 'bg-purple-500' : 'bg-white/10'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="capitalize">{category}</span>
                  </motion.button>
                );
              })}
            </div>

            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter your question..."
              className="w-full p-4 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows={3}
            />

            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddQuestion(false)}
                className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddQuestion}
                className="px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Add Question
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GameBoard;