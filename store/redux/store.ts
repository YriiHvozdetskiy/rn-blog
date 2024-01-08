import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import {setupListeners} from '@reduxjs/toolkit/query';
// import {composeWithDevTools} from 'remote-redux-devtools';
import {devToolsEnhancer} from 'redux-devtools-extension';

import {apiSlice} from '@/store/redux/apiSlice';
import {userReducer} from '@/store/redux/user/userSlice';
import {pokemonApi} from '@/store/redux/pokemon/pokemonApi';

// https://youtu.be/6QCOUqjJXDY?t=4541  mockapi.io
export const store = configureStore({
   // reducer замінює combineReducers і об'єднує редюсери в rootReducer
   // передаємо в об'єкт reducer всі редюсери які будуть використовуватися в проекті
   reducer: {
      user: userReducer,
      // reducerPath - унікальне ім'я для redux api
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      // slice в якого розширюємо endpoint іншими endpoint див productsSlice.ts
      [apiSlice.reducerPath]: apiSlice.reducer,
      // інші редюсери
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(pokemonApi.middleware, apiSlice.middleware), // в кінці до загального масиву middleware додаємо middleware для всіх reducers
   devTools: process.env.NODE_ENV === 'development', // показує redux-devtools тільки в режимі розробки

   // enhancers: [devToolsEnhancer({})] // Add the enhancer here
   // composeWithDevTools: composeWithDevTools(applyMiddleware(getDefaultMiddleware =>
   //    getDefaultMiddleware({
   //       serializableCheck: {
   //          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   //       },
   //    })))
});

// опціонально в createApi, коли пропаде інтернет, фокус на вікно, то відправляється запит на сервер (налаштовується для кожного endpoint окремо)
setupListeners(store.dispatch);

export const persistor = persistStore(store);
