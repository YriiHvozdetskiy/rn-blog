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

import {userReducer} from '@/store/redux/user/userSlice';

export const store = configureStore({
   // reducer замінює combineReducers і об'єднує редюсери в rootReducer
   // передаємо в об'єкт reducer всі редюсери які будуть використовуватися в проекті
   reducer: {
      user: userReducer,
      // інші редюсери
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
   devTools: process.env.NODE_ENV === 'development', // показує redux-devtools тільки в режимі розробки
});

export const persistor = persistStore(store);
