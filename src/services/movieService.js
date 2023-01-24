import http from './httpService';

const apiEndpoint = '/movies';

export function getMovies() { }

export function getMovie(movieId) {
  return http.get(`${apiEndpoint}/find/${movieId}`);
}

export function getRandomMovie(type) {
  return http.get(`${apiEndpoint}/random/?type=${type}`);
}
