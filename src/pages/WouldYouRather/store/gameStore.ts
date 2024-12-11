import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'; // Import toast from react-hot-toast

export enum GameMode {
  NONE = 'none',
  CLASSIC = 'classic',
  SPICY = 'spicy',
  FRIEND = 'friend',
  CHAOS = 'chaos',
  RANDOM = 'random'
}

export interface Question {
  id: string | number;
  optionA: string;
  optionB: string;
  type?: 'classic' | 'spicy' | 'friend' | 'chaos' | 'custom';
}

interface Player {
  id: string;
  name: string;
  score: number;
  streakCount: number;
  lastChoice: 'option1' | 'option2' | null;
  choices: Array<{
    questionId: string;
    choice: 'option1' | 'option2';
  }>;
}

interface GameState {
  mode: GameMode;
  gameStarted: boolean;
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  votes: Array<{ playerId: string; choice: 'option1' | 'option2' }>;
  showChaosMasterWheel: boolean;
  showAddQuestion: boolean;
  usedQuestionIds: Set<string>;
  customQuestions: Question[];
  streak: { playerId: string; count: number } | null;
  chaosMaster: string | null; // Add chaosMaster property to GameState
}

const initialState: GameState = {
  mode: GameMode.NONE,
  gameStarted: false,
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  votes: [],
  showChaosMasterWheel: false,
  showAddQuestion: false,
  usedQuestionIds: new Set(),
  customQuestions: [],
  streak: null,
  chaosMaster: null, // Initialize chaosMaster to null
};

export const useGameStore = create<GameState & {
  setMode: (mode: GameMode) => void;
  startGame: () => void;
  resetGame: () => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentQuestion: (question: Question | null) => void;
  addVote: (playerId: string, choice: 'option1' | 'option2') => void;
  clearVotes: () => void;
  updateScore: (playerId: string, points: number) => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  addCustomQuestion: (question: Question) => void;
  addUsedQuestionId: (id: string) => void;
  setCurrentPlayerIndex: (index: number) => void;
  updateStreak: (playerId: string, choice: 'option1' | 'option2') => void;
  getRandomQuestion: (mode: GameMode) => Question | null;
  triggerChaosEvent: (selectedPlayer: string) => void; // Add triggerChaosEvent to the store
}>((set, get) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),

  startGame: () => set({ gameStarted: true }),

  resetGame: () => set(initialState),

  addPlayer: (name) => set((state) => {
    const newPlayer: Player = {
      id: uuidv4(),
      name,
      score: 0,
      choices: [],
      streakCount: 0,
      lastChoice: null,
    };

    return {
      ...state,
      players: [...state.players, newPlayer],
    };
  }),

  removePlayer: (id) => set((state) => ({
    ...state,
    players: state.players.filter((p) => p.id !== id),
  })),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  addVote: (playerId: string, choice: 'option1' | 'option2') => 
    set((state: GameState): GameState => {
      const newVotes = [...state.votes, { playerId, choice }];
      const player = state.players.find(p => p.id === playerId);
      const currentQuestion = state.currentQuestion;
      
      if (!player || !currentQuestion) {
        return {
          ...state,
          votes: newVotes
        };
      }

      const updatedPlayers = state.players.map(p => {
        if (p.id === playerId) {
          const newStreakCount = p.lastChoice === choice ? p.streakCount + 1 : 1;
          const newChoice: Player['choices'][0] = {
            questionId: currentQuestion.id,
            choice,
          };
          return {
            ...p,
            choices: [...p.choices, newChoice],
            streakCount: newStreakCount,
            lastChoice: choice,
          } as Player;
        }
        return p;
      });

      const updatedPlayer = updatedPlayers.find(p => p.id === playerId)!;
      const newStreak = !state.streak || updatedPlayer.streakCount > state.streak.count
        ? { playerId, count: updatedPlayer.streakCount }
        : state.streak;

      return {
        ...state,
        votes: newVotes,
        players: updatedPlayers,
        streak: newStreak,
      };
    }),

  clearVotes: () => set((state) => ({ ...state, votes: [] })),

  updateScore: (playerId, points) => set((state) => ({
    ...state,
    players: state.players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + points } : p
    ),
  })),

  setShowChaosMasterWheel: (show) => set((state) => ({ 
    ...state, 
    showChaosMasterWheel: show 
  })),

  setShowAddQuestion: (show) => set((state) => ({ 
    ...state, 
    showAddQuestion: show 
  })),

  addCustomQuestion: (question) => set((state) => ({
    ...state,
    customQuestions: [...state.customQuestions, { ...question, id: uuidv4(), type: 'custom' as const }],
  })),

  addUsedQuestionId: (id) => set((state) => ({
    ...state,
    usedQuestionIds: new Set([...state.usedQuestionIds, id]),
  })),

  setCurrentPlayerIndex: (index) => set((state) => ({ 
    ...state, 
    currentPlayerIndex: index 
  })),

  updateStreak: (playerId, choice) => set((state) => {
    const updatedPlayers = state.players.map(p => {
      if (p.id === playerId) {
        const newStreakCount = p.lastChoice === choice ? p.streakCount + 1 : 1;
        return {
          ...p,
          streakCount: newStreakCount,
          lastChoice: choice,
        };
      }
      return p;
    });

    const updatedPlayer = updatedPlayers.find(p => p.id === playerId)!;
    const newStreak = !state.streak || updatedPlayer.streakCount > state.streak.count
      ? { playerId, count: updatedPlayer.streakCount }
      : state.streak;

    return {
      ...state,
      players: updatedPlayers,
      streak: newStreak,
    };
  }),

  getRandomQuestion: (mode: GameMode) => {
    const state = get();
    let questions = [...state.customQuestions];
    
    // Filter questions based on mode
    switch (mode) {
      case GameMode.CLASSIC:
        questions = questions.filter(q => !q.type || q.type === 'classic');
        break;
      case GameMode.SPICY:
        questions = questions.filter(q => q.type === 'spicy');
        break;
      case GameMode.FRIEND:
        // In friend mode, include both custom and classic questions
        questions = questions.filter(q => q.type === 'custom' || q.type === 'classic');
        break;
      case GameMode.RANDOM:
        // Random mode includes all questions
        break;
      default:
        return null;
    }

    // Filter out used questions
    const unusedQuestions = questions.filter(q => !state.usedQuestionIds.has(q.id));
    if (unusedQuestions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    return unusedQuestions[randomIndex];
  },

  triggerChaosEvent: (selectedPlayer: string) => {
    set((state) => ({
      ...state,
      chaosMaster: selectedPlayer,
      showChaosMasterWheel: false
    }));

    toast.success(`${selectedPlayer} is now the Chaos Master!`, {
      icon: '👑',
      duration: 4000
    });
  },
}));
