import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareButtonProps {
  votes: Record<string, 'option1' | 'option2'>;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ votes }) => {
  const handleShare = async () => {
    const voteCount = Object.values(votes).reduce(
      (acc, vote) => {
        acc[vote]++;
        return acc;
      },
      { option1: 0, option2: 0 }
    );

    const shareText = `Would You Rather Results:\nOption 1: ${voteCount.option1} votes\nOption 2: ${voteCount.option2} votes`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Would You Rather Results',
          text: shareText,
        });
        toast.success('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success('Results copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share results');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
    >
      <Share2 className="w-5 h-5" />
      <span>Share Results</span>
    </button>
  );
};