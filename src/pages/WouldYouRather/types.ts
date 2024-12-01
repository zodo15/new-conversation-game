export type GameMode = 'classic' | 'spicy' | 'friends' | 'chaos' | 'local' | 'online' | 'party' | '';

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  mode: GameMode;
  type: 'normal' | 'custom' | 'spicy';
  consequences?: {
    A?: string;
    B?: string;
  };
}

export interface Vote {
  playerId: string;
  vote: 'A' | 'B';
  timestamp: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  streak: number;
  avatar?: string;
}

export interface GameState {
  gameStarted: boolean;
  currentQuestion: Question | null;
  players: Player[];
  currentPlayerIndex: number;
  mode: GameMode;
  chaosMode: boolean;
  chaosMaster?: string;
  timer: number;
  votes: Vote[];
}

export interface ChoiceCardProps {
  choice: 'A' | 'B';
  text: string;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  consequences?: string;
  votes?: number;
  totalVotes?: number;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export interface ChaosMasterProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (event: string) => void;
}

export interface ShareButtonProps {
  text: string;
  url?: string;
}

export interface GameModeData {
  id: GameMode;
  name: string;
  description: string;
  icon: React.ComponentType;
  color: string;
}
