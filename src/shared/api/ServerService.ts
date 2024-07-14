import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { serverHost } from '@/shared/config/hosts.ts';
import { IRunBlackJackNeuralNetworkParams } from '@/shared/models/ServerModel/IRunBlackJackNeuralNetworkParams.ts';
import { IRunBlackJackNeuralNetworkResponse } from '@/shared/models/ServerModel/IRunBlackJackNeuralNetworkResponse.ts';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: serverHost,
  }),
  endpoints: (build) => ({
    runBlackJackNeuralNetwork: build.query<
      IRunBlackJackNeuralNetworkResponse,
      IRunBlackJackNeuralNetworkParams
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
