import { create } from 'zustand';
import { GameMode, GameState, GameActions, CustomQuestion } from '../types';

const initialState: GameState = {
  mode: GameMode.NONE,
  currentQuestion: undefined,
  players: [],
  currentPlayerIndex: 0,
  chaosMaster: undefined,
  customQuestions: [],
  usedQuestionIds: new Set<string>(),
  votes: {},
  showChaosMasterWheel: false,
  isTimerRunning: false,
  showAddQuestion: false
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,

  setMode: (mode: GameMode) => set({ mode }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setPlayers: (players: string[]) => set({ players }),
  setCurrentPlayerIndex: (index: number) => set({ currentPlayerIndex: index }),
  setChaosMaster: (player: string | undefined) => set({ chaosMaster: player }),

  addCustomQuestion: (question: CustomQuestion) => 
    set((state) => ({
      customQuestions: [...state.customQuestions, question]
    })),

  addUsedQuestionId: (id: string) => 
    set((state) => ({
      usedQuestionIds: new Set([...Array.from(state.usedQuestionIds), id])
    })),

  clearUsedQuestionIds: () => set({ usedQuestionIds: new Set() }),

  addVote: (playerId: string, choice: 'option1' | 'option2') => 
    set((state) => ({
      votes: {
        ...state.votes,
        [playerId]: choice
      }
    })),

  clearVotes: () => set({ votes: {} }),

  setShowChaosMasterWheel: (show: boolean) => set({ showChaosMasterWheel: show }),

  setShowAddQuestion: (show: boolean) => set({ showAddQuestion: show }),

  resetGame: () => set(initialState)
}));
