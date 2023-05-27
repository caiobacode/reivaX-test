import React from 'react'

export default function Table() {
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
          // data.map((d) => {
          //   return (
          //     <tr>
          //       <td>{d.type}</td>
          //       <td>{d.param1}</td>
          //       <td>{d.param2}</td>
          //       <td>{d.timestamp}</td>
          //     </tr>
          //   )
          // })
        }
      </table>
    </div>
  )
}
