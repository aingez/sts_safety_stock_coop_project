"use client";

import React, { useState, useEffect } from "react";

function page() {
  const [plantType, setPlantType] = useState("Engine");
  const [plantId, setPlantId] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPlantType = localStorage.getItem("plantType") || "Engine";
      const storedPlantId = Number(localStorage.getItem("plantId")) || 1;
      setPlantType(storedPlantType);
      setPlantId(storedPlantId);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      fetch(
        `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/search/latest/pack/${plantType}/${plantId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [isInitialized, plantType, plantId]);

  return (
    <div className="custom-box-2">
      <h1 className="text-2xl">Latest Pack Parts</h1>
      <h1 className="mb-4 text-xs text-amber-500">Top 5 Previously Packed</h1>
      <div className="sticky top-0 z-10 bg-neutral-500">
        <table className="min-w-full">
          <thead>
            <tr>
              {["Serial", "Type and Model", "Pallet Name", "Pack Date"].map(
                (header) => (
                  <th
                    key={header}
                    className="border-b border-gray-800 px-4 py-2 text-xs"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
        </table>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full bg-neutral-700">
          <tbody>
            {data.slice(0, 10).map((item, rowIndex) => (
              <tr key={rowIndex}>
                {[
                  item.serial,
                  `${item.type}: ${item.model}`,
                  item.pallet_name,
                  item.pack_date_formatted,
                ].map((value, index) => (
                  <td
                    key={index}
                    className="border-b border-gray-800 px-4 py-2 text-xs"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
