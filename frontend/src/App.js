import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Login, Home } from './pages';
import { selectUser, setData, selectTable, setClearTable } from './redux';
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
      socket.emit('clear', { token });
      dispatch(setData([]));
      setTimeout(() => {
        dispatch(setClearTable(false));
      }, 500)
    }

    return () => {
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
