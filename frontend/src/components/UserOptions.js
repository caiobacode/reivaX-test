import React from 'react';
import { useDispatch } from 'react-redux';
import PageSelector from './PageSelector';
import {
  clearFilters,
  logoutUser,
  setClearTable,
  setData,
  turnFiltersWindowOn,
} from '../redux';
import '../style/UserOptions.css';
import filterBtnImg from '../images/expand.png';

export default function UserOptions() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    dispatch(logoutUser());
    setTimeout(() => {
      dispatch(clearFilters());
      dispatch(setData([]));
    }, 1000);
  };

  return (
    <div className="user-options-div">
      <div className="logout-clear-btns-div">
        <button
          type="button"
          className="user-options-btn"
          onClick={() => dispatch(setClearTable(true))}
        >
          Clear
        </button>

        <button
          type="button"
          className="user-options-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          type="button"
          className="user-options-btn"
          onClick={() => dispatch(turnFiltersWindowOn())}
        >
          Filters
          <img className="filters-btn-img" alt="filters-btn-img" src={filterBtnImg} />
        </button>
      </div>
      <div className="page-selector-div">
        <span className="change-page-span">Change page</span>
        <PageSelector />
      </div>
    </div>
  );
}
