export type GameType = 'truth-or-dare' | 'would-you-rather' | null;

export type QuestionType = 'truth' | 'dare';

export type Category = 'deep' | 'funny' | 'spicy' | 'social' | 'physical' | 'creative';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  isChaosmaster?: boolean;
}

export interface Vote {
  playerId: string;
  choice: 'option1' | 'option2';
}

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  mode: 'classic' | 'spicy' | 'extreme';
  consequences?: {
    option1?: string;
    option2?: string;
  };
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  votes: Vote[];
  mode: 'classic' | 'spicy' | 'extreme';
  friendMode?: 'online' | 'offline';
  chaosMaster?: string;
  showChaosMasterWheel: boolean;
  chaosEnabled: boolean;
  timer: number;
}

export interface CategorySelectorProps {
  selectedCategory: 'would-you-rather' | 'truth' | 'dare' | null;
  onSelect: (category: 'would-you-rather' | 'truth' | 'dare') => void;
  questionType: 'classic' | 'spicy' | 'extreme';
  onTypeChange: (type: 'classic' | 'spicy' | 'extreme') => void;
}

export interface ChoiceCardProps {
  option: string;
  consequence?: string;
  votes: number;
  totalVotes: number;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export interface AddQuestionModalProps {
  onClose: () => void;
  onAdd: (question: Omit<Question, 'id'>) => void;
}

export interface OfflineGameSetupProps {
  onStart: (players: string[]) => void;
  onBack: () => void;
}
