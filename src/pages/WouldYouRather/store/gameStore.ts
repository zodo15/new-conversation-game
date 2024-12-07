import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { GameMode, Question, GameState } from '../types';

const initialState: GameState = {
  mode: 'classic',
  players: [],
  currentQuestion: null,
  currentPlayerIndex: 0,
  gameStarted: false,
  showChaosMasterWheel: false,
  showAddQuestion: false,
  usedQuestionIds: new Set(),
  customQuestions: [],
};

export const useGameStore = create<GameState & {
  setMode: (mode: GameMode) => void;
  startGame: () => void;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  setCurrentQuestion: (question: Question | null) => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  addCustomQuestion: (question: Omit<Question, 'id'>) => void;
  addUsedQuestionId: (id: string | number) => void;
  setCurrentPlayerIndex: (index: number) => void;
  getRandomQuestion: (mode: GameMode) => Question | null;
}>((set, get) => ({
  ...initialState,

  setMode: (mode: GameMode) => set({ mode }),

  startGame: () => set({ gameStarted: true }),

  addPlayer: (name: string) => set((state) => ({
    players: [...state.players, name]
  })),

  removePlayer: (name: string) => set((state) => ({
    players: state.players.filter(player => player !== name)
  })),

  setCurrentQuestion: (question: Question | null) => set({ currentQuestion: question }),

  setShowChaosMasterWheel: (show: boolean) => set({ showChaosMasterWheel: show }),

  setShowAddQuestion: (show: boolean) => set({ showAddQuestion: show }),

  addCustomQuestion: (question: Omit<Question, 'id'>) => set((state) => ({
    customQuestions: [...state.customQuestions, { ...question, id: uuidv4() }]
  })),

  addUsedQuestionId: (id: string | number) => set((state) => {
    const newSet = new Set(state.usedQuestionIds);
    newSet.add(String(id));  
    return { usedQuestionIds: newSet };
  }),

  setCurrentPlayerIndex: (index: number) => set({ currentPlayerIndex: index }),

  getRandomQuestion: (mode: GameMode) => {
    const state = get();
    const questions = [...state.customQuestions].filter(q => q.mode === mode);
    const unusedQuestions = questions.filter(q => !state.usedQuestionIds.has(String(q.id)));
    
    if (unusedQuestions.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    return unusedQuestions[randomIndex];
  }
}));
