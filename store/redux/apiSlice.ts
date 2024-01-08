// apiSlice.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({baseUrl: '/api'}),
   // записуєм всі теги які розширюють цей slice
   tagTypes: ['Products', 'і тд'],
   endpoints: () => ({}),
});
