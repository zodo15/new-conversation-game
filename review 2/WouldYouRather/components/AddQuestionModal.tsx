import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AddQuestionModalProps {
  onClose: () => void;
  onAdd: (question: { id: string; option1: string; option2: string; type: 'custom' }) => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!option1.trim() || !option2.trim()) {
      toast.error('Please fill in both options');
      return;
    }

    if (option1.trim() === option2.trim()) {
      toast.error('Options must be different');
      return;
    }

    onAdd({
      id: Date.now().toString(),
      option1: option1.trim(),
      option2: option2.trim(),
      type: 'custom',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-gradient-to-br from-[#4A1D6A] via-[#2E0F45] to-[#1A0527] rounded-xl p-8 max-w-lg w-full mx-4 text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
          Add Custom Question
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">
              Option 1
            </label>
            <input
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              placeholder="Enter first option"
              className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4A1FF] text-white placeholder-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">
              Option 2
            </label>
            <input
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              placeholder="Enter second option"
              className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4A1FF] text-white placeholder-white/50"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg font-medium transition-colors hover:bg-white/20"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] hover:from-[#D880FF] hover:to-[#FF80E5] text-white font-semibold rounded-lg shadow-lg"
            >
              Add Question
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};