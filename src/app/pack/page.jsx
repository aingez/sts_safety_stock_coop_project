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
      <form className='grid grid-cols-2 gap-4'>
        <col1>

          <h1 className='text-4xl font-bold my-4'>Packing</h1>
          {/* input employee id */}
          <div>
            <label>Employee ID:</label>
            <input
              type='int'
              />
          </div>
          <div>
            {/* input employee name */}
            <label>Employee Name:</label>
            <input
              type='text'
              />
          </div>

          <div>
            {/* input pallet id */}
            <label>Pallet ID:</label>
            <input
              type='text'
              onInput={(e) => handlePalletIdChange(e)}
              />
          </div>
          <div>
            <button
              class="mx-1 my-2 select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type='reset'>
              Reset
            </button>
            <button
              class="mx-1 my-2 select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type='save'>
              Save
            </button>
          </div>
        </col1>

        <col2>
          {/* original field */}
          {/* {formData.serialNumbers.map((serialNumber, index) => (
            <label key={index}>
              Serial {index + 1}:
              <input
                type='text'
                value={serialNumber}
                onChange={(e) => handleSerialNumberChange(e, index)}
              />
            </label>
          ))} */}
          <col2>
            <Table dataSource={formData.serialNumbers} pagination={false}>
              <Table.Column
                title="Serial Number"
                dataIndex="serialNumber"
                key="serialNumber"
                render={(text, record, index) => (
                  <Input
                    value={text}
                    onChange={(e) => handleSerialNumberChange(e, index)}
                  />
                )}
              />
            </Table>
          </col2>
        </col2>
      </form>
    </div>
  );
}
