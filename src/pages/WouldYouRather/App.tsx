import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShuffle, FaArrowLeft, FaXmark, FaForward, FaPlus } from "react-icons/fa6";
import { FiZap } from "react-icons/fi";
import { Toaster, toast } from 'react-hot-toast';
import { Question, GameMode, CustomQuestion } from './types';
import { getQuestionsByMode } from './data/questions';
import { FloatingBackground } from './components/FloatingBackground';
import { Timer } from './components/Timer';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { AddQuestionModal } from './components/AddQuestionModal';
import { FeedbackButton } from '../../components/FeedbackButton';

interface GameState {
  gameStarted: boolean;
  currentQuestion: Question | null;
  players: string[];
  currentPlayerIndex: number;
  mode: GameMode;
  chaosMode: boolean;
  chaosMaster?: string;
  timer: number;
}

const getModeDescription = (mode: GameMode) => {
  switch (mode) {
    case GameMode.CLASSIC:
      return "Classic questions for casual fun with friends";
    case GameMode.SPICY:
      return "Spicier questions for adventurous players";
    case GameMode.FRIEND:
      return "Have chaos with friends";
    case GameMode.RANDOM:
      return "Random mix of questions from all categories";
    default:
      return "";
  }
};

const App = ({ onBack }: { onBack: () => void }) => {
  const [gameState, setGameState] = useState<GameState>({
    gameStarted: false,
    currentQuestion: null,
    players: [],
    currentPlayerIndex: 0,
    mode: GameMode.NONE,
    chaosMode: false,
    timer: 30,
  });

  const [playerInput, setPlayerInput] = useState('');
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  const [showChaosWheel, setShowChaosWheel] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const handleDurationChange = (newDuration: number) => {
    setTimerDuration(newDuration);
  };

  const handleTimerComplete = () => {
    // Add your logic here
  };

  const GAME_MODES = ['classic', 'spicy', 'friend', 'random']

  const chaosActions = [
    "Stutter while answering",
    "Answer in a British accent",
    "Answer while doing jumping jacks",
    "Answer in a whisper",
    "Answer like a robot",
    "Answer while dancing",
    "Answer in slow motion",
    "Answer like a news reporter",
    "Answer while impersonating another player",
    "Answer in a singing voice",
    "Answer while acting shy",
    "Answer like a superhero",
    "Answer while being dramatic",
    "Answer in reverse order",
    "Answer while being extremely excited"
  ];

  const handleChaosAction = () => {
    const randomAction = chaosActions[Math.floor(Math.random() * chaosActions.length)];
    toast.success(`Chaos Challenge: ${randomAction}`, {
      duration: 3000,
      icon: '🎲'
    });
  };

  const handleChaosWheelComplete = (selectedPlayer: string) => {
    const questions = getQuestionsByMode(gameState.mode);
    if (questions.length === 0) {
      toast.error('No questions available for this mode');
      return;
    }

    // Find the actual index of the selected player
    const playerIndex = gameState.players.findIndex(p => p === selectedPlayer);
    if (playerIndex === -1) {
      toast.error('Selected player not found');
      return;
    }

    setGameState(prev => ({
      ...prev,
      chaosMaster: selectedPlayer,
      currentPlayerIndex: playerIndex,
      gameStarted: true,
      currentQuestion: questions[Math.floor(Math.random() * questions.length)],
      chaosMode: true
    }));

    setShowChaosWheel(false);
    toast.success(`${selectedPlayer} is now the Chaos Master!`);
  };

  const startGame = () => {
    setShowChaosWheel(true);
  };

  const handleAddPlayer = () => {
    if (!playerInput.trim()) {
      toast.error('Please enter a player name');
      return;
    }
    if (gameState.players.includes(playerInput.trim())) {
      toast.error('Player already exists');
      return;
    }
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, playerInput.trim()]
    }));
    setPlayerInput('');
    toast.success(`Added ${playerInput}!`);
  };

  const handleRemovePlayer = (index: number) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter((_, i) => i !== index)
    }));
  };

  const handleModeSelect = (mode: GameMode) => {
    const questions = getQuestionsByMode(mode);
    if (questions.length === 0) {
      toast.error('No questions available for this mode');
      return;
    }

    setGameState(prev => ({
      ...prev,
      mode: mode,
      players: mode === GameMode.FRIEND ? [] : ['Player 1'],
      currentQuestion: questions[Math.floor(Math.random() * questions.length)],
      gameStarted: mode !== GameMode.FRIEND,
      chaosMode: mode === GameMode.FRIEND
    }));

    if (mode === GameMode.FRIEND) {
      setShowPlayerInput(true);
    } else {
      toast.success(`Selected ${mode} mode!`, {
        duration: 2000,
      });
    }
  };

  const handleChoice = (p0: string) => {
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    const questions = getQuestionsByMode(gameState.mode);
    if (!questions || questions.length === 0) {
      toast.error('No questions available');
      return;
    }

    const nextIndex = Math.floor(Math.random() * questions.length);
    setGameState(prev => ({
      ...prev,
      currentQuestion: questions[nextIndex],
      timer: timerDuration // Reset timer to initial duration
    }));
  };

  const skipQuestion = () => {
    const questions = getQuestionsByMode(gameState.mode);
    if (!questions || questions.length === 0) {
      toast.error('No questions available');
      return;
    }

    const nextIndex = Math.floor(Math.random() * questions.length);
    setGameState(prev => ({
      ...prev,
      currentQuestion: questions[nextIndex],
      timer: timerDuration // Reset timer when skipping
    }));
  };

  const startNewRound = () => {
    setShowChaosWheel(true);
  };

  const triggerChaosEffect = () => {
    const effects = [
      "Everyone must answer in song!",
      "Switch seats with the person to your right!",
      "Answer in your best accent!",
      "Do 5 jumping jacks before answering!",
      "Answer while standing on one leg!"
    ];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    toast.success(randomEffect, {
      icon: '⚡',
      duration: 4000
    });
  };

  const handleAddQuestion = (question: CustomQuestion) => {
    setGameState(prev => ({
      ...prev,
      currentQuestion: {
        id: crypto.randomUUID(),
        optionA: question.optionA,
        optionB: question.optionB,
        type: 'custom'
      }
    }));
    setShowAddQuestion(false);
  };

  const handleBack = () => {
    if (gameState.mode === GameMode.NONE) {
      onBack();
    } else {
      setGameState({
        gameStarted: false,
        currentQuestion: null,
        players: [],
        currentPlayerIndex: 0,
        mode: GameMode.NONE,
        chaosMode: false,
        chaosMaster: undefined,
        timer: 30,
      });
      setShowPlayerInput(false);
      setShowChaosWheel(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden text-white font-medium">
      <FloatingBackground />
      <Toaster position="top-center" />
      <FeedbackButton />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="text-white/80 hover:text-white flex items-center gap-2"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </motion.button>

            {gameState.gameStarted && gameState.mode !== GameMode.FRIEND && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewRound}
                className="text-white/80 hover:text-white flex items-center gap-2"
              >
                <FaShuffle className="w-5 h-5" />
                <span className="hidden sm:inline">Shuffle</span>
              </motion.button>
            )}
          </div>

          {/* Game Content */}
          <div className="space-y-6">
            {!gameState.gameStarted ? (
              <div className="space-y-8">
                {!showPlayerInput ? (
                  <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                    {GAME_MODES.map((mode) => (
                      <motion.button
                        key={mode}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleModeSelect(mode === 'classic' ? GameMode.CLASSIC : mode === 'spicy' ? GameMode.SPICY : mode === 'friend' ? GameMode.FRIEND : GameMode.RANDOM)}
                        className="p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-left text-white"
                      >
                        <h3 className="text-lg font-bold capitalize mb-2">{mode}</h3>
                        <p className="text-sm text-white/70 font-medium">
                          {mode === 'friend' ? "Have chaos with friends" : getModeDescription(mode as GameMode)}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 max-w-md mx-auto">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="text"
                          value={playerInput}
                          onChange={(e) => setPlayerInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                          placeholder="Enter player name"
                          className="flex-1 px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-white/50"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddPlayer}
                          className="px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <FaPlus className="w-4 h-4" />
                          <span>Add</span>
                        </motion.button>
                      </div>
                      {gameState.players.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                        >
                          <span className="font-semibold">{player}</span>
                          <button
                            onClick={() => handleRemovePlayer(index)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <FaXmark className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {gameState.players.length >= 2 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        className="w-full px-6 py-3 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors shadow-lg font-semibold"
                      >
                        Start Game
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      {gameState.mode === GameMode.FRIEND && gameState.players.length > 0 && (
                        <div className="text-2xl font-bold bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                          {gameState.chaosMaster ? `${gameState.chaosMaster} is the Chaos Master` : `${gameState.players[gameState.currentPlayerIndex]}'s Turn`}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <Timer 
                        duration={timerDuration} 
                        onComplete={handleTimerComplete}
                        onDurationChange={handleDurationChange}
                      />
                      {gameState.mode === GameMode.FRIEND && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={triggerChaosEffect}
                          className="px-4 py-2 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] rounded-lg hover:from-[#D880FF] hover:to-[#FF80E5] transition-all flex items-center gap-2 text-sm"
                        >
                          <FiZap className="w-4 h-4" />
                          Chaos!
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-center bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text mb-8">
                    Would you rather...
                  </div>
                  
                  <div className="flex flex-col gap-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice('optionA')}
                      className="w-full p-8 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-xl text-center shadow-lg relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine" />
                      <span className="relative z-10 font-semibold">{gameState.currentQuestion.optionA}</span>
                    </motion.button>

                    <div className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                      OR
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice('optionB')}
                      className="w-full p-8 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-xl text-center shadow-lg relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine" />
                      <span className="relative z-10 font-semibold">{gameState.currentQuestion.optionB}</span>
                    </motion.button>
                  </div>

                  <div className="flex justify-center gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={skipQuestion}
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <FaForward className="w-5 h-5" />
                      Skip
                    </motion.button>

                    {gameState.mode === GameMode.FRIEND && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startNewRound}
                        className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                      >
                        <FaShuffle className="w-5 h-5" />
                        Next Round
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddQuestion(true)}
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <FaPlus className="w-5 h-5" />
                      Add Question
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showChaosWheel && (
        <ChaosMasterWheel
          players={gameState.players}
          onComplete={handleChaosWheelComplete}
          onClose={() => setShowChaosWheel(false)}
          onAction={handleChaosAction}
        />
      )}
      {showAddQuestion && (
        <AddQuestionModal
          onClose={() => setShowAddQuestion(false)}
          onAdd={handleAddQuestion}
        />
      )}
    </div>
  );
};

export default App;