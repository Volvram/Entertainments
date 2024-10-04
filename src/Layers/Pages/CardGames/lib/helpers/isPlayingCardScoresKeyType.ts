import { PLAYING_CARD_SCORES } from '../consts/playingCardScores.ts';

export const isPlayingCardScoresKeyType = (
  value: any
): value is keyof typeof PLAYING_CARD_SCORES => {
  return value in PLAYING_CARD_SCORES;
};
