import jwt from 'jwt-decode';

export const decodeToken = (token) => !token ? false : jwt(token);