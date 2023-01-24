import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import { register } from 'services/userService';
import {
  clearStorage,
  getFromStorage,
  setToStorage,
  tokenKey,
} from 'utils';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await register({ ...credentials });
      navigate('/');
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJWT();
const user = getFromStorage(tokenKey);

const initialState = {
  user: user ?? null,
  loading: false,
  error: null,
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = Date.now();

  if (decodedToken.exp * 1000 < expiryDate) {
    clearStorage();
    initialState.user = null;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      clearStorage();
      state.user = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload.message;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload.message;
    },
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
