export type GameMode = 'classic' | 'spicy' | 'friends';

export interface Question {
  id: number;
  option1: string;
  option2: string;
  category?: string;
  plotTwist?: string;
  votesA?: number;
  votesB?: number;
  type?: 'custom' | 'classic' | 'spicy' | 'friends';
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

export interface GameActions {
  setCurrentQuestion: (question: Question | null) => void;
  addUsedQuestionId: (id: number) => void;
  setVotes: (votes: Record<number, { option1: number; option2: number }>) => void;
  setChaosMaster: (player: string | null) => void;
  setPlayers: (players: string[]) => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  resetGame: () => void;
}
