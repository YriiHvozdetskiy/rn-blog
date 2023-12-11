import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// запити які повязані з redux(user)

export const login = createAsyncThunk('user/login',
   async (credentials, thunkAPI) => {

      try {
         const {data} = await axios.post(LOGIN, credentials);
         if (data.token.length === 0) {
            return Promise.reject(new Error('invalid token'));
         }

         token.set(data.token);

         toast('Welcome', {
            icon: '👋',
         });

         return data;
      } catch (error) {
         toast.error('error');

         return thunkAPI.rejectWithValue(error.message);
      }
   });