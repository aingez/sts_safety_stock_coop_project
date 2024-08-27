"use client"

import React, { useState } from 'react';
import { Button, Radio } from 'antd';

function EditorPage() {
  const [palletMode, setPalletMode] = useState('Create');
  const [plantType, setPlantType] = useState('Engine');
  const [plantNumber, setPlantNumber] = useState('1');

  const handlePalletMode = (e) => {
    setPalletMode(e.target.value);
    console.log(`Pallet mode changed to: ${e.target.value}`);
  };

  const handlePlantType = (e) => {
    setPlantType(e.target.value);
    console.log(`Plant type changed to: ${e.target.value}`);
  };

  const handlePlantNumber = (e) => {
    setPlantNumber(e.target.value);
    console.log(`Plant number changed to: ${e.target.value}`);
  };

  const handleClear = () => {
    setPalletMode('Create');
    setPlantType('Engine');
    setPlantNumber('1');
  }

  return (
    <div className='pb-20'>
      <h1 className='text-4xl font-light pb-5'>Data Editor</h1>

      <h2 className='text-2xl font-light pb-5 justify-start'>Pallet Editor</h2>
      <div className='shadow-lg mb-5 px-5 space-x-5 rounded-lg bg-neutral-100 flex flex-row'>
        <div className='p-5 space-y-2'>
          <div>
            <label className="flex items-center mb-1 text-xs font-medium">Mode Select</label>
            <Radio.Group onChange={handlePalletMode} size="large" value={palletMode}>
              <Radio.Button value="Create">CREATE</Radio.Button>
              <Radio.Button value="Remove">REMOVE</Radio.Button>
            </Radio.Group>
          </div>
          <div className="flex space-x-5">
            <div>
              <label className="flex items-center mb-1 text-xs font-medium">Pallet ID</label>
              <input type="text" className="block bg-white w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-200 bg-transparent border border-neutral-300 rounded-lg placeholder-grey-700 focus:outline-none leading-relaxed" placeholder="XX-XX-X" required />
            </div>
            <div>
              <label className="flex items-center mb-1 text-xs font-medium">Plant Type</label>
              <Radio.Group onChange={handlePlantType} size="large" value={plantType} disabled={palletMode === 'Remove'}>
                <Radio.Button value="Engine">Engine</Radio.Button>
                <Radio.Button value="Casting">Casting</Radio.Button>
              </Radio.Group>
            </div>
            <div>
              <label className="flex items-center mb-1 text-xs font-medium">Plant Number</label>
              <Radio.Group onChange={handlePlantNumber} size="large" value={plantNumber} disabled={palletMode === 'Remove'}>
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div className='flex flex-row space-x-2 pt-2'>
            <Button danger type="primary" size="large" style={{ backgroundColor: palletMode === 'Remove' ? '#ef4444' : 'white' }} disabled={palletMode === 'Create'}>
              REMOVE
            </Button>
            <Button type="primary" size="large" style={{ backgroundColor: palletMode === 'Create' ? '#22c55e' : 'white' }} disabled={palletMode === 'Remove'}>
              CREATE
            </Button>
            <Button type="primary" size="large" style={{ backgroundColor: '#f87171' }} onClick={handleClear}>
              CLEAR
            </Button>
            {palletMode == 'Remove' && <p className='text-xs font-light pt-2'>*Able to remove only Unpacked Pallet</p>}
          </div>
        </div>
      </div>

      <h2 className='text-2xl font-light pb-5 justify-start'>Warehouse Editor</h2>
      <div className='shadow-lg mb-5 px-5 space-x-5 rounded-lg bg-neutral-100 flex flex-row'>
        <div className='shadow-lg rounded-lg bg-neutral-100 p-10 my-5'>
          <h3 className='text-1xl font-light pb-5'>Create Layout</h3>
        </div>
        <div className='shadow-lg rounded-lg bg-neutral-100 p-10 my-5'>
          <h3 className='text-1xl font-light pb-5'>Remove Layout</h3>
        </div>
      </div>
    </div>
  )
}

export default EditorPage
