import { PLAYING_CARD_SCORES } from '../consts/playingCardScores.ts';

type CardValueType = {
  value: number;
  uncountedAce: boolean;
};

export const getCardValue = (
  cardValue: keyof typeof PLAYING_CARD_SCORES,
  generalScore: number = 0
): CardValueType => {
  if (cardValue === 'ACE') {
    if (generalScore > 10) {
      return {
        value: PLAYING_CARD_SCORES[cardValue][1],
        uncountedAce: false,
      };
    }

    return {
      value: PLAYING_CARD_SCORES[cardValue][0],
      uncountedAce: true,
    };
  }

  return {
    value: PLAYING_CARD_SCORES[cardValue],
    uncountedAce: false,
  };
};
