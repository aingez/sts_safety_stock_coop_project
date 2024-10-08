// Dev: Aingthawan K.
// search page : This page is used to search parts by serial number.

"use client";

import React, { useState } from "react";
import ReusableTable from "../../components/partSearchTable";
import RangeTable from "../../components/partSearchRange";
import { ArrowBigRight, ArrowBigDown } from "lucide-react";
import useCheckUser from "../../hooks/useCheckUser";

function SearchPage() {
  useCheckUser();
  const [serialInput, setSerialInput] = useState("");
  const [sendSerial, setSendSerial] = useState("");
  const [tableKey, setTableKey] = useState(0);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showTable, setShowTable] = useState(false);
  const [showRangeTable, setShowRangeTable] = useState(false);
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

  const handleSerialChange = (e) => {
    setSerialInput(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prevRange) => ({ ...prevRange, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTable(false);
    if (serialInput.length > 1 && !dateRange.start && !dateRange.end) {
      setSendSerial(serialInput);
      setTableKey((prevKey) => prevKey + 1);
      setShowTable(true);
    } else if (dateRange.start && dateRange.end && !serialInput) {
      setShowRangeTable(true);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSerialInput("");
    setDateRange({ start: "", end: "" });
    setTableKey(0);
    setShowTable(false);
    setShowRangeTable(false);
  };

  return (
    <div className="flex min-h-screen flex-col sm:mx-2 md:mx-20">
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
              placeholder="Input Serial Number (Min. 4 characters)"
              disabled={dateRange.start || dateRange.end}
              required
            />
          </div>
          <div className="custom-input-layout-1">
            <label>Search Unpack Date Range</label>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <input
                  type="date"
                  name="start"
                  value={dateRange.start}
                  onChange={handleDateChange}
                  placeholder="Start Date"
                  className="custom-date-input-1"
                  disabled={serialInput.length > 0}
                />
                <div className="hidden md:block">
                  <ArrowBigRight size={40} />
                </div>
                <div className="hidden text-center sm:block md:hidden">
                  <ArrowBigDown size={40} />
                </div>
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
          </div>
          <div className="my-2 space-x-2">
            <button
              type="submit"
              className="custom-button-1-green"
              disabled={
                serialInput.length < 4 &&
                (!dateRange.start ||
                  (dateRange.end && dateRange.end < dateRange.start))
              }
            >
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
          {dateRange.end < dateRange.start && (
            <p className="text-xs text-rose-500">Invalid date range.</p>
          )}
          {new Date(dateRange.start) < new Date() && (
            <p className="text-xs text-rose-500">
              Start date cannot less than today.
            </p>
          )}
          {serialInput.length < 1 && !dateRange.start && !dateRange.end && (
            <h2 className="custom-box-title-2">
              Input the serial number or search by date range to find the part
            </h2>
          )}
        </form>
      </div>
      {showRangeTable && (
        <div className="custom-box-2">
          <h3 className="custom-box-title-1">Results</h3>
          <RangeTable
            plantType={plantType}
            plantId={plantId}
            startDate={dateRange.start}
            endDate={dateRange.end}
          />
        </div>
      )}
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
