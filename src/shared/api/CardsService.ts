import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { cardsHost } from '@/shared/config/hosts.ts';
import { ICreateDeckParams } from '@/shared/models/CreateDeckModel/ICreateDeckParams.ts';
import { ICreateDeckResponse } from '@/shared/models/CreateDeckModel/ICreateDeckResponse.ts';
import { IDeck } from '@/shared/models/DeckModel/IDeck.ts';

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
  }),
});

export const { useLazyCreateDeckQuery, useRequestDeckQuery, useLazyRequestDeckQuery } = cardsApi;
