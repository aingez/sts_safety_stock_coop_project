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
  const [availablePositions, setAvailablePositions] = useState([]);

  const [divData] = useState({
    employeeId: "",
    employeeName: "",
    palletId: "",
    partType: "",
    serialNumbers: [],
  });

  const handleReset = () => {
    setSerialNumbers([]);
    setOriginalSerialNumbers([]);
    setDateTimeValues({});
    setLayoutApiData("");
    // setEmployeeId("");
    // setEmployeeName("");
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
  };

  useEffect(() => {
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
  }, [palletName, plantType, plantNum]);

  useEffect(() => {
    const fetchPartonPallet = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/packed_parts/${plantType}/${plantNum}/${palletName}`,
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
  }, [apiPalletData, plantType, plantNum, palletName]);

  useEffect(() => {
    const fetchPositionStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/is_occupied/${plantType}/${plantNum}/${row}/${lane}/${pile}/${layer}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setAvailablePositions(data.data.is_occupied);
        if (data.data.is_occupied) {
          toast.error("Position is already occupied, please select another");
        } else {
          toast.success("Position is available");
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

    console.log(result);
    return result;
  };

  return (
    <div className="flex min-h-screen flex-row space-x-10">
      <form className="custom-box-2 w-1/2">
        <div className="flex flex-col p-10">
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
          <div className="flex flex-row space-x-2">
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
              <ul className="custom-radio-1 grid-cols-2">
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
          <div className="flex flex-row space-x-2">
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
          <div className="my-4 flex flex-row space-x-2">
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
                (employeeId.length == 0 ||
                  employeeName.length == 0 ||
                  palletName.length == 0 ||
                  plantType.length == 0 ||
                  plantNum.length == 0 ||
                  lane.length == 0 ||
                  row.length == 0 ||
                  pile.length == 0 ||
                  layer.length == 0) &&
                !availablePositions
              }
              onClick={(e) => {
                e.preventDefault();
                const newSerials = getNewSerialNumbersWithPackDates();
                console.log(newSerials);
              }}
            >
              Update
            </button>
          </div>
          {layoutApiData != "" && <LayoutDisplay inputData={layoutApiData} />}
        </div>
      </form>
      {/* Table Part */}
      <div className="custom-box-1 min-h-full w-1/2 grow overflow-auto py-5">
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
