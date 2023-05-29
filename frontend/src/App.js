import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Login, Home } from './pages';
import { selectUser, setData, selectTable, setClearTable, changePage } from './redux';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const { clearTable } = useSelector(selectTable)


  useEffect(() => {
    const socket = io('http://localhost:5000/api', {
    extraHeaders: {
      'X-Username': user.username,
      'X-Password': user.password
    }
    });

    // armazena os tokens no localStorage somente se não existir nenhum token
    socket.on('credentials', (data) => {
      const token = getLocalStorage('token', false);
      if (!token) {
        setLocalStorage('token', data.access_token);
        setLocalStorage('refresh-token', data.refresh_token);
      }
    });

    // atende evento "data" e armazena os dados no redux
    socket.on('data', (data) => {
      dispatch(setData(data));
    });

    const token = getLocalStorage('token', false);
    if (clearTable === true) {
      socket.emit('clear', { token }, (response) => {
        console.log('Retorno do comando "clear":', response);
      });
      dispatch(setData([]));
      dispatch(changePage(1))
      setTimeout(() => {
        dispatch(setClearTable(false));
      }, 500)
    }

    // a cada 445 segundos, faremos uma requisicao para atualizar os tokens
    const interval = setInterval(() => {
      const refreshToken = getLocalStorage('refresh-token', false)
      socket.emit('refresh_tokens', { token: refreshToken }, (response) => {
        setLocalStorage('token', response.access_token);
        setLocalStorage('refresh-token', response.refresh_token)
      });
    }, 450000);

    return () => {
      clearInterval(interval);
      socket.disconnect(); // Desconecta quando o componente for desmontado
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
