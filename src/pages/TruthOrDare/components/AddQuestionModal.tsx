import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Question, QuestionType, QuestionCategory } from '../types/game';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface AddQuestionModalProps {
  onClose: () => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<QuestionType>('truth');
  const [category, setCategory] = useState<QuestionCategory>('social');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast('Please enter a question', { icon: '⚠️' });
      return;
    }

    const newQuestion: Question = {
      id: String(Date.now()),
      content: content.trim(),
      type,
      category,
    };

    // Add the question to the store
    useGameStore.setState((state) => ({
      customQuestions: [...(state.customQuestions || []), newQuestion],
    }));

    toast('Question added successfully!', { icon: '✅' });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Custom Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
              placeholder="Enter your question..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="truth">Truth</option>
              <option value="dare">Dare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as QuestionCategory)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="spicy">Spicy</option>
              <option value="deep">Deep</option>
              <option value="social">Social</option>
              <option value="physical">Physical</option>
              <option value="creative">Creative</option>
              <option value="funny">Funny</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};