import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IRunBlackJackNeuralNetworkRequest, IRunBlackJackNeuralNetworkResponse } from './Types.ts';
import { SERVER_HOST } from '../../lib/consts/hosts.ts';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_HOST,
  }),
  endpoints: (build) => ({
    runBlackJackNeuralNetwork: build.query<
      IRunBlackJackNeuralNetworkResponse,
      IRunBlackJackNeuralNetworkRequest
    >({
      query: (params) => ({
        url: '/black-jack-network',
        params: {
          sum: params.sum,
          openedCard: params.openedCard,
        },
      }),
    }),
  }),
});

export const { useLazyRunBlackJackNeuralNetworkQuery } = serverApi;
