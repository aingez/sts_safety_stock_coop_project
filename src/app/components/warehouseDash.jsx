// className="rounded px-2 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-700/20"
// import { React,useState } from 'react'
import { React } from 'react'
import warehouseData from './testing_data/warehouseDashMock.json'

export default function WarehouseTable() {
  const { warehouse } = warehouseData;

  return (
    <div>
      <h1>Warehouse Layout</h1>
      <table border="1" cellPadding="10">
        <tbody>
          {warehouse.lanes.map((lane, laneIndex) => (
            <tr key={laneIndex}>

              {lane.rows.map((row, rowIndex) => (
                <td key={rowIndex} className='p-5'>
                  {row.positions.length > 0 ? (
                    row.positions.map((position, posIndex) => (
                      <button
                        key={posIndex}
                        style={{
                          backgroundColor: getColorFromStatus(position.pallet.pack_age_status),
                        }}
                        className="rounded px-4 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-700/20"
                      >
                        {position.pallet.number}
                      </button>
                    ))
                  ) : (
                    <button
                      className="rounded px-2 shadow-sm "
                      disabled
                    >
                      Empty
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper function to determine the color based on the status
function getColorFromStatus(status) {
  switch (status) {
    case 'green':
      return '#84cc16';
    case 'yellow':
      return '#f59e0b';
    case 'red':
      return '#b91c1c';
    default:
      return 'gray'; // Default color if status is unknown
  }
}
