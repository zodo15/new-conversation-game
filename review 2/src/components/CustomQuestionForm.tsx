import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Question } from '../types';

interface CustomQuestionFormProps {
  onSubmit: (question: Question) => void;
}

export const CustomQuestionForm = ({ onSubmit }: CustomQuestionFormProps) => {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (optionA.trim() && optionB.trim()) {
      onSubmit({
        id: 0, // Will be set by parent
        optionA: optionA.trim(),
        optionB: optionB.trim(),
      });
      setOptionA('');
      setOptionB('');
    }
  };

  return (
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
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
  );
};