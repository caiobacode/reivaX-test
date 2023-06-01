import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux';
import reivaxLogo from '../media/reivax.png'

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
    <div className='login-form-div'>
      <img className='reivax-logo' src={ reivaxLogo } alt='reivax-logo'/>
      <div className='error-message-div'>
        {
          showErrorMessage && <span>Invalid username or password.</span>
        }
      </div>
      <label className='input-label' htmlFor='username'>Username</label>
      <input
        className='login-input'
        type='text'
        value={username}
        onChange={({target: {value}}) => { 
          setUsername(value); 
          setShowErrorMessage(false);
        }}
      />

      <label className='input-label' htmlFor='password'>Password</label>
      <input
        className='login-input'
        type='text'
        value={password}
        onChange={({target: {value}}) => {
          setPassword(value); 
          setShowErrorMessage(false);
        }}
      />
      <button
        type='button'
        className='login-btn'
        disabled={username === '' || password === ''}
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  )
}
