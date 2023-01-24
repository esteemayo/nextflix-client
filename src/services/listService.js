import http from './httpService';

const apiEndpoint = '/lists';

export function getRandomLists(type, genre) {
  return http.get(
    `${apiEndpoint}${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''
    }`
  );
}
