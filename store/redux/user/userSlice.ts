import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// виносимо операції в окремий файл - ***Actions
import {login} from '@/store/redux/user/userActions';

const initialState = {
   token: false,
   isLoading: false,
   isAuth: false,
   error: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   // для синхронних операцій
   reducers: {
      // setToken(state, action) {
      //    state.token = action.payload;
      // },
      // removeToken(state) {
      //    state.token = false;
      // },
   },

   // для асинхронних операцій
   extraReducers: (builder) => {
      builder
         // є три стана асинхроних ф-цій: pending, fulfilled, rejected
         .addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
         })
   },
});

// для кожного редюсера створюємо свій persistConfig якщо потрібно
const persistConfig = {
   key: 'user', // ключ для AsyncStorage/localStorage
   storage: AsyncStorage, // тип зберігання. На пк буде: import storage from 'redux-persist/lib/storage';
   whitelist: ['token', 'isAuth'], // тільки ці дані будуть збережені
};

export const userReducer = persistReducer(
   persistConfig,
   userSlice.reducer,
);
