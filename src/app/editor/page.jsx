"use client";

import React, { useState } from "react";
// import LayoutMock from "../../components/layoutMock";
import WhCreator from "../../components/warehouseCreator";

const PalletEditor = ({
  palletMode,
  setPalletMode,
  plantType,
  setPlantType,
  plantNumber,
  setPlantNumber,
  handleClear,
}) => {
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
        <h1 className="custom-box-title-1">Create/Remove</h1>
        <div className="custom-input-layout-1">
          <label>Mode</label>
          <ul className="custom-radio-1 grid-cols-2">
            <li className="radio-item">
              <div className="radio-button-1">
                <input
                  id="horizontal-list-radio-license"
                  type="radio"
                  value="engine"
                  name="list-radio"
                />
                <label className="radio-label">CREATE</label>
              </div>
            </li>
            <li className="radio-item">
              <div className="radio-button-1">
                <input
                  id="horizontal-list-radio-id"
                  type="radio"
                  value="casting"
                  name="list-radio"
                />
                <label className="radio-label">REMOVE</label>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="custom-input-layout-1">
            <label>Pallet ID</label>
            <input
              type="text"
              className="custom-text-input-1"
              placeholder="XX-XX-X"
              required
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Plant Type</label>
            <ul className="custom-radio-1 grid-cols-2">
              <li className="radio-item">
                <div className="radio-button-1">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value="engine"
                    name="list-radio"
                  />
                  <label className="radio-label">Engine</label>
                </div>
              </li>
              <li className="radio-item">
                <div className="radio-button-1">
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value="casting"
                    name="list-radio"
                  />
                  <label className="radio-label">Casting</label>
                </div>
              </li>
            </ul>
          </div>

          <div className="custom-input-layout-1">
            <label>Plant Number</label>
            <ul className="custom-radio-1 grid-cols-3">
              <li className="radio-item">
                <div className="radio-button-1">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value="engine"
                    name="list-radio"
                  />
                  <label className="radio-label">1</label>
                </div>
              </li>
              <li className="radio-item">
                <div className="radio-button-1">
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value="casting"
                    name="list-radio"
                  />
                  <label className="radio-label">2</label>
                </div>
              </li>
              <li className="radio-item">
                <div className="radio-button-1">
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value="casting"
                    name="list-radio"
                  />
                  <label className="radio-label">3</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-2 space-x-2">
          <button type="primary" size="large" className="custom-button-1-red">
            REMOVE
          </button>
          <button
            type="primary"
            size="large"
            className="custom-button-1-green"
            disabled={palletMode === "Remove"}
          >
            CREATE
          </button>
          <button
            type="primary"
            size="large"
            className="custom-button-1-pink"
            onClick={handleClear}
          >
            CLEAR
          </button>
          {palletMode === "Remove" && (
            <p className="pt-2 text-xs font-light">
              *Able to remove only Unpacked Pallet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

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
      <PalletEditor
        palletMode={palletMode}
        setPalletMode={setPalletMode}
        plantType={plantType}
        setPlantType={setPlantType}
        plantNumber={plantNumber}
        setPlantNumber={setPlantNumber}
        handleClear={handleClear}
      />

      <h2 className="custom-subtitle-2">Warehouse Editor</h2>
      {/* <WarehouseEditor
        palletMode={palletMode}
        setPalletMode={setPalletMode}
        plantType={plantType}
        setPlantType={setPlantType}
        plantNumber={plantNumber}
        setPlantNumber={setPlantNumber}
        handleClear={handleClear}
      /> */}
      <div className="custom-box-1 overflow-x-auto">
        <WhCreator />
      </div>
    </div>
  );
}

export default EditorPage;
