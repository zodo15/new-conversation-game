  import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CustomQuestion, QuestionType } from '../types';

interface AddQuestionProps {
  onClose: () => void;
  onSubmit: (question: CustomQuestion) => void;
  currentPlayer?: string;
}

export const AddQuestion = ({ onClose, onSubmit, currentPlayer }: AddQuestionProps) => {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [type, setType] = useState<QuestionType>('classic');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!option1.trim() || !option2.trim()) {
      setError('Both options are required');
      return;
    }

    if (option1.trim() === option2.trim()) {
      setError('Options must be different');
      return;
    }

    const newQuestion: CustomQuestion = {
      optionA: option1.trim(),
      optionB: option2.trim(),
      type,
      createdBy: currentPlayer
    };

    onSubmit(newQuestion);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl p-6 max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Add Question</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Option 1
              </label>
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter first option"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Option 2
              </label>
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter second option"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Question Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestionType)}
                className="w-full bg-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="classic">Classic</option>
                <option value="spicy">Spicy</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
              >
                Add Question
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
