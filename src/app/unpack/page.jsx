"use client";

import React, { useState } from "react";
import { Table, Input, Button, Radio, InputNumber } from "antd";

export default function UnPackPage() {
  const [dateTimeValues, setDateTimeValues] = useState({});

  const handleSerialNumberChange = (e, index) => {
    const newDateTime = new Date().toLocaleString(); // Get current date and time

    // Update the state for the specific row
    setDateTimeValues((prev) => ({
      ...prev,
      [index]: newDateTime,
    }));
  };

  const partTypeSerialCount = {
    Block: 6,
    Head: 8,
    Crankshaft: 12,
  };

  const [divData, setdivData] = useState({
    employeeId: "",
    employeeName: "",
    palletId: "",
    partType: "",
    serialNumbers: [],
  });

  const handlePalletIdChange = (e) => {
    const palletId = e.target.value;
    if (palletId.length === 5) {
      const partType = palletId.substring(0, 2);
      const partTypeSerialCount = {
        BL: 6,
        HE: 8,
        CR: 12,
      };
      const serialNumbers = Array(partTypeSerialCount[partType]).fill("");
      setdivData({
        ...divData,
        palletId,
        partType,
        serialNumbers,
      });
    } else {
      setdivData({
        ...divData,
        palletId,
        partType: "",
        serialNumbers: [],
      });
    }
  };

  return (
    <div className="mb-20 flex min-h-screen flex-row space-x-10">
      <form className="custom-box-1">
        <div className="flex flex-col p-10">
          <h1 className="custom-title-1">Un-Packing</h1>
          <div className="custom-input-layout-1">
            <label>Employee ID</label>
            <input
              type="text"
              onInput={(e) => handlePalletIdChange(e)}
              className="custom-text-input-1"
              placeholder="XXXXXXXXX"
              required
            ></input>
          </div>
          <div className="custom-input-layout-1">
            <label>Name - Surname</label>
            <input
              type="text"
              onInput={(e) => handlePalletIdChange(e)}
              className="custom-text-input-1"
              placeholder="Sprinter Trueno"
              required
            ></input>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="custom-input-layout-1">
              <label>Pallet ID</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX-00-X"
                required
              ></input>
            </div>
            <div className="custom-input-layout-1">
              <label>Plant Type</label>
              <Radio.Group
                // onChange={handlePlantTypeChange}
                size="large"
                // value={plantType}
                // disabled={palletMode === "Remove"}
              >
                <Radio.Button value="Engine">Engine</Radio.Button>
                <Radio.Button value="Casting">Casting</Radio.Button>
              </Radio.Group>
            </div>
            <div className="custom-input-layout-1">
              <label>Plant Number</label>
              <Radio.Group
                // onChange={handlePlantNumberChange}
                size="large"
                // value={plantNumber}
                // disabled={palletMode === "Remove"}
              >
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          {/* position */}
          <div className="flex flex-row space-x-2">
            <div className="custom-input-layout-1">
              <label>Lane</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
                disabled
              ></input>
            </div>
            <div className="custom-input-layout-1">
              <label>Row</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
                disabled
              ></input>
            </div>
            <div className="custom-input-layout-1">
              <label>Pile (Not Sure)</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
                disabled
              ></input>
            </div>
            <div className="custom-input-layout-1">
              <label>Layer</label>
              <input
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
                disabled
              ></input>
            </div>
          </div>
          <div className="my-4 flex flex-row space-x-2">
            <button className="custom-button-1-red" type="reset">
              Reset
            </button>
            <button className="custom-button-1-green" type="update">
              Update
            </button>
          </div>
        </div>
      </form>

      <div className="min-h-full w-1/2">
        <Table dataSource={divData.serialNumbers} pagination={false}>
          <Table.Column
            title="Serial Number Input"
            dataIndex="serialNumber"
            key="serialNumber"
            render={(text, record, index) => (
              <Input
                placeholder={`Serial ${index + 1}`}
                value={text}
                onChange={(e) => handleSerialNumberChange(e, index)}
              />
            )}
          />
          <Table.Column
            title="Pack Date Time"
            dataIndex="dateTime"
            key="dateTime"
            render={(_, __, index) => (
              <Input
                placeholder="Current Date Time"
                value={dateTimeValues[index] || ""}
                disabled
              />
            )}
          />
        </Table>
      </div>
    </div>
  );
}
