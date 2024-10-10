// Dev: Aingthawan K.
// Component: to display the search result of the part as a table by date range prediction.

import React, { useEffect, useState } from "react";

function PartSearchRange({ plantType, plantId, startDate, endDate }) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/search/parts_by_date_range`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              plant_type: plantType,
              plant_id: plantId,
              start_date: startDate,
              end_date: endDate,
            }),
          },
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
  }, [plantType, plantId, startDate, endDate]);

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
      <h2 className="custom-box-title-2">
        Pallet to unpack during {startDate} to {endDate}
      </h2>
      <table className="hidden min-w-full text-left text-sm text-gray-500 lg:table rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-100 text-lg uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
          <tr>
            {[
              "Pallet",
              "Row",
              "Lane",
              "Pile",
              "Layer",
              "Age",
              "Current Type",
              "Current Model",
            ].map((header) => (
              <th key={header} className="whitespace-nowrap px-4 py-4 sm:px-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apiData &&
            apiData.map((item, index) => (
              <tr
                key={index}
                className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-800"
              >
                {[
                  item.pallet_name,
                  item.row || "-",
                  item.lane || "-",
                  item.pile || "-",
                  item.layer || "-",
                  item.age_start + " - " + item.age_end,
                  item.current_type,
                  item.current_model,
                ].map((value, idx) => (
                  <td
                    key={idx}
                    className="whitespace-nowrap px-4 py-4 text-left text-lg sm:px-6"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="block lg:hidden">
        {apiData &&
          apiData.map((item, index) => (
            <div
              key={index}
              className="mb-2 rounded-lg bg-white p-4 shadow dark:bg-neutral-700"
            >
              {[
                { label: "Pallet", value: item.pallet_name },
                {
                  label: "Row : Lane : Pile : Layer",
                  value: `${item.row} : ${item.lane} : ${item.pile} : ${item.layer}`,
                },
                { label: "Age", value: item.age_start + " - " + item.age_end },
                { label: "Current Type", value: item.current_type },
                { label: "Current Model", value: item.current_model },
              ].map((field, idx) => (
                <div
                  key={idx}
                  className="inline-flex grid grid-cols-2 font-semibold"
                >
                  <span>{field.label}</span>
                  <span className="ml-1 font-thin">{field.value}</span>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default PartSearchRange;
