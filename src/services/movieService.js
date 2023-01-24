import http from './httpService';

const apiEndpoint = '/movies';

export const getMovies = () => http.get(apiEndpoint);

export const getMovie = (movieId) =>
  http.get(`${apiEndpoint}/find/${movieId}`);

export const getRandomMovie = (type) =>
  http.get(`${apiEndpoint}/random/?type=${type}`);
