import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Login, Home } from './pages';
import { LoadingScreen } from './components';

import {
  setData,
  setClearTable,
  changePage,
  turnOffLoadingScreen,
  turnOnLoadingScreen,
  selectUser,
  selectTable,
} from './redux';

import {
  getLocalStorage, setLocalStorage, validateAccessToken, validateRefreshToken,
} from './utils';

import './style/App.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const { clearTable } = useSelector(selectTable);

  useEffect(() => {
    const socket = io('http://localhost:5000/api', {
      extraHeaders: {
        'X-Username': user.username,
        'X-Password': user.password,
      },
    });

    function verifyAuthentication() {
      const isTokenValid = validateRefreshToken(user, dispatch);
      const actualRoute = window.location.pathname;
      if (isTokenValid && actualRoute !== '/home') {
        dispatch(turnOnLoadingScreen());
        setTimeout(() => {
          navigate('/home');
        }, 500);
      }
      if (!isTokenValid && actualRoute === '/home') {
        dispatch(turnOnLoadingScreen());
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
      setTimeout(() => {
        dispatch(turnOffLoadingScreen());
      }, 1000);
    }

    // temos que colocar um delay pequeno, se não nós não conseguimos logar
    setTimeout(() => {
      verifyAuthentication();
    }, 100);

    socket.on('credentials', ({ access_token, refresh_token }) => {
      if (!validateAccessToken()) {
        setLocalStorage('token', access_token);
        setLocalStorage('refresh-token', refresh_token);
      }
    });

    socket.on('data', (data) => {
      dispatch(setData(data));
    });

    if (clearTable === true) {
      const token = getLocalStorage('token', false);
      socket.emit('clear', { token }, () => {
        dispatch(setData([]));
        dispatch(changePage(1));
        dispatch(setClearTable(false));
      });
    }

    // a cada 450 segundos, envia-se uma requisicao para atualizar os tokens
    const interval = setInterval(() => {
      let refreshToken = getLocalStorage('refresh-token', false);
      socket.emit('refresh_tokens', { token: refreshToken }, ({ access_token, refresh_token }) => {
        refreshToken = refresh_token;
        setLocalStorage('token', access_token);
        setLocalStorage('refresh-token', refresh_token);
      });
    }, 450000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [user, clearTable]);

  return (
    <div>
      <LoadingScreen />
      <Routes>
        <Route Component={Login} exact path="/" />
        <Route Component={Login} path="/login" />
        <Route Component={Home} path="/home" />
      </Routes>
    </div>
  );
}

export default App;
