import React from 'react';
import { useSelector } from 'react-redux';
import { Table, UserOptions } from '../components';
import '../style/Home.css';
import Filters from '../components/Filters';
import { selectFilters } from '../redux/filtersSlice';

export default function Home() {
  const { showFiltersWindow } = useSelector(selectFilters);
  return (
    <div className="home-div">
      {
        showFiltersWindow && <Filters />
      }
      <div className="home-content">
        <UserOptions />
        <Table />
      </div>
    </div>
  );
}
