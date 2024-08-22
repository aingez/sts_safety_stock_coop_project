'use client'

import React, { useState } from 'react';
import { Table, Input } from 'antd';

export default function PackPage() {
  const partTypeSerialCount = {
    'Block': 6,
    'Head': 8,
    'Crankshaft': 12,
  };

  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    palletId: '',
    partType: '',
    serialNumbers: [],
  });

  const handlePalletIdChange = (e) => {
    const palletId = e.target.value;
    if (palletId.length === 5) {
      const partType = palletId.substring(0, 2);
      const partTypeSerialCount = {
        'BL': 6,
        'HE': 8,
        'CR': 12,
      };
      const serialNumbers = Array(partTypeSerialCount[partType]).fill('');
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
        partType: '',
        serialNumbers: [],
      });
    }
  }


  return (
    <div>
      {/* two column style */}
      <form className='flex flex-row '>
        {/* make content stay on the right */}
        <col1 className="w-1/2 rounded-lg bg-neutral-100 shadow-lg px-40 py-40 mr-5">
          <h1 className='text-4xl font-bold'>Packing</h1>
          <div className='p-1'>
            <label class="flex  items-center mb-1 text-xs font-medium">Employee ID
            </label>
              <input type="text" onInput={(e) => handlePalletIdChange(e)} class="block bg-white w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XXXXXXXXX" required>
            </input>
          </div>
          <div className='p-1'>
            <label class="flex  items-center mb-1 text-xs font-medium">Name - Surname
            </label>
              <input type="text" onInput={(e) => handlePalletIdChange(e)} class="block bg-white w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="Sprinter Trueno" required>
            </input>
          </div>

          <div className='p-1'>
            <label class="flex items-center mb-1 text-xs font-medium">Pallet ID
            </label>
              <input type="text" onInput={(e) => handlePalletIdChange(e)} class="block bg-white w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XX-00-X" required>
            </input>
          </div>
          <div className='flex flex-row p-1 space-x-5'>
            {/* row, col input */}
            <div>
              <label class="flex items-center mb-1 text-xs font-medium ">Lane
              </label>
                <input type="text" onInput={(e) => handlePalletIdChange(e)} class="block bg-white w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XX" required>
              </input>
            </div>
            <div>
              <label class="flex items-center mb-1 text-xs font-medium">Row
              </label>
                <input type="text" onInput={(e) => handlePalletIdChange(e)} class="block bg-white w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XX" required>
              </input>
            </div>
            <div>
              <label class="flex items-center mb-1 text-xs font-medium">Layer
              </label>
                <input type="text" onInput={(e) => handlePalletIdChange(e)} class="block bg-white w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XX" required>
              </input>
            </div>
          </div>

          <div>
            <button
              class="mx-1 my-2 select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-900/20 transition-all hover:bg-red-400 hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type='reset'>
              Reset
            </button>
            <button
              class="mx-1 my-2 select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/20 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type='save'>
              Update
            </button>
          </div>
        </col1>

        <col2 className="w-1/2 min-h-full">
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
