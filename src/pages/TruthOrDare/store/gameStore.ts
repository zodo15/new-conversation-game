import { create } from 'zustand';
import { GameState, PlayerProfile, QuestionCategory } from '../types/game';

interface GameActions {
  verifyAge: () => void;
  setCategory: (category: QuestionCategory) => void;
  toggleChaosMode: () => void;
  toggleTimerMode: () => void;
  setCurrentPlayer: (player: string) => void;
  addPlayer: (profile: PlayerProfile) => void;
  removePlayer: (playerName: string) => void;
  addVote: (questionId: string | number, option: 1 | 2) => void;
  addReaction: (questionId: string | number, reaction: string) => void;
  setRoomId: (roomId: string) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  isAgeVerified: false,
  currentCategory: null,
  chaosMode: false,
  timerMode: false,
  currentPlayer: null,
  players: [],
  votes: {},
  reactions: {},
  roomId: null,
  customQuestions: [],
  usedQuestions: new Set(),
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,

  verifyAge: () => set({ isAgeVerified: true }),
  
  setCategory: (category: QuestionCategory) => set({ currentCategory: category }),
  
  toggleChaosMode: () => set((state: GameState) => ({ chaosMode: !state.chaosMode })),
  
  toggleTimerMode: () => set((state: GameState) => ({ timerMode: !state.timerMode })),
  
  setCurrentPlayer: (player: string) => set({ currentPlayer: player }),
  
  addPlayer: (profile: PlayerProfile) =>
    set((state: GameState) => ({
      players: [...state.players, profile],
    })),
  
  removePlayer: (playerName: string) =>
    set((state: GameState) => ({
      players: state.players.filter((p) => p.name !== playerName),
    })),
  
  addVote: (questionId: string | number, option: 1 | 2) =>
    set((state: GameState) => {
      const currentVotes = state.votes[questionId] || { option1: 0, option2: 0 };
      return {
        votes: {
          ...state.votes,
          [questionId]: {
            ...currentVotes,
            [`option${option}`]: currentVotes[`option${option}`] + 1,
          },
        },
      };
    }),
  
  addReaction: (questionId: string | number, reaction: string) =>
    set((state: GameState) => {
      const questionReactions = state.reactions[questionId] || {};
      return {
        reactions: {
          ...state.reactions,
          [questionId]: {
            ...questionReactions,
            [reaction]: (questionReactions[reaction] || 0) + 1,
          },
        },
      };
    }),
  
  setRoomId: (roomId: string) => set({ roomId }),
  
  resetGame: () => set(initialState),
}));