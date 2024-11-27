import React from 'react';
import { Users, ArrowLeft } from 'lucide-react';

interface FriendGameModesProps {
  onBack: () => void;
  onStartOfflineGame: (players: string[]) => void;
}

export const FriendGameModes: React.FC<FriendGameModesProps> = ({ onBack, onStartOfflineGame }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </motion.button>

      <h2 className="text-2xl font-bold text-white">Play with Friends</h2>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartOfflineGame([])}
          className="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Users className="w-6 h-6" />
          <span>Play Offline</span>
        </motion.button>
      </div>
    </div>
  );
};