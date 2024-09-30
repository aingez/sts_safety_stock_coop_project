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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/search/bundle/${partSerial}`,
        );
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
      <table className="hidden min-w-full text-left text-sm text-gray-500 lg:table rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
          <tr>
            {[
              "Type : Model",
              "Serial Number",
              "Pallet",
              "Plant",
              "Row : Lane : Pile : Layer",
              "Packing Date",
              "Packer",
              "Un-Pack Date",
              "Un-Packer",
            ].map((header) => (
              <th key={header} className="whitespace-nowrap px-4 py-4 sm:px-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apiData && (
            <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-700">
              {[
                `${apiData.type} : ${apiData.model}`,
                apiData.serial,
                apiData.pallet_name,
                `${apiData.plant_type} ${apiData.plant_id}`,
                `${apiData.row} : ${apiData.lane} : ${apiData.pile} : ${apiData.layer}`,
                apiData.pack_date_formatted,
                apiData.packer_name,
                apiData.unpack_date_formatted || "-",
                apiData.unpacker_name || "-",
              ].map((value, index) => (
                <td
                  key={index}
                  className="whitespace-nowrap px-4 py-4 text-center sm:px-6"
                >
                  {value}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
      <div className="block lg:hidden">
        {apiData && (
          <div className="rounded-lg bg-white p-4 shadow dark:bg-neutral-700">
            {[
              {
                label: "Type : Model",
                value: `${apiData.type} : ${apiData.model}`,
              },
              { label: "Serial Number", value: apiData.serial },
              { label: "Pallet", value: apiData.pallet_name },
              {
                label: "Plant",
                value: `${apiData.plant_type} ${apiData.plant_id}`,
              },
              {
                label: "Row : Lane : Pile : Layer",
                value: `${apiData.row} : ${apiData.lane} : ${apiData.pile} : ${apiData.layer}`,
              },
              { label: "Packing Date", value: apiData.pack_date_formatted },
              { label: "Packer", value: apiData.packer_name },
              {
                label: "Un-Pack Date",
                value: apiData.unpack_date_formatted || "-",
              },
              { label: "Un-Packer", value: apiData.unpacker_name || "-" },
            ].map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-50 dark:bg-neutral-600" : ""
                }
              >
                <td className="px-4 py-2 font-semibold">{item.label}</td>
                <td className="px-4 py-2">{item.value}</td>
              </tr>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PartSearchTable;
