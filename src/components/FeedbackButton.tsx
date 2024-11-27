import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface FeedbackButtonProps {
  onClick: () => void;
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-4 right-4 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg text-white"
    >
      <MessageSquare className="w-6 h-6" />
    </motion.button>
  );
};
