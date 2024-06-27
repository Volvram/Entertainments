import { getCardValue } from '@/pages/BlackJack/lib/utils/getCardValue.ts';
import { isPlayingCardScoresKeyType } from '@/pages/BlackJack/lib/utils/isPlayingCardScoresKeyType.ts';
import { CardType } from '@/shared/types/CardType.ts';

export const getCardsScore = (cards: CardType[]) => {
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
