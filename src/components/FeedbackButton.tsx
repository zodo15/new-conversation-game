import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';

export const FeedbackButton = () => {
  const handleClick = () => {
    window.open('https://forms.gle/1AsTJFBS8CkTLXGx5', '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full shadow-lg backdrop-blur-sm z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MessageSquareText className="w-6 h-6 text-white" />
    </motion.button>
  );
};
