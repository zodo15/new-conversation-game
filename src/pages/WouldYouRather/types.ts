export type GameMode = 'classic' | 'spicy' | 'friends';

export interface Question {
  id: number;
  option1: string;
  option2: string;
  category?: string;
  plotTwist?: string;
}

export interface GameState {
  currentQuestion: Question | null;
  usedQuestionIds: Set<number>;
  votes: Record<number, { option1: number; option2: number }>;
  chaosMaster: string | null;
  players: string[];
  showChaosMasterWheel: boolean;
}

export interface PlayerState {
  name: string;
  score: number;
  avatar?: string;
}
