import React, { useEffect, useState } from "react";

function AlertTable({ pageSize = 10 }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [plantKey, setPlantKey] = useState(null);
  const [filter, setFilter] = useState("");
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

  const fetchPlantKey = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/warehouse/id/${plantType}/${plantId}`,
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setError(null);
      return data.id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const fetchData = async () => {
    if (apiData.length === 0) {
      setLoading(true);
    }
    const storedPlantType = localStorage.getItem("plantType");
    const storedPlantId = localStorage.getItem("plantId");
    setPlantType(storedPlantType);
    setPlantId(storedPlantId);
    try {
      let key = plantKey;
      if (!key) {
        key = await fetchPlantKey();
        setPlantKey(key);
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/pallet/rank/${key}`,
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setApiData(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10 * 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(apiData.length / pageSize);
  const paginatedData = apiData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex flex-row space-x-2">
        {!loading && !error && (
          <div className="custom-input-layout-1">
            <label htmlFor="filter">Filter Part Type</label>
            <select
              id="filter"
              name="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="custom-text-input-1"
            >
              <option value="">All</option>
              {Array.from(new Set(apiData.map((item) => item.type))).map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ),
              )}
            </select>
          </div>
        )}
      </div>
      <p className="mb-1 text-xs font-light opacity-50">
        Listing from earliest packed part age from each pallet.
      </p>

      {loading && <div className="my-20 text-center">Loading . . .</div>}
      {error && (
        <div
          className="relative rounded border border-red-400 bg-red-100 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {!loading && !error && (
        <>
          <table className="min-w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-md bg-gray-100 py-4 text-center uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
              <tr>
                <th scope="col" className="px-2 py-3 sm:px-2">
                  Day
                </th>
                <th scope="col" className="">
                  Type
                </th>
                <th scope="col" className="">
                  Pallet
                </th>
                <th scope="col" className="whitespace-nowrap">
                  Pack Date
                </th>
                {/* <th scope="col" className="hidden sm:table-cell">
                  Plant
                </th> */}
                <th scope="col" className="hidden sm:table-cell">
                  Lane
                </th>
                <th scope="col" className="hidden sm:table-cell">
                  Row
                </th>
                <th scope="col" className="hidden sm:table-cell">
                  Pile
                </th>
                <th scope="col" className="hidden sm:table-cell">
                  Layer
                </th>
                <th scope="col" className="hidden sm:table-cell">
                  Packer
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData
                .filter((item) => (filter ? item.type === filter : true))
                .map((item, index) => (
                  <tr
                    key={`${item.pallet_id}-${index}`}
                    className="border-b bg-white hover:bg-gray-100 dark:border-neutral-500 dark:bg-neutral-700 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <td
                      className={`font-ligth min-w-4 p-2 text-center text-lg text-neutral-900 ${
                        item.color_status === "red"
                          ? "bg-[#FF1700] shadow-inner"
                          : item.color_status === "green"
                            ? "bg-[#84cc16]"
                            : "bg-[#f59e0b]"
                      }`}
                    >
                      {item.age_days}
                    </td>
                    <td className="px-4 py-4 text-center">{item.type}</td>
                    <td className="px-4 py-4 text-center">
                      {item.pallet_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {item.pack_date_formatted}
                    </td>
                    {/* <td className="hidden px-4 py-4 text-center sm:table-cell">
                      {item.plant_type} {item.plant_id}
                    </td> */}
                    <td className="py-4text-center hidden px-4 sm:table-cell">
                      {item.lane || "Dock"}
                    </td>
                    <td className="hidden px-4 py-4 text-left sm:table-cell">
                      {item.row || "Dock"}
                    </td>
                    <td className="hidden px-4 py-4 text-left sm:table-cell">
                      {item.pile || "Dock"}
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      {item.layer || "Dock"}
                    </td>
                    <td className="hidden px-4 py-4 text-center sm:table-cell">
                      {item.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-full rounded bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50 sm:w-auto"
        >
          Previous
        </button>
        <span className="text-xs uppercase text-gray-700 dark:text-neutral-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-full rounded bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50 sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AlertTable;
