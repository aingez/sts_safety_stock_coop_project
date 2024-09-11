import React, { useEffect, useState } from "react";

function AlertTable({ pageSize = 10 }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [plantKey, setPlantKey] = useState();
  const [plantId, setPlantId] = useState(1);
  const [plantType, setPlantType] = useState("Engine");

  const fetchData = async () => {
    try {
      const key = await fetchPlantKey();
      setPlantKey(key);
      console.log("Plant Key: ", key);
      const res = await fetch(`http://localhost:8000/pallet_rank/${key}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setApiData(data.data);
      console.log("Data: ", apiData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlantKey = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/plant_id?plant_type=${plantType}&plant_code=${plantId}`,
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

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);
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

  // if (loading) {
  //   return (
  //     <div className="flex h-64 items-center justify-center">
  //       <div className="loader h-32 w-32 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div
  //       className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
  //       role="alert"
  //     >
  //       <strong className="font-bold">Error: </strong>
  //       <span className="block sm:inline">{error}</span>
  //     </div>
  //   );
  // }

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex flex-row space-x-2">
        <div className="custom-input-layout-1">
          <label htmlFor="plantType">Plant Type</label>
          <select
            id="plantType"
            name="plantType"
            value={plantType || "Engine"}
            onChange={(e) => setPlantType(e.target.value)}
            className="custom-text-input-1"
          >
            <option value="">Select Plant Type</option>
            <option value="Engine">Engine</option>
            <option value="Casting">Casting</option>
          </select>
        </div>
        <div className="custom-input-layout-1">
          <label htmlFor="plantId">Plant ID</label>
          <select
            id="plantId"
            name="plantId"
            value={plantId || 1}
            onChange={(e) => setPlantId(e.target.value)}
            className="custom-text-input-1"
          >
            <option value="">Select Plant ID</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      {loading && <div className="my-20 text-center">Loading . . .</div>}
      {error && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {!loading && error == null && (
        <table className="min-w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Status
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Part Type
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Pallet Number
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Packing Date
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Age Days
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 sm:table-cell sm:px-6"
              >
                Plant Type
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 sm:table-cell sm:px-6"
              >
                Plant ID
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 sm:table-cell sm:px-6"
              >
                Lane
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 sm:table-cell sm:px-6"
              >
                Row
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 sm:table-cell sm:px-6"
              >
                Layer
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.pallet_id}
                className="border-b bg-white hover:bg-gray-100 dark:border-neutral-500 dark:bg-neutral-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <td className="px-4 py-4 sm:px-6">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-semibold ${
                      item.color_status === "red"
                        ? "bg-red-200 text-red-800 dark:bg-red-500 dark:text-red-100"
                        : item.color_status === "green"
                          ? "bg-green-200 text-green-800 dark:bg-green-500 dark:text-green-100"
                          : "bg-yellow-200 text-yellow-800 dark:bg-yellow-500 dark:text-yellow-100"
                    }`}
                  >
                    {item.color_status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4 sm:px-6">{item.type}</td>
                <td className="px-4 py-4 sm:px-6">{item.pallet_name}</td>
                <td className="px-4 py-4 sm:px-6">
                  {item.pack_date_formatted}
                </td>
                <td className="px-4 py-4 sm:px-6">{item.age_days}</td>
                <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
                  {item.plant_type}
                </td>
                <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
                  {item.plant_id}
                </td>
                <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
                  {item.lane}
                </td>
                <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
                  {item.row}
                </td>
                <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
                  {item.layer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
