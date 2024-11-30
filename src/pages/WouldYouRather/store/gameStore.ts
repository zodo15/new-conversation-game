import { create } from 'zustand';
import { Question, Player, GameMode } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface GameState {
  players: Player[];
  currentQuestion: Question | null;
  currentPlayerIndex: number;
  votes: Record<string, { playerId: string; choice: 'optionA' | 'optionB' }[]>;
  showResults: boolean;
  gameMode: GameMode;
  isGameStarted: boolean;
}

interface GameStore extends GameState {
  setGameMode: (mode: GameMode) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentQuestion: (question: Question) => void;
  submitVote: (playerId: string, choice: 'optionA' | 'optionB') => void;
  updatePlayerScore: (playerId: string, points: number) => void;
  setShowResults: (show: boolean) => void;
  setGameStarted: (show: boolean) => void;
  nextQuestion: (question: Question) => void;
  skipPlayer: (id: string) => void;
  setPlayerTurn: (index: number) => void;
  resetVotes: () => void;
}

const initialState: GameState = {
  players: [],
  currentQuestion: null,
  currentPlayerIndex: 0,
  votes: {},
  showResults: false,
  gameMode: 'classic',
  isGameStarted: false,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setGameMode: (mode: GameMode) => {
    set({ gameMode: mode });
  },

  addPlayer: (name: string) => {
    set((state: GameState) => ({
      players: [
        ...state.players,
        {
          id: uuidv4(),
          name,
          score: 0,
        },
      ],
    }));
  },

  removePlayer: (id: string) => {
    set((state: GameState) => ({
      players: state.players.filter((p) => p.id !== id),
    }));
  },

  setCurrentQuestion: (question: Question) => {
    set({ currentQuestion: question });
  },

  submitVote: (playerId: string, choice: 'optionA' | 'optionB') => {
    set((state: GameState) => {
      const currentQuestionId = state.currentQuestion?.id;
      if (!currentQuestionId) return state;

      const currentVotes = state.votes[currentQuestionId] || [];
      const hasVoted = currentVotes.some((p) => p.playerId === playerId);

      if (hasVoted) {
        return {
          votes: {
            ...state.votes,
            [currentQuestionId]: currentVotes.map((p) =>
              p.playerId === playerId ? { playerId, choice } : p
            ),
          },
        };
      }

      return {
        votes: {
          ...state.votes,
          [currentQuestionId]: [...currentVotes, { playerId, choice }],
        },
      };
    });
  },

  updatePlayerScore: (playerId: string, points: number) => {
    set((state: GameState) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score: (p.score || 0) + points } : p
      ),
    }));
  },

  setShowResults: (show: boolean) => {
    set({ showResults: show });
  },

  setGameStarted: (show: boolean) => {
    set({ isGameStarted: show });
  },

  nextQuestion: (question: Question) => {
    set((state: GameState) => ({
      currentQuestion: question,
      currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      showResults: false,
    }));
  },

  skipPlayer: (id: string) => {
    set((state: GameState) => {
      const playerIndex = state.players.findIndex((p) => p.id === id);
      if (playerIndex === -1) return state;
      return {
        currentPlayerIndex: (playerIndex + 1) % state.players.length,
      };
    });
  },

  setPlayerTurn: (index: number) => {
    set({ currentPlayerIndex: index });
  },

  resetVotes: () => {
    set((state: GameState) => {
      if (!state.currentQuestion) return state;
      return {
        votes: {
          ...state.votes,
          [state.currentQuestion.id]: [],
        },
      };
    });
  },
}));
