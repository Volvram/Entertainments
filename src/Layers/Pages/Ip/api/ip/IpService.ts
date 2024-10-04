import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ipHost } from '@/Layers/Pages/Ip/config/hosts.ts';
import { IIP } from '@/Layers/Pages/Ip/models/IIP.ts';

export const ipApi = createApi({
  reducerPath: 'ipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ipHost,
  }),
  endpoints: (build) => ({
    fetchIpGeo: build.query<IIP, string>({
      query: (ip) => ({
        url: `/${ip}/geo`,
      }),
    }),
  }),
});

export const { useLazyFetchIpGeoQuery } = ipApi;
