"use client";

import React, { useState, useEffect } from "react";
import DoughnutChart from "../components/donutDash";
import QuantityDisplay from "../components/qtyDisp";
import ReusableTable from "../components/alertTable";
import WarehouseDash from "../components/warehouseDash";
import WarehouseDisp from "../components/layoutDisp";
import mockWarehouseData from "../components/testing_data/warehouseDashMock_2.json";

function ModelQuantityChart() {
  const [barJson, setBarJson] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const types = ["Block", "Head", "Crankshaft", "Camshaft"];
      const combinedData = [];

      for (const type of types) {
        const response = await fetch(`http://localhost:8000/quantity/${type}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && data[0].type === type) {
          combinedData.push(data[0]);
        }
      }

      setBarJson(combinedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function transformBarJson(barJson) {
    return barJson.map((item) => ({
      type: item.type,
      model: item.model.map((modelItem) => ({
        model: modelItem.model,
        qty: modelItem.qty,
      })),
    }));
  }

  function parseBarJsonData(barJson) {
    return barJson.map((item) => ({
      type: item.type,
      total: item.total,
    }));
  }

  const donutDashData = parseBarJsonData(barJson);
  const transformedData = transformBarJson(barJson);

  return (
    <div className="min-h-screen pb-20">
      <h2 className="custom-title-1">Overview</h2>
      <div className="custom-box-2">
        <div className="flex flex-row space-x-5">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-10">
              Loading...
            </div>
          ) : (
            <div className="flex-none">
              <QuantityDisplay />
            </div>
          )}
        </div>
      </div>
      <h2 className="custom-title-1">Reminder</h2>
      <div className="custom-box-2">
        <ReusableTable pageSize={3} />
      </div>
      <h2 className="custom-title-1">Warehouse</h2>
      <div className="custom-box-2">
        <WarehouseDisp inputData={mockWarehouseData} />
      </div>
    </div>
  );
}

export default ModelQuantityChart;
