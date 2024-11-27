import { Share2 as Share } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ShareButtonProps {
  score: number;
  total: number;
}

export const ShareButton = ({ score, total }: ShareButtonProps) => {
  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Would You Rather?',
        text: `I scored ${score} points in Would You Rather! Can you beat my score?`,
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Thanks for sharing!');
      } else {
        await navigator.clipboard.writeText(shareData.text);
        toast.success('Score copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share score');
      console.error('Error sharing:', error);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold"
    >
      <Share className="w-4 h-4" />
      Share Score
    </motion.button>
  );
};