"use client";

import React, { useState, useEffect } from "react";
import WarehouseLayoutDisplay from "../../components/layoutDisp";
import testData from "../../components/testing_data/warehouseDashMock_2.json";

const WarehouseLayoutEditor = () => {
  const [layoutData, setLayoutData] = useState([
    { id: 1, row: 1, lane: 1, piles: 2 },
    { id: 2, row: 2, lane: 1, piles: 1 },
  ]);
  const [jsonOutput, setJsonOutput] = useState("");
  const handleInputChange = (id, field, value) => {
    setLayoutData(
      layoutData.map((item) =>
        item.id === id ? { ...item, [field]: parseInt(value) || 0 } : item,
      ),
    );
  };

  const addNewRow = () => {
    const newId = Math.max(...layoutData.map((item) => item.id)) + 1;
    setLayoutData([...layoutData, { id: newId, row: 1, lane: 1, piles: 1 }]);
  };

  const generateTestPallet = (row, lane, pile) => {
    const types = ["BL", "CR", "HE", "CM"];
    const type = types[Math.floor(Math.random() * types.length)];
    const number = `${type}${String(row).padStart(2, "0")}${String.fromCharCode(65 + lane - 1)}`;
    const statuses = ["red", "yellow", "green"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    return { number, pack_age_status: status };
  };
  const generateJson = () => {
    const maxRow = Math.max(...layoutData.map((item) => item.row));
    const maxLane = Math.max(...layoutData.map((item) => item.lane));

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
          block: { lane: "1-2", color: "blue" },
          head: { lane: "3-8", color: "yellow" },
          crankshaft: { lane: "9-10", color: "green" },
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

  useEffect(() => {
    // console.log(jsonOutput);
  }, [jsonOutput]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Warehouse Layout Editor
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Row
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Lane
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Piles
              </th>
            </tr>
          </thead>
          <tbody>
            {layoutData.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <input
                    type="number"
                    value={item.row}
                    onChange={(e) =>
                      handleInputChange(item.id, "row", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <input
                    type="number"
                    value={item.lane}
                    onChange={(e) =>
                      handleInputChange(item.id, "lane", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <input
                    type="number"
                    value={item.piles}
                    onChange={(e) =>
                      handleInputChange(item.id, "piles", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addNewRow}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Row
        </button>
      </div>
      <div>
        {/* show component if jsonOut not empty */}
        {jsonOutput.length > 10 ? (
          <div>
            <WarehouseLayoutDisplay inputData={JSON.parse(jsonOutput)} />
            {console.log("jsonOutput OK")}
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-10">
            Loading...
            {console.log("waiting jsonOutput . . .")}
          </div>
        )}
      </div>
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          JSON Output
        </h2>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            background: "#f0f0f0",
            padding: "1rem",
          }}
        >
          {jsonOutput}
        </pre>
      </div>
    </div>
  );
};

export default WarehouseLayoutEditor;
