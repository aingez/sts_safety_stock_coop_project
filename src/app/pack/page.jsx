"use client";

import React, { useState } from "react";

export default function PackPage() {
  const [dateTimeValues, setDateTimeValues] = useState({});
  const [divData, setDivData] = useState({
    employeeId: "",
    employeeName: "",
    palletId: "",
    partType: "",
    serialNumbers: [],
  });

  const handleSerialNumberChange = (e, index) => {
    const newDateTime = new Date().toLocaleString(); // Get current date and time
    setDateTimeValues((prev) => ({
      ...prev,
      [index]: newDateTime,
    }));
  };

  const partTypeSerialCount = {
    Block: 6,
    Head: 8,
    Crankshaft: 12,
  };

  const radioOptionsPlantType = [
    { value: "engine", label: "Engine" },
    { value: "casting", label: "Casting" },
  ];

  const radioOptionsPlantNum = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const handlePalletIdChange = (e) => {
    const palletId = e.target.value;
    if (palletId.length === 5) {
      const partType = palletId.substring(0, 2);
      const partTypeSerialCount = {
        BL: 6,
        HE: 8,
        CR: 12,
      };
      const serialNumbers = Array(partTypeSerialCount[partType]).fill("");
      setDivData({
        ...divData,
        palletId,
        partType,
        serialNumbers,
      });
    } else {
      setDivData({
        ...divData,
        palletId,
        partType: "",
        serialNumbers: [],
      });
    }
  };

  return (
    <div className="mb-20 flex min-h-screen flex-row space-x-10">
      <form className="custom-box-1">
        <div className="flex flex-col p-10">
          <h1 className="custom-title-1">Packing</h1>
          <div className="custom-input-layout-1">
            <label>Employee ID</label>
            <input
              type="text"
              onInput={(e) => handlePalletIdChange(e)}
              className="custom-text-input-1"
              placeholder="XXXXXXXXX"
              required
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Name - Surname</label>
            <input
              type="text"
              onInput={(e) => handlePalletIdChange(e)}
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
                onInput={(e) => handlePalletIdChange(e)}
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
              <ul className="custom-radio-1 grid-cols-3">
                {radioOptionsPlantNum.map((option) => (
                  <li key={option.value}>
                    <div className="radio-button-1">
                      <input
                        id={`plant-num-${option.value}`}
                        type="radio"
                        value={option.value}
                        name="list-radio-plant-num"
                      />
                      <label
                        htmlFor={`plant-num-${option.value}`}
                        className="mx-2"
                      >
                        {option.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="custom-input-layout-1">
              <label>Lane</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Row</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Pile (Not Sure)</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Layer</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              />
            </div>
          </div>
          <div className="my-4 flex flex-row space-x-2">
            <button className="custom-button-1-pink" type="reset">
              Reset
            </button>
            <button className="custom-button-1-green" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
      <div className="min-h-full w-1/2">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
            <tr>
              <th className="px-6 py-3">Serial Number Input</th>
              <th className="px-6 py-3">Pack Date Time</th>
            </tr>
          </thead>
          <tbody>
            {divData.serialNumbers.map((item, index) => (
              <tr
                key={index}
                className="border-b bg-white hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-600"
              >
                <td className="px-6 py-4">
                  <input
                    type="text"
                    placeholder={`Serial ${index + 1}`}
                    value={item.serialNumber}
                    onChange={(e) => handleSerialNumberChange(e, index)}
                    className="custom-text-input-1"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    placeholder="Current Date Time"
                    value={dateTimeValues[index] || ""}
                    disabled
                    className="custom-text-input-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
