import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Question, QuestionType } from '../types';

interface AddQuestionModalProps {
  onClose: () => void;
  onAdd: (question: Question) => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState<'truth' | 'dare'>('truth');
  const [type, setType] = useState<QuestionType>('mild');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      text: questionText.trim(),
      category,
      type,
    };

    onAdd(newQuestion);
    onClose();
    toast.success('Question added successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white rounded-xl p-8 max-w-lg w-full mx-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Add Custom Question</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Text
            </label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCategory('truth')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    category === 'truth'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Truth
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('dare')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    category === 'dare'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Dare
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestionType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="mild">Mild</option>
                <option value="spicy">Spicy</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg"
            >
              Add Question
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};