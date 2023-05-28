import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Login, Home } from './pages';
import { selectUser, setUserToConnected, setData } from './redux';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    const socket = io('http://localhost:5000/api', {
      extraHeaders: {
        'X-Username': user.username,
        'X-Password': user.password
      }
    });

    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO');
      navigate('/home');
      dispatch(setUserToConnected());
    });

    const token = getLocalStorage('token', false)
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
  }, [user, navigate, dispatch])


  return (
    <Routes>
      <Route Component={Login} exact path='/'></Route>
      <Route Component={Login} path='/login'></Route>
      <Route Component={Home} path='/home'></Route>
    </Routes>
  );
}

export default App;
