'use client'

import React, { useState } from 'react';

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
    // check first 2 characters
    const partType = palletId.substring(0, 2);
    switch (partType) {
      case 'BL':
        setFormData({
          ...formData,
          palletId,
          partType: 'Block',
          serialNumbers: Array(partTypeSerialCount['Block']).fill(''),
        });
        break;
      case 'HD':
        setFormData({
          ...formData,
          palletId,
          partType: 'Head',
          serialNumbers: Array(partTypeSerialCount['Head']).fill(''),
        });
        break;
      case 'CR':
        setFormData({
          ...formData,
          palletId,
          partType: 'Crankshaft',
          serialNumbers: Array(partTypeSerialCount['Crankshaft']).fill(''),
        });
        break;
      default:
        setFormData({
          ...formData,
          palletId,
          partType: '',
          serialNumbers: [],
        });
        break;
    }
    // else show no serial input
  }
  else {
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
      <h1>Packing</h1>

      <form>
        <div>
          {/* input employee id */}
          <label>Employee ID:</label>
          <input
            type='int'
          />
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
          {formData.serialNumbers.map((serialNumber, index) => (
            <li key={index}>
              Serial {index + 1}:
              <input
                type='text'
                value={serialNumber}
                onChange={(e) => handleSerialNumberChange(e, index)}
              />
            </li>
          ))}
        </div>

        {/* <div>
          <button
            type='button'
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type='button'
            onClick={handleSave}
          >
            Save
          </button>
        </div> */}
      </form>
    </div>
  );
}
