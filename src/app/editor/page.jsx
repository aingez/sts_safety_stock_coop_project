"use client";

import React, { useState } from "react";
import { Button, Radio, InputNumber } from "antd";
import LayoutMock from "../components/layoutMock";

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
    <div className="mb-5 flex flex-row space-x-5 rounded-lg bg-neutral-100 px-5 shadow-lg">
      <div className="space-y-2 p-5">
        <div>
          <label className="mb-1 flex items-center text-xs font-medium">
            Mode Select
          </label>
          <Radio.Group
            onChange={handlePalletModeChange}
            size="large"
            value={palletMode}
          >
            <Radio.Button value="Create">CREATE</Radio.Button>
            <Radio.Button value="Remove">REMOVE</Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex space-x-5">
          <div>
            <label className="mb-1 flex items-center text-xs font-medium">
              Pallet ID
            </label>
            <input
              type="text"
              className="shadow-xs placeholder-grey-700 block w-full max-w-xs rounded-lg border border-neutral-300 bg-transparent bg-white px-4 py-2 text-sm font-normal leading-relaxed text-gray-200 focus:outline-none"
              placeholder="XX-XX-X"
              required
            />
          </div>
          <div>
            <label className="mb-1 flex items-center text-xs font-medium">
              Plant Type
            </label>
            <Radio.Group
              onChange={handlePlantTypeChange}
              size="large"
              value={plantType}
              disabled={palletMode === "Remove"}
            >
              <Radio.Button value="Engine">Engine</Radio.Button>
              <Radio.Button value="Casting">Casting</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <label className="mb-1 flex items-center text-xs font-medium">
              Plant Number
            </label>
            <Radio.Group
              onChange={handlePlantNumberChange}
              size="large"
              value={plantNumber}
              disabled={palletMode === "Remove"}
            >
              <Radio.Button value="1">1</Radio.Button>
              <Radio.Button value="2">2</Radio.Button>
              <Radio.Button value="3">3</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className="flex flex-row space-x-2 pt-2">
          <Button
            danger
            type="primary"
            size="large"
            style={{
              backgroundColor: palletMode === "Remove" ? "#ef4444" : "white",
            }}
            disabled={palletMode === "Create"}
          >
            REMOVE
          </Button>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: palletMode === "Create" ? "#22c55e" : "white",
            }}
            disabled={palletMode === "Remove"}
          >
            CREATE
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#f87171" }}
            onClick={handleClear}
          >
            CLEAR
          </Button>
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
    <div className="mb-5 flex flex-row space-x-5 rounded-lg bg-neutral-100 px-5 shadow-lg">
      <div className="my-5 rounded-lg bg-neutral-100 p-10 shadow-lg">
        <div className="pb-2">
          <label className="mb-1 flex items-center text-xs font-medium">
            Mode Select
          </label>
          <Radio.Group
            onChange={(e) => setPalletMode(e.target.value)}
            size="large"
            value={palletMode}
          >
            <Radio.Button value="Create">CREATE</Radio.Button>
            <Radio.Button value="Remove">REMOVE</Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex space-x-5">
          <div>
            <label className="mb-1 flex items-center text-xs font-medium">
              Plant Type
            </label>
            <Radio.Group
              onChange={(e) => setPlantType(e.target.value)}
              size="large"
              value={plantType}
            >
              <Radio.Button value="Engine">Engine</Radio.Button>
              <Radio.Button value="Casting">Casting</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <label className="mb-1 flex items-center text-xs font-medium">
              Plant Number
            </label>
            <Radio.Group
              onChange={(e) => setPlantNumber(e.target.value)}
              size="large"
              value={plantNumber}
            >
              <Radio.Button value="1">1</Radio.Button>
              <Radio.Button value="2">2</Radio.Button>
              <Radio.Button value="3">3</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className="flex flex-row space-x-5 pt-5">
          <label className="mb-1 flex items-center text-xs font-medium">
            Lane
          </label>
          <InputNumber
            min={1}
            max={20}
            defaultValue={3}
            onChange={handleLaneChange}
          />
          <label className="mb-1 flex items-center text-xs font-medium">
            Row
          </label>
          <InputNumber
            min={1}
            max={20}
            defaultValue={10}
            onChange={handleRowChange}
          />
        </div>
        <div className="flex flex-row space-x-2 pt-2">
          <Button
            danger
            type="primary"
            size="large"
            style={{
              backgroundColor: palletMode === "Remove" ? "#ef4444" : "white",
            }}
            disabled={palletMode === "Create"}
          >
            REMOVE
          </Button>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: palletMode === "Create" ? "#22c55e" : "white",
            }}
            disabled={palletMode === "Remove"}
          >
            CREATE
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#f87171" }}
            onClick={handleClear}
          >
            CLEAR
          </Button>
        </div>
      </div>
      <div className="my-5 rounded-lg bg-neutral-100 p-10 shadow-lg">
        <h3 className="text-1xl pb-5 font-light">Layout Preview</h3>
        <LayoutMock laneNumber={laneNumber} rowNumber={rowNumber} />
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
    <div className="pb-20">
      <h1 className="pb-5 text-4xl font-light">Data Editor</h1>

      <h2 className="justify-start pb-5 text-2xl font-light">Pallet Editor</h2>
      <PalletEditor
        palletMode={palletMode}
        setPalletMode={setPalletMode}
        plantType={plantType}
        setPlantType={setPlantType}
        plantNumber={plantNumber}
        setPlantNumber={setPlantNumber}
        handleClear={handleClear}
      />

      <h2 className="justify-start pb-5 text-2xl font-light">
        Warehouse Editor
      </h2>
      <WarehouseEditor
        palletMode={palletMode}
        setPalletMode={setPalletMode}
        plantType={plantType}
        setPlantType={setPlantType}
        plantNumber={plantNumber}
        setPlantNumber={setPlantNumber}
        handleClear={handleClear}
      />
    </div>
  );
}

export default EditorPage;
