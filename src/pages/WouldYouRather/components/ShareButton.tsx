import React from 'react';
import { Share2 } from 'lucide-react';
import { ShareButtonProps } from '../types';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  question: {
    optionA: string;
    optionB: string;
  };
  votes: {
    optionA: number;
    optionB: number;
  };
}

export const ShareButton: React.FC<ShareButtonProps> = ({ question, votes }) => {
  const shareText = `Would you rather...
${question.optionA} (${votes.optionA || 0} votes)
- or -
${question.optionB} (${votes.optionB || 0} votes)

Play Would You Rather at: [your-game-url]`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Would You Rather?',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        console.log('Copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleShare}
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors"
    >
      <Share2 className="w-5 h-5" />
      <span>Share</span>
    </motion.button>
  );
};