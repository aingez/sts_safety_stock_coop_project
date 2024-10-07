import React, { useState } from "react";
import ModalComponent from "../components/Modal";
import { PackageOpen } from "lucide-react";
import { toast } from "react-hot-toast";

const statusColors = {
  green: "bg-[#84cc16]",
  yellow: "bg-[#f59e0b]",
  red: "bg-[#FF1700]",
};

const laneColors = {
  blue: "bg-sky-200 dark:bg-sky-600",
  yellow: "bg-amber-200 dark:bg-yellow-600",
  green: "bg-lime-200 dark:bg-emerald-600",
};

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

const ModalContent = ({ data, palletName }) => (
  <div className="p-5">
    <h2 className="mb-2 text-xl font-bold text-neutral-800">
      Pallet: {palletName}
    </h2>
    <table>
      <thead className="custom-table-2">
        <tr>
          {["Serial", "Type: Model", "Pack Date", "Day"].map((header) => (
            <th
              key={header}
              className="bg-neutral-500 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-400 bg-neutral-300">
        {data?.map(
          ({ serial, type, model, formatted_pack_date, age_days }, index) => (
            <tr key={index}>
              {[serial, `${type}: ${model}`, formatted_pack_date, age_days].map(
                (value, i) => (
                  <td
                    key={i}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                  >
                    {value}
                  </td>
                ),
              )}
            </tr>
          ),
        )}
      </tbody>
    </table>
  </div>
);

const fetchModalData = async (plantType, plantNumber, palletName) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet/part_list/${plantType}/${plantNumber}/${palletName}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching modal data:", error);
  }
};

const GenerateUnpositionedTable = ({
  pallet_name,
  pallet_color,
  plantType,
  plantNumber,
  model,
}) => {
  const [enableModal, setEnableModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  return (
    <div>
      <button
        className={`h-12 w-14 rounded-lg p-1 text-sm font-bold text-neutral-800 shadow-xl hover:opacity-70 ${statusColors[pallet_color]} active:opacity-50 active:shadow-sm`}
        title={pallet_name}
        onClick={async () => {
          const data = await fetchModalData(
            plantType,
            plantNumber,
            pallet_name,
          );
          setModalData(data);
          setEnableModal(true);
          sessionStorage.setItem("palletName", pallet_name);
        }}
      >
        <div className="overflow-auto rounded-lg bg-neutral-200 font-normal text-neutral-800 shadow-inner shadow-neutral-500">
          {model}
        </div>
        {pallet_name}
      </button>
      <div>
        {enableModal && modalData && (
          <ModalComponent
            onClose={() => {
              setEnableModal(false);
              sessionStorage.removeItem("palletName");
            }}
          >
            <ModalContent data={modalData.data} palletName={pallet_name} />
          </ModalComponent>
        )}
      </div>
    </div>
  );
};

const GenerateEmptyPallet = ({ pallet_name }) => {
  return (
    <button
      disabled
      // className={`h-12 w-14 rounded-lg bg-neutral-600 text-neutral-200 shadow-inner shadow-neutral-700`}
      className={`h-12 w-14 rounded-lg bg-neutral-600 p-1 text-sm font-bold text-white shadow-xl hover:opacity-70 active:opacity-50 active:shadow-sm`}
    >
      {/* <div className="-rotate-45 transform">{pallet_name}</div> */}
      <div className="overflow-auto rounded-lg bg-neutral-500 font-normal text-neutral-600 shadow-inner shadow-neutral-400">
        MT
      </div>
      {pallet_name}
    </button>
  );
};

const GenerateTable = ({ laneData, plantType, plantNumber, Row, Lane }) => {
  const { max_pile, max_layer, current_pallet } = laneData;
  const [enableModal, setEnableModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const table = Array.from({ length: max_layer }, () =>
    Array(max_pile).fill(null),
  );

  if (Array.isArray(current_pallet)) {
    current_pallet.forEach(
      ({ pile, layer, pallet_name, color, current_model }) => {
        table[max_layer - layer][pile - 1] = {
          pallet_name,
          color,
          current_model,
        };
      },
    );
  }

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            {Array.from({ length: max_pile }).map((_, pileIndex) => (
              <th
                key={pileIndex}
                className="text-center font-light text-neutral-800 opacity-30 dark:text-gray-100"
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
                <td key={colIndex} className="text-left">
                  {pallet ? (
                    <button
                      className={`h-12 w-14 rounded-lg p-1 text-sm font-bold text-neutral-800 shadow-xl hover:opacity-70 ${statusColors[pallet.color]} active:opacity-50 active:shadow-sm`}
                      title={pallet.pallet_name}
                      onClick={async () => {
                        const data = await fetchModalData(
                          plantType,
                          plantNumber,
                          pallet.pallet_name,
                        );
                        setModalData(data);
                        setEnableModal(true);
                        sessionStorage.setItem(
                          "palletName",
                          pallet.pallet_name,
                        );
                      }}
                    >
                      <div className="flex flex-col">
                        <div className="overflow-auto rounded-lg bg-neutral-200 font-normal text-neutral-800 shadow-inner shadow-neutral-500">
                          {pallet.current_model}
                        </div>
                        {pallet.pallet_name}
                      </div>
                    </button>
                  ) : (
                    <button
                      // disabled
                      className={`disable:dark:opacity-20 h-12 w-14 rounded-lg bg-neutral-200 p-1 text-sm font-bold text-white opacity-30 shadow-xl hover:opacity-60 active:opacity-20 dark:bg-neutral-300`}
                      onClick={() => {
                        sessionStorage.setItem("mtRow", Row + 1);
                        sessionStorage.setItem("mtLane", Lane + 1);
                        sessionStorage.setItem("mtPile", colIndex + 1);
                        sessionStorage.setItem("mtLayer", max_layer - rowIndex);
                      }}
                    >
                      <div style={{ transform: "rotate(-45deg)" }}>MT</div>
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {enableModal && modalData && (
        <ModalComponent
          onClose={() => {
            setEnableModal(false);
            sessionStorage.removeItem("palletName");
          }}
        >
          <ModalContent data={modalData.data} palletName={modalData.pallet} />
        </ModalComponent>
      )}
    </>
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

const WarehouseLayoutDisplay = ({ inputData }) => {
  const {
    plant_type,
    plant_number,
    max_row,
    max_lane,
    color_layout,
    layer_1,
    wander_pallet,
    free_pallet,
  } = inputData;
  const laneColorLUT = generateColorLUT(color_layout);

  return (
    <div className="flex flex-col gap-2 p-4 md:p-10">
      <div className="flex flex-col gap-4">
        <h1 className="custom-box-title-4">
          {plant_type} Plant No.{plant_number}
        </h1>
        <div className="flex flex-wrap gap-4">
          <LegendItem color={laneColors.blue} label="BLOCK" />
          <LegendItem color={laneColors.yellow} label="HEAD" />
          <LegendItem color={laneColors.green} label="CRANK" />
        </div>
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
                          Row={rowIndex}
                          Lane={laneIndex}
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
      {wander_pallet && wander_pallet.length > 0 && (
        <div className="custom-display-box-3 grow">
          <div className="flex flex-row space-x-2 overflow-auto overflow-scroll">
            <PackageOpen size={24} />
            <h2 className="pb-2 text-left text-lg font-bold">Dock</h2>
          </div>
          <div className="flex flex-row gap-2">
            {wander_pallet.map(({ pallet_name, color, current_model }) => (
              <GenerateUnpositionedTable
                key={pallet_name}
                pallet_name={pallet_name}
                pallet_color={color}
                plantType={plant_type}
                plantNumber={plant_number}
                model={current_model}
              />
            ))}
          </div>
        </div>
      )}
      {free_pallet && free_pallet.length > 0 && (
        <div className="custom-display-box-3 grow">
          <h2 className="pb-2 text-left text-lg font-bold">Free Pallet</h2>
          <div className="flex flex-row gap-2">
            {free_pallet.map(({ pallet_name }) => (
              <GenerateEmptyPallet
                key={pallet_name}
                pallet_name={pallet_name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseLayoutDisplay;
