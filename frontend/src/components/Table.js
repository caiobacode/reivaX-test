import React from 'react';
import { useSelector } from 'react-redux';
import { selectTable } from '../redux/tableSlice';
import { getDataFromActualPage } from '../utils';

export default function Table() {
  const { data, actualPage } = useSelector(selectTable);
  const dataFromActualPage = getDataFromActualPage(data, actualPage);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Param1</th>
            <th>Param2</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            dataFromActualPage?.map((d, index) => {
              return (
                <tr key={index}>
                  <td>{d.type}</td>
                  <td>{d.param1}</td>
                  <td>{d.param2}</td>
                  <td>{d.timestamp}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};
