// Dev: Aingthawan K.
// pack page : This page is used to display the packing field.

"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { toast } from "react-hot-toast";
import LayoutDisplay from "../../components/warehouseDisp";
import useCheckUser from "../../hooks/useCheckUser";
import { getStorageValue } from "../../utils/storageHelpers";

const radioOptionsPlantType = [
  { value: "Engine", label: "Engine" },
  { value: "Casting", label: "Casting" },
];

export default function PackPage() {
  useCheckUser();
  const [dateTimeValues, setDateTimeValues] = useState({});
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [originalSerialNumbers, setOriginalSerialNumbers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [employeeId, setEmployeeId] = useState(getStorageValue("userId", ""));
  const [employeeName, setEmployeeName] = useState(
    getStorageValue("userEmail", ""),
  );
  const [palletName, setPalletName] = useState(
    getStorageValue("palletName", "", "local"),
  );
  const [row, setRow] = useState(getStorageValue("mtRow", "", "local"));
  const [lane, setLane] = useState(getStorageValue("mtLane", "", "local"));
  const [pile, setPile] = useState(getStorageValue("mtPile", "", "local"));
  const [layer, setLayer] = useState(getStorageValue("mtLayer", "", "local"));
  const [plantType, setPlantType] = useState(
    getStorageValue("plantType", "", "local"),
  );
  const [plantId, setPlantId] = useState(
    getStorageValue("plantId", 0, "local"),
  );
  const [apiPalletData, setApiPalletData] = useState("");
  const [apiPartData, setApiPartData] = useState({ data: [] });
  const [layoutApiData, setLayoutApiData] = useState("");
  const [availablePositions, setAvailablePositions] = useState(false);

  const handleReset = useCallback(() => {
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
    setSerialNumbers([]);
    setOriginalSerialNumbers([]);
    setDateTimeValues({});
    setApiPalletData("");
    setApiPartData({ data: [] });
    setAvailablePositions(false);
  }, []);

  const handleSerialNumberChange = (e, index) => {
    const newDateTime = new Date().toLocaleString(); // Get current date and time
    setDateTimeValues((prev) => ({
      ...prev,
      [index]: newDateTime,
    }));
  };

  const getNewSerialNumbersWithPackDates = () => {
    const result = serialNumbers
      .map((serial, index) => ({
        serialNumber: serial.serialNumber,
        packDate: dateTimeValues[index] || serial.packDate,
      }))
      .filter(
        (serial, index) =>
          serial.serialNumber !== originalSerialNumbers[index]?.serialNumber,
      );
    return result;
  };

  const handlePackLocate = () => {
    const newSerialList = getNewSerialNumbersWithPackDates();
    // pass data to api
    // console log body
    console.log({
      packer_id: employeeId,
      packer_name: employeeName,
      pallet_name: palletName,
      plant_type: plantType,
      plant_id: parseInt(plantId, 10),
      row: row === "" ? 0 : parseInt(row, 10),
      lane: lane === "" ? 0 : parseInt(lane, 10),
      pile: pile === "" ? 0 : parseInt(pile, 10),
      layer: layer === "" ? 0 : parseInt(layer, 10),
      new_part: newSerialList,
    });
    fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/part/pack/bundle`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packer_id: employeeId,
          packer_name: employeeName,
          pallet_name: palletName,
          plant_type: plantType,
          plant_id: parseInt(plantId, 10),
          row: row === "" ? 0 : parseInt(row, 10),
          lane: lane === "" ? 0 : parseInt(lane, 10),
          pile: pile === "" ? 0 : parseInt(pile, 10),
          layer: layer === "" ? 0 : parseInt(layer, 10),
          new_part: newSerialList,
        }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Data updated successfully");
        console.log(data);
        handleReset();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    let previousValues = {
      row: sessionStorage.getItem("mtRow"),
      lane: sessionStorage.getItem("mtLane"),
      pile: sessionStorage.getItem("mtPile"),
      layer: sessionStorage.getItem("mtLayer"),
      palletName: sessionStorage.getItem("palletName"),
    };

    const handleStorageChange = () => {
      const currentValues = {
        row: sessionStorage.getItem("mtRow") || "",
        lane: sessionStorage.getItem("mtLane") || "",
        pile: sessionStorage.getItem("mtPile") || "",
        layer: sessionStorage.getItem("mtLayer") || "",
        palletName: sessionStorage.getItem("palletName") || "",
      };

      if (JSON.stringify(currentValues) !== JSON.stringify(previousValues)) {
        setRow(currentValues.row);
        setLane(currentValues.lane);
        setPile(currentValues.pile);
        setLayer(currentValues.layer);
        setPalletName(currentValues.palletName);

        previousValues = currentValues; // Update previous values
      }
    };

    const intervalId = setInterval(handleStorageChange, 500); // Check every 500ms

    return () => {
      clearInterval(intervalId); // Cleanup interval when component unmounts
    };
  }, []);
  // Get the current window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Fetch pallet data
  useEffect(() => {
    const fetchPalletData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet_info/user/${palletName}/${plantType}/${plantId}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("Pallet data fetched successfully");
        setApiPalletData(data);
      } catch (err) {
        // toast.error(err.message);
      }
    };

    if (palletName.length >= 5 && plantType.length > 0 && plantId != 0) {
      fetchPalletData();
    }
  }, [palletName, plantType, plantId]);
  // Fetch layout data
  useEffect(() => {
    const fetchLayoutData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/layout/${plantType}/${plantId}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setLayoutApiData(data["data"]);
        // toast.success("Layout data fetched successfully");
      } catch (err) {
        console.log(err.message);
      }
    };
    if (plantType.length > 0 && plantId != 0) {
      fetchLayoutData();
    }
  }, [plantType, plantId]);
  // Fetch part on pallet data
  useEffect(() => {
    setApiPartData({ data: [] });
    const fetchPartonPallet = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/part/pack/${plantType}/${plantId}/${palletName}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setApiPartData(data);
        console.log("Part data fetched successfully");
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (apiPalletData && apiPalletData.data?.is_pack) {
      fetchPartonPallet();
    }
  }, [apiPalletData, plantType, plantId, palletName]);
  // fetch position status
  useEffect(() => {
    const fetchPositionStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/is_occupied/${plantType}/${plantId}/${row}/${lane}/${pile}/${layer}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (data["available"]) {
          setAvailablePositions(true);
          toast.success("Position is available");
        } else {
          setAvailablePositions(false);
          toast.error("Position not available, please select another");
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (
      lane.length > 0 &&
      row.length > 0 &&
      pile.length > 0 &&
      layer.length > 0 &&
      palletName.length >= 5 &&
      plantType.length > 0 &&
      plantId !== 0
    ) {
      fetchPositionStatus();
    }
  }, [palletName, plantType, plantId, lane, row, pile, layer]);
  // Set serial numbers
  useEffect(() => {
    if (apiPalletData && apiPalletData.data) {
      const maxCapacity = apiPalletData.data.max_capacity || 0;
      const serialNumbersArray = Array.from(
        { length: maxCapacity },
        (_, index) => ({
          // Use existing if available
          serialNumber: apiPartData.data[index]?.serial || "",
          packDate: apiPartData.data[index]?.pack_date || "",
        }),
      );
      setSerialNumbers(serialNumbersArray);
      setOriginalSerialNumbers(serialNumbersArray);
    }
  }, [apiPalletData, apiPartData]);
  return (
    <div
      className={`flex min-h-screen ${isMobile ? "flex-col space-x-0 px-5 pb-5" : "w-full flex-row space-x-10 px-20 pb-20"}`}
    >
      <form className={`custom-box-2 ${isMobile ? "w-full" : "w-1/2"}`}>
        <div className="flex flex-col p-4 md:p-10">
          <h1 className="custom-title-1">Packing</h1>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="custom-input-layout-1">
              <label>Employee ID</label>
              <input
                type="number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="custom-text-input-1"
                placeholder="XXXXXXXXX"
                disabled
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Employee Email</label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="custom-text-input-1"
                placeholder="Sprinter Trueno"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="custom-input-layout-1">
              <label>Pallet Name</label>
              <input
                type="text"
                value={palletName}
                onChange={(e) => {
                  setPalletName(e.target.value.toUpperCase());
                  sessionStorage.setItem(
                    "palletName",
                    e.target.value.toUpperCase(),
                  );
                }}
                className="custom-text-input-1"
                placeholder="XX-00-X"
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Plant Type</label>
              <ul className="custom-text-input-1-radio">
                {radioOptionsPlantType.map((option) => (
                  <li key={option.value}>
                    <div className="radio-button-1">
                      <input
                        disabled
                        id={`plant-type-${option.value}`}
                        type="radio"
                        defaultChecked={plantType === option.value}
                        name="list-radio"
                        onChange={(e) => setPlantType(e.target.value)}
                      />
                      <label htmlFor={`plant-type-${option.value}`}>
                        {option.label}
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
                value={plantId}
                onChange={(e) => setPlantId(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                min="1"
                disabled
              />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-1 md:grid-cols-4 md:gap-2">
            <div className="custom-input-layout-1">
              <label>Row</label>
              <input
                type="number"
                value={row}
                onChange={(e) => setRow(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                min="1"
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Lane</label>
              <input
                type="number"
                value={lane}
                onChange={(e) => setLane(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                min="1"
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Pile</label>
              <input
                type="number"
                value={pile}
                onChange={(e) => setPile(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                min="1"
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Layer</label>
              <input
                type="number"
                value={layer}
                onChange={(e) => setLayer(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                min="1"
              />
            </div>
          </div>
          <div className="my-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <button
              className="custom-button-1-pink"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="custom-button-1-green"
              type="submit"
              disabled={getNewSerialNumbersWithPackDates().length === 0}
              onClick={(e) => {
                e.preventDefault();
                handlePackLocate();
              }}
            >
              Pack
            </button>
            <button
              className="custom-button-1-green"
              type="submit"
              disabled={
                !availablePositions ||
                getNewSerialNumbersWithPackDates().length === 0
              }
              onClick={(e) => {
                e.preventDefault();
                handlePackLocate();
              }}
            >
              Pack & Locate
            </button>
          </div>
          {layoutApiData != "" && <LayoutDisplay inputData={layoutApiData} />}
        </div>
      </form>
      {/* Table Part */}
      <div
        className={`custom-box-3 overflow-auto py-5 ${isMobile ? "w-full" : "w-1/2"}`}
      >
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
            <tr>
              <th className="px-6 py-3">Index</th>
              <th className="px-6 py-3">Serial Number</th>
              <th className="px-6 py-3">Pack Date Time</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: apiPalletData.data?.max_capacity || 0 }).map(
              (_, index) => (
                <tr
                  key={index}
                  className="border-b bg-white hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-600"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="py-4">
                    <input
                      type="text"
                      value={serialNumbers[index]?.serialNumber || ""}
                      onChange={(e) => {
                        const updatedSerialNumbers = [...serialNumbers];
                        updatedSerialNumbers[index] = {
                          ...updatedSerialNumbers[index],
                          serialNumber: e.target.value,
                        };
                        setSerialNumbers(updatedSerialNumbers);
                        handleSerialNumberChange(e, index);
                      }}
                      className="custom-text-input-1"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={
                        serialNumbers[index]?.packDate ||
                        dateTimeValues[index] ||
                        ""
                      }
                      disabled
                      className="custom-text-input-1"
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
