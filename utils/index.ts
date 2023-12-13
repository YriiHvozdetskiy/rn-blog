import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BASE_URL} from "@/constants";

export const createBaseQuery = () => {
   return fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers, {getState}) => {

         const token = getState().user.token;

         if (token) {
            headers.set('authorization', `Bearer ${token}`);
         }
         return headers;
      },
   });
};
