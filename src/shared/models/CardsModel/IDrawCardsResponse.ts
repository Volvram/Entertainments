import { CardType } from '@/shared/types/CardType.ts';

export interface IDrawCardsResponse {
  success: boolean;
  deck_id: number;
  remaining: number;
  cards: CardType[];
}
