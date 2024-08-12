'use client'

import React, { useState } from 'react';
import { DatePicker } from "antd";
import dayjs from 'dayjs';

export default function PackPage() {
  const partTypeSerialCount = {
    'Block': 6,
    'Head': 8,
    'Crankshaft': 12,
  };

  const [date, setDate] = useState(dayjs());

  const defaultFormData = {
    employeeId: '',
    employeeName: '',
    palletId: '',
    partType: 'Block',
    serialNumbers: Array(partTypeSerialCount['Block']).fill('')
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleReset = () => {
    setDate(dayjs());
    setFormData(defaultFormData);
  };

  const handlePartTypeChange = (partType) => {
    setFormData({
      ...formData,
      partType,
      serialNumbers: Array(partTypeSerialCount[partType]).fill('')
    });
  };

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSerialNumberChange = (e, index) => {
    const newSerialNumbers = [...formData.serialNumbers];
    newSerialNumbers[index] = e.target.value;
    setFormData({ ...formData, serialNumbers: newSerialNumbers });
  };

  const handleSave = () => {
    console.log({ ...formData, date: date.format('YYYY-MM-DD') });
    handleReset();
  };

  return (
    <div>
      <h1>Un-Packing</h1>

      <form>
        <div>
          <div>
            Date:
            <DatePicker value={date} onChange={handleDateChange} />
          </div>
          {['employeeId', 'employeeName', 'palletId'].map((field) => (
            <div key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
              <input
                type='text'
                value={formData[field]}
                onChange={(e) => handleInputChange(e, field)}
              />
            </div>
          ))}
        </div>

        <div>
          {Object.keys(partTypeSerialCount).map((partType) => (
            <button
              key={partType}
              type="button"
              onClick={() => handlePartTypeChange(partType)}
            >
              {partType}
            </button>
          ))}
        </div>

        <div>
          {formData.serialNumbers.map((serialNumber, index) => (
            <label key={index}>
              S. No. {index + 1}:
              <input
                type='text'
                value={serialNumber}
                onChange={(e) => handleSerialNumberChange(e, index)}
              />
            </label>
          ))}
        </div>

        <div>
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
        </div>
      </form>
    </div>
  );
}
