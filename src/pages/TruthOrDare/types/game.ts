export type QuestionType = 'truth' | 'dare';
export type QuestionCategory = 'spicy' | 'funny' | 'deep' | 'social' | 'physical' | 'creative';

export interface Question {
  id: number;
  content: string;
  type: QuestionType;
  category: QuestionCategory;
  custom?: boolean;
  targetPlayer?: string;
  options: [string, string];  // Array of exactly two options
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
  usedQuestions: Set<number>;
}

export const categories: QuestionCategory[] = [
  'spicy',
  'funny',
  'deep',
  'social',
  'physical',
  'creative'
];