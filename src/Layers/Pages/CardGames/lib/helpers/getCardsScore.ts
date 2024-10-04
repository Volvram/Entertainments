import { TCard } from '@/Layers/Shared/api/cards/Types.ts';

import { getCardValue } from './getCardValue.ts';
import { isPlayingCardScoresKeyType } from './isPlayingCardScoresKeyType.ts';

export const getCardsScore = (cards: TCard[]) => {
  let score = 0;
  let acesAmount = 0;

  cards.forEach((card) => {
    const cardValue = card.value;

    if (isPlayingCardScoresKeyType(cardValue)) {
      const countedCard = getCardValue(cardValue, score);

      countedCard.uncountedAce && acesAmount++;

      if (acesAmount > 0 && score + countedCard.value > 21) {
        // Изменяем значение одного туза
        score -= 10;
        acesAmount--;
      }

      score += countedCard.value;
    }
  });

  return score;
};
