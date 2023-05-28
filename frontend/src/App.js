import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Login, Home } from './pages';
import { selectUser, setUserToConnected, setData, selectTable, setClearTable } from './redux';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const App = () => {
  const navigate = useNavigate();
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
    
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO');
      dispatch(setUserToConnected());
    });
    
    const token = getLocalStorage('token', false);
    if (clearTable === true) {
      socket.emit('clear', { token });
      dispatch(setData([]))
      setTimeout(() => {
        dispatch(setClearTable(false))
      }, 200)
    }
    // esse "if" é necessário para evitar requisições desnecessarias
    if (user.isConnected && !token) {
      // armazena os tokens no localStorage somente se não existir nenhum token
      socket.on('credentials', (data) => {
        setLocalStorage('token', data.access_token);
        setLocalStorage('refresh-token', data.refresh_token);
      });
    }

    // atende evento "data" e armazena os dados no redux
    socket.on('data', (data) => {
      dispatch(setData(data));
    });

    return () => {
      socket.disconnect(); // Desconecta quando o componente for desmontado
    };
  }, [user, navigate, dispatch, clearTable]);


  return (
    <Routes>
      <Route Component={Login} exact path='/'></Route>
      <Route Component={Login} path='/login'></Route>
      <Route Component={Home} path='/home'></Route>
    </Routes>
  );
}

export default App;
