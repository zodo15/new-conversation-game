import create from 'zustand';
import { GameState, GameMode, FriendMode, Question, Player, Vote, ChaosEvent } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { generateAvatar } from '../utils/avatarGenerator';

const initialState: GameState = {
  mode: GameMode.NONE,
  friendMode: undefined,
  gameStarted: false,
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  votes: [],
  showChaosMasterWheel: false,
  showAddQuestion: false,
  usedQuestionIds: new Set(),
  customQuestions: [],
  timer: 0,
  chaosMaster: null,
  chaosEnabled: false,
  streak: null,
};

interface GameStore extends GameState {
  setMode: (mode: GameMode) => void;
  setFriendMode: (mode: FriendMode) => void;
  startGame: () => void;
  resetGame: () => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentQuestion: (question: Question | null) => void;
  addVote: (playerId: string, choice: 'A' | 'B') => void;
  clearVotes: () => void;
  updateScore: (playerId: string, points: number) => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setChaosmaster: (playerId: string | null) => void;
  toggleChaosMode: () => void;
  setShowAddQuestion: (show: boolean) => void;
  addCustomQuestion: (question: Question) => void;
  setCurrentPlayerIndex: (index: number) => void;
  setTimer: (duration: number) => void;
  triggerChaosEvent: (event: ChaosEvent) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),

  setFriendMode: (mode) => set({ friendMode: mode }),

  startGame: () => set({ gameStarted: true }),

  resetGame: () => set(initialState),

  addPlayer: (name) => set((state) => ({
    players: [
      ...state.players,
      {
        id: uuidv4(),
        name,
        score: 0,
        streak: 0,
        avatar: generateAvatar(),
        isChaosmaster: false
      }
    ]
  })),

  removePlayer: (id) => set((state) => ({
    players: state.players.filter(player => player.id !== id)
  })),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  addVote: (playerId, choice) => set((state) => {
    const newVote: Vote = {
      playerId,
      choice,
      timestamp: Date.now()
    };

    // Check if all players have voted
    const newVotes = [...state.votes, newVote];
    if (newVotes.length === state.players.length) {
      // Calculate results and update scores
      const choiceA = newVotes.filter(v => v.choice === 'A').length;
      const choiceB = newVotes.filter(v => v.choice === 'B').length;
      const majority = choiceA > choiceB ? 'A' : 'B';

      // Update scores for players who voted with majority
      const updatedPlayers = state.players.map(player => {
        const playerVote = newVotes.find(v => v.playerId === player.id);
        if (playerVote && playerVote.choice === majority) {
          return {
            ...player,
            score: player.score + 1,
            streak: player.streak + 1
          };
        } else {
          return {
            ...player,
            streak: 0
          };
        }
      });

      return {
        votes: newVotes,
        players: updatedPlayers,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
      };
    }

    return { votes: newVotes };
  }),

  clearVotes: () => set({ votes: [] }),

  updateScore: (playerId, points) => set((state) => ({
    players: state.players.map(player =>
      player.id === playerId
        ? { ...player, score: player.score + points }
        : player
    )
  })),

  setShowChaosMasterWheel: (show) => set({ showChaosMasterWheel: show }),

  setChaosmaster: (playerId) => set((state) => ({
    chaosMaster: playerId,
    players: state.players.map(player => ({
      ...player,
      isChaosmaster: player.id === playerId
    }))
  })),

  toggleChaosMode: () => set((state) => ({ chaosEnabled: !state.chaosEnabled })),

  setShowAddQuestion: (show) => set({ showAddQuestion: show }),

  addCustomQuestion: (question) => set((state) => ({
    customQuestions: [...state.customQuestions, question]
  })),

  setCurrentPlayerIndex: (index) => set({ currentPlayerIndex: index }),

  setTimer: (duration) => set({ timer: duration }),

  triggerChaosEvent: (event) => {
    const state = get();
    switch (event.type) {
      case 'swap':
        // Swap player positions
        set((state) => {
          const players = [...state.players];
          const i = Math.floor(Math.random() * players.length);
          const j = Math.floor(Math.random() * players.length);
          [players[i], players[j]] = [players[j], players[i]];
          return { players };
        });
        break;
      case 'skip':
        // Skip to next player
        set((state) => ({
          currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
        }));
        break;
      case 'reverse':
        // Reverse player order
        set((state) => ({
          players: [...state.players].reverse()
        }));
        break;
      case 'double':
        // Double points for next round
        set((state) => ({
          players: state.players.map(player => ({
            ...player,
            score: player.score * 2
          }))
        }));
        break;
      case 'timeout':
        // Set a timer for the next round
        set({ timer: 30 });
        break;
    }
  }
}));
