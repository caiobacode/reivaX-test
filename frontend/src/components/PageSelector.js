import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, selectTable } from '../redux';
import previousImg from '../images/previous.png';
import nextImg from '../images/next.png';
import '../style/PageSelector.css';

export default function PageSelector() {
  const { actualPage, filteredDataLength } = useSelector(selectTable);
  const dispatch = useDispatch();

  return (
    <div className="page-selector">
      <button
        type="button"
        className="change-page-btn"
        onClick={() => dispatch(changePage(actualPage - 1))}
        disabled={actualPage - 1 === 0}
      >
        <img
          className="change-page-btn-img"
          alt="previous"
          src={previousImg}
        />
      </button>

      <span className="actual-page-span">{actualPage}</span>

      <button
        type="button"
        className="change-page-btn"
        onClick={() => dispatch(changePage(actualPage + 1))}
        disabled={actualPage * 20 + 1 > filteredDataLength}
        // desabilita se não tiver items suficiente para a próxima página
      >
        <img
          className="change-page-btn-img"
          alt="previous"
          src={nextImg}
        />
      </button>
    </div>
  );
}
