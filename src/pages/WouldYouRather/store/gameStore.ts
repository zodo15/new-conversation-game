import create from 'zustand';
import { GameState, GameActions, GameMode, Question, CustomQuestion } from '../types';

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
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setPlayers: (players) => set({ players }),
  setCurrentPlayerIndex: (index) => set({ currentPlayerIndex: index }),
  setChaosMaster: (player) => set({ chaosMaster: player }),
  
  addCustomQuestion: (question) => set((state) => ({
    customQuestions: [...state.customQuestions, question]
  })),

  addUsedQuestionId: (id) => set((state) => ({
    usedQuestionIds: new Set([...state.usedQuestionIds, id])
  })),

  clearUsedQuestionIds: () => set({ usedQuestionIds: new Set() }),

  addVote: (playerId, choice) => set((state) => ({
    votes: { ...state.votes, [playerId]: choice }
  })),

  clearVotes: () => set({ votes: {} }),

  setShowChaosMasterWheel: (show) => set({ showChaosMasterWheel: show }),

  resetGame: () => set(initialState),
}));
