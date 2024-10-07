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
      <table className="hidden min-w-full text-left text-sm text-gray-500 lg:table rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
          <tr>
            {[
              "Pallet",
              "Row",
              "Lane",
              "Pile",
              "Layer",
              "Age Start",
              "Age End",
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
                className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-700"
              >
                {[
                  item.pallet_name,
                  item.row || "-",
                  item.lane || "-",
                  item.pile || "-",
                  item.layer || "-",
                  item.age_start,
                  item.age_end,
                  item.current_type,
                  item.current_model,
                ].map((value, idx) => (
                  <td
                    key={idx}
                    className="whitespace-nowrap px-4 py-4 text-center sm:px-6"
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
              className="rounded-lg bg-white p-4 shadow dark:bg-neutral-700"
            >
              {[
                { label: "Pallet", value: item.pallet_name },
                { label: "Row", value: item.row || "-" },
                { label: "Lane", value: item.lane || "-" },
                { label: "Pile", value: item.pile || "-" },
                { label: "Layer", value: item.layer || "-" },
                { label: "Age Start", value: item.age_start },
                { label: "Age End", value: item.age_end },
                { label: "Current Type", value: item.current_type },
                { label: "Current Model", value: item.current_model },
              ].map((field, idx) => (
                <div
                  key={idx}
                  className={
                    idx % 2 === 0 ? "bg-gray-50 dark:bg-neutral-600" : ""
                  }
                >
                  <div className="px-4 py-2 font-semibold">{field.label}</div>
                  <div className="px-4 py-2">{field.value}</div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default PartSearchRange;
