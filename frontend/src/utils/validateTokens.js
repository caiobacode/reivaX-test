import jwt from 'jwt-decode';
import { getLocalStorage } from './localStorage';
import { loginUser } from '../redux';

export const validateRefreshToken = (actualUser, dispatch) => {
  const refreshToken = getLocalStorage('refresh-token', false);
  if (!refreshToken) {
    return false;
  }

  const { sub, exp } = jwt(refreshToken);

  const tokenExpDate = new Date(exp * 1000);
  const actualDate = new Date();
  if (actualDate > tokenExpDate) { // verifica se o refresh-token expirou
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    return false;
  }

  // esse 'IF' é necessário para não ficar em loop
  if (actualUser.username === '' && actualUser.password === '') {
    dispatch(loginUser({ username: sub, password: sub }));
  }
  return true;
};

export const validateAccessToken = () => {
  const accessToken = getLocalStorage('token', false);
  if (!accessToken) {
    return false;
  }

  const { exp } = jwt(accessToken);

  const tokenExpDate = new Date(exp * 1000);
  const actualDate = new Date();
  if (actualDate > tokenExpDate) {
    return false;
  }

  return true;
};
