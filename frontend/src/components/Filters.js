import React, { useState } from 'react';
import '../style/Filters.css';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, turnFiltersWindowOff } from '../redux';
import { applyNewFilters, selectFilters } from '../redux/filtersSlice';

export default function Filters() {
  const { typeFilter } = useSelector(selectFilters);

  const [typesSelected, setTypesSelected] = useState(typeFilter);

  const dispatch = useDispatch();

  const handleCheckType = ({ target }) => {
    const { value, checked } = target;
    if (checked) {
      const newArray = [ ...typesSelected, value];
      setTypesSelected(newArray)
    } else {
      const filteredArray = typesSelected.filter((type) => type !== value);
      setTypesSelected(filteredArray)
    }
  };

  const applyFilters = () => {
    const newFilters = {
      typeFilter: typesSelected
    }
    dispatch(applyNewFilters(newFilters));
    dispatch(turnFiltersWindowOff());
    dispatch(changePage(1));
  }

  return (
    <div className='filters-div'>
      <button
        type='button'
        onClick={() => dispatch(turnFiltersWindowOff())}
      >
        Close
      </button>
      <div>
        <h3>Types</h3>
        <label htmlFor='type1' >
          <input
            type='checkbox'
            name='type1'
            value='type1'
            checked={typesSelected.includes('type1')}
            onChange={handleCheckType}
          >
          </input>
          Type1
        </label>

        <label htmlFor='type2' >
          <input
            type='checkbox'
            name='type2'
            value='type2'
            checked={typesSelected.includes('type2')}
            onChange={handleCheckType}
          >
          </input>
          Type2
        </label>

        <label htmlFor='type3' >
          <input
            type='checkbox'
            name='type3'
            value='type3'
            checked={typesSelected.includes('type3')}
            onChange={handleCheckType}
          >
          </input>
          Type3
        </label>
      </div>
      <button
        type='button'
        onClick={applyFilters}
      >
        Apply
      </button>
    </div>
  )
}
