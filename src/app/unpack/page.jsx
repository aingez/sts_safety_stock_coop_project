"use client";

import React, { useState } from "react";
import { Table, Input } from "antd";

export default function PackPage() {
  const partTypeSerialCount = {
    Block: 6,
    Head: 8,
    Crankshaft: 12,
  };

  const [formData, setFormData] = useState({
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
      setFormData({
        ...formData,
        palletId,
        partType,
        serialNumbers,
      });
    } else {
      setFormData({
        ...formData,
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
          {/* position unused */}
          <div className="flex flex-row space-x-2">
            <div className="custom-input-layout-1">
              <label>Lane</label>
              <input
                disabled
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              ></input>
            </div>
            <div className="custom-input-layout-1">
              <label>Row</label>
              <input
                disabled
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              ></input>
            </div>
            <div className="custom-input-layout-1">
              <label>Layer</label>
              <input
                disabled
                type="text"
                onInput={(e) => handlePalletIdChange(e)}
                className="custom-text-input-1"
                placeholder="XX"
                required
              ></input>
            </div>
          </div>
          <div className="my-2 flex flex-row">
            <button
              className="mx-1 my-2 select-none rounded-lg bg-red-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-900/20 transition-all hover:bg-red-400 hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="reset"
            >
              Reset
            </button>
            <button
              className="mx-1 my-2 select-none rounded-lg bg-green-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/20 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="save"
            >
              Update
            </button>
          </div>
        </div>
      </form>

      <div className="min-h-full w-1/2">
        <Table dataSource={formData.serialNumbers} pagination={false}>
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
        </Table>
      </div>
    </div>
  );
}
