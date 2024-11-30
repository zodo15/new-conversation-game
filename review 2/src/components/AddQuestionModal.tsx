import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Question } from '../types';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: Question) => void;
}

export const AddQuestionModal = ({ isOpen, onClose, onSubmit }: AddQuestionModalProps) => {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (optionA.trim() && optionB.trim()) {
      onSubmit({
        id: Date.now(),
        optionA: optionA.trim(),
        optionB: optionB.trim(),
      });
      setOptionA('');
      setOptionB('');
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
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Question</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="optionA" className="block text-sm font-medium text-gray-300 mb-2">
                  Option A
                </label>
                <input
                  type="text"
                  id="optionA"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter first option..."
                />
              </div>
              <div>
                <label htmlFor="optionB" className="block text-sm font-medium text-gray-300 mb-2">
                  Option B
                </label>
                <input
                  type="text"
                  id="optionB"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter second option..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold"
                disabled={!optionA.trim() || !optionB.trim()}
              >
                Add Question
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};