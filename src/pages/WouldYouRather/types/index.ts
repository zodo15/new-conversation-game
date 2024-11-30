export type QuestionType = 'classic' | 'spicy' | 'friend' | 'random' | 'custom';

export type QuestionCategory = 'fun' | 'deep' | 'spicy' | 'random';

export interface Question {
  id: string;
  optionA: string;
  optionB: string;
  type: QuestionType;
  category?: QuestionCategory;
}

export interface CustomQuestion extends Question {
  type: 'custom';
  createdBy?: string;
}

export interface Player {
  id: string;
  name: string;
  score?: number;
}

export interface ShareButtonProps {
  question: Question;
  playerChoice: 'optionA' | 'optionB';
}

export interface ChaosMasterProps {
  players: string[];
  onComplete: (selectedPlayer: string) => void;
  onClose: () => void;
  onBack: () => void;
}

export interface ChoiceCardProps {
  text: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  votes?: number;
  total?: number;
}

export interface TimerProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}
