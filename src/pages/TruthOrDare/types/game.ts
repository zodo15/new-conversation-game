export type QuestionType = 'truth' | 'dare';

export type QuestionCategory =
  | 'spicy'
  | 'deep'
  | 'social'
  | 'physical'
  | 'creative'
  | 'funny';

export interface Question {
  id: string;
  content: string;
  type: QuestionType;
  category: QuestionCategory;
  options?: string[];
}

export interface Player {
  name: string;
  score: number;
}

export interface GameState {
  isAgeVerified: boolean;
  currentCategory: QuestionCategory | null;
  chaosMode: boolean;
  timerMode: boolean;
  currentPlayer: string | null;
  players: string[];
  votes: Record<string, { option1: number; option2: number }>;
  reactions: Record<string, Record<string, number>>;
  currentPlayerIndex: number;
  selectedType: QuestionType | null;
  roomId: string | null;
  customQuestions: Question[];
  usedQuestions: Set<string>;
}

export const categories: QuestionCategory[] = [
  'spicy',
  'deep',
  'social',
  'physical',
  'creative',
  'funny'
];