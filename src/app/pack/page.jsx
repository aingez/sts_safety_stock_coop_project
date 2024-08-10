'use client'

import React, { useState } from 'react'

function PackPage() {
  const [formData, setFormData] = useState({
    date: '',
    employeeId: '',
    employeeName: '',
    palletNo: '',
    serial: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFormData({
      date: '',
      employeeId: '',
      employeeName: '',
      palletNo: '',
      serial: ''
    });
  };

  return (
    <div>
      <h1 className='text-5xl pb-5 font-bold'>
        Packing
      </h1>

      <ul className='mb-5'>
        <button className='mx-1 bg-slate-600 hover:bg-slate-400 text-white font-normal py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'>Block (6)</button>
        <button className='mx-1 bg-slate-600 hover:bg-slate-400 text-white font-normal py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'>Head (8)</button>
        <button className='mx-1 bg-slate-600 hover:bg-slate-400 text-white font-normal py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'>Crankshaft (12)</button>
        <button className='mx-1 opacity-50 bg-slate-600 hover:bg-slate-400 text-white font-normal py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded'>Camshaft</button>
      </ul>

      <form action="/send-data-here" method="post">
        <ul>
          <li className='pb-2'>
            <label htmlFor="date">Date</label>
            <input className='bg-slate-200' type="text" id="date" name="date" value={formData.date} onChange={handleInputChange} />
          </li>
          <li className='pb-2'>
            <label htmlFor="employeeId">Employee ID</label>
            <input className='bg-slate-200' type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleInputChange} />
          </li>
          <li className='pb-2'>
            <label htmlFor="employeeName">Employee Name</label>
            <input className='bg-slate-200' type="text" id="employeeName" name="employeeName" value={formData.employeeName} onChange={handleInputChange} />
          </li>
          <li className='pb-2'>
            <label htmlFor="palletNo">Pallet No.</label>
            <input className='bg-slate-200' type="text" id="palletNo" name="palletNo" value={formData.palletNo} onChange={handleInputChange} />
          </li>
          <li className='pb-2'>
            <label htmlFor="serial">Serial</label>
            <input className='bg-slate-200' type="text" id="serial" name="serial" value={formData.serial} onChange={handleInputChange} />
          </li>
        </ul>

        <button type="button" onClick={handleClear} className='mx-1 bg-rose-600 hover:bg-rose-400 text-white font-bold py-1 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded'>
          Clear
        </button>
        <button className='mx-1 bg-lime-500 hover:bg-lime-400 text-white font-bold py-1 px-4 border-b-4 border-lime-700 hover:border-lime-500 rounded' type="submit">
          Submit
        </button>

      </form>
    </div>
  )
}

export default PackPage