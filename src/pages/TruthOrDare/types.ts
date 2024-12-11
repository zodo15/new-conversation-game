export type QuestionType = 'mild' | 'spicy' | 'extreme';
export type QuestionCategory = 'truth' | 'dare';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: QuestionCategory;
  custom?: boolean;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  truthCount: number;
  dareCount: number;
  skippedCount: number;
  completedCount: number;
  lastCategory?: QuestionCategory;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  selectedCategory: QuestionCategory | null;
  questionType: QuestionType;
  customQuestions: Question[];
  usedQuestionIds: Set<string>;
  gameStarted: boolean;
  roundCount: number;
  showAddQuestion: boolean;
  lastSkippedQuestion?: Question;
}

export interface GameActions {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentQuestion: (question: Question | null) => void;
  setSelectedCategory: (category: QuestionCategory | null) => void;
  setQuestionType: (type: QuestionType) => void;
  addCustomQuestion: (question: Question) => void;
  addUsedQuestionId: (id: string) => void;
  clearUsedQuestionIds: () => void;
  updateScore: (playerId: string, points: number) => void;
  incrementCategoryCount: (playerId: string, category: QuestionCategory, completed: boolean) => void;
  setCurrentPlayerIndex: (index: number) => void;
  startGame: () => void;
  resetGame: () => void;
  setShowAddQuestion: (show: boolean) => void;
  skipQuestion: (question: Question) => void;
  selectCategory: (category: QuestionCategory) => void;
  completeChallenge: () => void;
  skipChallenge: () => void;
  nextPlayer: () => void;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export interface AddQuestionProps {
  onClose: () => void;
  onAdd: (question: Question) => void;
}

export interface PlayerCardProps {
  player: Player;
  isCurrentPlayer: boolean;
  onRemove?: () => void;
}

export interface GameControlsProps {
  onCategorySelect: (category: QuestionCategory) => void;
  onQuestionTypeChange: (type: QuestionType) => void;
  onComplete: () => void;
  onSkip: () => void;
  selectedCategory: QuestionCategory | null;
  questionType: QuestionType;
  currentQuestion: Question | null;
  isCurrentPlayer: boolean;
}
