export type QuestionType = 'classic' | 'spicy' | 'friend' | 'random' | 'custom';

export interface Question {
  id: string | number;
  optionA: string;
  optionB: string;
  type: QuestionType;
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

export interface ChoiceCardProps {
  text: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface TimerProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}
