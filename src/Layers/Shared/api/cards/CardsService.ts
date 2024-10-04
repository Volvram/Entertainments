import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  ICreateDeckRequest,
  ICreateDeckResponse,
  IRequestDeckResponse,
  IDrawCardsRequest,
  IDrawCardsResponse,
  IReshuffleCardsRequest,
  IReshuffleCardsResponse,
  IReturnCardsRequest,
  IReturnCardsResponse,
  TRequestDeckRequest,
} from './Types.ts';
import { CARDS_HOST } from '../../lib/consts/hosts.ts';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${CARDS_HOST}/api`,
  }),
  endpoints: (build) => ({
    createDeck: build.query<ICreateDeckResponse, ICreateDeckRequest | void>({
      query: (params: ICreateDeckRequest) => ({
        url: `/deck/new${params.shuffle ? '/shuffle' : ''}`,
        params: {
          deck_count: params.deckCount,
          jokers_enabled: params.jokersEnabled,
          cards: params.cards,
        },
      }),
    }),
    requestDeck: build.query<IRequestDeckResponse, TRequestDeckRequest>({
      query: (deckId) => ({
        url: `/deck/${deckId}`,
      }),
    }),
    drawCards: build.query<IDrawCardsResponse, IDrawCardsRequest>({
      query: (params) => ({
        url: `/deck/${params.deckId}/draw`,
        params: {
          count: params.count ?? 1,
        },
      }),
    }),
    reshuffleCards: build.query<IReshuffleCardsResponse, IReshuffleCardsRequest>({
      query: (params) => ({
        url: `/deck/${params.deckId}/shuffle`,
        params: {
          remaining: params.remaining,
        },
      }),
    }),
    returnCards: build.query<IReturnCardsResponse, IReturnCardsRequest>({
      query: (params) => ({
        url: `/deck/${params.deckId}/return`,
        params: {
          cards: params.cards,
        },
      }),
    }),
  }),
});

export const {
  useLazyCreateDeckQuery,
  useRequestDeckQuery,
  useLazyRequestDeckQuery,
  useLazyDrawCardsQuery,
  useLazyReshuffleCardsQuery,
  useLazyReturnCardsQuery,
} = cardsApi;
