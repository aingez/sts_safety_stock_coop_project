import React from "react";
import mockData from "../../components/testing_data/warehouseDashMock_2.json";

const statusColors = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

function LayoutComp() {
  const { plant, warehouse, layout } = mockData[0].data;

  return (
    <div className="flex min-h-screen flex-col p-4">
      <div>
        <h1 className="pr-2 font-bold">Safety Stock :</h1>
        <p className="font-light">
          {plant.type} Plant {plant.code}
        </p>
      </div>

      <div className="mt-4">
        <table className="w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Row</th>
              {[...Array(plant.max_lane)].map((_, index) => (
                <th key={index} className="border border-gray-300 p-2">
                  Lane {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {warehouse.rows.map((row) => (
              <tr key={row.row_number}>
                <td className="border border-gray-300 p-2">{row.row_number}</td>
                {[...Array(plant.max_lane)].map((_, laneIndex) => {
                  const lane = row.lanes.find(
                    (l) => l.lane_number === laneIndex + 1,
                  );
                  const laneColor = getLaneColor(layout, laneIndex + 1);
                  return (
                    <td
                      key={laneIndex}
                      className={`border border-gray-300 p-2 ${laneColor}`}
                    >
                      {lane ? (
                        lane.positions.map((position) => (
                          <div
                            key={`${position.location.row}-${position.location.lane}-${position.location.layer}`}
                          >
                            <button
                              className={`m-1 px-2 py-1 text-white ${statusColors[position.pallet.pack_age_status]}`}
                            >
                              {position.pallet.number}
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="flex h-full w-full items-center justify-center opacity-20"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getLaneColor(layout, laneNumber) {
  if (laneNumber >= 1 && laneNumber <= 4) {
    return `bg-${layout.block.color}-200`;
  } else if (laneNumber >= 5 && laneNumber <= 7) {
    return `bg-${layout.head.color}-200`;
  } else if (laneNumber >= 8 && laneNumber <= 10) {
    return `bg-${layout.crankshaft.color}-200`;
  }
  return "bg-white";
}

export default LayoutComp;
