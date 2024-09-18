// Dev: Aingthawan K.
// Component: to display list of part type and model in production.

"use client";

import { useEffect, useState } from "react";

const ActivePartList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/parts_in_production",
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
          <h1 className="custom-box-title-1">Active Parts</h1>
          <div className="max-h-96 overflow-auto">
            <table className="min-w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-100 uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Model
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((parts) => (
                  <tr
                    key={parts.model}
                    className="border-b bg-white hover:bg-gray-100 dark:border-neutral-500 dark:bg-neutral-700 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <td className="px-4 py-4">{parts.id}</td>
                    <td className="px-4 py-4">{parts.type}</td>
                    <td className="px-4 py-4">{parts.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="animate-pulse">Loading...</div>
      )}
    </div>
  );
};

export default ActivePartList;
