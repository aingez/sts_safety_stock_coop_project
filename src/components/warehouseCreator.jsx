"use client";

import React, { useState, useEffect } from "react";
import WarehouseLayoutDisplay from "../components/layoutDisp";

const WarehouseLayoutEditor = () => {
  const [layoutData, setLayoutData] = useState([]);
  const [jsonOutput, setJsonOutput] = useState("");
  const [rows, setRows] = useState(2); // Default rows
  const [lanes, setLanes] = useState(2); // Default lanes
  const [blockLaneRange, setBlockLaneRange] = useState("1-2");
  const [headLaneRange, setHeadLaneRange] = useState("3-4");
  const [crankshaftLaneRange, setCrankshaftLaneRange] = useState("5-10");

  const handleInputChange = (id, field, value) => {
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

    const warehouseData = {
      rows: Array.from({ length: maxRow }, (_, rowIndex) => ({
        row_number: rowIndex + 1,
        lanes: layoutData
          .filter((item) => item.row === rowIndex + 1)
          .map((item) => ({
            lane_number: item.lane,
            positions: Array.from({ length: item.piles }, (_, pileIndex) => ({
              location: {
                pile: pileIndex + 1,
                layer: 1,
              },
              pallet: generateTestPallet(item.row, item.lane, pileIndex + 1),
            })),
          })),
      })),
    };
    const jsonData = {
      status: "success",
      data: {
        plant: {
          code: "1",
          type: "Engine",
          max_row: maxRow,
          max_lane: maxLane,
          is_active: true,
        },
        layout: {
          block: { lane: blockLaneRange, color: "blue" },
          head: { lane: headLaneRange, color: "yellow" },
          crankshaft: { lane: crankshaftLaneRange, color: "green" },
        },
        warehouse: warehouseData,
      },
    };
    setJsonOutput(JSON.stringify([jsonData, 200], null, 2));
  };

  const updateJsonOnInputChange = () => {
    generateJson();
  };

  useEffect(() => {
    updateJsonOnInputChange();
  }, [layoutData]);

  const generateLayout = () => {
    const newLayoutData = [];
    for (let r = 1; r <= rows; r++) {
      for (let l = 1; l <= lanes; l++) {
        newLayoutData.push({
          id: newLayoutData.length + 1,
          row: r,
          lane: l,
          piles: 1,
        });
      }
    }
    setLayoutData(newLayoutData);
  };

  return (
    <div className="flex flex-row gap-8 p-4">
      <div className="custom-box-2 flex-none">
        <h2 className="custom-box-title-1">Warehouse Layout Editor</h2>

        <div className="my-2 flex flex-row space-x-2">
          <div className="custom-input-layout-1">
            <label>BLock Lane Range</label>
            <input
              type="text"
              className="custom-text-input-1"
              placeholder="1-2"
              defaultValue={blockLaneRange}
              onChange={(e) => setBlockLaneRange(e.target.value)}
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Head Lane Range</label>
            <input
              type="text"
              className="custom-text-input-1"
              placeholder="3-4"
              defaultValue={headLaneRange}
              onChange={(e) => setHeadLaneRange(e.target.value)}
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Crankshaft Lane Range</label>
            <input
              type="text"
              className="custom-text-input-1"
              placeholder="5-10"
              defaultValue={crankshaftLaneRange}
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
          <button onClick={generateLayout} className="custom-button-1-green">
            Generate Layout
          </button>
          {/* <button onClick={addNewRow} className="custom-button-1-pink">
            Add Row
          </button> */}
        </div>

        <table className="w-full bg-neutral-200 dark:bg-neutral-500">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Row</th>
              <th className="border border-gray-300 p-2">Lane</th>
              <th className="border border-gray-300 p-2">Piles</th>
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
      </div>
      <div className="custom-box-2">
        {jsonOutput.length > 10 ? (
          <div>
            <WarehouseLayoutDisplay inputData={JSON.parse(jsonOutput)} />
            {/* {console.log(jsonOutput)} */}
            {/* {console.log("jsonOutput OK")} */}
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-4">
            Loading...
            {/* {console.log("waiting jsonOutput . . .")} */}
          </div>
        )}
      </div>
      <div className="custom-box-2">
        <h2 className="custom-box-title-1">JSON Output</h2>
        <pre className="overflow-auto bg-neutral-200 p-2 dark:bg-neutral-500">
          {jsonOutput}
        </pre>
      </div>
    </div>
  );
};

export default WarehouseLayoutEditor;
