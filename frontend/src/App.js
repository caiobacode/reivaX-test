import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Login, Home } from './pages';
import { selectUser, setData, selectTable, setClearTable, changePage } from './redux';
import { getLocalStorage, setLocalStorage, validateAccessToken, validateRefreshToken } from './utils';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const { clearTable } = useSelector(selectTable)

  useEffect(() => {
    const socket = io('http://localhost:5000/api', {
    extraHeaders: {
      'X-Username': user.username,
      'X-Password': user.password
    }
    });

    // função para verificar se o usuario ja esta logado ao entrar no site
    function verifyTokens() {
      const isValid = validateRefreshToken(user, dispatch);
      const actualRoute = window.location.pathname;
      if (isValid && actualRoute !== '/home') {
        navigate('/home');
      } 
      if (!isValid && actualRoute === '/home') {
        navigate('/login');
      }
    }

    // temos que colocar um delay pequeno, se não nós não conseguimos logar
    setTimeout(() => {
      verifyTokens();
    }, 100) 
    
    // gera tokens e armazena no localStorage somente se não existir um token valido
    socket.on('credentials', (data) => {
      if (!validateAccessToken()) {
        setLocalStorage('token', data.access_token);
        setLocalStorage('refresh-token', data.refresh_token);
      }
    });

    // atende evento "data" e armazena os dados no estado do redux
    socket.on('data', (data) => {
      dispatch(setData(data));
    });

    /* quando o usuario apertar o botao "clear", o boleano clearTable
    passa a ser true, assim emitindo o comando "clear" para o servidor*/
    if (clearTable === true) {
      const token = getLocalStorage('token', false);
      socket.emit('clear', { token }, (response) => {
        dispatch(setData([]));
        dispatch(changePage(1))
        dispatch(setClearTable(false));
      });
    }

    // a cada 450 segundos, envia-se uma requisicao para atualizar os tokens
    const interval = setInterval(() => {
      const refreshToken = getLocalStorage('refresh-token', false)
      socket.emit('refresh_tokens', { token: refreshToken }, (response) => {
        setLocalStorage('token', response.access_token);
        setLocalStorage('refresh-token', response.refresh_token)
      });
    }, 450000);


    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [user, clearTable]);

  return (
    <Routes>
      <Route Component={Login} exact path='/'></Route>
      <Route Component={Login} path='/login'></Route>
      <Route Component={Home} path='/home'></Route>
    </Routes>
  );
}

export default App;
