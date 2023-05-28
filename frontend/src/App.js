import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserToConnected } from './redux/userSlice';
import { setData } from './redux/tableSlice';
import { setLocalStorage } from './utils/localStorage';

const App = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

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

    // esse "if" é necessário para evitar requisições duplas
    if (user.isConnected) {
      // atende evento "credentials" e armazena os tokens no localStorage
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
