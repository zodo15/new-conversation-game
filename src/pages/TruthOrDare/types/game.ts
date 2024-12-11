export type QuestionType = 'truth' | 'dare';
export type QuestionCategory = 'spicy' | 'funny' | 'deep' | 'social' | 'physical' | 'creative';

export interface Question {
  option1: any;
  option2: any;
  id: number;
  content: string;
  type: QuestionType;
  category: QuestionCategory;
  custom?: boolean;
  targetPlayer?: string;
  plotTwist?: string;
}

export interface PlayerProfile {
  name: string;
  interests: string[];
  hobbies: string[];
  favorites: string[];
  secrets: string[];
  dares: string[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
  truthCount: number;
  dareCount: number;
  skippedCount: number;
  completedCount: number;
  lastCategory?: QuestionCategory;
}

export interface GameState {
  isAgeVerified: boolean;
  currentCategory: QuestionCategory | null;
  chaosMode: boolean;
  timerMode: boolean;
  currentPlayer: string | null;
  players: PlayerProfile[];
  votes: Record<string, { option1: number; option2: number }>;
  reactions: Record<string, Record<string, number>>;
  roomId: string | null;
  customQuestions: Question[];
  usedQuestions: Set<number>;
}

export interface GameActions {
  setQuestionType: (type: QuestionType) => void;
  setSelectedCategory: (category: QuestionCategory | null) => void;
  selectCategory: (category: QuestionType) => void;
  completeChallenge: () => void;
  skipChallenge: () => void;
  nextPlayer: () => void;
  addCustomQuestion: (question: Question) => void;
  incrementCategoryCount: (playerId: string, category: QuestionType | undefined, completed: boolean) => void;
  setCurrentPlayerIndex: (index: number) => void;
  startGame: () => void;
  resetGame: () => void;
  setShowAddQuestion: (show: boolean) => void;
}

export const categories: QuestionCategory[] = [
  'spicy',
  'funny',
  'deep',
  'social',
  'physical',
  'creative'
];