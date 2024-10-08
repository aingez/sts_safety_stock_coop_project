// Dev: Aingthawan K.
// Component: to display list of active warehouse.

"use client";

import { useEffect, useState } from "react";

const ActiveWarehouseList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/list`,
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1 className="custom-box-title-1">Active Warehouse</h1>
          <div className="max-h-96 overflow-auto">
            {data && data.data && data.data.length > 0 ? (
              <table className="min-w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-100 uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
                  <tr>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      Key
                    </th>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      Type
                    </th>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((warehouse) => (
                    <tr
                      key={warehouse.plant_key}
                      className="border-b bg-white hover:bg-gray-100 dark:border-neutral-500 dark:bg-neutral-700 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <td className="px-4 py-4">{warehouse.plant_key}</td>
                      <td className="px-4 py-4">{warehouse.plant_type}</td>
                      <td className="px-4 py-4">{warehouse.plant_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No active warehouses available.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="animate-pulse">Loading...</div>
      )}
    </div>
  );
};

export default ActiveWarehouseList;
