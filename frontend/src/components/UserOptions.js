import React from 'react';
import PageSelector from './PageSelector';
import { useDispatch } from 'react-redux';
import { logoutUser, setClearTable } from '../redux';
import '../style/UserOptions.css'

export default function UserOptions() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    dispatch(logoutUser());
  }

  return (
    <div className='user-options-div'>
      <div className='logout-clear-btns-div'>
        <button
          type='button'
          className='user-options-btn'
          onClick={() => dispatch(setClearTable(true))}
        >
         Clear
        </button>
        <button
          type='button'
          className='user-options-btn'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className='page-selector-div'>
        <span className='change-page-span'>Change page</span>
        <PageSelector/>
      </div>
    </div>
  )
}
