import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useDispatch } from 'react-redux';
import { decodeToken, getLocalStorage } from '../utils';
import { loginUser } from '../redux';

export default function Login() {
  const dispatch = useDispatch();
  const token = getLocalStorage('token', false);
  
  useEffect(() => {
    const tokenDecoded = decodeToken(token);
    /* se já existir um token no localstorage, a aplicação 
    decodifica o token e conecta ao servidor socket.io */
    if (tokenDecoded !== false) {
      const { sub } = tokenDecoded;
      dispatch(loginUser({ username: sub, password: sub }));
    }
  }, [token, dispatch]);

  return (
    <div>
      <LoginForm />
    </div>
  )
}
