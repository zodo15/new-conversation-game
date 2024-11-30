export interface Question {
  id: number;
  optionA: string;
  optionB: string;
  votesA?: number;
  votesB?: number;
}

export interface GameState {
  currentQuestion: number;
  gameMode: 'classic' | 'custom';
  answers: Record<number, 'A' | 'B'>;
}