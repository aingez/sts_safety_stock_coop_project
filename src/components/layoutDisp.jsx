import React from "react";
import mockData from "../components/testing_data/warehouseDashMock_2.json";

// legend items helper
function LegendItem({ color, label }) {
  return (
    <div className="flex items-center space-x-2 rounded-lg bg-white p-2 shadow-xl dark:bg-neutral-500">
      <div
        className={`h-6 w-6 rounded-full border-solid shadow-inner ${color}`}
      ></div>
      <span className="text-sm text-gray-700 dark:text-white">{label}</span>
    </div>
  );
}

// Pallet status color config
const statusColors = {
  green: "bg-[#84cc16]", // Hex for green
  yellow: "bg-[#f59e0b]", // Hex for yellow
  red: "bg-[#FF1700]", // Hex for red
};
// Lane color config
const laneColors = {
  blue: "bg-[#DFF5FF]",
  yellow: "bg-[#FEECB3]",
  green: "bg-[#75ffbc]",
};

function generateColorLUT(data) {
  const result = [];

  Object.values(data).forEach(({ lane, color }) => {
    // Split the lane string into start and end numbers
    const [start, end] = lane.split("-").map(Number);

    // Push the color into the result array for each number in the range
    for (let i = start; i <= end; i++) {
      result.push(color);
    }
  });

  return result;
}

function LayoutComp() {
  const { plant, warehouse, layout } = mockData[0].data;
  const laneColorLUT = generateColorLUT(layout);

  return (
    <div className="flex flex-col p-10">
      <div>
        <h1 className="custom-box-title-2">Safety Stock :</h1>
        <p className="custom-box-title-4">
          {plant.type} Plant {plant.code}
        </p>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        <LegendItem color={laneColors.blue} label="Block Lane (Max : 2)" />
        <LegendItem color={laneColors.yellow} label="Head Lane (Max : 2)" />
        <LegendItem
          color={laneColors.green}
          label="Crankshaft Lane (Max : 2)"
        />
      </div>

      <div className="mt-5 flex items-center space-x-2 rounded-lg bg-white p-2 shadow-xl dark:bg-neutral-500">
        {/* Wrapping the table with a scrollable container */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate rounded-lg bg-white p-2 dark:bg-neutral-500">
            <thead className="bg-neutral-300 dark:bg-neutral-400">
              <tr>
                <th className="border-none p-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  Row
                </th>
                {[...Array(plant.max_lane)].map((_, index) => (
                  <th
                    key={index}
                    className="border-none p-3 text-left font-medium text-gray-700 dark:text-gray-300"
                    style={{
                      width: `calc(100% / ${plant.max_lane})`, // Responsive width based on total lanes
                    }}
                  >
                    Lane {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {warehouse.rows.map((row) => (
                <tr key={row.row_number}>
                  <td className="p-3 font-medium text-gray-700 dark:text-gray-300">
                    {row.row_number}
                  </td>
                  {[...Array(plant.max_lane)].map((_, laneIndex) => {
                    const lane = row.lanes.find(
                      (l) => l.lane_number === laneIndex + 1,
                    );
                    const rawLaneColor = laneColorLUT[laneIndex];
                    // Map raw lane color to the lane color config
                    const laneColor = laneColors[rawLaneColor] || "bg-white";

                    return (
                      <td
                        key={laneIndex}
                        className={`p-3 ${laneColor} space-y-1 rounded-md dark:border-gray-600 dark:bg-opacity-60`}
                        style={{
                          verticalAlign: "bottom",
                          width: `calc(100% / ${plant.max_lane})`,
                          maxWidth: "150px", // Limit maximum width to maintain responsiveness
                        }}
                      >
                        {lane ? (
                          lane.positions.map((position) => (
                            <div
                              key={`${position.location.row}-${position.location.lane}-${position.location.layer}`}
                              className="flex justify-center"
                            >
                              <button
                                disabled
                                className={`rounded-lg px-2 py-1 text-sm font-normal text-white shadow-md ${statusColors[position.pallet.pack_age_status]}`}
                              >
                                {position.pallet.number}
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center justify-center px-2 py-1 italic text-gray-400 opacity-20 dark:text-gray-500">
                            EMPTY
                          </div>
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
    </div>
  );
}

export default LayoutComp;
