export type GameMode = 'classic' | 'spicy' | 'friend' | 'random';

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  mode?: GameMode;
  type?: string;
  question?: string;
  consequences?: {
    option1?: string;
    option2?: string;
  };
  votesA?: number;
  votesB?: number;
}

export interface Choice {
  playerId: string;
  choice: 'A' | 'B';
}

export interface Vote {
  playerId: string;
  vote: string;
}

export interface Streak {
  playerId: string;
  count: number;
}

export interface Player {
  id: string;
  name: string;
  points: number;
  truthCount?: number;
  dareCount?: number;
  wouldYouRatherCount?: number;
  choices?: Choice[];
}

export interface GameState {
  mode: GameMode | '';
  players: string[];
  currentQuestion: Question | null;
  currentPlayerIndex: number;
  gameStarted: boolean;
  chaosMode?: boolean;
  timer?: number;
  votes?: Vote[];
  showChaosMasterWheel?: boolean;
  showAddQuestion?: boolean;
  usedQuestionIds?: Set<string>;
  customQuestions?: Question[];
  streak?: Streak | null;
  chaosMaster?: string;
}

export interface ShareButtonProps {
  onShare: () => void;
}

export interface TimerProps {
  duration: number;
  onComplete?: () => void;
}

export interface ChaosMasterProps {
  onClose: () => void;
  onComplete?: (action: string) => void;
}

export interface ChoiceCardProps {
  choice: string;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
}
