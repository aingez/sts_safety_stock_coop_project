// className="rounded px-2 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-700/20"
// import { React,useState } from 'react'
import { React } from "react";
import warehouseData from "../components/testing_data/warehouseDashMock.json";

// Helper function to determine the color based on the status
function getColorFromStatus(status) {
  switch (status) {
    case "green":
      return "#84cc16";
    case "yellow":
      return "#f59e0b";
    case "red":
      return "#FF1700";
    default:
      return "gray"; // Default color if status is unknown
  }
}

function WarehouseTable() {
  const { warehouse, plant } = warehouseData;

  return (
    <div class="flex flex-col rounded p-4">
      <div class="flex flex-row">
        <h1 class="pr-2 font-bold">Safety Stock :</h1>
        <p class="font-light">
          {plant.type} Plant {plant.code}
        </p>
      </div>

      <div class="flex flex-row pt-5">
        <p class="place-content-top pr-2 pt-5 text-xs font-thin">LANE</p>
        <div>
          <p class="pr-2 text-xs font-thin">ROW</p>
          <table border="1" cellPadding="10">
            <tbody>
              {warehouse.lanes.map((lane, laneIndex) => (
                <tr key={laneIndex}>
                  {lane.rows.map((row, rowIndex) => (
                    <td key={rowIndex} class="px-3">
                      <p class="text-xs font-thin opacity-60">
                        LN.{laneIndex + 1} Row{rowIndex + 1}
                      </p>
                      {row.positions.length > 0 ? (
                        // Stack buttons inside lane-row cell
                        row.positions
                          .slice()
                          .reverse()
                          .map((position, posIndex) => (
                            <div key={posIndex} class="my-0.5 flex flex-col">
                              <button
                                style={{
                                  backgroundColor: getColorFromStatus(
                                    position.pallet.pack_age_status,
                                  ),
                                }}
                                className="rounded px-4 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-700/20"
                              >
                                {position.pallet.number}

                                <p className="pb-1 text-xs opacity-30">
                                  LYR.{position.location.layer}
                                </p>
                              </button>
                            </div>
                          ))
                      ) : (
                        <button
                          style={{
                            backgroundColor: "gray",
                          }}
                          className="rounded bg-indigo-500 px-4 opacity-10"
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
