import React from 'react';
import PageSelector from './PageSelector';
import { useDispatch } from 'react-redux';
import { logoutUser, setClearTable } from '../redux';

export default function UserOptions() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    dispatch(logoutUser());
  }

  return (
    <div>
      <button
        type='button'
        onClick={() => dispatch(setClearTable(true))}
      >
        Clear
      </button>
      
      <button
        type='button'
        onClick={handleLogout}
      >
        Logout
      </button>
      <PageSelector/>
    </div>
  )
}
