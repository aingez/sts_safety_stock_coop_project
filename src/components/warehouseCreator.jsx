// Dev: Aingthawan K.
// Component : For creating new warehouse with preview.

import { toast } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import WarehouseLayoutDisplay from "./warehouseDisp";
import WarehouseList from "../components/activeWarehouseList";

const WarehouseLayoutEditor = () => {
  const [layoutData, setLayoutData] = useState([]);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [rows, setRows] = useState(2);
  const [lanes, setLanes] = useState(5);
  const [blockLaneRange, setBlockLaneRange] = useState("1-2");
  const [headLaneRange, setHeadLaneRange] = useState("3-3");
  const [crankshaftLaneRange, setCrankshaftLaneRange] = useState("4-5");
  const [plantType, setPlantType] = useState("Engine");
  const [plantNumber, setPlantNumber] = useState("1");
  const [creatorJson, setCreatorJson] = useState("");
  const [refreshWarehouseList, setRefreshWarehouseList] = useState(0);

  const handleClear = () => {
    setLayoutData([]);
    setJsonOutput(null);
    setCreatorJson("");
    setRows(2);
    setLanes(5);
    setBlockLaneRange("1-2");
    setHeadLaneRange("3-3");
    setCrankshaftLaneRange("4-5");
    setPlantType("Engine");
    setPlantNumber("1");
  };

  const handleInputChange = (id, field, value) => {
    // generateCustomJson();
    setLayoutData(
      layoutData.map((item) =>
        item.id === id ? { ...item, [field]: parseInt(value) || 0 } : item,
      ),
    );
  };

  const addNewRow = () => {
    const newId = Math.max(...layoutData.map((item) => item.id), 0) + 1;
    setLayoutData([...layoutData, { id: newId, row: 1, lane: 1, piles: 1 }]);
  };

  const deleteCell = (id) => {
    setLayoutData(layoutData.filter((item) => item.id !== id));
  };

  const generateTestPallet = (row, lane, pile) => {
    const number = `TEST`;
    const status = "yellow";
    return { number, pack_age_status: status };
  };

  const generateJson = () => {
    const maxRow = Math.max(...layoutData.map((item) => item.row), 0);
    const maxLane = Math.max(...layoutData.map((item) => item.lane), 0);
    const maxPile = Math.max(...layoutData.map((item) => item.piles), 0);
    const maxLayer = Math.max(...layoutData.map((item) => item.layer), 0);
    const warehouseData = layoutData.map((item) => ({
      id: item.id,
      row: item.row,
      lane: item.lane,
      max_pile: item.piles,
      max_layer: item.layer,
      current_pallet: [],
    }));

    const jsonData = {
      plat_type: plantType,
      plant_number: plantNumber,
      max_row: maxRow,
      max_lane: maxLane,
      wander_pallet: [],
      free_pallet: [],
      color_layout: {
        block: { lane: blockLaneRange, color: "blue" },
        head: { lane: headLaneRange, color: "yellow" },
        crankshaft: { lane: crankshaftLaneRange, color: "green" },
      },
      layer_1: warehouseData,
    };
    // setJsonOutput(JSON.stringify(jsonData));
    setJsonOutput(jsonData);
  };

  useEffect(() => {
    generateJson();
  }, [
    layoutData,
    rows,
    lanes,
    blockLaneRange,
    headLaneRange,
    crankshaftLaneRange,
    plantType,
    plantNumber,
  ]);

  const generateLayout = () => {
    const newLayoutData = [];
    for (let r = 1; r <= rows; r++) {
      for (let l = 1; l <= lanes; l++) {
        newLayoutData.push({
          id: newLayoutData.length + 1,
          row: r,
          lane: l,
          piles: 1,
          layer: 2,
        });
      }
    }
    setLayoutData(newLayoutData);
  };

  const generateCustomJson = async () => {
    const maxRow = Math.max(...layoutData.map((item) => item.row), 0);
    const maxLane = Math.max(...layoutData.map((item) => item.lane), 0);

    // Group lanes by rows
    const warehousePositions = Array.from(
      { length: maxRow },
      (_, rowIndex) => ({
        row: rowIndex + 1,
        lanes: layoutData
          .filter((item) => item.row === rowIndex + 1)
          .map((item) => ({
            number: item.lane,
            max_pile: item.piles,
            max_layer: item.layer,
          })),
      }),
    );

    // Generate the custom JSON structure
    const customJsonData = {
      data: {
        plant_type: plantType,
        plant_id: plantNumber,
        max_lane: maxLane,
        max_row: maxRow,
        color_layout: {
          block: { lane: blockLaneRange, color: "blue" },
          head: { lane: headLaneRange, color: "yellow" },
          crankshaft: { lane: crankshaftLaneRange, color: "green" },
        },
        is_active: true,
      },
      warehouse: {
        position: warehousePositions,
      },
    };

    // Convert to a pretty JSON string and set it to the output state
    const jsonString = JSON.stringify(customJsonData, null, 2);
    setCreatorJson(jsonString);

    // Submit the data to the API
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/add/bundle`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonString,
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success("Data submitted successfully");
      setRefreshWarehouseList((prev) => prev + 1); // Trigger WarehouseList refresh
      handleClear(); // Only clear after successful submission
    } catch (error) {
      console.error("Failed to submit data:", error);
      toast.error("Failed to submit data");
    }
  };

  return (
    <div className="flex flex-row gap-8 p-4">
      <div className="custom-box-2">
        <WarehouseList key={refreshWarehouseList} />
      </div>
      <div className="custom-box-2 flex-none">
        <h2 className="custom-box-title-1">Warehouse Layout Creator</h2>
        <div className="flex flex-row space-x-2">
          <div className="custom-input-layout-1">
            <label>Plant Type</label>
            <select
              className="custom-text-input-1"
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
            >
              <option value="Engine">Engine</option>
              <option value="Casting">Casting</option>
            </select>
          </div>
          <div className="custom-input-layout-1">
            <label>Plant Number</label>
            <input
              type="number"
              className="custom-text-input-1"
              placeholder="Plant Number"
              value={plantNumber}
              onChange={(e) => setPlantNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="my-2 flex flex-row space-x-2">
          <div className="custom-input-layout-1">
            <label>Block Lane Range</label>
            <input
              type="text"
              className="custom-text-input-1"
              placeholder="1-2"
              value={blockLaneRange}
              onChange={(e) => setBlockLaneRange(e.target.value)}
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Head Lane Range</label>
            <input
              type="text"
              className="custom-text-input-1"
              placeholder="3-4"
              value={headLaneRange}
              onChange={(e) => setHeadLaneRange(e.target.value)}
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Crankshaft Lane Range</label>
            <input
              type="text"
              className="custom-text-input-1"
              placeholder="5-10"
              value={crankshaftLaneRange}
              onChange={(e) => setCrankshaftLaneRange(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <div className="custom-input-layout-1">
            <label>Row</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value) || 0)}
              className="custom-text-input-1"
              placeholder="Number of Rows"
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Lanes</label>
            <input
              type="number"
              value={lanes}
              onChange={(e) => setLanes(parseInt(e.target.value) || 0)}
              className="custom-text-input-1"
              placeholder="Number of Lanes"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={generateLayout} className="custom-button-1-pink">
              Generate
            </button>
            <button
              onClick={generateCustomJson}
              className="custom-button-1-green"
              disabled={layoutData.length === 0}
            >
              Create Layout
            </button>
          </div>
          {/* clear button */}
          <button onClick={handleClear} className="custom-button-1-red">
            Clear
          </button>
        </div>

        {/* hide table if no data */}
        {(layoutData.length > 0 && (
          <table className="w-full bg-neutral-200 dark:bg-neutral-500">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Row</th>
                <th className="border border-gray-300 p-2">Lane</th>
                <th className="border border-gray-300 p-2">Piles</th>
                <th className="border border-gray-300 p-2">Layer</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {layoutData.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.row}
                      onChange={(e) =>
                        handleInputChange(item.id, "row", e.target.value)
                      }
                      className="custom-text-input-1-small max-w-20"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.lane}
                      onChange={(e) =>
                        handleInputChange(item.id, "lane", e.target.value)
                      }
                      className="custom-text-input-1-small max-w-20"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.piles}
                      onChange={(e) =>
                        handleInputChange(item.id, "piles", e.target.value)
                      }
                      className="custom-text-input-1-small max-w-20"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.layer}
                      onChange={(e) =>
                        handleInputChange(item.id, "layer", e.target.value)
                      }
                      className="custom-text-input-1-small max-w-20"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => deleteCell(item.id)}
                      className="custom-button-1-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )) || (
          <div className="flex items-center justify-center space-x-4">
            {/* No data */}
          </div>
        )}
      </div>

      {jsonOutput !== null && (
        <WarehouseLayoutDisplay
          key={JSON.stringify(jsonOutput)}
          inputData={jsonOutput}
        />
      )}
      {/* show jsonOutput */}
      {/* {creatorJson} */}
    </div>
  );
};

export default WarehouseLayoutEditor;
