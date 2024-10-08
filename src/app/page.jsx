"use client";

import React, { useState, useEffect } from "react";
import QuantityDisplay from "../components/qtyDisp";
import ReusableTable from "../components/alertTable";
import LayoutDisplay from "../components/warehouseDisp";
import LatestUnpack from "../components/latestUnpack";
import LatestPack from "../components/latestPack";
import { Settings } from "lucide-react";

// Import custom hooks
import useLayoutData from "../hooks/useLayoutData";
import useMobileView from "../hooks/useMobileView";
import useLogin from "../hooks/useLogin";
import useCheckUser from "../hooks/useCheckUser";

function HomePage() {
  useLogin();
  const [plantType, setPlantType] = useState("Engine");
  const [plantId, setPlantId] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const isMobile = useMobileView();
  const layoutApiData = useLayoutData(plantType, plantId, isInitialized);

  // useCheckUser();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPlantType = localStorage.getItem("plantType") || "Engine";
      const storedPlantId = Number(localStorage.getItem("plantId")) || 1;
      setPlantType(storedPlantType);
      setPlantId(storedPlantId);
    }
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Settings size={80} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isMobile ? "px-5 pb-5" : "px-20 pb-20"}`}>
      <div
        className={`flex ${isMobile ? "flex-col space-x-0" : "flex-row space-x-5"}`}
      >
        <div className={`custom-box-3`}>
          <h2 className="custom-title-2 whitespace-nowrap">Overview :</h2>
          <div className="w-full flex-none">
            <QuantityDisplay />
          </div>
        </div>
        <div className="custom-box-3 flex w-full flex-col overflow-scroll">
          <h2 className="custom-title-2">FIFO Reminder :</h2>
          <ReusableTable pageSize={5} />
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
          </div>
        ) : (
          <Settings size={30} className="animate-spin" />
        )}
      </div>
      <div
        className={`custom-box-3 flex ${isMobile ? "flex-col space-x-0" : "flex-row space-x-5"}`}
      >
        <LatestUnpack />
        <LatestPack />
      </div>
    </div>
  );
}

export default HomePage;
