// Dev: Aingthawan K.
// Component: PalletEditor for add/remove pallet
// Allow only create pallet for now

"use client";
import React from "react";
import { toast } from "react-hot-toast";

const PalletEditor = () => {
  const [palletMode, setPalletMode] = React.useState("CREATE");
  const [plantType, setPlantType] = React.useState("engine");
  const [plantNumber, setPlantNumber] = React.useState(0);
  const [palletName, setPalletName] = React.useState("");
  const [maxCapacity, setMaxCapacity] = React.useState(0);

  const handleClear = () => {
    setPalletMode("CREATE");
    setPlantType("engine");
    setPlantNumber(0);
    setPalletName("");
    setMaxCapacity(0);

    // Clear radio buttons
    document.getElementById("mode-radio-create").checked = false;
    document.getElementById("mode-radio-remove").checked = false;
    document.getElementById("plant-type-radio-engine").checked = false;
    document.getElementById("plant-type-radio-casting").checked = false;

    // set input to default
  };

  const submitCreate = async () => {
    let response = await fetch("http://localhost:8000/add/pallet/bundle", {
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
    });
    response = await response.json();
    toast.success(response.message);
  };

  return (
    <div className="custom-box-1">
      <div className="custom-box-2">
        <h1 className="custom-box-title-1">Pallet Create/Remove</h1>
        <div>
          <label>Mode</label>
          <div>
            <ul className="custom-radio-1 grid-cols-2">
              <li className="radio-item">
                <div className="radio-button-1">
                  <input
                    id="mode-radio-create"
                    type="radio"
                    value="CREATE"
                    name="mode-radio"
                    onChange={() => setPalletMode("CREATE")}
                  />
                  <label htmlFor="mode-radio-create" className="radio-label">
                    CREATE
                  </label>
                </div>
              </li>
              <li className="radio-item">
                <div className="radio-button-1">
                  <input
                    id="mode-radio-remove"
                    type="radio"
                    value="REMOVE"
                    name="mode-radio"
                    onChange={() => setPalletMode("REMOVE")}
                    className="disabled:opacity-50"
                    disabled
                  />
                  <label htmlFor="mode-radio-remove" className="radio-label">
                    REMOVE
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row space-x-2">
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
                required
              />
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="custom-input-layout-1">
              <label>Plant Type</label>
              <ul className="custom-radio-1 grid-cols-2">
                <li className="radio-item">
                  <div className="radio-button-1">
                    <input
                      id="plant-type-radio-engine"
                      type="radio"
                      value="Engine"
                      name="plant-type-radio"
                      onChange={() => setPlantType("Engine")}
                    />
                    <label
                      htmlFor="plant-type-radio-engine"
                      className="radio-label"
                    >
                      Engine
                    </label>
                  </div>
                </li>
                <li className="radio-item">
                  <div className="radio-button-1">
                    <input
                      id="plant-type-radio-casting"
                      type="radio"
                      value="Casting"
                      name="plant-type-radio"
                      onChange={() => setPlantType("Casting")}
                    />
                    <label
                      htmlFor="plant-type-radio-casting"
                      className="radio-label"
                    >
                      Casting
                    </label>
                  </div>
                </li>
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
            disabled={palletMode === "REMOVE"}
            onClick={submitCreate}
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
      <div className="custom-box-2">
        {/* display select data */}
        <h1 className="custom-box-title-1">INPUT</h1>
        <h1>Mode: {palletMode}</h1>
        <h1>Plant Type: {plantType}</h1>
        <h1>Plant Number: {plantNumber}</h1>
        <h1>Pallet Name: {palletName}</h1>
        <h1>Max Capacity: {maxCapacity}</h1>
      </div>
    </div>
  );
};

export default PalletEditor;
