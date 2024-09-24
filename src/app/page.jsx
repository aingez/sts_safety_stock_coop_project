"use client";

import React, { useState, useEffect } from "react";
import QuantityDisplay from "../components/qtyDisp";
import ReusableTable from "../components/alertTable";
import LayoutDisplay from "../components/warehouseDisp";

function HomePage() {
  const [layoutApiData, setLayoutApiData] = useState("");
  const [plantType, setPlantType] = useState(() => {
    // Initialize from localStorage if available, otherwise use default
    if (typeof window !== "undefined") {
      return localStorage.getItem("plantType") || "Engine";
    }
    return "Engine";
  });
  const [plantId, setPlantId] = useState(() => {
    // Initialize from localStorage if available, otherwise use default
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("plantId")) || 1;
    }
    return 1;
  });

  const fetchLayoutData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/warehouse/layout/${plantType}/${plantId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLayoutApiData(data["data"]);
    } catch (error) {
      console.error("Error fetching layout data:", error);
    }
  };

  useEffect(() => {
    fetchLayoutData();
  }, [plantType, plantId]);

  useEffect(() => {
    // Save to localStorage whenever plantType or plantId changes
    localStorage.setItem("plantType", plantType);
    localStorage.setItem("plantId", plantId.toString());
  }, [plantType, plantId]);

  const handlePlantTypeChange = (e) => {
    setPlantType(e.target.value);
  };

  const handlePlantIdChange = (e) => {
    setPlantId(Number(e.target.value));
  };

  return (
    <div className="min-h-screen pb-20">
      <h2 className="custom-title-1">Overview</h2>
      <div className="custom-box-1">
        <div className="flex-none">
          <QuantityDisplay />
        </div>
      </div>
      <h2 className="custom-title-1">Reminder</h2>
      <div className="custom-box-2">
        <ReusableTable pageSize={3} />
      </div>
      <div className="flex flex-row space-x-10">
        <div className="custom-box-1 mb-2 py-2">
          <h2 className="custom-title-1">Warehouse</h2>
          <div className="custom-input-layout-1">
            <label htmlFor="plantType">Plant Type</label>
            <select
              id="plantType"
              name="plantType"
              value={plantType}
              onChange={handlePlantTypeChange}
              className="custom-text-input-1"
            >
              <option value="">Select Plant Type</option>
              <option value="Engine">Engine</option>
              <option value="Casting">Casting</option>
            </select>
          </div>
          <div className="custom-input-layout-1">
            <label htmlFor="plantId">Plant ID</label>
            <input
              type="number"
              id="plantId"
              name="plantId"
              value={plantId}
              onChange={handlePlantIdChange}
              className="custom-text-input-1"
              min="1"
            />
          </div>
        </div>
      </div>
      <div className="custom-box-2">
        {layoutApiData !== "" ? (
          <div>
            <div className="flex-none">
              <LayoutDisplay
                key={JSON.stringify(layoutApiData)}
                inputData={layoutApiData}
              />
            </div>

            {/* <div className="custom-box-title-1">for debug</div>
            {JSON.stringify(layoutApiData)} */}
          </div>
        ) : (
          <div className="flex-none">Loading . . .</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
