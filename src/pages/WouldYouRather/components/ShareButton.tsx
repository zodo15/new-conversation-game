import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ShareButtonProps {
  score: number;
  total: number;
}

export const ShareButton = ({ score, total }: ShareButtonProps) => {
  const handleShare = async () => {
    const text = `I scored ${score}/${total} in Would You Rather! Can you beat my score?`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Would You Rather Score',
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success('Score copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share score');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold"
    >
      <Share2 className="w-4 h-4" />
      Share Score
    </motion.button>
  );
};