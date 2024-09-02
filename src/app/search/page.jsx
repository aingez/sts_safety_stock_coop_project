"use client";

import React, { useState } from "react";
import ReusableTable from "../../components/partSearchTable";

function SearchPage() {
  const [serialInput, setSerialInput] = useState("");
  const [tableKey, setTableKey] = useState(0);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleSerialChange = (e) => {
    setSerialInput(e.target.value);
    console.log("serial " + e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prevRange) => ({ ...prevRange, [name]: value }));
    console.log(`${name} date: ${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableKey((prevKey) => prevKey + 1);
    console.log("Searching for serial: " + serialInput);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSerialInput("");
    setDateRange({ start: "", end: "" });
    setTableKey(0);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <h1 className="custom-title-1">Part Search</h1>
        <div className="custom-box-2">
          <form onSubmit={handleSubmit}>
            <div className="custom-input-layout-1">
              <label>Serial Number</label>
              <input
                type="text"
                value={serialInput}
                onChange={handleSerialChange}
                className="custom-text-input-1"
                placeholder="XXXXXXXXXX"
                disabled={dateRange.start || dateRange.end}
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Search Date Range</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="start"
                  value={dateRange.start}
                  onChange={handleDateChange}
                  placeholder="Start Date"
                  className="block w-full grow rounded-lg border-2 border-neutral-200 bg-transparent bg-white p-2 px-4 py-2 text-sm font-normal leading-relaxed text-gray-400 focus:outline-none disabled:bg-neutral-200"
                  disabled={serialInput.length > 0}
                />
                <span>-</span>
                <input
                  type="date"
                  name="end"
                  value={dateRange.end}
                  onChange={handleDateChange}
                  className="block w-full grow rounded-lg border-2 border-neutral-200 bg-transparent bg-white p-2 px-4 py-2 text-sm font-normal leading-relaxed text-gray-400 focus:outline-none disabled:bg-neutral-200"
                  disabled={serialInput.length > 0 || dateRange.start === ""}
                />
              </div>
            </div>
            <div className="my-2 space-x-2">
              <button
                type="submit"
                className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                SEARCH
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                CLEAR
              </button>
            </div>
            {serialInput.length < 1 && !dateRange.start && !dateRange.end && (
              <h2 className="custom-box-title-2">
                Input the serial number or search by date range to find the part
              </h2>
            )}
          </form>
        </div>
        {tableKey > 0 && (
          <div className="custom-box-2">
            <h3 className="custom-box-title-1">Results</h3>
            <ReusableTable key={tableKey} partSerial={serialInput} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
