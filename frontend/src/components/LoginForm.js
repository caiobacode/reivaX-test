import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setUsername('');
    setPassword('');
    
    /* cliente tenta conectar ao servidor por 1 segundo, caso não
    consiga, a aplicação exibe uma mensagem de erro ao usuário. */
    dispatch(loginUser({username, password}));
    setTimeout(() => {
      setShowErrorMessage(true);
    }, 1000)
  };

  return (
    <div>
      <label htmlFor='username'>Username:</label>
      <input
        type='text'
        value={username}
        onChange={({target: {value}}) => { 
          setUsername(value); 
          setShowErrorMessage(false);
        }}
      />

      <label htmlFor='password'>Password:</label>
      <input
        type='text'
        value={password}
        onChange={({target: {value}}) => {
          setPassword(value); 
          setShowErrorMessage(false);
        }}
      />
      <div>
        {
          showErrorMessage && <span>Invalid username or password.</span>
        }
      </div>
      <button
        type='button'
        disabled={username === '' || password === ''}
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  )
}
