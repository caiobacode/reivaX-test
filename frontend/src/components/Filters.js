/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import '../style/Filters.css';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, turnFiltersWindowOff } from '../redux';
import { applyNewFilters, clearFilters, selectFilters } from '../redux/filtersSlice';
import closeImg from '../media/close.png';

export default function Filters() {
  const { typeFilter, param1Filter, param2Filter } = useSelector(selectFilters);

  const [typesSelected, setTypesSelected] = useState(typeFilter);
  const [param1Range, setParam1Range] = useState(param1Filter);
  const [param2Range, setParam2Range] = useState(param2Filter);

  const dispatch = useDispatch();

  const handleCheckType = ({ target }) => {
    const { value, checked } = target;
    if (checked) {
      const newArray = [...typesSelected, value];
      setTypesSelected(newArray);
    } else {
      const filteredArray = typesSelected.filter((type) => type !== value);
      setTypesSelected(filteredArray);
    }
  };

  const handleChangeParam1 = ({ target }) => {
    const { value, name } = target;
    const isNumber = !isNaN(Number(value));

    if (isNumber) {
      const newRange = { ...param1Range, [name]: value };
      setParam1Range(newRange);
    }
  };

  const handleChangeParam2 = ({ target }) => {
    const { value, name } = target;
    const isNumber = !isNaN(Number(value));

    if (isNumber) {
      const newRange = { ...param2Range, [name]: value };
      setParam2Range(newRange);
    }
  };

  const applyFilters = () => {
    const newFilters = {
      typeFilter: typesSelected,
      param1Filter: param1Range,
      param2Filter: param2Range,
    };
    dispatch(applyNewFilters(newFilters));
    dispatch(turnFiltersWindowOff());
    dispatch(changePage(1));
  };

  return (
    <div className="filters-div">
      <div className="filters-content">
        <div className="window-header-div">
          <h2>Choose your filters</h2>
          <button
            type="button"
            className="close-window-btn"
            onClick={() => dispatch(turnFiltersWindowOff())}
          >
            <img className="close-icon" src={closeImg} alt="close" />
          </button>
        </div>
        <div className="filter-option-div">
          <h3>Type</h3>
          <label htmlFor="type1">
            <input
              type="checkbox"
              className="checkbox-filter"
              name="type1"
              value="type1"
              checked={typesSelected.includes('type1')}
              onChange={handleCheckType}
            />
            Type1
          </label>

          <label htmlFor="type2">
            <input
              type="checkbox"
              className="checkbox-filter"
              name="type2"
              value="type2"
              checked={typesSelected.includes('type2')}
              onChange={handleCheckType}
            />
            Type2
          </label>

          <label htmlFor="type3">
            <input
              type="checkbox"
              className="checkbox-filter"
              name="type3"
              value="type3"
              checked={typesSelected.includes('type3')}
              onChange={handleCheckType}
            />
            Type3
          </label>
        </div>

        <div className="filter-option-div">
          <h3>Param1</h3>
          <label htmlFor="greaterThanNumber">
            Between
            <input
              className="filter-input"
              name="greaterThanNumber"
              type="text"
              value={param1Range.greaterThanNumber || ''}
              onChange={handleChangeParam1}
            />
          </label>
          <label htmlFor="lessThanNumber">
            And
            <input
              className="filter-input"
              name="lessThanNumber"
              type="text"
              value={param1Range.lessThanNumber || ''}
              onChange={handleChangeParam1}
            />
          </label>
        </div>

        <div className="filter-option-div">
          <h3>Param2</h3>
          <label htmlFor="greaterThanNumber">
            Between
            <input
              className="filter-input"
              name="greaterThanNumber"
              type="text"
              value={param2Range.greaterThanNumber || ''}
              onChange={handleChangeParam2}
            />
          </label>
          <label htmlFor="lessThanNumber">
            And
            <input
              className="filter-input"
              name="lessThanNumber"
              type="text"
              value={param2Range.lessThanNumber || ''}
              onChange={handleChangeParam2}
            />
          </label>
        </div>
        <div className="btns-div">
          <button
            type="button"
            className="clear-filters-btn"
            onClick={() => dispatch(clearFilters())}
          >
            Clear Filters
          </button>

          <button
            type="button"
            className="apply-btn"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
