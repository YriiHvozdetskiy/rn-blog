import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


import {createBaseQuery} from "@/utils";

//https://youtu.be/6QCOUqjJXDY - RTQ - Redux Toolkit Query (Репета)

// TODO переробити на mockapi.io
export const pokemonApi = createApi({
   // reducerPath - унікальне ім'я для redux api(configureStore reducer:[pokemonApi.reducerPath])
   reducerPath: 'pokemonApi',
   // fetchBaseQuery - це аналог axios, fetch
   // baseUrl - це аналог baseURL в axios, BASE_URL
   // baseQuery: fetchBaseQuery({
   //    baseUrl: 'https://pokeapi.co/api/v2/',
   //    prepareHeaders: (headers, {getState}) => {
   //       // getState- це весь store,user(в store) - reducer: {
   //       //                                           user: userReducer, (обєкт user)
   //       //                                           [pokemonApi.reducerPath]: pokemonApi.reducer,
   //       //                                           // інші редюсери
   //       //                                         },
   //
   //       const token = getState().user.token;
   //       if (token) {
   //          headers.set('authorization', `Bearer ${token}`);
   //       }
   //       return headers;
   //    },
   // }),
   // == or == (коли потрібно відправляти з токеном в заголовках)
   baseQuery: createBaseQuery(),

   // queryKey як в react-query (ключ по якаму буде зберігатися/оновлюватися дані в кеші)
   tagTypes: ['pokemon'],
   // == or == коли буде один slice  і ми дод до нього багато endpoint див apiSlice.ts
   // tagTypes: ['Users', 'Products', 'Orders'],

   endpoints: (builder) => ({
      // getPokemonByName - довільна назва, яка буде використовуватися в useGetPokemonByNameQuery
      getPokemonByName: builder.query({
         // query: (name) => `pokemon/${name}`,
         // ==or==
         query: (name) => ({
            url: `pokemon/${name}`,
            method: 'GET',
            // headers: {Authorization: `Bearer ${token}`},
         }),
         // коли отримуємо дані з сервера, привязуємо їх до тегу по якому буде видалятися/оновлюватися дані в кеші
         //  після виконання мутації, виконується invalidatesTags: ['тег']
         providesTags: ['pokemon'],
         // записуємо дані в AsyncStorage щоб отримувати дані з локальногоСтора
         // async onQueryStarted(name, {queryFulfilled}) {
         //    try {
         //       const {data} = await queryFulfilled;
         //       await AsyncStorage.setItem(`@pokemon/${name}`, JSON.stringify(data));
         //    } catch (error) {
         //       console.error('Error writing pokemon data to AsyncStorage:', error);
         //    }
         // },
      }),

      deletePokemon: builder.mutation({
            query: ({id}) => ({
               url: `post/${id}`,
               method: 'DELETE',
            }),
            // в тілі відповіді з сервера приходить об'єкт Post, але ми можемо вибрати тільки певні поля і використовувати їх
            transformResponse: (response: { data: any }, meta, arg) => response.data,

            // при виконанні мутації, якщо відповідь з сервера буде помилковою, то виконається ця функція
            transformErrorResponse: (
               response: { status: string | number },
               meta,
               arg
            ) => response.status,
            // invalidatesTags - аналог queryClient.invalidateQueries([queryKey.order]) в react-query
            invalidatesTags: ['pokemon'],
         },
      ),
      
      createPokemon: builder.mutation({
         query: (body) => ({
            url: `post`,
            method: 'POST',
            body,
         }),
         transformResponse: (response: { data: any }, meta, arg) => response.data,
         invalidatesTags: ['pokemon'],
      }),
   }),
})

// createApi - це аналог createSlice, який генере хуки н-д: useGetPokemonByNameQuery і тд
// const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

// генерація хуків для query:
// useGetPokemonByNameQuery = use + getPokemonByName + Query(хуки генеряться автоматично тому для запитів додаємо Query)

// генерація хуків для mutation:
// useDeletePokemonMutation = use + deletePokemon + Mutation (хуки генеряться автоматично тому для мутацій додаємо Mutation)
export const {useGetPokemonByNameQuery, useDeletePokemonMutation} = pokemonApi