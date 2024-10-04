import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IOwnIpResponse, TOwnIpRequest } from './Types.ts';
import { OWN_IP_HOST } from '../../lib/consts/IpHosts.ts';

export const ownIpApi = createApi({
  reducerPath: 'ownIpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: OWN_IP_HOST,
  }),
  endpoints: (build) => ({
    fetchOwnIp: build.query<IOwnIpResponse, TOwnIpRequest>({
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
