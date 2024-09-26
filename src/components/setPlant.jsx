"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function SetPlant() {
  const [plantType, setPlantType] = useState("");
  const [plantId, setPlantId] = useState("");
  const [plantExist, setPlantExist] = useState(false);

  useEffect(() => {
    const storedPlantType = localStorage.getItem("plantType");
    const storedPlantId = localStorage.getItem("plantId");

    if (storedPlantType) {
      setPlantType(storedPlantType);
    } else {
      setPlantType("Engine");
      localStorage.setItem("plantType", "Engine");
    }

    if (storedPlantId) {
      setPlantId(storedPlantId);
    } else {
      setPlantId("1");
      localStorage.setItem("plantId", "1");
    }
  }, []);

  useEffect(() => {
    if (plantType && plantId) {
      fetch(`http://localhost:8000/warehouse/id/${plantType}/${plantId}`, {
        headers: {
          accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 200) {
            setPlantExist(true);
            console.log(plantExist);
          } else {
            setPlantExist(false);
            console.log(plantExist);
          }
        })
        .catch((error) => {
          console.error("Error fetching plant data:", error);
          setPlantExist(false);
        });
    }
  }, [plantType, plantId]);

  const handlePlantTypeChange = (event) => {
    const newPlantType = event.target.value;
    setPlantType(newPlantType);
  };

  const handlePlantIdChange = (event) => {
    const newPlantId = event.target.value;
    setPlantId(newPlantId);
  };

  return (
    <div className="custom-box-2 space-y-2">
      <h2 className="custom-box-title-1">Set Plant</h2>
      <div className="flex flex-col">
        <label htmlFor="plantType" className="dark:text-white">
          Plant Type
        </label>
        <select
          id="plantType"
          name="plantType"
          value={plantType}
          onChange={handlePlantTypeChange}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-neutral-800 dark:text-white"
        >
          <option value="">Select Plant Type</option>
          <option value="Engine">Engine</option>
          <option value="Casting">Casting</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="plantId" className="dark:text-white">
          ID
        </label>
        <input
          type="number"
          id="plantId"
          name="plantId"
          value={plantId}
          onChange={handlePlantIdChange}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-neutral-800 dark:text-white"
          min="1"
        />
      </div>
      <div className="flex flex-col justify-end">
        <button
          onClick={() => {
            localStorage.setItem("plantType", plantType);
            localStorage.setItem("plantId", plantId);
            toast.success("Updated Plant Data");
          }}
          className="rounded bg-green-500 px-4 py-2 font-bold uppercase text-white shadow-xl hover:bg-green-600 disabled:opacity-50 dark:bg-green-500 dark:text-white"
          disabled={!plantExist}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default SetPlant;
