import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, QuestionType, QuestionCategory } from '../types/game';
import toast from 'react-hot-toast';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: Question) => void;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [type, setType] = useState<QuestionType>('truth');
  const [category, setCategory] = useState<QuestionCategory>('funny');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) {
      toast('Please enter a question!', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    const newQuestion: Question = {
      content: questionText.trim(),
      type,
      category,
      custom: true
    };

    onAdd(newQuestion);
    setQuestionText('');
    toast('Question added successfully!', {
      icon: '✅',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Add Custom Question</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">Question Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setType('truth')}
                    className={`px-4 py-3 rounded-lg transition-colors ${
                      type === 'truth'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    Truth
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setType('dare');
                      if (['funny', 'deep', 'spicy'].includes(category)) {
                        setCategory('social');
                      }
                    }}
                    className={`px-4 py-3 rounded-lg transition-colors ${
                      type === 'dare'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    Dare
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {type === 'truth' ? (
                    <>
                      {['deep', 'funny', 'spicy'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat as QuestionCategory)}
                          className={`px-4 py-3 rounded-lg transition-colors ${
                            category === cat
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      {['physical', 'social', 'creative'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat as QuestionCategory)}
                          className={`px-4 py-3 rounded-lg transition-colors ${
                            category === cat
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Question Text</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Enter your question..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Question
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddQuestionModal;