"use client";

import React, { useState } from "react";
import ReusableTable from "../../components/partSearchTable";

function SearchPage() {
  const [serialInput, setSerialInput] = useState("");
  const [tableKey, setTableKey] = useState(0);

  const handleChange = (e) => {
    setSerialInput(e.target.value);
    console.log("serial " + e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableKey((prevKey) => prevKey + 1);
    console.log("Searching for serial: " + serialInput);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSerialInput("");
    setTableKey(0);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-3xl font-bold">Part Search</h1>
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={serialInput}
                  onChange={handleChange}
                  className="block w-full max-w-xs rounded border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="XXXXXXXXXX"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={handleReset}
                  type="button"
                >
                  Reset
                </button>
                <button
                  className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {tableKey > 0 && (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Results</h3>
              <ReusableTable key={tableKey} partSerial={serialInput} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
