import { playingCardScores } from '@/Layers/Pages/BlackJack/config/playingCardScores.ts';

type CardValueType = {
  value: number;
  uncountedAce: boolean;
};

export const getCardValue = (
  cardValue: keyof typeof playingCardScores,
  generalScore: number = 0
): CardValueType => {
  if (cardValue == 'ACE') {
    if (generalScore > 10) {
      return {
        value: playingCardScores[cardValue][1],
        uncountedAce: false,
      };
    }

    return {
      value: playingCardScores[cardValue][0],
      uncountedAce: true,
    };
  }

  return {
    value: playingCardScores[cardValue],
    uncountedAce: false,
  };
};
