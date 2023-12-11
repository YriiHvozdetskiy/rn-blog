import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {Pokemon} from './types'

//https://youtu.be/6QCOUqjJXDY - RTQ - Redux Toolkit Query
export const pokemonApi = createApi({
   // queryKey як в react-query
   reducerPath: 'pokemonApi',
   // fetchBaseQuery - це аналог axios, fetch
   // baseUrl - це аналог baseURL в axios, BASE_URL
   baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
   endpoints: (builder) => ({
      getPokemonByName: builder.query<Pokemon, string>({
         query: (name) => `pokemon/${name}`,
      }),
   }),
})

// createApi - це аналог createSlice, який генере хуки н-д: useGetPokemonByNameQuery
// const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
export const {useGetPokemonByNameQuery} = pokemonApi