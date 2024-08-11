'use client'

import React, { useState } from 'react';

const today = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

export default function PackPage() {
  const partTypeSerialCount = {
    'Block': 6,
    'Head': 8,
    'Crankshaft': 12,
    // Add more part types here if needed
  };

  const [formData, setFormData] = useState({
    date: today,
    employeeId: '',
    employeeName: '',
    palletId: '',
    partType: 'Block',  // Default part type
    serialNumbers: Array(partTypeSerialCount['Block']).fill('') // set block serial numbers as default
  });

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    const data = new FormData(e.target);
    const submittedData = {
      date: data.get('date') || today,
      employeeId: data.get('employeeId'),
      employeeName: data.get('employeeName'),
      palletId: data.get('palletId'),
      partType: formData.partType,
      serialNumbers: Array.from(data.entries())
        .filter(([key]) => key.startsWith('serialNumber'))
        .map(([, value]) => value),
    };
    setFormData(submittedData);
    console.log(submittedData);
  }

  function handlePartTypeSelection(e) {
    const selectedPartType = e.target.value;
    setFormData({
      ...formData,
      partType: selectedPartType,
      serialNumbers: Array(partTypeSerialCount[selectedPartType]).fill('')
    });
  }

  function handleSerialNumberChange(e, index) {
    const newSerialNumbers = [...formData.serialNumbers];
    newSerialNumbers[index] = e.target.value;
    setFormData({ ...formData, serialNumbers: newSerialNumbers });
  }

  return (
    <div>
      <h1 className='text-5xl pb-5 font-bold'>
        Packing
      </h1>

      <form method="post" onSubmit={handleSubmit}>
        {/* part type input */}
        <p>
          {Object.keys(partTypeSerialCount).map((partType) => (
            <button
              key={partType}
              type="button"
              onClick={handlePartTypeSelection}
              value={partType}
              className={`mx-1 font-normal py-1 px-4 border-b-4 rounded ${
                formData.partType === partType
                  ? 'bg-lime-500 text-white border-lime-900'  // Active styles
                  : 'bg-slate-600 hover:bg-slate-400 text-white border-slate-700 hover:border-slate-500'  // Default styles
              }`}
            >
              {partType} ({partTypeSerialCount[partType]})
            </button>
          ))}
        </p>

        {/* date input (auto/editable) */}
        <label className='font-semibold'>
          Date: <input name="date" defaultValue={today} className='font-light bg-gray-200'/>
        </label>
        <br />
        {/* employee id input */}
        <label className='font-semibold'>
          Employee ID: <input name="employeeId" className='font-light bg-gray-200'/>
        </label>
        <label className='font-semibold'>
          Employee Name: <input name="employeeName" className='font-light bg-gray-200'/>
        </label>
        <br />
        {/* pallet id input */}
        <label className='font-semibold'>
          Pallet ID: <input name="palletId" className='font-light bg-gray-200'/>
        </label>
        <br />

        {/* serial number inputs */}
        {formData.serialNumbers.map((serialNumber, index) => (
          <label key={index} className='font-semibold'>
            Serial Number {index + 1}:
            <input
              className='font-light bg-gray-200'
              name={`serialNumber${index}`}
              value={serialNumber}
              onChange={(e) => handleSerialNumberChange(e, index)}
            />
          </label>
        ))}
        <br />
        <button type="button" className='mx-1 bg-rose-500 hover:bg-rose-400 text-white font-bold py-1 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded'>Clear</button>
        <button type="submit" className='mx-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-1 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded'>Submit</button>
      </form>

      {/* Display the form data for testing */}
      <div className='mt-5'>
        <h2 className='text-3xl pb-3 font-semibold'>Form Data:</h2>
        <p><strong>Date:</strong> {formData.date}</p>
        <p><strong>Employee ID:</strong> {formData.employeeId}</p>
        <p><strong>Employee Name:</strong> {formData.employeeName}</p>
        <p><strong>Pallet ID:</strong> {formData.palletId}</p>
        <p><strong>Part Type:</strong> {formData.partType}</p>
        <p><strong>Serial Numbers:</strong> {formData.serialNumbers.join(', ')}</p>
      </div>
    </div>
  )
}
