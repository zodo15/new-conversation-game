import { create } from 'zustand';
import { GameState, GameMode, Question, Player, Choice, Vote, Streak } from '../types';

const initialState: GameState = {
  mode: '',
  players: [],
  currentQuestion: null,
  currentPlayerIndex: 0,
  gameStarted: false,
  chaosMode: false,
  timer: 30,
  votes: [],
  showChaosMasterWheel: false,
  showAddQuestion: false,
  usedQuestionIds: new Set<string>(),
  customQuestions: [],
  streak: null,
  chaosMaster: ''
};

interface GameStore extends GameState {
  setMode: (mode: GameMode) => void;
  addPlayer: (name: string, state?: Partial<GameState>) => void;
  removePlayer: (id: string, state?: Partial<GameState>) => void;
  setCurrentQuestion: (question: Question) => void;
  addPlayerChoice: (playerId: string, choice: Choice, state?: Partial<GameState>) => void;
  addPlayerPoints: (playerId: string, points: number, state?: Partial<GameState>) => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  addCustomQuestion: (question: Question, state?: Partial<GameState>) => void;
  removeCustomQuestion: (id: string, state?: Partial<GameState>) => void;
  setCurrentPlayerIndex: (index: number) => void;
  addPlayerVote: (playerId: string, choice: string, state?: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  
  setMode: (mode: GameMode) => {
    set({ mode });
  },

  addPlayer: (name: string, state = {}) => {
    set((currentState) => ({
      ...currentState,
      ...state,
      players: [...currentState.players, { id: '', name, score: 0, choices: [], streakCount: 0, lastChoice: null }]
    }));
  },

  removePlayer: (id: string, state = {}) => {
    set((currentState) => ({
      ...currentState,
      ...state,
      players: currentState.players.filter((p) => p.id !== id)
    }));
  },

  setCurrentQuestion: (question: Question) => {
    set({ currentQuestion: question });
  },

  addPlayerChoice: (playerId: string, choice: Choice, state = {}) => {
    set((currentState) => {
      const updatedPlayers = currentState.players.map((p) => {
        if (p.id === playerId) {
          return {
            ...p,
            choices: [...(p.choices || []), { questionId: currentState.currentQuestion!.id, choice }]
          };
        }
        return p;
      });

      return {
        ...currentState,
        ...state,
        players: updatedPlayers
      };
    });
  },

  addPlayerPoints: (playerId: string, points: number, state = {}) => {
    set((currentState) => ({
      ...currentState,
      ...state,
      players: currentState.players.map((p) => 
        p.id === playerId ? { ...p, score: (p.score || 0) + points } : p
      )
    }));
  },

  setShowChaosMasterWheel: (show: boolean) => {
    set({ showChaosMasterWheel: show });
  },

  setShowAddQuestion: (show: boolean) => {
    set({ showAddQuestion: show });
  },

  addCustomQuestion: (question: Question, state = {}) => {
    set((currentState) => ({
      ...currentState,
      ...state,
      customQuestions: [...(currentState.customQuestions || []), { ...question, id: '' }]
    }));
  },

  removeCustomQuestion: (id: string, state = {}) => {
    set((currentState) => ({
      ...currentState,
      ...state,
      customQuestions: (currentState.customQuestions || []).filter(q => q.id !== id)
    }));
  },

  setCurrentPlayerIndex: (index: number) => {
    set({ currentPlayerIndex: index });
  },

  addPlayerVote: (playerId: string, choice: string, state = {}) => {
    set((currentState) => ({
      ...currentState,
      ...state,
      votes: [...(currentState.votes || []), { playerId, choice }]
    }));
  }
}));
