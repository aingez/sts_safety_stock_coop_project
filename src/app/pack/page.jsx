// Dev: Aingthawan K.
// pack page : This page is used to display the packing field.

"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import LayoutDisplay from "../../components/warehouseDisp";

export default function PackPage() {
  const [dateTimeValues, setDateTimeValues] = useState({});
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [originalSerialNumbers, setOriginalSerialNumbers] = useState([]);
  // const [employeeId, setEmployeeId] = useState("");
  // const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("userId") || "";
    }
    return "";
  });

  const [employeeName, setEmployeeName] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("userEmail") || "";
    }
    return "";
  });

  const [palletName, setPalletName] = useState("");

  const [plantType, setPlantType] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("plantType") || "Engine";
    }
    return "Engine";
  });
  const [plantId, setPlantId] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("plantId")) || 1;
    }
    return 1;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [lane, setLane] = useState("");
  const [row, setRow] = useState("");
  const [pile, setPile] = useState("");
  const [layer, setLayer] = useState("");

  const [apiPalletData, setApiPalletData] = useState("");
  const [apiPartData, setApiPartData] = useState({ data: [] });
  const [layoutApiData, setLayoutApiData] = useState("");
  const [availablePositions, setAvailablePositions] = useState(false);

  const [loadingTable, setLoadingTable] = useState(false);
  const [layoutUpdated, setLayoutUpdated] = useState(false);

  const handleReset = () => {
    setSerialNumbers([]);
    setOriginalSerialNumbers([]);
    setDateTimeValues({});
    setPalletName("");
    setLane("");
    setRow("");
    setPile("");
    setLayer("");
    setApiPalletData("");
    setApiPartData({ data: [] });
    setAvailablePositions(false);
    setLoadingTable(false);
  };

  const handleSerialNumberChange = (e, index) => {
    const newDateTime = new Date().toLocaleString(); // Get current date and time
    setDateTimeValues((prev) => ({
      ...prev,
      [index]: newDateTime,
    }));
  };

  const radioOptionsPlantType = [
    { value: "Engine", label: "Engine" },
    { value: "Casting", label: "Casting" },
  ];

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
    const employeeIdInput = document.querySelector(
      'input[placeholder="XXXXXXXXX"]',
    );
    const employeeNameInput = document.querySelector(
      'input[placeholder="Sprinter Trueno"]',
    );

    const updatedEmployeeId = employeeIdInput
      ? employeeIdInput.value
      : employeeId;
    const updatedEmployeeName = employeeNameInput
      ? employeeNameInput.value
      : employeeName;

    const newSerialList = getNewSerialNumbersWithPackDates();
    // pass data to api
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
          row: parseInt(row, 10),
          lane: parseInt(lane, 10),
          pile: parseInt(pile, 10),
          layer: parseInt(layer, 10),
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
        setLayoutUpdated(true);
        handleReset();
      })
      .catch((error) => {});
  };

  const handlePack = () => {
    const employeeIdInput = document.querySelector(
      'input[placeholder="XXXXXXXXX"]',
    );
    const employeeNameInput = document.querySelector(
      'input[placeholder="Sprinter Trueno"]',
    );

    const updatedEmployeeId = employeeIdInput
      ? employeeIdInput.value
      : employeeId;
    const updatedEmployeeName = employeeNameInput
      ? employeeNameInput.value
      : employeeName;

    const newSerialList = getNewSerialNumbersWithPackDates();
    // pass data to api
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
          row: null,
          lane: null,
          pile: null,
          layer: null,
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
        setLayoutUpdated(true);
        handleReset();
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (layoutUpdated) {
      // Fetch the updated layout data after an update
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
        } catch (err) {
          raiseError(err.message);
        }
      };

      fetchLayoutData();
      setLayoutUpdated(false);
    }
  }, [layoutUpdated, plantType, plantId]);

  useEffect(() => {
    setLoadingTable(true);
    const fetchPalletData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet_info/user/${palletName}/${plantType}/${plantId}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        toast.success("Pallet data fetched successfully");
        setApiPalletData(data);
      } catch (err) {
        // toast.error(err.message);
      }
    };

    if (palletName.length >= 5 && plantType.length > 0 && plantId != 0) {
      fetchPalletData();
    }
    setLoadingTable(false);
  }, [palletName, plantType, plantId]);

  useEffect(() => {
    setLoadingTable(true);
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
        // toast.error(err.message);
      }
    };

    if (plantType.length > 0 && plantId != 0) {
      fetchLayoutData();
    }
    setLoadingTable(false);
  }, [plantType, plantId]);

  useEffect(() => {
    setLoadingTable(true);
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
        toast.success("Part data fetched successfully");
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (apiPalletData && apiPalletData.data?.is_pack) {
      fetchPartonPallet();
    }
    setLoadingTable(false);
  }, [apiPalletData, plantType, plantId, palletName]);

  useEffect(() => {
    setLoadingTable(true);
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
    setLoadingTable(false);
  }, [palletName, plantType, plantId, lane, row, pile, layer]);

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
                required
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
                required
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
                onChange={(e) => setPalletName(e.target.value.toUpperCase())}
                className="custom-text-input-1"
                placeholder="XX-00-X"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Plant Type</label>
              <ul className="custom-text-input-1-radio">
                {radioOptionsPlantType.map((option) => (
                  <li key={option.value}>
                    <div className="radio-button-1">
                      <input
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
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <div className="custom-input-layout-1">
              <label>Row</label>
              <input
                type="number"
                value={row}
                onChange={(e) => setRow(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                min="1"
                required
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
                required
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
                required
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
                required
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
              // disabled={getNewSerialNumbersWithPackDates().length === 0}
              disabled
              onClick={(e) => {
                e.preventDefault();
                handlePack();
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
          {loadingTable && <div className="animate-pulse">Loading . . .</div>}
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
