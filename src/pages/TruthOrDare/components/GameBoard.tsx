import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Shuffle, RotateCcw, Home, Brain, Sparkles, Zap, Users, Dumbbell, Palette, Plus } from 'lucide-react';
import { truthQuestions, dareQuestions } from '../data/questions';

type QuestionType = 'truth' | 'dare';
type Category = 'deep' | 'funny' | 'spicy' | 'social' | 'physical' | 'creative';

interface Props {
  players: string[];
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

  const getRandomQuestion = (type: QuestionType, category: Category) => {
    const questions = type === 'truth' ? truthQuestions : dareQuestions;
    const categoryQuestions = questions.filter(q => q.category === category);
    if (categoryQuestions.length === 0) {
      toast.error('No questions available for this category', { id: 'no-questions' });
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

  const nextTurn = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setIsChoosing(true);
    setSelectedType(null);
    setCurrentQuestion('');
    setShowCategories(false);
    setSelectedCategory(null);
  };

  const skipQuestion = () => {
    if (!selectedType || !selectedCategory) return;
    const newQuestion = getRandomQuestion(selectedType, selectedCategory);
    if (newQuestion) {
      setCurrentQuestion(newQuestion);
      toast('Question skipped!', { id: 'question-skipped' });
    }
  };

  const handleAddQuestion = () => {
    if (!selectedType || !selectedCategory || !newQuestion.trim()) {
      toast.error('Please fill in all fields', { id: 'missing-fields' });
      return;
    }

    const questionList = selectedType === 'truth' ? truthQuestions : dareQuestions;
    questionList.push({
      text: newQuestion.trim(),
      category: selectedCategory
    });

    toast.success('Question added successfully!', { id: 'question-added' });
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEndGame}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          End Game
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddQuestion(true)}
          className="px-4 py-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </motion.button>

        <div className="text-xl font-semibold">
          {players[currentPlayerIndex]}'s Turn
        </div>
      </div>

      {showAddQuestion ? (
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
      ) : isChoosing ? (
        showCategories ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Choose a Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(selectedType === 'truth' ? ['deep', 'funny', 'spicy'] : ['social', 'physical', 'creative']).map((category) => {
                const Icon = getCategoryIcon(category as Category);
                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect(category as Category)}
                    className="p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors flex flex-col items-center gap-3"
                  >
                    <Icon className="w-8 h-8" />
                    <span className="text-lg font-semibold capitalize">
                      {category}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCategories(false)}
              className="mx-auto block px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Back
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice('truth')}
              className="p-8 bg-blue-500/20 rounded-xl hover:bg-blue-500/30 transition-colors text-2xl font-bold"
            >
              Truth
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice('dare')}
              className="p-8 bg-red-500/20 rounded-xl hover:bg-red-500/30 transition-colors text-2xl font-bold"
            >
              Dare
            </motion.button>
          </div>
        )
      ) : (
        <div className="space-y-8">
          <div className="p-8 bg-white/10 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">
              {selectedType === 'truth' ? 'Truth' : 'Dare'}:
            </h3>
            <p className="text-2xl">{currentQuestion}</p>
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={skipQuestion}
              className="px-6 py-3 bg-yellow-500/20 rounded-lg hover:bg-yellow-500/30 transition-colors flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Skip
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTurn}
              className="px-6 py-3 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Next Turn
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GameBoard;