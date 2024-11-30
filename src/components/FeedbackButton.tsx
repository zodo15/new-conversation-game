import React from 'react';
import { ChatCircleText } from '@phosphor-icons/react';

export interface FeedbackButtonProps {
  onClick: () => void;
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-white text-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
      title="Send Feedback"
    >
      <ChatCircleText size={24} />
    </button>
  );
};
