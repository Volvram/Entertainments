import { playingCardScores } from '@/pages/BlackJack/config/playingCardScores.ts';

export const isPlayingCardScoresKeyType = (value: any): value is keyof typeof playingCardScores => {
  return value in playingCardScores;
};
