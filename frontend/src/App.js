import React, { useEffect } from 'react';
import io from 'socket.io-client';

const App = () => {
  useEffect(() => {
    const socket = io('http://localhost:5000/api', {
      extraHeaders: {
        'X-Username': 'user',
        'X-Password': 'user'
      }
    });
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO');
    });

    // atende evento "credentials" e printa os tokens
    socket.on('credentials', (data) => {
      console.log('Tokens:', data);
    })

    // atende evento "data" e printa os dados
    socket.on('data', (data) => {
      console.log('data:', data);
    })

    return () => {
      socket.disconnect(); // Desconecta quando o componente for desmontado
    };
  }, [])


  return (
    <div className="App">
      ReivaX
    </div>
  );
}

export default App;
