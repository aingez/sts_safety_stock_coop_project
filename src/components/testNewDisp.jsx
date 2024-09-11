import React from "react";

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

const statusColors = {
  green: "bg-[#84cc16]",
  yellow: "bg-[#f59e0b]",
  red: "bg-[#FF1700]",
};

const laneColors = {
  blue: "bg-[#DFF5FF]",
  yellow: "bg-[#FEECB3]",
  green: "bg-[#75ffbc]",
};

const GenerateTable = ({ laneData }) => {
  const { max_pile, max_layer, current_pallet } = laneData;

  // Create a 2D array for table representation
  const table = Array.from({ length: max_layer }, () =>
    Array(max_pile).fill(null),
  );

  // Check if current_pallet is an array and populate the table accordingly
  if (Array.isArray(current_pallet)) {
    current_pallet.forEach(({ pile, layer, pallet_name, color_status }) => {
      table[max_layer - layer][pile - 1] = { pallet_name, color_status };
    });
  }

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {Array.from({ length: max_pile }).map((_, pileIndex) => (
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
                    className={`mx-0.5 w-16 rounded-lg p-1 text-sm font-normal text-white shadow-xl ${statusColors[pallet.color_status]}`}
                    title={pallet.pallet_name}
                  >
                    {pallet.pallet_name}
                  </button>
                ) : (
                  <div className="mx-0.5 w-16 rounded-lg border-2 border-dashed border-neutral-900 py-1 text-center text-sm font-light text-neutral-900 opacity-30">
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

const generateColorLUT = (layout) => {
  const result = [];
  Object.values(layout).forEach(({ lane, color }) => {
    const [start, end] = lane.split("-").map(Number);
    for (let i = start; i <= end; i++) {
      result.push(color);
    }
  });
  return result;
};

const LayoutDisplayTest = ({ inputData }) => {
  const { plant_type, plant_number, max_row, max_lane, color_layout, layer_1 } =
    inputData;
  const laneColorLUT = generateColorLUT(color_layout);

  return (
    <div className="flex flex-col p-4 md:p-10">
      <div>
        <h1 className="custom-box-title-2">Safety Stock :</h1>
        <p className="custom-box-title-4">
          {plant_type} Plant {plant_number}
        </p>
      </div>

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
                {/* Row */}
              </th>
              {[...Array(max_lane)].map((_, index) => (
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
            {Array.from({ length: max_row }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border-none p-3 text-center font-light text-gray-700 dark:text-gray-300">
                  Row {rowIndex + 1}
                </td>
                {[...Array(max_lane)].map((_, laneIndex) => {
                  const lane = layer_1.find(
                    (l) => l.row === rowIndex + 1 && l.lane === laneIndex + 1,
                  );
                  const rawLaneColor = laneColorLUT[laneIndex];
                  const laneColor = laneColors[rawLaneColor] || "bg-white";

                  return (
                    <td
                      key={laneIndex}
                      className={`p-2 ${laneColor} space-y-1 border-2 border-gray-300 align-bottom dark:border-gray-500 dark:bg-opacity-60`}
                    >
                      {lane ? (
                        <GenerateTable laneData={lane} />
                      ) : (
                        <div className="flex h-full items-end px-2 py-1 italic text-gray-400 opacity-20 dark:text-gray-500">
                          MT
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

export default LayoutDisplayTest;
