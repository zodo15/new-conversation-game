import React from 'react';
import { motion } from 'framer-motion';
import { ShareNetwork } from '@phosphor-icons/react';
import { toast } from 'react-hot-toast';

interface ShareButtonProps {
  votes: Record<string, 'option1' | 'option2'>;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ votes }) => {
  const handleShare = async () => {
    const option1Votes = Object.values(votes).filter(v => v === 'option1').length;
    const option2Votes = Object.values(votes).filter(v => v === 'option2').length;
    const total = option1Votes + option2Votes;

    const text = `Would You Rather Results:\n` +
      `Option 1: ${Math.round((option1Votes / total) * 100)}%\n` +
      `Option 2: ${Math.round((option2Votes / total) * 100)}%\n` +
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
      <ShareNetwork className="w-6 h-6" />
    </motion.button>
  );
};