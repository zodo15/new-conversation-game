import { motion } from 'framer-motion';
import { Users, WifiIcon as Wifi, WifiOffIcon as WifiOff } from 'lucide-react';

interface FriendGameModesProps {
  onOnlineClick: () => void;
  onOfflineClick: () => void;
  onBack: () => void;
}

export const FriendGameModes = ({ onOnlineClick, onOfflineClick, onBack }: FriendGameModesProps) => {
  return (
    <div className="space-y-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="px-4 py-2 bg-gray-700 rounded-lg text-white font-semibold"
      >
        Back
      </motion.button>
      
      <div className="grid gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-6 cursor-pointer"
          onClick={onOnlineClick}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Wifi className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400">Play Online</h3>
              <p className="text-gray-300">Challenge friends remotely</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 cursor-pointer"
          onClick={onOfflineClick}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <WifiOff className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400">Play Offline</h3>
              <p className="text-gray-300">Play with friends locally</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 