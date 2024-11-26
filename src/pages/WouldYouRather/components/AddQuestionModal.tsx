import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Question } from '../data/questions';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: Question) => void;
}

export const AddQuestionModal = ({ isOpen, onClose, onSubmit }: AddQuestionModalProps) => {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [type, setType] = useState<'classic' | 'spicy'>('classic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (optionA.trim() && optionB.trim()) {
      onSubmit({
        id: Date.now(),
        optionA: optionA.trim(),
        optionB: optionB.trim(),
        votesA: 0,
        votesB: 0,
        type
      });
      setOptionA('');
      setOptionB('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-gray-800 p-6 rounded-xl w-full max-w-md mx-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Add New Question
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Option A</label>
                <input
                  type="text"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter first option..."
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Option B</label>
                <input
                  type="text"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter second option..."
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Question Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'classic' | 'spicy')}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="classic">Classic</option>
                  <option value="spicy">Spicy</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                Add Question
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};