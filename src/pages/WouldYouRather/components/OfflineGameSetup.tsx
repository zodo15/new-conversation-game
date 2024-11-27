import { motion } from 'framer-motion';
import { useState } from 'react';
import { PlayIcon, ArrowLeft, PlusIcon, XIcon, UsersIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import { type Question } from '../data/questions';

interface OfflineGameSetupProps { 

  onStart: (players: string[]) => void; 

  onBack: () => void; 

} 


export const OfflineGameSetup: React.FC<OfflineGameSetupProps> = ({ onStart, onBack }: OfflineGameSetupProps) => { 

  const [players, setPlayers] = useState<string[]>([]); 

  const [newPlayerName, setNewPlayerName] = useState(''); 


  const handleAddPlayer = () => { 

    if (players.length >= 12) { 

      toast('Maximum 12 players allowed', {
        icon: '⚠️',
        style: {
          background: '#f87171',
          color: '#fff'
        }
      }); 

      return; 

    } 

    if (newPlayerName.trim()) { 

      if (players.includes(newPlayerName.trim())) { 

        toast('Player name already exists', {
          icon: '⚠️',
          style: {
            background: '#f87171',
            color: '#fff'
          }
        }); 

        return; 

      } 

      setPlayers([...players, newPlayerName.trim()]); 

      setNewPlayerName(''); 

    } 

  }; 


  const handleRemovePlayer = (index: number) => { 

    setPlayers(players.filter((_, i) => i !== index)); 

  }; 


  const handleStartGame = () => { 

    if (players.length < 2) { 

      toast('At least 2 players required', {
        icon: '⚠️',
        style: {
          background: '#f87171',
          color: '#fff'
        }
      }); 

      return; 

    } 

    onStart(players); 

  }; 


  return ( 

    <div className="space-y-8"> 

      <motion.button 

        whileHover={{ scale: 1.05 }} 

        whileTap={{ scale: 0.95 }} 

        onClick={onBack} 

        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition-colors" 

      > 

        <ArrowLeft className="w-4 h-4" /> 

        Back to Menu 

      </motion.button> 


      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm"> 

        <div className="flex items-center justify-between mb-8"> 

          <h2 className="text-2xl font-bold flex items-center gap-3"> 

            <UsersIcon className="w-7 h-7 text-blue-400" /> 

            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> 

              Players Setup 

            </span> 


          </h2> 


          <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full"> 

            {players.length}/12 players 

          </span> 


        </div> 


        <div className="space-y-4 mb-8"> 

          <div className="flex gap-3"> 

            <input 

              type="text" 

              value={newPlayerName} 

              onChange={(e) => setNewPlayerName(e.target.value)} 

              placeholder="Enter player name..." 

              className="flex-1 px-4 py-3 bg-gray-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-500" 

              onKeyPress={(e) => { 

                if (e.key === 'Enter') { 

                  handleAddPlayer(); 

                } 

              }} 

            /> 

            <motion.button 

              whileHover={{ scale: 1.02 }} 

              whileTap={{ scale: 0.98 }} 

              onClick={handleAddPlayer} 

              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity" 

            > 

              <PlusIcon className="w-5 h-5" /> 

              Add Player 

            </motion.button> 


          </div> 


          <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"> 

            {players.map((player, index) => ( 

              <motion.div 

                key={index} 

                initial={{ opacity: 0, y: -10 }} 

                animate={{ opacity: 1, y: 0 }} 

                exit={{ opacity: 0, y: -10 }} 

                className="flex items-center gap-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl group hover:from-gray-800 hover:to-gray-700 transition-all" 

              > 

                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold"> 

                  {index + 1} 

                </div> 


                <span className="flex-1 font-semibold text-white">{player}</span> 


                <motion.button 

                  whileHover={{ scale: 1.1 }} 

                  whileTap={{ scale: 0.9 }} 

                  onClick={() => handleRemovePlayer(index)} 

                  className="p-2 hover:bg-gray-600/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" 

                > 

                  <XIcon className="w-5 h-5 text-red-400" /> 

                </motion.button> 


              </motion.div> 


            ))} 

          </div> 


        </div> 


        <motion.button 

          whileHover={{ scale: 1.02 }} 

          whileTap={{ scale: 0.98 }} 

          onClick={handleStartGame} 

          disabled={players.length < 2} 

          className={`w-full px-6 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 transition-all 

            ${players.length >= 2  

              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90'  

              : 'bg-gray-700 cursor-not-allowed'}`} 

        > 

          <PlayIcon className="w-5 h-5" /> 

          Start Game 

        </motion.button> 


      </div> 


      {players.length === 0 && ( 

        <motion.div 

          initial={{ opacity: 0 }} 

          animate={{ opacity: 1 }} 

          className="text-center text-gray-400 mt-4" 

        > 

          Add at least 2 players to start the game 

        </motion.div> 


      )} 

    </div> 


  ); 


}; 