export const GameModes = ['classic', 'spicy', 'friend', 'random'] as const;
export type GameMode = typeof GameModes[number];
