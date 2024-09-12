"use client";

import React, { useState } from "react";
// import LayoutMock from "../../components/layoutMock";
import WhCreator from "../../components/warehouseCreator";

const WarehouseEditor = ({
  palletMode,
  setPalletMode,
  plantType,
  setPlantType,
  plantNumber,
  setPlantNumber,
  handleClear,
}) => {
  const [laneNumber, setLaneNumber] = useState(3);
  const [rowNumber, setRowNumber] = useState(10);

  const handleLaneChange = (value) => {
    setLaneNumber(value);
    console.log(`Lane number changed to: ${value}`);
  };

  const handleRowChange = (value) => {
    setRowNumber(value);
    console.log(`Row number changed to: ${value}`);
  };

  const handlePalletModeChange = (e) => {
    setPalletMode(e.target.value);
    console.log(`Pallet mode changed to: ${e.target.value}`);
  };

  const handlePlantTypeChange = (e) => {
    setPlantType(e.target.value);
    console.log(`Plant type changed to: ${e.target.value}`);
  };

  const handlePlantNumberChange = (e) => {
    setPlantNumber(e.target.value);
    console.log(`Plant number changed to: ${e.target.value}`);
  };

  return (
    <div className="custom-box-1">
      <div className="custom-box-2">
        <WhCreator />
      </div>
    </div>
  );
};

function EditorPage() {
  const [palletMode, setPalletMode] = useState("Create");
  const [plantType, setPlantType] = useState("Engine");
  const [plantNumber, setPlantNumber] = useState("1");

  const handleClear = () => {
    setPalletMode("Create");
    setPlantType("Engine");
    setPlantNumber("1");
  };

  return (
    <div className="min-h-screen pb-20">
      <h1 className="custom-title-1">Data Editor</h1>
      <h2 className="custom-subtitle-2">Pallet Editor</h2>
      <h2 className="custom-subtitle-2">Warehouse Editor</h2>
      <div className="custom-box-1 overflow-x-auto">
        <WhCreator />
      </div>
    </div>
  );
}

export default EditorPage;
