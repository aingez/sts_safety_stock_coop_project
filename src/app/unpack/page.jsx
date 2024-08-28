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
    <div>
      {/* two column style */}
      <form className="flex flex-row">
        {/* make content stay on the right */}
        <col1 className="mr-5 w-1/2 rounded-lg bg-neutral-100 px-40 py-40 shadow-lg">
          <h1 className="text-4xl font-bold">Un-Packing</h1>
          <div className="p-1">
            <label class="mb-1 flex items-center text-xs font-medium">
              Employee ID
            </label>
            <input
              type="text"
              onInput={(e) => handlePalletIdChange(e)}
              class="shadow-xs placeholder-grey-700 block w-full max-w-xs rounded border border-black bg-transparent bg-white px-4 py-2 text-sm font-normal leading-relaxed text-gray-900 focus:outline-none"
              placeholder="XXXXXXXXX"
              required
            ></input>
          </div>
          <div className="p-1">
            <label class="mb-1 flex items-center text-xs font-medium">
              Name - Surname
            </label>
            <input
              type="text"
              onInput={(e) => handlePalletIdChange(e)}
              class="shadow-xs placeholder-grey-700 block w-full max-w-xs rounded border border-black bg-transparent bg-white px-4 py-2 text-sm font-normal leading-relaxed text-gray-900 focus:outline-none"
              placeholder="Sprinter Trueno"
              required
            ></input>
          </div>

          <div className="p-1">
            <label class="mb-1 flex items-center text-xs font-medium">
              Pallet ID
            </label>
            <input
              type="text"
              onInput={(e) => handlePalletIdChange(e)}
              class="shadow-xs placeholder-grey-700 block w-full max-w-xs rounded border border-black bg-transparent bg-white px-4 py-2 text-sm font-normal leading-relaxed text-gray-900 focus:outline-none"
              placeholder="XX-00-X"
              required
            ></input>
          </div>

          <div>
            <button
              class="mx-1 my-2 select-none rounded-lg bg-red-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-900/20 transition-all hover:bg-red-400 hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="reset"
            >
              Reset
            </button>
            <button
              class="mx-1 my-2 select-none rounded-lg bg-green-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/20 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="save"
            >
              Update
            </button>
          </div>
        </col1>

        <col2 className="min-h-full w-1/2">
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
        </col2>
      </form>
    </div>
  );
}
