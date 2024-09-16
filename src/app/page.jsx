"use client";

import React, { useState, useEffect } from "react";
import QuantityDisplay from "../components/qtyDisp";
import ReusableTable from "../components/alertTable";
import TestLayoutDisplay from "../components/testNewDisp";

const mockData = {
  plat_type: "Engine",
  plant_number: "1",
  max_row: 2,
  max_lane: 5,
  color_layout: {
    block: { lane: "1-2", color: "blue" },
    head: { lane: "3-3", color: "yellow" },
    crankshaft: { lane: "4-5", color: "green" },
  },
  layer_1: [
    { id: 1, row: 1, lane: 1, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 2, row: 1, lane: 2, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 3, row: 1, lane: 3, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 4, row: 1, lane: 4, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 5, row: 1, lane: 5, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 6, row: 2, lane: 1, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 7, row: 2, lane: 2, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 8, row: 2, lane: 3, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 9, row: 2, lane: 4, max_pile: 1, max_layer: 2, current_pallet: [] },
    { id: 10, row: 2, lane: 5, max_pile: 1, max_layer: 2, current_pallet: [] },
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
      <div className="custom-box-1">
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
        {/* <div className="custom-box-2">
          <ActiveWarehouseList />
        </div> */}
      </div>
      <h2 className="custom-title-1">Reminder</h2>
      <div className="custom-box-2">
        <ReusableTable pageSize={3} />
      </div>
      <h2 className="custom-title-1">Warehouse</h2>
      <div className="custom-box-2">
        <TestLayoutDisplay inputData={mockData} />
      </div>
    </div>
  );
}

export default ModelQuantityChart;
