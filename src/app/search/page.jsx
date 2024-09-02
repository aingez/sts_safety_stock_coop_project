"use client";

import React, { useState } from "react";
import { Button, DatePicker, Space } from "antd";
import ReusableTable from "../../components/partSearchTable";

function SearchPage() {
  const [serialInput, setSerialInput] = useState("");
  const [tableKey, setTableKey] = useState(0);
  const [dateRange, setDateRange] = useState(null);

  const handleSerialChange = (e) => {
    setSerialInput(e.target.value);
    console.log("serial " + e.target.value);
  };

  const handleDateChange = (date, dateString) => {
    setDateRange(dateString);
    console.log("date " + dateString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableKey((prevKey) => prevKey + 1);
    console.log("Searching for serial: " + serialInput);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSerialInput("");
    setDateRange(null);
    setTableKey(0);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Part Search</h1>
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
                disabled={dateRange != null}
              />
            </div>
            <div className="custom-input-layout-1">
              <label>Search Date Range</label>
              <DatePicker.RangePicker
                size="large"
                placeholder={["", "Today"]}
                allowEmpty={[false, true]}
                onChange={handleDateChange}
                disabled={serialInput.length > 0}
              />
            </div>
            <div className="my-2 space-x-2">
              <Button
                type="submit"
                size="large"
                style={{
                  backgroundColor: "#22c55e",
                  color: "white",
                }}
              >
                SEARCH
              </Button>
              <Button
                onClick={handleReset}
                type="button"
                size="large"
                style={{
                  backgroundColor: "#f87171",
                  color: "white",
                }}
              >
                CLEAR
              </Button>
            </div>
            {serialInput.length < 1 && dateRange === null && (
              <h2 className="custom-box-title-2">
                Input the serial number or search by date range to find the part
              </h2>
            )}
          </form>
        </div>
        {tableKey > 0 && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Results</h3>
            <ReusableTable key={tableKey} partSerial={serialInput} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
