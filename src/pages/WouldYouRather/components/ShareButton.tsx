import React from 'react';
import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ShareButtonProps {
  text: string;
  url?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ text, url = window.location.href }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Would You Rather',
          text,
          url
        });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
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
      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
    >
      <Share2 className="w-5 h-5" />
      Share
    </motion.button>
  );
};