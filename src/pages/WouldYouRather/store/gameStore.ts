import { create } from 'zustand';

type GameMode = 'menu' | 'offline' | 'online';

interface GameState {
  gameMode: GameMode;
  players: string[];
  currentPlayerIndex: number;
  setGameMode: (mode: GameMode) => void;
  addPlayer: (name: string) => void;
  removePlayer: (index: number) => void;
  nextPlayer: () => void;
  startGame: () => void;
  resetGame: () => void;
}

interface GameActions {
  setMode: (mode: GameMode) => void;
  setCurrentQuestion: (question: any) => void;
  setPlayers: (players: string[]) => void;
  setCurrentPlayerIndex: (index: number) => void;
  setChaosMaster: (player: string | undefined) => void;
  addCustomQuestion: (question: any) => void;
  addUsedQuestionId: (id: string) => void;
  clearUsedQuestionIds: () => void;
  addVote: (playerId: string, choice: 'option1' | 'option2') => void;
  clearVotes: () => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
}

const initialState: GameState & GameActions = {
  gameMode: 'menu',
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: undefined,
  chaosMaster: undefined,
  customQuestions: [],
  usedQuestionIds: [],
  votes: {},
  showChaosMasterWheel: false,
  showAddQuestion: false,

  setMode: (mode: GameMode) => set({ gameMode: mode }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setPlayers: (players: string[]) => set({ players }),
  setCurrentPlayerIndex: (index: number) => set({ currentPlayerIndex: index }),
  setChaosMaster: (player: string | undefined) => set({ chaosMaster: player }),

  addCustomQuestion: (question: any) => 
    set((state) => ({
      customQuestions: [...state.customQuestions, question]
    })),

  addUsedQuestionId: (id: string) => 
    set((state) => ({
      usedQuestionIds: [...state.usedQuestionIds, id]
    })),

  clearUsedQuestionIds: () => set({ usedQuestionIds: [] }),

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
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState
}));
