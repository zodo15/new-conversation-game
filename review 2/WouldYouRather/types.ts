export type GameMode = 'classic' | 'spicy' | 'friend' | 'random';

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  mode: GameMode;
}

export interface Choice {
  questionId: string;
  choice: 'optionA' | 'optionB';
}

export interface Player {
  id: string;
  name: string;
  score: number;
  choices: Choice[];
}

export interface GameState {
  mode: GameMode;
  players: string[];
  currentQuestion: Question | null;
  currentPlayerIndex: number;
  gameStarted: boolean;
}

export interface Vote {
  playerId: string;
  choice: 'optionA' | 'optionB';
}

export interface Streak {
  playerId: string;
  count: number;
}

export interface ChaosMasterProps {
  onSpin: (action: string) => void;
  onClose: () => void;
}

export interface QuestionDisplayProps {
  question: Question;
  currentPlayer: Player;
  onChoice: (choice: 'optionA' | 'optionB') => void;
  votes: Vote[];
}

export interface ChoiceCardProps {
  option: string;
  consequence?: string;
  votes?: number;
  totalVotes?: number;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ShareButtonProps {
  votes: Vote[];
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}
