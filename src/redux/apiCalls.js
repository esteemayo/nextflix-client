import * as actions from './user/userSlice';
import { login } from 'services/authService';

const tokenKey = 'accessToken';

export const loginUser = async (dispatch, credentials) => {
  dispatch(actions.loginStart());

  try {
    const { data } = await login(credentials);
    localStorage.setItem(tokenKey, data.token);
    dispatch(actions.loginSuccess(data));
  } catch (err) {
    dispatch(actions.loginFailure());
    console.log(err);
  }
};

export const logoutUser = (dispatch) => {
  localStorage.removeItem(tokenKey);
  dispatch(actions.logout());
};
