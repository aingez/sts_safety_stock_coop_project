'use client'

import React, { useState } from 'react';
import ReusableTable from '../components/partSearchTable';

function SearchPage() {
  const [serialInput, setSerialInput] = useState('');
  const [tableKey, setTableKey] = useState(0);

  const handleChange = (e) => {
    setSerialInput(e.target.value);
    console.log("serial " + e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableKey(prevKey => prevKey + 1);
    console.log("Searching for serial: " + serialInput);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSerialInput('');
    setTableKey(0);
  };

  return (
    <>
      <div>
        <h1 className='text-4xl pb-5 font-bold'>Part Search</h1>
        <form className='flex flex-col pb-1' onSubmit={handleSubmit}>
          <div className='p-1'>
            <label className="flex items-center mb-1 text-xs font-medium">Serial Number</label>
            <input
              type="text"
              value={serialInput}
              onChange={handleChange}
              className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed"
              placeholder="XXXXXXXXXX"
              required
            />
          </div>
          <div className='pb-5'>
            <button
              className="
                mx-1 my-2
                rounded-lg
                bg-red-500
                py-3 px-6
                text-center text-xs font-sans font-bold uppercase text-white
                shadow-md shadow-red-900/20
                transition-all
                hover:bg-red-400 hover:shadow-lg hover:shadow-red-700/40
                focus:opacity-[0.85] focus:shadow-none
                active:opacity-[0.85] active:shadow-none
                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                select-none
              "
              onClick={handleReset}
              type='button'
            >
              Reset
            </button>
            <button
              className="mx-1 my-2 select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/20 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type='submit'
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {tableKey > 0 && <ReusableTable key={tableKey} partSerial={serialInput} />}
    </>
  );
}

export default SearchPage;
