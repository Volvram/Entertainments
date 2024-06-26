import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ownIpHost } from '@/pages/Ip/config/hosts.ts';
import { IOwnIp } from '@/pages/Ip/models/IOwnIp.ts';

export const ownIpApi = createApi({
  reducerPath: 'ownIpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ownIpHost,
  }),
  endpoints: (build) => ({
    fetchOwnIp: build.query<IOwnIp, string | void>({
      query: (format = 'json') => ({
        url: '/',
        params: {
          format,
        },
      }),
    }),
  }),
});

export const { useFetchOwnIpQuery } = ownIpApi;
