import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { randomJokeHost } from '@/pages/RandomJokes/config/hosts.ts';
import { IRandomJoke } from '@/pages/RandomJokes/models/IRandomJoke.ts';

export const randomJokeApi = createApi({
  reducerPath: 'randomJokeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: randomJokeHost,
  }),
  endpoints: (build) => ({
    fetchRandomJoke: build.query<IRandomJoke, void>({
      query: () => ({
        url: '/random_joke',
      }),
    }),
  }),
});

export const { useFetchRandomJokeQuery } = randomJokeApi;
