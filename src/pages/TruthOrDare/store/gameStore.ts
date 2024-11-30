import { create } from 'zustand';
import { Question, QuestionCategory, QuestionType } from '../types/game';
import { allQuestions } from '../data/questions';

interface GameState {
  players: string[];
  currentPlayer: string | null;
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  selectedType: QuestionType | null;
  selectedCategory: QuestionCategory | null;
  usedQuestionIds: string[];
}

interface GameStore extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  nextPlayer: () => void;
  setCurrentQuestion: (question: Question | null) => void;
  setSelectedType: (type: QuestionType | null) => void;
  setSelectedCategory: (category: QuestionCategory | null) => void;
  addUsedQuestionId: (id: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  players: [],
  currentPlayer: null,
  currentPlayerIndex: 0,
  currentQuestion: null,
  selectedType: null,
  selectedCategory: null,
  usedQuestionIds: [],

  addPlayer: (name) =>
    set((state) => ({
      players: [...state.players, name],
      currentPlayer: state.currentPlayer || name,
    })),

  removePlayer: (name) =>
    set((state) => ({
      players: state.players.filter((player) => player !== name),
      currentPlayer:
        state.currentPlayer === name
          ? state.players[0] || null
          : state.currentPlayer,
    })),

  nextPlayer: () =>
    set((state) => {
      const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
      return {
        currentPlayerIndex: nextIndex,
        currentPlayer: state.players[nextIndex] || null,
      };
    }),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addUsedQuestionId: (id) =>
    set((state) => ({ usedQuestionIds: [...state.usedQuestionIds, id] })),
}));