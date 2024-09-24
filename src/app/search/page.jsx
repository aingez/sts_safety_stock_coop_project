// Dev: Aingthawan K.
// search page : This page is used to search parts by serial number.

"use client";

import React, { useState } from "react";
import ReusableTable from "../../components/partSearchTable";

function SearchPage() {
  const [serialInput, setSerialInput] = useState("");
  const [sendSerial, setSendSerial] = useState("");
  const [tableKey, setTableKey] = useState(0);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showTable, setShowTable] = useState(false);

  const handleSerialChange = (e) => {
    setSerialInput(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prevRange) => ({ ...prevRange, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSendSerial(serialInput);
    setTableKey((prevKey) => prevKey + 1);
    setShowTable(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSerialInput("");
    setDateRange({ start: "", end: "" });
    setTableKey(0);
    setShowTable(false);
  };

  return (
    <div className="mx-20 flex min-h-screen flex-col">
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
              required
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
                className="custom-date-input-1"
                disabled={serialInput.length > 0}
              />
              <span>→</span>
              <input
                type="date"
                name="end"
                value={dateRange.end}
                onChange={handleDateChange}
                className="custom-date-input-1"
                disabled={serialInput.length > 0 || dateRange.start === ""}
              />
            </div>
          </div>
          <div className="my-2 space-x-2">
            <button type="submit" className="custom-button-1-green">
              SEARCH
            </button>
            <button
              onClick={handleReset}
              type="button"
              className="custom-button-1-pink"
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
      {showTable && (
        <div className="custom-box-2">
          <h3 className="custom-box-title-1">Results</h3>
          <ReusableTable key={tableKey} partSerial={sendSerial} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
