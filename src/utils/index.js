export const tokenKey = 'accessToken';

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const setToStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

export const clearStorage = () => {
  return localStorage.clear();
}
