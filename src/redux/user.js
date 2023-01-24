import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  user: null,
  loading: false,
  error: false,
};

const tokenKey = 'accessToken';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = Date.now();

  if (decodedToken.exp * 1000 < expiryDate) {
    localStorage.removeItem(tokenKey);
  } else {
    initialStateValue.user = decodedToken;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateValue,
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
      state.user = null;
    },
  },
});

export const { loginFailure, loginStart, loginSuccess, logout } =
  userSlice.actions;

export default userSlice.reducer;
