export enum GameMode {
  NONE = 'none',
  CLASSIC = 'classic',
  SPICY = 'spicy',
  FRIEND = 'friend',
  RANDOM = 'random',
  CHAOS = 'chaos'
}

export type FriendMode = 'online' | 'offline';

export type QuestionType = 'classic' | 'spicy' | 'extreme' | 'friend' | 'random' | 'chaos' | 'custom';

export type QuestionCategory = 'would-you-rather' | 'truth' | 'dare';

export interface Question {
  id: string | number;
  question?: string;
  optionA: string;
  optionB: string;
  mode?: GameMode;
  type?: QuestionType;
  category?: string;
  difficulty?: number;
}

export interface CustomQuestion {
  optionA: string;
  optionB: string;
  type: 'custom';
  createdBy?: string;
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

export type Vote = 'optionA' | 'optionB';

export interface VoteMap {
  [playerId: string]: Vote;
}

export interface ChaosEvent {
  type: 'timer' | 'swap' | 'reverse' | 'skip';
  duration?: number;
  description: string;
}

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
  customQuestions: CustomQuestion[];
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
  text?: string;
  selected?: boolean;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
  onDurationChange?: (newDuration: number) => void;
}
