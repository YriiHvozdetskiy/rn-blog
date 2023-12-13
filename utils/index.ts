import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const createBaseQuery = () => {
   return fetchBaseQuery({
      baseUrl: process.env.APP_URL,
      prepareHeaders: (headers, {getState}) => {
         const token = getState().user.token;
         if (token) {
            headers.set('authorization', `Bearer ${token}`);
         }
         return headers;
      },
   });
};
