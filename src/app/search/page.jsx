import React from 'react'
import { Table } from 'antd';
import { m } from 'framer-motion';

function SearchPage() {

  // mock data
  const data = [
    {
      partType: 'Block',
      model: 'CONV',
      serialNumber: 'ANST02246131030',
      palletNumber: 'BL07A',
      packingDate: new Date().toISOString(),
      plantCode: '1',
      plantType: 'Engine',
      rowLocation: 1,
      laneLocation: 2,
    },
  ]

  const columns = [
    {
      title: 'Part Type',
      dataIndex: 'partType',
      key: 'partType',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Pallet Number',
      dataIndex: 'palletNumber',
      key: 'palletNumber',
    },
    {
      title: 'Plant Code',
      dataIndex: 'plantCode',
      key: 'plantCode',
    },
    {
      title: 'Plant Type',
      dataIndex: 'plantType',
      key: 'plantType',
    },
    {
      title: 'Row',
      dataIndex: 'rowLocation',
      key: 'rowLocation',
    },
    {
      title: 'Lane',
      dataIndex: 'laneLocation',
      key: 'laneLocation',
    },
    {
      title: 'Packing Date',
      dataIndex: 'packingDate',
      key: 'packingDate',
    },
    {
      title: 'Packer',
      dataIndex: 'packer',
      key: 'packer',
    },
    {
      title: 'Un-Pack Date',
      dataIndex: 'packingDate',
      key: 'packingDate',
    },
    {
      title: 'Un-Packer',
      dataIndex: 'unpacker',
      key: 'unpacker',
    }
  ];

  return (
    <div class='flex flex-col'>
      <col1 className='pr-20'>
        <h1 className='text-4xl pb-5 font-bold'>
          Search Part
        </h1>

        <form action="/send-data-here" method="post" class='flex flex-row pb-1'>
          {/* not necessary since already query by sn. */}
          {/* <div className='p-1'>
            <label className="flex items-center mb-1 text-xs font-medium">Part Type</label>
            <select className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" required>
              <option value="">Select Part Type</option>
              <option value="Block">Block</option>
              <option value="Head">Head</option>
              <option value="Crank">Crank</option>
              <option value="Cam">Cam</option>
            </select>
          </div> */}
          <div className='p-1'>
            <label className="flex items-center mb-1 text-xs font-medium">Serial Number</label>
            <input type="text" className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-black rounded placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XXXXXXXXXX" required />
          </div>
        </form>
        <div className='pb-5'>
          <button
            class="mx-1 my-2 select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-900/20 transition-all hover:bg-red-400 hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type='reset'>
            Reset
          </button>
          <button
            class="mx-1 my-2 select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/20 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type='save'>
            Search
          </button>
        </div>
      </col1>
      <col2 className=''>
        {/*antd table to show query data */}
        <Table
                columns={columns}
                dataSource={data}
                pagination={false}
        />
      </col2>
    </div>
  )
}

export default SearchPage
