import React from 'react';
import { Share2 } from 'lucide-react';
import { ShareButtonProps } from '../types';

export const ShareButton: React.FC<ShareButtonProps> = ({ onShare }) => {
  return (
    <button
      onClick={onShare}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
    >
      <Share2 className="w-5 h-5" />
      <span>Share</span>
    </button>
  );
};