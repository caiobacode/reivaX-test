import React from 'react';
import Table from '../components/Table';
import { useDispatch } from 'react-redux';
import PageSelector from '../components/PageSelector';
import { setClearTable } from '../redux';

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          type='button'
          onClick={() => dispatch(setClearTable(true))}
        >
          Clear
        </button>
        <PageSelector />
      </div>
      <Table />
    </div>
  )
}
