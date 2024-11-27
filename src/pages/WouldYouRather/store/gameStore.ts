import { create } from 'zustand';
import { GameState, GameActions } from '../types';

const initialState: GameState = {
  currentQuestion: null,
  usedQuestionIds: new Set(),
  votes: {},
  chaosMaster: null,
  players: [],
  showChaosMasterWheel: false,
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,

  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  
  addUsedQuestionId: (id) => 
    set((state) => ({ 
      usedQuestionIds: new Set([...state.usedQuestionIds, id])
    })),
  
  setVotes: (votes) => set({ votes }),
  
  setChaosMaster: (player) => set({ chaosMaster: player }),
  
  setPlayers: (players) => set({ players }),
  
  setShowChaosMasterWheel: (show) => set({ showChaosMasterWheel: show }),
  
  resetGame: () => set(initialState),
}));
