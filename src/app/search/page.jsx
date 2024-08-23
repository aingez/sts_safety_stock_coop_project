'use client'

import React, { useState, useEffect } from 'react';
import ReusableTable from '../components/partSearchTable';  // Import the reusable table

function SearchPage() {

    return (
        <>
            <div>
                <h1 className='text-4xl pb-5 font-bold'>Part Search</h1>
                    <form action="/send-data-here" method="post" className='flex flex-row pb-1'>
                      <div className='p-1'>
                        <label className="flex items-center mb-1 text-xs font-medium">Serial Number</label>
                        <input type="text" className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XXXXXXXXXX" required />
                      </div>
                    </form>
                  <div className='pb-5'>
                    <button
                      className="mx-1 my-2 select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-900/20 transition-all hover:bg-red-400 hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type='reset'>
                      Reset
                    </button>
                    <button
                      className="mx-1 my-2 select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/20 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type='save'>
                      Search
                    </button>
                  </div>
            </div>
            <ReusableTable partSerial={"ANST02246131030"}/>
        </>
    );
}

export default SearchPage;
