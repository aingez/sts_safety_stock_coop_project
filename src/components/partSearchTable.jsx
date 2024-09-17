// Dev: Aingthawan K.
// Component: to display the search result of the part as a table.

import React, { useEffect, useState } from "react";

function PartSearchTable({ partSerial }) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(`http://localhost:8000/search/${partSerial}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setApiData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    callAPI();
  }, [partSerial]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
          <tr>
            <th className="px-4 py-4 sm:px-6">Part Type</th>
            <th className="px-4 py-4 sm:px-6">Model</th>
            <th className="px-4 py-4 sm:px-6">Serial Number</th>
            <th className="px-4 py-4 sm:px-6">Pallet Number</th>
            <th className="px-4 py-4 sm:px-6">Plant Type</th>
            <th className="px-4 py-4 sm:px-6">Plant Code</th>
            <th className="px-4 py-4 sm:px-6">Row</th>
            <th className="px-4 py-4 sm:px-6">Lane</th>
            <th className="px-4 py-4 sm:px-6">Pile</th>
            <th className="px-4 py-4 sm:px-6">Layer</th>
            <th className="px-4 py-4 sm:px-6">Packing Date</th>
            <th className="px-4 py-4 sm:px-6">Packer</th>
            <th className="px-4 py-4 sm:px-6">Un-Pack Date</th>
            <th className="px-4 py-4 sm:px-6">Un-Packer</th>
          </tr>
        </thead>
        <tbody>
          {apiData && (
            <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-700">
              <td className="px-4 py-4 sm:px-6">{apiData.type}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.model}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.serial}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.pallet_name}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.plant_type}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.plant_id}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.row}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.lane}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.pile}</td>
              <td className="px-4 py-4 sm:px-6">{apiData.layer}</td>
              <td className="px-4 py-4 sm:px-6">
                {apiData.pack_date_formatted}
              </td>
              <td className="px-4 py-4 sm:px-6">{apiData.packer_name}</td>
              <td className="px-4 py-4 sm:px-6">
                {apiData.unpack_date_formatted}
              </td>
              <td className="px-4 py-4 sm:px-6">{apiData.unpacker_name}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PartSearchTable;
