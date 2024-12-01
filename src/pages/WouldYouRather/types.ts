export enum GameMode {
  CLASSIC = 'classic',
  SPICY = 'spicy',
  CHAOS = 'chaos',
  FRIENDS = 'friends',
  NONE = 'none'
}

export enum FriendMode {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
}

export interface Vote {
  playerId: string;
  choice: 'A' | 'B';
}

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  mode: GameMode;
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
  streak: number;
  chaosEnabled: boolean;
}

export interface ChaosEvent {
  type: string;
  description: string;
  duration?: number;
}

export interface TimerProps {
  duration: number;
  onComplete?: () => void;
}

export interface ShareButtonProps {
  playerChoice?: 'A' | 'B';
}

export interface AddQuestionModalProps {
  onClose: () => void;
  onAdd?: (question: Question) => void;
}
