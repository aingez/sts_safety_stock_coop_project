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
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [palletName, setPalletName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [plantNum, setPlantNum] = useState("");

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
    setPlantType("");
    setPlantNum("");
    setLane("");
    setRow("");
    setPile("");
    setLayer("");
    setApiPalletData("");
    setApiPartData({ data: [] });
    setAvailablePositions(false);
    setLayoutApiData("");
    setLoadingTable(false);
  };

  const handleUpdate = () => {
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
    fetch("http://localhost:8000/part/pack/bundle", {
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
        plant_id: parseInt(plantNum, 10),
        row: parseInt(row, 10),
        lane: parseInt(lane, 10),
        pile: parseInt(pile, 10),
        layer: parseInt(layer, 10),
        new_part: newSerialList,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Data updated successfully");
        setLayoutUpdated(true); // Trigger layout update
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (layoutUpdated) {
      // Fetch the updated layout data after an update
      const fetchLayoutData = async () => {
        try {
          const res = await fetch(
            `http://localhost:8000/warehouse/layout/${plantType}/${plantNum}`,
          );
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await res.json();
          setLayoutApiData(data["data"]);
          toast.success("Layout data refreshed successfully");
        } catch (err) {
          toast.error(err.message);
        }
      };

      fetchLayoutData();
      setLayoutUpdated(false); // Reset the flag after fetching
    }
  }, [layoutUpdated, plantType, plantNum]);

  useEffect(() => {
    setLoadingTable(true);
    const fetchPalletData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/pallet_info/user/${palletName}/${plantType}/${plantNum}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        toast.success("Pallet data fetched successfully");
        setApiPalletData(data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (palletName.length >= 5 && plantType.length > 0 && plantNum.length > 0) {
      fetchPalletData();
    }
    setLoadingTable(false);
  }, [palletName, plantType, plantNum]);

  useEffect(() => {
    setLoadingTable(true);
    const fetchLayoutData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/warehouse/layout/${plantType}/${plantNum}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setLayoutApiData(data["data"]);
        toast.success("Layout data fetched successfully");
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (plantType.length > 0 && plantNum.length > 0) {
      fetchLayoutData();
    }
    setLoadingTable(false);
  }, [plantType, plantNum]);

  useEffect(() => {
    setLoadingTable(true);
    setApiPartData({ data: [] });
    const fetchPartonPallet = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/part/pack/${plantType}/${plantNum}/${palletName}`,
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
  }, [apiPalletData, plantType, plantNum, palletName]);

  useEffect(() => {
    setLoadingTable(true);
    const fetchPositionStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/warehouse/is_occupied/${plantType}/${plantNum}/${row}/${lane}/${pile}/${layer}`,
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
      plantNum.length > 0
    ) {
      fetchPositionStatus();
    }
    setLoadingTable(false);
  }, [palletName, plantType, plantNum, lane, row, pile, layer]);

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

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(date).toLocaleString("en-GB", options);
  };

  return (
    <div className="flex min-h-screen flex-col space-y-10 md:flex-row md:space-x-10 md:space-y-0">
      <form className="custom-box-2 w-full md:w-1/2">
        <div className="flex flex-col p-4 md:p-10">
          <h1 className="custom-title-1">Packing</h1>
          <div className="custom-input-layout-1">
            <label>Employee ID</label>
            <input
              type="number"
              onChange={(e) => setEmployeeId(e.target.value)}
              className="custom-text-input-1"
              placeholder="XXXXXXXXX"
              required
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Name - Surname</label>
            <input
              type="text"
              onChange={(e) => setEmployeeName(e.target.value)}
              className="custom-text-input-1"
              placeholder="Sprinter Trueno"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <div className="custom-input-layout-1">
              <label>Pallet ID</label>
              <input
                type="text"
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
                        value={option.value}
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
                onChange={(e) => setPlantNum(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <div className="custom-input-layout-1">
              <label>Row</label>
              <input
                type="number"
                onChange={(e) => setRow(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Lane</label>
              <input
                type="number"
                onChange={(e) => setLane(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Pile</label>
              <input
                type="number"
                onChange={(e) => setPile(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Layer</label>
              <input
                type="number"
                onChange={(e) => setLayer(e.target.value)}
                className="custom-text-input-1"
                placeholder="XX"
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
              disabled={
                !availablePositions ||
                getNewSerialNumbersWithPackDates().length === 0
              }
              onClick={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              Update
            </button>
          </div>
          {loadingTable && <div className="animate-pulse">Loading . . .</div>}
          {layoutApiData != "" && <LayoutDisplay inputData={layoutApiData} />}
        </div>
      </form>
      {/* Table Part */}
      <div className="custom-box-1 min-h-full w-full grow overflow-auto py-5 md:w-1/2">
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
