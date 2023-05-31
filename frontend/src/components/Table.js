import React from 'react';
import { useSelector } from 'react-redux';
import { selectTable, selectFilters } from '../redux';
import { applyFilters, formatDate, getDataFromActualPage } from '../utils';
import '../style/Table.css'

export default function Table() {
  const { data, actualPage } = useSelector(selectTable);
  const filters = useSelector(selectFilters);

  const dataFiltered = applyFilters(data, filters);
  const dataFromActualPage = getDataFromActualPage(dataFiltered, actualPage);
  return (
    <table className='content-table'>
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
          dataFromActualPage?.map((d, index) => {
            return (
              <tr key={index}>
                <td className='type-td'>{d.type}</td>
                <td>{d.param1}</td>
                <td>{d.param2}</td>
                <td>{formatDate(d.timestamp)}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};
