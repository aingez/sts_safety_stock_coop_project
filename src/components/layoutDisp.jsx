import React from "react";

// Legend items helper
const LegendItem = ({ color, label }) => {
  return (
    <div className="flex items-center space-x-2 rounded-lg bg-white p-2 shadow-xl dark:bg-neutral-500">
      <div
        className={`h-6 w-6 rounded-full border-solid shadow-inner ${color}`}
      ></div>
      <span className="text-sm text-gray-700 dark:text-white">{label}</span>
    </div>
  );
};

// Pallet status color config
const statusColors = {
  green: "bg-[#84cc16]",
  yellow: "bg-[#f59e0b]",
  red: "bg-[#FF1700]",
};

// Lane color config
const laneColors = {
  blue: "bg-[#DFF5FF]",
  yellow: "bg-[#FEECB3]",
  green: "bg-[#75ffbc]",
};

// GenerateTable component
const GenerateTable = ({ data }) => {
  // Determine the maximum pile and layer number
  let maxPile = 0;
  let maxLayer = 0;

  data.positions.forEach((position) => {
    const { pile, layer } = position.location;
    if (pile > maxPile) maxPile = pile;
    if (layer > maxLayer) maxLayer = layer;
  });

  // Create a 2D array to represent the table
  const table = Array.from({ length: maxLayer }, () =>
    Array(maxPile).fill(null),
  );

  // Fill the table with pallet data
  data.positions.forEach((position) => {
    const { pile, layer } = position.location;
    const pallet = position.pallet;
    table[maxLayer - layer][pile - 1] = pallet;
  });

  return (
    <table className="min-w-full">
      {/* column label for debug */}
      <thead>
        <tr>
          {Array.from({ length: maxPile }).map((_, pileIndex) => (
            <th
              key={pileIndex}
              className="text-left font-light text-gray-400 opacity-20 dark:text-gray-500"
            >
              {pileIndex + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((pallet, colIndex) => (
              <td key={colIndex}>
                {pallet ? (
                  <button
                    className={`mx-0.5 min-w-16 rounded-lg p-1 text-sm font-normal text-white shadow-xl ${
                      statusColors[pallet.pack_age_status] || "bg-red-500"
                    }`}
                    title={pallet.number}
                  >
                    {pallet.number}
                  </button>
                ) : (
                  <div className="mx-0.5 min-w-16 rounded-lg border-2 border-dashed border-neutral-400 py-1 text-center text-sm font-light text-neutral-400 opacity-20 dark:opacity-100">
                    MT
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Generate Color LUT
const generateColorLUT = (layout) => {
  const result = [];
  Object.values(layout).forEach(({ lane, color }) => {
    // Split the lane string into start and end numbers
    const [start, end] = lane.split("-").map(Number);

    // Push the color into the result array for each number in the range
    for (let i = start; i <= end; i++) {
      result.push(color);
    }
  });

  return result;
};

// LayoutComp component
const LayoutComp = ({ inputData }) => {
  console.log("LayoutComp inputData");
  console.log(inputData.data);
  console.log(inputData[0].data);
  const { plant, warehouse, layout } = inputData[0].data;
  const laneColorLUT = generateColorLUT(layout);

  return (
    <div className="flex flex-col p-4 md:p-10">
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

      <div className="custom-box-2 mt-5 overflow-x-auto">
        <table className="p-2">
          <thead>
            <tr>
              <th className="p-3 text-left font-light text-gray-700 dark:text-gray-300">
                Row
              </th>
              {[...Array(plant.max_lane)].map((_, index) => (
                <th
                  key={index}
                  className="border-none p-3 text-center font-light text-gray-700 dark:text-gray-300"
                >
                  Lane {index + 1}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {warehouse.rows.map((row) => (
              <tr key={row.row_number}>
                <td className="p-3 text-center align-middle font-medium text-gray-700 dark:text-gray-300">
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
                    // cell
                    <td
                      key={laneIndex}
                      className={`p-2 ${laneColor} space-y-1 border-2 border-gray-300 dark:border-gray-500 dark:bg-opacity-60`}
                      style={{
                        verticalAlign: "bottom",
                        width: `calc(100% / ${plant.max_lane})`,
                        // maxWidth: "150px", // Limit maximum width to maintain responsiveness
                      }}
                    >
                      {lane ? (
                        <GenerateTable data={lane} />
                      ) : (
                        <div className="flex px-2 py-1 italic text-gray-400 opacity-20 dark:text-gray-500">
                          Empty
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
  );
};

export default LayoutComp;
