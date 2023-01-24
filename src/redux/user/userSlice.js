import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getJWT, login } from 'services/authService';
import { clearStorage, getFromStorage, setToStorage } from 'utils';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const { data } = await login({ ...credentials });
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = getJWT();
const user = getFromStorage();

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
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
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
      setToStorage(payload);
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload.message;
    },
  }
});

export const { loginFailure, loginStart, loginSuccess, logout } =
  userSlice.actions;

export default userSlice.reducer;
