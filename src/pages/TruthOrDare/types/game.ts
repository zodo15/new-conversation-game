export type QuestionCategory = 'spicy' | 'funny' | 'deep' | 'physical' | 'social' | 'creative' | 'custom';
export type QuestionType = 'truth' | 'dare' | 'would-you-rather';
export type GameMode = 'classic' | 'chaos' | 'challenge' | 'custom';

export interface Question {
  id: string;
  text?: string;
  type: QuestionType;
  mode?: GameMode;
  category: QuestionCategory;
  optionA?: string;
  optionB?: string;
  consequences?: {
    optionA?: string;
    optionB?: string;
  };
  custom?: boolean;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  streak: number;
  truthCount: number;
  dareCount: number;
  wouldYouRatherCount: number;
  reactions: {
    given: Record<string, string[]>;
    received: Record<string, string[]>;
  };
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  gameStarted: boolean;
  mode: GameMode;
  chaosMode: boolean;
  timer: number;
  votes: Record<string, Array<{ playerId: string; choice: 'optionA' | 'optionB' }>>;
  showChaosMasterWheel: boolean;
  showAddQuestion: boolean;
  showSettings: boolean;
  customQuestions: Question[];
  usedQuestionIds: string[];
}

export interface GameStore extends GameState {
  // Player Management
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentPlayerIndex: (index: number) => void;
  updateScore: (playerId: string, points: number) => void;
  updateStreak: (playerId: string) => void;

  // Question Management
  setCurrentQuestion: (question: Question | null) => void;
  getRandomQuestion: () => Question | null;
  addCustomQuestion: (question: Question) => void;
  addUsedQuestionId: (id: string) => void;

  // Game State Management
  startGame: () => void;
  resetGame: () => void;
  setMode: (mode: GameMode) => void;
  nextPlayer: () => void;

  // Voting System
  addVote: (playerId: string, choice: 'optionA' | 'optionB') => void;
  clearVotes: () => void;

  // UI State Management
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;

  // Reactions System
  addReaction: (fromPlayerId: string, toPlayerId: string, reaction: string) => void;
  getReactions: (playerId: string) => { given: string[]; received: string[] };
}

export interface TimerProps {
  duration: number;
  onComplete?: () => void;
  onDurationChange?: (duration: number) => void;
}

export interface FeedbackButtonProps {
  onClick: () => void;
  className?: string;
}

export interface ChaosMasterProps {
  onClose: () => void;
  onSpin: (action: string) => void;
  players: string[];
  onComplete: (selectedPlayer: string) => void;
  onBack: () => void;
}

export interface ChoiceCardProps {
  text: string;
  onClick: () => void;
  isOptionA: boolean;
  disabled?: boolean;
  selected?: boolean;
  votes?: number;
  totalVotes?: number;
}