import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'accessToken';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const getJWT = () => localStorage.getItem(tokenKey);

