import { create } from 'zustand';

interface GameState {
  isAgeVerified: boolean;
  currentCategory: string | null;
  chaosMode: boolean;
  timerMode: boolean;
  votes: Record<string, { option1: number; option2: number }>;
  reactions: Record<string, Record<string, number>>;
  roomId: string | null;
  setAgeVerified: (verified: boolean) => void;
  setCategory: (category: string | null) => void;
  setChaosMode: (enabled: boolean) => void;
  setTimer: (enabled: boolean) => void;
  addVote: (questionId: string, option: 1 | 2) => void;
  addReaction: (questionId: string, type: string) => void;
  setRoomId: (id: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  isAgeVerified: false,
  currentCategory: null,
  chaosMode: false,
  timerMode: false,
  votes: {},
  reactions: {},
  roomId: null,
  setAgeVerified: (verified) => set({ isAgeVerified: verified }),
  setCategory: (category) => set({ currentCategory: category }),
  setChaosMode: (enabled) => set({ chaosMode: enabled }),
  setTimer: (enabled) => set({ timerMode: enabled }),
  addVote: (questionId, option) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [questionId]: {
          option1: (state.votes[questionId]?.option1 || 0) + (option === 1 ? 1 : 0),
          option2: (state.votes[questionId]?.option2 || 0) + (option === 2 ? 1 : 0),
        },
      },
    })),
  addReaction: (questionId, type) =>
    set((state) => ({
      reactions: {
        ...state.reactions,
        [questionId]: {
          ...state.reactions[questionId],
          [type]: (state.reactions[questionId]?.[type] || 0) + 1,
        },
      },
    })),
  setRoomId: (id) => set({ roomId: id }),
}));