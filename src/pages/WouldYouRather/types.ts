export type GameMode = 'classic' | 'spicy' | 'friends' | undefined;
export type QuestionType = 'classic' | 'spicy' | 'custom';

export interface Question {
  id: string;
  option1: string;
  option2: string;
  type: QuestionType;
  custom?: boolean;
}

export interface CustomQuestion extends Question {
  custom: true;
}

export interface GameState {
  mode: GameMode;
  players: string[];
  currentPlayerIndex: number;
  currentQuestion: Question | undefined;
  chaosMaster: string | undefined;
  votes: Record<string, 'option1' | 'option2'>;
  usedQuestionIds: string[];
  showChaosMasterWheel: boolean;
  showAddQuestion: boolean;
  customQuestions: CustomQuestion[];
  isTimerRunning: boolean;
}

export interface GameActions {
  setMode: (mode: GameMode) => void;
  setCurrentQuestion: (question: Question | undefined) => void;
  setPlayers: (players: string[]) => void;
  setCurrentPlayerIndex: (index: number) => void;
  setChaosMaster: (player: string | undefined) => void;
  addCustomQuestion: (question: CustomQuestion) => void;
  addUsedQuestionId: (id: string) => void;
  clearUsedQuestionIds: () => void;
  addVote: (playerId: string, choice: 'option1' | 'option2') => void;
  clearVotes: () => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  resetGame: () => void;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export interface AddQuestionProps {
  onClose: () => void;
  onAdd: (question: CustomQuestion) => void;
}

export interface ChaosMasterWheelProps {
  onClose: () => void;
  onSpin: (action: string) => void;
}

export interface FriendGameModesProps {
  onBack: () => void;
  onStartOfflineGame: (players: string[]) => void;
}

export interface ChoiceCardProps {
  choice: string;
  isSelected?: boolean;
  onClick?: () => void;
  isAnswer?: boolean;
  votes?: number;
  totalVotes?: number;
}
