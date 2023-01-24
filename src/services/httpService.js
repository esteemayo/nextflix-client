import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getJWT } from './authService';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_API_URL, REACT_PROD_APP_API_URL } = process.env;

const authFetch = axios.create({
  baseURL: devEnv ? REACT_APP_DEV_API_URL : REACT_PROD_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

authFetch.interceptors.request.use(
  (request) => {
    request.headers.common['Authorization'] = `Bearer ${getJWT()}`;
    return request;
  },
  (error) => {
    logger.log(error);
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error.response);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const http = {
  get: authFetch.get,
  post: authFetch.post,
  patch: authFetch.patch,
  delete: authFetch.delete,
};

export default http;
