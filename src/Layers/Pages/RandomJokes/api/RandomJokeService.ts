import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IRandomJokeResponse, TRandomJokeRequest } from './Types.ts';
import { RANDOM_JOKE_HOST } from '../lib/consts/randomJokeHost.ts';

export const randomJokeApi = createApi({
  reducerPath: 'randomJokeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: RANDOM_JOKE_HOST,
  }),
  endpoints: (build) => ({
    fetchRandomJoke: build.query<IRandomJokeResponse, TRandomJokeRequest>({
      query: () => ({
        url: '/random_joke',
      }),
    }),
  }),
});

export const { useFetchRandomJokeQuery } = randomJokeApi;
