import React, { useState } from 'react'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = () => {
    console.log('login');
  }

  return (
    <div>
      <label htmlFor='username'>Username:</label>
      <input
        type='text'
        name='username'
        value={username}
        onChange={({target: {value}}) => setUsername(value)}
      />

      <label htmlFor='password'>Password:</label>
      <input
        type='text'
        name='password'
        value={password}
        onChange={({target: {value}}) => setPassword(value)}
      />

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
