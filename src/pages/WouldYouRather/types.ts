export type GameMode = 'classic' | 'spicy' | 'friend' | 'random';

export interface Question {
  id: string | number;
  question: string;
  optionA: string;
  optionB: string;
  mode: GameMode;
}

export interface Player {
  score: number;
  truthCount: number;
  dareCount: number;
  wouldYouRatherCount: number;
  id: string;
  name: string;
}

export interface GameState {
  mode: GameMode;
  players: string[];
  currentQuestion: Question | null;
  currentPlayerIndex: number;
  gameStarted: boolean;
  showChaosMasterWheel: boolean;
  showAddQuestion: boolean;
  usedQuestionIds: Set<string>;
  customQuestions: Question[];
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
