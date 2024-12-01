import { create } from 'zustand';
import { GameState, GameMode, Player, Vote, Question } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface GameStore extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentQuestion: (question: Question) => void;
  setMode: (mode: GameMode) => void;
  setCurrentPlayerIndex: (index: number) => void;
  addPlayerVote: (playerId: string, vote: 'A' | 'B') => void;
  updatePlayerScore: (playerId: string, points: number) => void;
  updatePlayerStreak: (playerId: string) => void;
  resetGame: () => void;
  startGame: () => void;
  toggleChaosMode: () => void;
  setTimer: (duration: number) => void;
}

const initialState: GameState = {
  players: [],
  currentQuestion: null,
  currentPlayerIndex: 0,
  votes: [],
  mode: '',
  gameStarted: false,
  chaosMode: false,
  timer: 30,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  addPlayer: (name: string) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          id: uuidv4(),
          name,
          score: 0,
          streak: 0,
        },
      ],
    })),

  removePlayer: (id: string) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    })),

  setCurrentQuestion: (question: Question) =>
    set(() => ({
      currentQuestion: question,
      votes: [],
    })),

  setMode: (mode: GameMode) =>
    set(() => ({
      mode,
    })),

  setCurrentPlayerIndex: (index: number) =>
    set(() => ({
      currentPlayerIndex: index,
    })),

  addPlayerVote: (playerId: string, vote: 'A' | 'B') =>
    set((state) => ({
      votes: [...state.votes, { playerId, vote, timestamp: Date.now() }],
    })),

  updatePlayerScore: (playerId: string, points: number) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score: p.score + points } : p
      ),
    })),

  updatePlayerStreak: (playerId: string) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, streak: p.streak + 1 } : { ...p, streak: 0 }
      ),
    })),

  resetGame: () =>
    set(() => ({
      ...initialState,
    })),

  startGame: () =>
    set(() => ({
      gameStarted: true,
    })),

  toggleChaosMode: () =>
    set((state) => ({
      chaosMode: !state.chaosMode,
    })),

  setTimer: (duration: number) =>
    set(() => ({
      timer: duration,
    })),
}));
