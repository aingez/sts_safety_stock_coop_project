import React, { useState } from "react";
import ModalComponent from "../components/Modal";

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

const GenerateTable = ({ laneData, plantType, plantNumber }) => {
  const { max_pile, max_layer, current_pallet } = laneData;
  const [enableModal, setEnableModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const fetchModalData = async (plantType, plantNumber, palletName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/pallet/part_list/${plantType}/${plantNumber}/${palletName}`,
      );
      const data = await response.json();
      setModalData(data);
      console.log("Modal data:", data);
      setEnableModal(true);
    } catch (error) {
      console.error("Error fetching modal data:", error);
    }
  };

  const table = Array.from({ length: max_layer }, () =>
    Array(max_pile).fill(null),
  );

  if (Array.isArray(current_pallet)) {
    current_pallet.forEach(({ pile, layer, pallet_name, color }) => {
      table[max_layer - layer][pile - 1] = { pallet_name, color };
    });
  }

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {Array.from({ length: max_pile }).map((_, pileIndex) => (
            <th
              key={pileIndex}
              className="text-left font-light text-gray-400 opacity-30 dark:text-gray-900"
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
                    className={`mx-0.5 w-16 rounded-lg p-1 text-sm font-normal text-white shadow-xl hover:opacity-70 ${statusColors[pallet.color]} active:opacity-50 active:shadow-sm`}
                    title={pallet.pallet_name}
                    onClick={() =>
                      fetchModalData(plantType, plantNumber, pallet.pallet_name)
                    }
                  >
                    {pallet.pallet_name}
                  </button>
                ) : (
                  <button
                    className={`disable mx-0.5 w-16 cursor-not-allowed rounded-lg bg-gray-300 p-1 text-sm font-normal text-white opacity-40 shadow-xl dark:opacity-20`}
                  >
                    MT
                  </button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {enableModal && modalData && (
        <ModalComponent onClose={() => setEnableModal(false)}>
          <div className="p-5">
            <h2 className="mb-2 text-xl font-semibold">Pallet</h2>
            <table>
              <thead className="custom-table-2">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Serial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Pack Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Age (days)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-neutral-200">
                {modalData.data.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.serial}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.type}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.model}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.formatted_pack_date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.age_days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalComponent>
      )}
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
        <LegendItem color={laneColors.blue} label="BLOCK" />
        <LegendItem color={laneColors.yellow} label="HEAD" />
        <LegendItem color={laneColors.green} label="CRANK" />
      </div>

      <div className="mt-5 max-h-screen overflow-x-auto overflow-y-auto">
        <table className="min-w-full p-2">
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
                  {rowIndex + 1}
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
                        <GenerateTable
                          laneData={lane}
                          plantType={plant_type}
                          plantNumber={plant_number}
                        />
                      ) : (
                        <div className="flex h-full items-end px-2 py-1 italic text-gray-400 opacity-20 dark:text-gray-500">
                          Unused
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
