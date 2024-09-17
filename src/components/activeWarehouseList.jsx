// Dev: Aingthawan K.
// Component: to display list of active warehouse.

"use client";

import { useEffect, useState } from "react";

const ActiveWarehouseList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/list_warehouse");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // if (!data) {
  //   return (
  //     <div>
  //       <div className="animate-spin">/</div>;
  //     </div>
  //   );
  // }

  return (
    <div>
      {data ? (
        <div>
          <h1 className="custom-box-title-1">Active Warehouse</h1>
          <div className="max-h-96 overflow-auto">
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
          </div>
        </div>
      ) : (
        <div className="flex animate-spin items-center justify-center space-x-4">
          /
        </div>
      )}
    </div>
  );
};

export default ActiveWarehouseList;
