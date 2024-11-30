import { motion } from 'framer-motion';
import { FaComment } from 'react-icons/fa';

export const FeedbackButton = () => {
  const handleClick = () => {
    window.open('https://forms.gle/xPtpobnbpjTVwUiMA', '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2 transition-colors duration-300 z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FaComment className="w-5 h-5" />
      <span>Feedback</span>
    </motion.button>
  );
};
