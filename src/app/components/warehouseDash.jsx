// className="rounded px-2 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-700/20"
// import { React,useState } from 'react'
import { React } from 'react'
import warehouseData from '../components/testing_data/warehouseDashMock.json'

// Helper function to determine the color based on the status
function getColorFromStatus(status) {
  switch (status) {
    case 'green':
      return '#84cc16';
    case 'yellow':
      return '#f59e0b';
    case 'red':
      return '#FF1700';
    default:
      return 'gray'; // Default color if status is unknown
  }
}

function WarehouseTable() {
  const { warehouse, plant } = warehouseData;

  return (
    <div class="p-4 rounded flex flex-col">
        <div class="flex flex-row">
            <h1 class="font-bold pr-2">Safety Stock :</h1>
            <p class="font-light">{plant.type} Plant {plant.code}</p>
        </div>

        <div class="flex flex-row pt-5">
            <p class="font-thin text-xs pr-2 pt-5 place-content-top">LANE</p>
            <div>
                <p class="font-thin text-xs pr-2 ">ROW</p>
                <table border="1" cellPadding="10">
                    <tbody>
                    {warehouse.lanes.map((lane, laneIndex) => (
                        <tr key={laneIndex}>

                        {lane.rows.map((row, rowIndex) => (
                            <td key={rowIndex} class='px-3'>
                            <p class="font-thin text-xs opacity-60">LN.{laneIndex + 1} Row{rowIndex + 1}</p>
                            {row.positions.length > 0 ? (
                            // Stack buttons inside lane-row cell
                            row.positions.slice().reverse().map((position, posIndex) => (
                                <div key={posIndex} class="flex flex-col my-0.5">
                                  <button
                                      style={{
                                      backgroundColor: getColorFromStatus(position.pallet.pack_age_status),
                                      }}
                                      className="rounded px-4 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-700/20"
                                  >
                                      {position.pallet.number}

                                      <p className='text-xs opacity-30 pb-1'>
                                          LYR.{position.location.layer}
                                      </p>

                                  </button>
                                </div>
                            ))
                            ) : (
                            <button
                                style={{
                                backgroundColor: 'gray',
                                }}
                                className="rounded px-4 bg-indigo-500 opacity-10"
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
        </div>

    </div>
  );
}

export default WarehouseTable;
