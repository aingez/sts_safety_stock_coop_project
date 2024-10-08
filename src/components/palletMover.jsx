// Dev: Aingthawan K.
// Component: Pallet Move, This component is used to move the pallet to the desired location within the warehouse.

"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import TestLayoutDisplay from "./warehouseDisp";

function PalletMover() {
  const [layoutApiData, setLayoutApiData] = useState("");
  const [palletName, setPalletName] = useState("");
  const [plantType, setPlantType] = useState("Engine");
  const [plantNumber, setPlantNumber] = useState("");
  const [showMove, setShowMove] = useState(false);
  const [apiData, setApiData] = useState("");
  const [row, setRow] = useState(() => sessionStorage.getItem("mtRow") || "");
  const [lane, setLane] = useState(
    () => sessionStorage.getItem("mtLane") || "",
  );
  const [pile, setPile] = useState(
    () => sessionStorage.getItem("mtPile") || "",
  );
  const [layer, setLayer] = useState(
    () => sessionStorage.getItem("mtLayer") || "",
  );

  useEffect(() => {
    let previousValues = {
      row: sessionStorage.getItem("mtRow"),
      lane: sessionStorage.getItem("mtLane"),
      pile: sessionStorage.getItem("mtPile"),
      layer: sessionStorage.getItem("mtLayer"),
    };

    const handleStorageChange = () => {
      const currentValues = {
        row: sessionStorage.getItem("mtRow") || "",
        lane: sessionStorage.getItem("mtLane") || "",
        pile: sessionStorage.getItem("mtPile") || "",
        layer: sessionStorage.getItem("mtLayer") || "",
      };

      if (
        currentValues.row !== previousValues.row ||
        currentValues.lane !== previousValues.lane ||
        currentValues.pile !== previousValues.pile ||
        currentValues.layer !== previousValues.layer
      ) {
        setRow(currentValues.row || "");
        setLane(currentValues.lane || "");
        setPile(currentValues.pile || "");
        setLayer(currentValues.layer || "");

        previousValues = currentValues; // Update previous values
      }
    };

    const intervalId = setInterval(handleStorageChange, 500); // Check every 500ms

    return () => {
      clearInterval(intervalId); // Cleanup interval when component unmounts
    };
  }, []);

  const handleClear = () => {
    sessionStorage.removeItem("palletName");
    sessionStorage.removeItem("mtRow");
    sessionStorage.removeItem("mtLane");
    sessionStorage.removeItem("mtPile");
    sessionStorage.removeItem("mtLayer");
    setPalletName("");
    setRow("");
    setLane("");
    setPile("");
    setLayer("");
    setShowMove(false);
    setApiData("");
    setLayoutApiData("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPlantType = localStorage.getItem("plantType") || "Engine";
      const storedPlantId = Number(localStorage.getItem("plantId")) || 1;
      const storedPalletName = sessionStorage.getItem("palletName") || "";
      setPlantType(storedPlantType);
      setPlantNumber(storedPlantId);
      setPalletName(storedPalletName);
    }
  }, []);

  const fetchLayoutData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/layout/${plantType}/${plantNumber}`,
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

  const handleMove = async () => {
    const plantKeyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/id/${plantType}/${plantNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!plantKeyResponse.ok) {
      console.error("Failed to fetch plant key");
      toast.error("Failed to fetch plant key");
      return;
    }
    const plantKeyData = await plantKeyResponse.json();
    const palletIdResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet/id/${palletName}/${plantKeyData["id"]}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!palletIdResponse.ok) {
      console.error("Failed to fetch pallet");
      toast.error("Failed to fetch pallet");
      return;
    }
    const palletIdData = await palletIdResponse.json();
    const payload = {
      plant_key: plantKeyData["id"],
      row: parseInt(row),
      lane: parseInt(lane),
      pile: parseInt(pile),
      layer: parseInt(layer),
      pallet_id: palletIdData["id"],
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet/update/position/mgmt`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    if (response.ok) {
      toast.success("Pallet position updated successfully");
      handleClear();
      fetchLayoutData();
    } else {
      console.error("Failed to update pallet position");
      const errorData = await response.json();
      toast.error(`${errorData.detail}`);
      handleClear();
    }
  };

  const handleDislocate = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet/dislocate/user/${plantType}/${plantNumber}/${palletName}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (response.ok) {
      toast.success("Pallet dislocated successfully");
      handleClear();
      fetchLayoutData();
    } else {
      console.error("Failed to dislocate pallet");
      const errorData = await response.json();
      toast.error(`${errorData.detail}`);
      handleClear();
    }
  };

  const handleSearch = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet_info/user/${palletName}/${plantType}/${plantNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Data:", data);
      setApiData(data);

      fetchLayoutData();
      setShowMove(true);
    } else {
      console.error("Failed to fetch pallet info");
      toast.error("Failed to fetch pallet info");
      setShowMove(false);
    }
  };

  return (
    <div className="flex flex-row space-x-2 overflow-scroll">
      <div className="flex flex-col">
        <div className="custom-box-2">
          <h1 className="custom-box-title-1">Pallet Mover</h1>
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2">
              <div className="custom-input-layout-1">
                <label>Pallet Name</label>
                <input
                  type="text"
                  className="custom-text-input-1"
                  placeholder="XX-XX-X"
                  required
                  value={palletName}
                  onChange={(e) => setPalletName(e.target.value)}
                />
              </div>
              <div className="custom-input-layout-1">
                <label>Plant Type</label>
                <select
                  className="custom-text-input-1"
                  value={plantType}
                  onChange={(e) => setPlantType(e.target.value)}
                  disabled
                >
                  <option value="Engine">Engine</option>
                  <option value="Casting">Casting</option>
                </select>
              </div>
              <div className="custom-input-layout-1">
                <label>Plant Number</label>
                <input
                  type="number"
                  className="custom-text-input-1"
                  placeholder="Plant Number"
                  value={plantNumber}
                  disabled
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      setPlantNumber(value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="my-2 flex flex-row space-x-2">
            <button
              type="primary"
              size="large"
              className="custom-button-1-green w-full"
              disabled={!palletName || !plantType || !plantNumber}
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              type="primary"
              size="large"
              className="custom-button-1-pink w-full"
              onClick={handleClear}
            >
              CLEAR
            </button>
          </div>
        </div>
        <div className="">
          {showMove && (
            <div className="flex flex-row">
              <div className="custom-box-2">
                <table className="w-full bg-neutral-200 dark:bg-neutral-500">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2" colSpan="2">
                        Current Pallet Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Pallet Name:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.data.pallet_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Plant Type:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.position
                          ? apiData.position.plant_type
                          : plantType}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Plant Number:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.position
                          ? apiData.position.plant_id
                          : plantNumber}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Row:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.position ? apiData.position.row : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Lane:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.position ? apiData.position.lane : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Pile:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.position ? apiData.position.pile : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Layer:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.position ? apiData.position.layer : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Is Pack:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.data.is_pack ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <strong>Max Capacity:</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {apiData.data.max_capacity}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="animate-pulse content-center justify-center px-5 text-4xl">
                ➡
              </div>
              <div className="custom-box-2">
                <h2 className="custom-box-title-1">Move to</h2>
                <div>
                  <label>Row</label>
                  <input
                    type="number"
                    className="custom-text-input-2"
                    placeholder="Row Number"
                    value={row}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) > 0) {
                        setRow(value);
                      }
                    }}
                  />
                </div>
                <div>
                  <label>Lane</label>
                  <input
                    type="number"
                    className="custom-text-input-2"
                    placeholder="Lane Number"
                    value={lane}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) > 0) {
                        setLane(value);
                      }
                    }}
                  />
                </div>
                <div>
                  <label>Pile</label>
                  <input
                    type="number"
                    className="custom-text-input-2"
                    placeholder="Pile Number"
                    value={pile}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) > 0) {
                        setPile(value);
                      }
                    }}
                  />
                </div>
                <div>
                  <label>Layer</label>
                  <input
                    type="number"
                    className="custom-text-input-2"
                    placeholder="Layer Number"
                    value={layer}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) > 0) {
                        setLayer(value);
                      }
                    }}
                  />
                </div>
                <button
                  type="primary"
                  size="large"
                  className="custom-button-1-green mt-2 w-full"
                  onClick={handleMove}
                  disabled={!row || !lane || !pile || !layer}
                >
                  M.O.V.E
                </button>
                <button
                  type="primary"
                  size="large"
                  className="custom-button-1-green mt-2 w-full"
                  onClick={handleDislocate}
                >
                  DISLOCATE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {layoutApiData && (
        <div className="custom-box-2 ml-3">
          <TestLayoutDisplay
            key={JSON.stringify(layoutApiData)}
            inputData={layoutApiData}
          />
        </div>
      )}
    </div>
  );
}

export default PalletMover;
