export enum GameMode {
  NONE = 'none',
  CLASSIC = 'classic',
  SPICY = 'spicy',
  FRIEND = 'friend',
  CHAOS = 'chaos'
}

export type FriendMode = 'online' | 'offline';

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  mode: GameMode;
  category?: string;
  consequences?: {
    A: string;
    B: string;
  };
}

export interface Choice {
  questionId: string;
  choice: 'A' | 'B';
}

export interface Player {
  id: string;
  name: string;
  score: number;
  streak: number;
  avatar: string;
  isChaosmaster?: boolean;
}

export interface Vote {
  playerId: string;
  choice: 'A' | 'B';
  timestamp: number;
}

export interface GameState {
  mode: GameMode;
  friendMode?: FriendMode;
  players: Player[];
  currentQuestion: Question | null;
  currentPlayerIndex: number;
  gameStarted: boolean;
  votes: Vote[];
  usedQuestionIds: Set<string>;
  customQuestions: Question[];
  chaosMaster: string | null;
  showChaosMasterWheel: boolean;
  chaosEnabled: boolean;
  showAddQuestion: boolean;
  timer: number;
  streak: number | null;
}

export interface ChaosEvent {
  type: 'swap' | 'skip' | 'reverse' | 'double' | 'timeout';
  description: string;
}

export interface ChaosMasterProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (event: ChaosEvent) => void;
}

export interface QuestionDisplayProps {
  question: Question;
  votes: Vote[];
  players: Player[];
  onVote: (choice: 'A' | 'B') => void;
  currentPlayerId?: string;
}

export interface ChoiceCardProps {
  choice: 'A' | 'B';
  text: string;
  consequence?: string;
  votes?: number;
  totalVotes?: number;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ShareButtonProps {
  text: string;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export interface AddQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: Omit<Question, 'id'>) => void;
}

export interface CategorySelectorProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export interface GameStore extends GameState {
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
  setCurrentPlayerIndex: (index: number) => void;
  getRandomQuestion: (mode: GameMode) => Question | null;
  setTimer: (duration: number) => void;
  triggerChaosEvent: (event: ChaosEvent) => void;
  setShowAddQuestion: (show: boolean) => void;
  addCustomQuestion: (question: Question) => void;
}
