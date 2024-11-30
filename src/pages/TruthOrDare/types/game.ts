export type QuestionType = 'truth' | 'dare';
export type QuestionCategory = 'spicy' | 'funny' | 'deep' | 'social' | 'physical' | 'creative';

export interface Question {
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

export const categories: QuestionCategory[] = [
  'spicy',
  'funny',
  'deep',
  'social',
  'physical',
  'creative'
];