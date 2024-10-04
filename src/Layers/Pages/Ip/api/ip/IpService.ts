import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IIpResponse, TIpRequest } from './Types.ts';
import { IP_HOST } from '../../lib/consts/IpHosts.ts';

export const ipApi = createApi({
  reducerPath: 'ipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: IP_HOST,
  }),
  endpoints: (build) => ({
    fetchIpGeo: build.query<IIpResponse, TIpRequest>({
      query: (ip) => ({
        url: `/${ip}/geo`,
      }),
    }),
  }),
});

export const { useLazyFetchIpGeoQuery } = ipApi;
