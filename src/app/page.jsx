import next from "next";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="grid grid-cols-4 gap-4">
        {/* Block Sections */}
        <div className="col-span-4 bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-bold mb-4">Stock Monitor</h2>
          <div className="grid grid-cols-4 gap-2">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Block
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Head
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Crankshaft
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Camshaft
            </button>
          </div>
        </div>

        {/* Pallet Sections */}
        <div className="col-span-4 bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-bold mb-4">Pallet Unpack Alert</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">No.</th>
                <th className="border px-4 py-2">Pallet No.</th>
                <th className="border px-4 py-2">Part Serial No.</th>
                <th className="border px-4 py-2">Packing Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">BL01A</td>
                <td className="border px-4 py-2">ANST02246313030</td>
                <td className="border px-4 py-2">17-06-23</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
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
  );
}
