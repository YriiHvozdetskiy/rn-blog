import {configureStore} from '@reduxjs/toolkit';
import {
   persistStore,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import {setupListeners} from "@reduxjs/toolkit/query";

import {userReducer} from '../../store/redux/user/userSlice';
import {pokemonApi} from "../../store/redux/pokemon";

export const store = configureStore({
   // reducer замінює combineReducers і об'єднує редюсери в rootReducer
   // передаємо в об'єкт reducer всі редюсери які будуть використовуватися в проекті
   reducer: {
      user: userReducer,
      // Add the generated reducer as a specific top-level slice
      //
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      // інші редюсери
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(pokemonApi.middleware),// в кінці до загального масиву middleware додаємо middleware для pokemonApi
   devTools: process.env.NODE_ENV === 'development', // показує redux-devtools тільки в режимі розробки
});

// опціонально в createApi, коли пропаде інтернет, фокус на вікно, то відправляється запит на сервер
setupListeners(store.dispatch)

export const persistor = persistStore(store);
