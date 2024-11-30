import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Question, QuestionType, QuestionCategory } from '../types/game';
import { CloseIcon } from '../../../components/icons';
import toast from 'react-hot-toast';

interface AddQuestionModalProps {
  onClose: () => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({ onClose }) => {
  const { addCustomQuestion } = useGameStore();
  const [formData, setFormData] = useState<Partial<Question>>({
    type: 'truth',
    category: 'funny',
    text: '',
    optionA: '',
    optionB: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.text && !formData.optionA && !formData.optionB) {
      toast.error('Please fill in at least the question text or options');
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: formData.type as QuestionType,
      category: formData.category as QuestionCategory,
      text: formData.text || '',
      optionA: formData.optionA,
      optionB: formData.optionB,
      custom: true,
    };

    addCustomQuestion(newQuestion);
    toast.success('Question added successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Custom Question</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as QuestionType })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="truth">Truth</option>
              <option value="dare">Dare</option>
              <option value="would-you-rather">Would You Rather</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as QuestionCategory,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="funny">Funny</option>
              <option value="spicy">Spicy</option>
              <option value="deep">Deep</option>
              <option value="physical">Physical</option>
              <option value="social">Social</option>
              <option value="creative">Creative</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {formData.type !== 'would-you-rather' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text
              </label>
              <textarea
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                placeholder="Enter your question..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option A
                </label>
                <textarea
                  value={formData.optionA}
                  onChange={(e) =>
                    setFormData({ ...formData, optionA: e.target.value })
                  }
                  placeholder="Enter first option..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option B
                </label>
                <textarea
                  value={formData.optionB}
                  onChange={(e) =>
                    setFormData({ ...formData, optionB: e.target.value })
                  }
                  placeholder="Enter second option..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Question
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};