export type TCard = {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  suit: string;
  value: string;
};

export interface ICreateDeckRequest {
  deckCount?: number;
  shuffle?: boolean;
  jokersEnabled?: boolean;
  cards?: string;
}

export interface ICreateDeckResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export type TRequestDeckRequest = string;

export interface IRequestDeckResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  piles?: any[];
}

export interface IDrawCardsRequest {
  deckId: string;
  count?: number;
}

export interface IDrawCardsResponse {
  success: boolean;
  deck_id: number;
  remaining: number;
  cards: TCard[];
}

export interface IReshuffleCardsRequest {
  deckId: string;
  remaining?: boolean;
}

export interface IReshuffleCardsResponse {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
}

export interface IReturnCardsRequest {
  deckId: string;
  cards?: string;
}

export interface IReturnCardsResponse {
  deck_id: string;
  remaining: number;
  success: boolean;
}
