export type GameMode = 'classic' | 'spicy' | 'friend' | 'random' | 'chaos';

export type FriendMode = 'online' | 'offline';

export interface Question {
  id: string | number;
  question: string;
  optionA: string;
  optionB: string;
  mode: GameMode;
  category?: string;
  difficulty?: number;
}

export interface Player {
  id: string;
  name: string;
  avatar?: string;
  streak?: number;
  score: number;
  truthCount: number;
  dareCount: number;
  wouldYouRatherCount: number;
}

export type Vote = 'A' | 'B';

export type VoteMap = {
  [playerId: string]: Vote;
};

export type ChaosEvent = {
  type: 'timer' | 'swap' | 'reverse' | 'skip';
  duration?: number;
  description: string;
};

export interface GameState {
  mode: GameMode;
  friendMode?: FriendMode;
  players: Player[];
  currentQuestion: Question | null;
  currentPlayerIndex: number;
  gameStarted: boolean;
  showChaosMasterWheel: boolean;
  showAddQuestion: boolean;
  usedQuestionIds: Set<string>;
  customQuestions: Question[];
  votes: VoteMap;
  chaosEnabled: boolean;
  chaosMaster?: string;
  timer: number;
}

export interface QuestionDisplayProps {
  question: Question;
  currentPlayer: Player;
  onChoice: (choice: 'optionA' | 'optionB') => void;
}

export interface ChoiceCardProps {
  option: string;
  consequence?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}
