'use client'

import React from 'react';
import ReusableTable from './components/AlertTable';  // Import the reusable table

function page() {

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
      <main className="grid grid-cols-4 gap-4">
        {/* Monitor Sections */}
        <div className="col-span-4 bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-bold mb-4">Stock Monitor</h2>
        </div>

        {/* Pallet Sections */}
        <div className="col-span-4 bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-bold mb-4">Pallet Unpack Alert</h2>
          <ReusableTable />
        </div>

        {/* Warehouse Status */}
        <div className="col-span-4 bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-bold mb-4">Warehouse Status</h2>
          <div className="grid grid-cols-6 gap-2">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              BL01A
            </button>
            {/* Add more buttons as needed */}
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default page
