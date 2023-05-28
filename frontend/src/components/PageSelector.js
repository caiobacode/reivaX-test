import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, selectTable } from '../redux';

export default function PageSelector() {
  const { data, actualPage } = useSelector(selectTable);
  const dispatch = useDispatch();

  const switchPage = (newPage) => {
    dispatch(changePage(newPage))
  };

  return (
    <div>
      <button
        type='button'
        onClick={() => switchPage(actualPage - 1)}
        disabled={actualPage - 1 === 0}
      >
        Previous page
      </button>
      <span>{actualPage}</span>
      <button
        type='button'
        onClick={() => switchPage(actualPage + 1)}
        disabled={actualPage * 20 + 1 > data.length}
      >
        Next page
      </button>
    </div>
  );
};
