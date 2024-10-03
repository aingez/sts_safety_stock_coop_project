// Dev: Aingthawan K.
// unpack page : This page is used to display the unpacking field.

"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ScanQrCode } from "lucide-react";

export default function UnPackPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [serialNumbers, setSerialNumbers] = useState([]);
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
  const [apiPalletData, setApiPalletData] = useState("");
  const [apiPartData, setApiPartData] = useState({ data: [] });
  const [checkedSerialNumbers, setCheckedSerialNumbers] = useState([]);
  const [unpackDateTimes, setUnpackDateTimes] = useState({});

  const [serialInput, setSerialInput] = useState("");

  const handleReset = () => {
    setSerialNumbers([]);
    setPalletName("");
    setApiPalletData("");
    setApiPartData({ data: [] });
    setCheckedSerialNumbers([]);
    setUnpackDateTimes({});
    setSerialInput("");
  };

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
    }
  }, [apiPalletData, apiPartData]);

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
        toast.success("Pallet data fetched successfully");
        setApiPalletData(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    if (palletName.length >= 5 && plantType.length > 0 && plantId.length != 0) {
      fetchPalletData();
    }
  }, [palletName, plantType, plantId]);

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
        toast.success("Part data fetched successfully");
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (
      apiPalletData &&
      apiPalletData.data?.is_pack &&
      palletName.length >= 5 &&
      plantType.length > 0 &&
      plantId != 0
    ) {
      fetchPartonPallet();
    }
  }, [apiPalletData, plantType, plantId, palletName]);

  useEffect(() => {
    // check if serialInput in serialNumbers
    const serialNumberIndex = serialNumbers.findIndex(
      (serial) => serial.serialNumber === serialInput,
    );
    // if found, check the checkbox
    if (serialNumberIndex !== -1) {
      const checkbox = document.getElementById(`checkbox-${serialNumberIndex}`);
      checkbox.click();
      setSerialInput("");
    }
  }, [serialInput]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radioOptionsPlantType = [
    { value: "Engine", label: "Engine" },
    { value: "Casting", label: "Casting" },
  ];

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(date).toLocaleString("en-GB", options);
  };

  const handleUnpack = () => {
    const unpackedSerialNumbersList = checkedSerialNumbers.map((index) => ({
      serialNumber: serialNumbers[index].serialNumber,
      unpackDateTime: unpackDateTimes[index],
    }));
    console.log(
      JSON.stringify({
        packer_id: employeeId,
        packer_name: employeeName,
        pallet_name: palletName,
        plant_type: plantType,
        plant_id: plantId,
        unpack_part: unpackedSerialNumbersList,
      }),
    );

    fetch(
      `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/part/unpack/bundle`,
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
          plant_id: plantId,
          unpack_part: unpackedSerialNumbersList,
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
        toast.success("Unpacked successfully");
        handleReset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className={`flex min-h-screen pb-20 ${isMobile ? "flex-col space-x-0" : "w-full flex-row space-x-10"}`}
    >
      <form className="custom-box-2">
        <div className="flex flex-col p-4 md:p-10">
          <h1 className="custom-title-1">Un-Packing</h1>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="custom-input-layout-1">
              <label>Employee ID</label>
              <input
                type="integer"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="custom-text-input-1"
                placeholder="XXXXXXXXX"
                required
                disabled
              ></input>
            </div>
            <div className="custom-input-layout-1">
              <label>Name - Surname</label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="custom-text-input-1"
                placeholder="Sprinter Levin"
                required
                disabled
              ></input>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="custom-input-layout-1">
              <label>Pallet Name</label>
              <input
                type="text"
                onChange={(e) => setPalletName(e.target.value)}
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
                      <label
                        htmlFor={`plant-type-${option.value}`}
                        className="mx-2"
                      >
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
              type="button"
              onClick={handleUnpack}
              disabled={
                palletName.length < 5 ||
                plantType.length === 0 ||
                plantId.length === 0 ||
                apiPalletData.length === 0 ||
                apiPartData.length === 0
              }
            >
              Unpack
            </button>
          </div>

          <div className="flex gap-2">
            <ScanQrCode size={50} />
            <input
              type="text"
              value={serialInput}
              onChange={(e) => setSerialInput(e.target.value)}
              className="custom-text-input-1"
              placeholder="Input Serial Number"
              disabled={apiPalletData.length === 0}
            />
          </div>
        </div>
      </form>

      {/* Table Part */}
      <div className="custom-box-3 min-h-full overflow-auto py-5">
        <table className="text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
            <tr>
              <th className="px-6 py-3">Select</th>
              <th className="px-6 py-3">Serial Number</th>
              <th className="px-6 py-3">Pack Date Time</th>
              <th className="px-6 py-3">Unpack Date Time</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: apiPalletData.data?.max_capacity || 0 }).map(
              (_, index) => (
                <tr
                  key={index}
                  id={`serialNumber-${index}`}
                  className="border-b bg-white hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-600"
                  onClick={() => {
                    const checkbox = document.getElementById(
                      `checkbox-${index}`,
                    );
                    checkbox.click();
                  }}
                >
                  <td className="px-6 py-2">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="h-16 w-16 appearance-none rounded-md border border-gray-400 bg-neutral-200 checked:bg-amber-500 disabled:opacity-30 dark:bg-neutral-600"
                      disabled={serialNumbers[index]?.serialNumber == ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentDateTime = new Date().toLocaleString();
                        setCheckedSerialNumbers((prev) => {
                          if (e.target.checked) {
                            setUnpackDateTimes((prevTimes) => ({
                              ...prevTimes,
                              [index]: formatDate(currentDateTime),
                            }));
                            return [...prev, index];
                          } else {
                            setUnpackDateTimes((prevTimes) => {
                              const newTimes = { ...prevTimes };
                              delete newTimes[index];
                              return newTimes;
                            });
                            return prev.filter((i) => i !== index);
                          }
                        });
                      }}
                    />
                  </td>
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
                      }}
                      className="custom-text-input-1"
                      disabled
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={
                        serialNumbers[index]?.packDate
                          ? formatDate(serialNumbers[index].packDate)
                          : ""
                      }
                      disabled
                      className="custom-text-input-1"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={unpackDateTimes[index] || ""}
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
