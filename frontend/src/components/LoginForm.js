import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux';
import reivaxLogo from '../images/reivax.png';

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
    dispatch(loginUser({ username, password }));
    setTimeout(() => {
      setShowErrorMessage(true);
    }, 1000);
  };

  return (
    <div className="login-form-div">
      <img className="reivax-logo" src={reivaxLogo} alt="reivax-logo" />
      <div className="error-message-div">
        {
          showErrorMessage && <span>Invalid username or password.</span>
        }
      </div>

      <span className="input-span" htmlFor="username">
        Username
      </span>
      <input
        className="login-input"
        name="username"
        type="text"
        value={username}
        onChange={({ target: { value } }) => {
          setUsername(value);
          setShowErrorMessage(false);
        }}
      />

      <span className="input-span">
        Password
      </span>
      <input
        className="login-input"
        type="text"
        value={password}
        onChange={({ target: { value } }) => {
          setPassword(value);
          setShowErrorMessage(false);
        }}
      />

      <button
        type="button"
        className="login-btn"
        disabled={username === '' || password === ''}
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  );
}
