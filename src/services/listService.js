import http from './httpService';

const apiEndpoint = '/lists';

export const getRandomLists = (type, genre) =>
  http.get(
    `${apiEndpoint}${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`
  );
