// Dev: Aingthawan K.
// Component: PalletEditor for add/remove pallet
// Allow only create pallet for now

"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const PalletEditor = () => {
  const [palletMode, setPalletMode] = React.useState("CREATE");
  const [palletName, setPalletName] = React.useState("");
  const [maxCapacity, setMaxCapacity] = React.useState(0);
  const [plantType, setPlantType] = useState("Engine");
  const [plantNumber, setPlantNumber] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPlantType =
        Number(localStorage.getItem("plantType")) || "Engine";
      setPlantType(storedPlantType);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPlantId = Number(localStorage.getItem("plantId")) || 1;
      setPlantNumber(storedPlantId);
    }
  }, []);

  const radioMode = [
    { value: "CREATE", label: "Create" },
    { value: "REMOVE", label: "Remove" },
  ];

  const radioOptionsPlantType = [
    { value: "Engine", label: "Engine" },
    { value: "Casting", label: "Casting" },
  ];

  const handleClear = () => {
    setPalletName("");
    setMaxCapacity(0);
  };

  const submitCreate = async () => {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet/add/bundle`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pallet_name: palletName,
          pallet_max_cap: maxCapacity,
          plant_type: plantType,
          plant_id: plantNumber,
        }),
      },
    );
    response = await response.json();
    if (response.status === 400) {
      toast.error("Pallet may already exist!");
    }
    if (response.status === 200) {
      toast.success("Pallet created successfully!");
    }
    handleClear();
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="custom-box-2">
        <h1 className="custom-box-title-1">Pallet Create/Remove</h1>
        <div>
          <label>Mode</label>
          <ul className="custom-text-input-1-radio">
            {radioMode.map((radio) => (
              <li key={radio.value}>
                <div className="radio-button-1">
                  <input
                    id={`mode-radio-${radio.value}`}
                    type="radio"
                    defaultChecked={radio.value === "CREATE"}
                    name="mode-radio"
                    onChange={() => setPalletMode(radio.value)}
                  />
                  <label
                    htmlFor={`mode-radio-${radio.value}`}
                    className="radio-label"
                  >
                    {radio.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="mb-2 grid grid-cols-2 gap-2">
            <div className="custom-input-layout-1">
              <label>Pallet Name</label>
              <input
                type="text"
                value={palletName}
                className="custom-text-input-1"
                placeholder="XX-XX-X"
                onChange={(e) => setPalletName(e.target.value)}
                required
              />
            </div>

            <div className="custom-input-layout-1">
              <label>Capacity</label>
              <input
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="custom-text-input-1"
                placeholder="Pallet Capacity"
                min={1}
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Plant Type</label>
              <ul className="custom-text-input-1-radio">
                {radioOptionsPlantType.map((radio) => (
                  <li key={radio.value}>
                    <div className="radio-button-1">
                      <input
                        disabled
                        id={`plant-type-radio-${radio.value}`}
                        type="radio"
                        defaultChecked={radio.value === "Engine"}
                        name="plant-type-radio"
                        onChange={() => setPlantType(radio.value)}
                      />
                      <label
                        htmlFor={`plant-type-radio-${radio.value}`}
                        className="radio-label"
                      >
                        {radio.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="custom-input-layout-1">
              <label>Plant Number</label>
              <input
                type="number"
                value={plantNumber}
                onChange={(e) => setPlantNumber(e.target.value)}
                className="custom-text-input-1"
                placeholder="Plant Number"
                required
                disabled
              />
            </div>
          </div>
        </div>

        <div className="my-2 space-x-2">
          <button
            type="button"
            size="large"
            disabled
            className="custom-button-1-red"
          >
            REMOVE
          </button>
          <button
            type="button"
            size="large"
            className="custom-button-1-green"
            onClick={submitCreate}
            disabled={palletName.length < 5 || maxCapacity < 1}
          >
            CREATE
          </button>
          <button
            type="button"
            size="large"
            className="custom-button-1-pink"
            onClick={handleClear}
          >
            CLEAR
          </button>
          {palletMode === "REMOVE" && (
            <p className="pt-2 text-xs font-light">
              *Able to remove only Empty Pallet!
            </p>
          )}
        </div>
      </div>
      {/* <div className="custom-box-2">
        <h1 className="custom-box-title-1">INPUT</h1>
        <h1>Mode: {palletMode}</h1>
        <h1>Plant Type: {plantType}</h1>
        <h1>Plant Number: {plantNumber}</h1>
        <h1>Pallet Name: {palletName}</h1>
        <h1>Max Capacity: {maxCapacity}</h1>
      </div> */}
    </div>
  );
};

export default PalletEditor;
