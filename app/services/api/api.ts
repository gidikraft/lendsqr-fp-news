import { RootState } from '@/store/Store';
import { getBaseUrl } from './baseUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl('placeholders'),
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth.userData;
    if (accessToken) {
      headers.set('authentication', `Bearer${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'Posts',
  baseQuery,
  tagTypes: ['Posts'],
  endpoints: () => ({}),
});

// export const enhancedApi = api.enhanceEndpoints({
//   endpoints: () => ({
//     getPosts: () => 'test',
//   }),
// });
