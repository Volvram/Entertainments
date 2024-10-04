import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { cardsHost } from '@/Layers/Shared/config/hosts.ts';
import { ICreateDeckParams } from '@/Layers/Shared/models/CardsModel/ICreateDeckParams.ts';
import { ICreateDeckResponse } from '@/Layers/Shared/models/CardsModel/ICreateDeckResponse.ts';
import { IDeck } from '@/Layers/Shared/models/CardsModel/IDeck.ts';
import { IDrawCardsParams } from '@/Layers/Shared/models/CardsModel/IDrawCardsParams.ts';
import { IDrawCardsResponse } from '@/Layers/Shared/models/CardsModel/IDrawCardsResponse.ts';
import { IReshuffleCardsParams } from '@/Layers/Shared/models/CardsModel/IReshuffleCardsParams.ts';
import { IReshuffleCardsResponse } from '@/Layers/Shared/models/CardsModel/IReshuffleCardsResponse.ts';
import { IReturnCardsParams } from '@/Layers/Shared/models/CardsModel/IReturnCardsParams.ts';
import { IReturnCardsResponse } from '@/Layers/Shared/models/CardsModel/IReturnCardsResponse.ts';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${cardsHost}/api`,
  }),
  endpoints: (build) => ({
    createDeck: build.query<ICreateDeckResponse, ICreateDeckParams | void>({
      query: (params: ICreateDeckParams) => ({
        url: `/deck/new${params.shuffle ? '/shuffle' : ''}`,
        params: {
          deck_count: params.deckCount,
          jokers_enabled: params.jokersEnabled,
          cards: params.cards,
        },
      }),
    }),
    requestDeck: build.query<IDeck, string>({
      query: (deckId) => ({
        url: `/deck/${deckId}`,
      }),
    }),
    drawCards: build.query<IDrawCardsResponse, IDrawCardsParams>({
      query: (params) => ({
        url: `/deck/${params.deckId}/draw`,
        params: {
          count: params.count ?? 1,
        },
      }),
    }),
    reshuffleCards: build.query<IReshuffleCardsResponse, IReshuffleCardsParams>({
      query: (params) => ({
        url: `/deck/${params.deckId}/shuffle`,
        params: {
          remaining: params.remaining,
        },
      }),
    }),
    returnCards: build.query<IReturnCardsResponse, IReturnCardsParams>({
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
