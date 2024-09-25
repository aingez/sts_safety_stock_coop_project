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
      <div className="flex flex-row space-x-5">
        <div className="flex-0 custom-box-3 flex flex-col">
          <h2 className="custom-title-2">Overview</h2>
          <div className="flex-none">
            <QuantityDisplay />
          </div>
        </div>
        <div className="custom-box-3 flex w-full flex-col">
          <h2 className="custom-title-2">
            Reminder :
            <p className="custom-box-title-2">
              {plantType} Plant No. {plantId}
            </p>
          </h2>
          <ReusableTable pageSize={3} />
        </div>
      </div>
      <div className="custom-box-2">
        <div className="flex flex-row space-x-10"></div>
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
