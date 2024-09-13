"use client";

import React, { useState, useEffect } from "react";
import QuantityDisplay from "../components/qtyDisp";
import ReusableTable from "../components/alertTable";
import WarehouseDisp from "../components/layoutDisp";
import TestLayoutDisplay from "../components/testNewDisp";
import mockWarehouseData from "../components/testing_data/warehouseDashMock_2.json";

const mockData = {
  plant_type: "Engine",
  plant_number: 1,
  max_row: 2,
  max_lane: 10,
  color_layout: {
    block: { lane: "1-3", color: "blue" },
    head: { lane: "4-6", color: "yellow" },
    crankshaft: { lane: "7-10", color: "green" },
  },
  layer_1: [
    {
      id: 1,
      row: 1,
      lane: 1,
      max_pile: 3,
      max_layer: 2,
      current_pallet: [
        {
          pile: 1,
          layer: 1,
          pallet_name: "BL07A",
          color_status: "red",
        },
        {
          pile: 1,
          layer: 2,
          pallet_name: "BL07B",
          color_status: "yellow",
        },
        {
          pile: 3,
          layer: 1,
          pallet_name: "BL08B",
          color_status: "green",
        },
      ],
    },
    {
      id: 2,
      row: 2,
      lane: 1,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 3,
      row: 1,
      lane: 2,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 4,
      row: 2,
      lane: 2,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 5,
      row: 1,
      lane: 3,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 6,
      row: 1,
      lane: 4,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 7,
      row: 1,
      lane: 5,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 8,
      row: 1,
      lane: 6,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 9,
      row: 1,
      lane: 7,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 10,
      row: 1,
      lane: 8,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 11,
      row: 1,
      lane: 9,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 12,
      row: 1,
      lane: 10,
      max_pile: 3,
      max_layer: 2,
      current_pallet: 0,
    },

    {
      id: 13,
      row: 2,
      lane: 3,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 14,
      row: 2,
      lane: 4,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 15,
      row: 2,
      lane: 5,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 16,
      row: 2,
      lane: 6,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 17,
      row: 2,
      lane: 7,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 18,
      row: 2,
      lane: 8,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 19,
      row: 2,
      lane: 9,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
    {
      id: 20,
      row: 2,
      lane: 10,
      max_pile: 1,
      max_layer: 2,
      current_pallet: 0,
    },
  ],
};

function ModelQuantityChart() {
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <h2 className="custom-title-1">Overview</h2>
      <div className="custom-box-2">
        <div className="flex flex-row space-x-5">
          {isLoading ? (
            <div className="animate-spin">/</div>
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

      <h2 className="custom-title-1">Warehouse Test</h2>
      <div className="custom-box-2">
        <TestLayoutDisplay inputData={mockData} />
      </div>
    </div>
  );
}

export default ModelQuantityChart;
