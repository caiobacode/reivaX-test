import React from 'react'
import { useSelector } from 'react-redux';
import { selectTable } from '../redux/tableSlice';

export default function Table() {
  const { data } = useSelector(selectTable);
  return (
    <div>
      <table>
        <tr>
          <th>Type</th>
          <th>Param1</th>
          <th>Param2</th>
          <th>Date</th>
        </tr>
        {
          data?.map((d) => {
            return (
              <tr>
                <td>{d.type}</td>
                <td>{d.param1}</td>
                <td>{d.param2}</td>
                <td>{d.timestamp}</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
};
