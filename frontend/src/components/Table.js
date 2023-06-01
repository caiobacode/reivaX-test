import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTable, selectFilters, setFilteredDataLength } from '../redux';
import { applyFilters, formatDate, getDataFromActualPage } from '../utils';
import '../style/Table.css';

export default function Table() {
  const { data, actualPage, filteredDataLength } = useSelector(selectTable);
  const filters = useSelector(selectFilters);

  const dispatch = useDispatch();

  const dataFiltered = applyFilters(data, filters);
  const dataFromActualPage = getDataFromActualPage(dataFiltered, actualPage);

  useEffect(() => {
    // colocamos esse "if" para evitar loops
    if (filteredDataLength !== dataFiltered.length) {
      dispatch(setFilteredDataLength(dataFiltered.length));
    }
  }, [dataFiltered, filteredDataLength, dispatch]);

  return (
    <table className="content-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Param 1</th>
          <th>Param 2</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          dataFromActualPage?.map((d, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              <td className="type-td">{d.type}</td>
              <td>{d.param1}</td>
              <td>{d.param2}</td>
              <td>{formatDate(d.timestamp)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
