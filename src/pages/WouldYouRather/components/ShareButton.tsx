import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareButtonProps {
  questionText: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ questionText }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Would You Rather?',
          text: questionText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(questionText);
        toast.success('Question copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share question');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
    >
      <Share2 className="w-5 h-5 text-white/80" />
    </motion.button>
  );
};