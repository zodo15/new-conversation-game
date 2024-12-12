import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import type { Question } from '../types';

interface CustomQuestionFormProps {
  onSubmit: (question: Question) => void;
}

const CustomQuestionForm = ({ onSubmit }: CustomQuestionFormProps) => {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!optionA.trim() || !optionB.trim()) {
      toast.error('Please fill in both options');
      return;
    }

    if (optionA.length < 3 || optionB.length < 3) {
      toast.error('Options must be at least 3 characters long');
      return;
    }

    const newQuestion: Question = {
      id: String(Date.now()),
      optionA: optionA.trim(),
      optionB: optionB.trim(),
      type: 'custom',
      createdAt: new Date().toISOString()
    };

    onSubmit(newQuestion);
    toast.success('Question added successfully!');
    setOptionA('');
    setOptionB('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="optionA" className="block text-sm font-medium text-gray-300 mb-2">
          Option 1
        </label>
        <input
          id="optionA"
          type="text"
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Enter first option..."
          required
        />
      </div>
      <div>
        <label htmlFor="optionB" className="block text-sm font-medium text-gray-300 mb-2">
          Option 2
        </label>
        <input
          id="optionB"
          type="text"
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Enter second option..."
          required
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Question
      </motion.button>
    </form>
  );
};