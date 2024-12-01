export type GameMode = 'classic' | 'spicy' | 'friends' | 'chaos';
export type QuestionType = 'normal' | 'custom' | 'spicy' | 'friends' | 'chaos';
export type QuestionCategory = 'classic' | 'spicy' | 'friends' | 'chaos';

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  type: QuestionType;
  mode: GameMode;
  consequences?: {
    A: string;
    B: string;
  };
}

export interface Vote {
  playerId: string;
  choice: 'A' | 'B';
  timestamp: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  streak: number;
  avatar?: string;
}

export interface GameState {
  mode: GameMode;
  players: Player[];
  currentQuestion?: Question;
  votes: Vote[];
  usedQuestionIds: string[];
  currentPlayerIndex: number;
  isGameStarted: boolean;
  timer: number;
}

export interface QuestionDisplayProps {
  question: Question;
  votes: Vote[];
  players: Player[];
  onVote: (choice: 'A' | 'B') => void;
  currentPlayerId?: string;
}

export interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
  currentPlayerCount: number;
}

export interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (id: string) => void;
  currentPlayerIndex: number;
}

export interface GameModesProps {
  onSelectMode: (mode: GameMode) => void;
}

export interface TimerProps {
  duration: number;
  onComplete?: () => void;
}

export interface GameProps {
  onBack: () => void;
}

export interface GameStore extends GameState {
  questions: Question[];
  chaosMode: boolean;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setMode: (mode: GameMode) => void;
  setQuestion: (question: Question) => void;
  addVote: (playerId: string, choice: 'A' | 'B') => void;
  nextQuestion: () => void;
  startGame: () => void;
  resetGame: () => void;
  setTimer: (duration: number) => void;
  setCurrentPlayerIndex: (index: number) => void;
}

export type ChaosEvent = {
  type: 'swap' | 'skip' | 'reverse' | 'double' | 'timeout';
  description: string;
};

export interface ChaosMasterProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (event: ChaosEvent) => void;
}
