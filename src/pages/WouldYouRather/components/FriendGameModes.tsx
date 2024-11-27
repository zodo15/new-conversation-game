import React from 'react';
import { Users } from 'lucide-react';

interface FriendGameModesProps {
  onBack: () => void;
  onStartOfflineGame: (players: string[]) => void;
}

export const FriendGameModes: React.FC<FriendGameModesProps> = ({ onBack, onStartOfflineGame }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-white">Play with Friends</h2>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <button
          onClick={() => onStartOfflineGame([])}
          className="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Users className="w-6 h-6" />
          <span>Play Offline</span>
        </button>
      </div>
      <button
        onClick={onBack}
        className="text-white hover:text-gray-300 transition-colors"
      >
        Back
      </button>
    </div>
  );
};