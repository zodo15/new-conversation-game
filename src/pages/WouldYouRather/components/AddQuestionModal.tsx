import React from 'react';
import { motion } from 'framer-motion';
import { CustomQuestionForm } from './CustomQuestionForm';
import { type CustomQuestion } from '../types';

interface AddQuestionModalProps {
  onClose: () => void;
  onAdd: (question: CustomQuestion) => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({ onClose, onAdd }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-lg w-full mx-4"
      >
        <h2 className="text-2xl font-bold mb-4">Add a Custom Question</h2>
        <CustomQuestionForm onSubmit={onAdd} onCancel={onClose} />
      </motion.div>
    </motion.div>
  );
};