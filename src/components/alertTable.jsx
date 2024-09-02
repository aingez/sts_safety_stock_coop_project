import React, { useEffect, useState } from "react";

function AlertTable({ pageSize }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/pallet_age_rank");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setApiData(data[0].data);
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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="loader h-32 w-32 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-neutral-500 dark:text-neutral-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Part Type
            </th>
            <th scope="col" className="px-6 py-3">
              Pallet Number
            </th>
            <th scope="col" className="px-6 py-3">
              Packing Date
            </th>
            <th scope="col" className="px-6 py-3">
              Age Days
            </th>
            <th scope="col" className="px-6 py-3">
              Plant Type
            </th>
            <th scope="col" className="px-6 py-3">
              Plant ID
            </th>
            <th scope="col" className="px-6 py-3">
              Lane
            </th>
            <th scope="col" className="px-6 py-3">
              Row
            </th>
            <th scope="col" className="px-6 py-3">
              Layer
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr
              key={item.pallet_id}
              className="border-b bg-white hover:bg-gray-100 hover:font-bold dark:border-neutral-500 dark:bg-neutral-700 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    item.color_status === "red"
                      ? "bg-red-200 text-red-800"
                      : item.color_status === "green"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {item.color_status.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4">{item.type}</td>
              <td className="px-6 py-4">{item.pallet_name}</td>
              <td className="px-6 py-4">{item.formatted_pack_date}</td>
              <td className="px-6 py-4">{item.formatted_age_days}</td>
              <td className="px-6 py-4">{item.plant_type}</td>
              <td className="px-6 py-4">{item.plant_id}</td>
              <td className="px-6 py-4">{item.lane}</td>
              <td className="px-6 py-4">{item.row}</td>
              <td className="px-6 py-4">{item.layer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-xs uppercase text-gray-700 dark:text-neutral-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AlertTable;
