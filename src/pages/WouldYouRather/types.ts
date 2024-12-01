export type GameMode = 'classic' | 'spicy' | 'friends' | 'chaos' | '';

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  mode: GameMode;
  consequences?: {
    optionA: string;
    optionB: string;
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
}

export interface GameState {
  players: Player[];
  currentQuestion: Question | null;
  currentPlayerIndex: number;
  votes: Vote[];
  mode: GameMode;
  gameStarted: boolean;
  chaosMode: boolean;
  timer: number;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
  isPaused?: boolean;
}

export interface ShareButtonProps {
  question: Question;
  votes: Vote[];
  players: Player[];
}

export interface ChoiceCardProps {
  choice: 'A' | 'B';
  text: string;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  consequences?: string;
}

export interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
  maxPlayers?: number;
}

export interface PlayerListProps {
  players: Player[];
  currentPlayerIndex: number;
  onRemovePlayer?: (id: string) => void;
}

export interface GameModeProps {
  onSelectMode: (mode: GameMode) => void;
  selectedMode: GameMode;
}

export interface ChaosMasterProps {
  isActive: boolean;
  onEvent: (event: string) => void;
}
