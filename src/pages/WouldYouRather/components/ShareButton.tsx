import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Vote } from '../types';

interface ShareButtonProps {
  votes: Vote[];
}

export const ShareButton: React.FC<ShareButtonProps> = ({ votes }) => {
  const handleShare = async () => {
    const option1Votes = votes.filter(v => v.choice === 'A').length;
    const option2Votes = votes.filter(v => v.choice === 'B').length;
    const total = option1Votes + option2Votes;

    const text = `Would You Rather Results:\n` +
      `Option A: ${Math.round((option1Votes / total) * 100)}%\n` +
      `Option B: ${Math.round((option2Votes / total) * 100)}%\n` +
      `Total Votes: ${total}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Would You Rather Results',
          text: text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success('Results copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share results');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleShare}
      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
    >
      <Share2 className="w-6 h-6" />
    </motion.button>
  );
};