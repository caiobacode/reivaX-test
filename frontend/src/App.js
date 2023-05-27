import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import io from 'socket.io-client';

const App = () => {
  const [data, setData] = useState([])

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
    socket.on('data', (dataArray) => {
      setData(dataArray)
      console.log('data:', dataArray);
    })

    return () => {
      socket.disconnect(); // Desconecta quando o componente for desmontado
    };
  }, [])


  return (
    <div className="App">
      ReivaX
      <Table data={data}/>
    </div>
  );
}

export default App;
