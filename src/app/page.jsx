'use client'

import DoughnutChart from './components/donutDash';
import ReusableTable from './components/alertTable';  // Import the reusable table
import WarehouseDash from './components/warehouseDash'; // Import the warehouse data
import React, { useState, useEffect } from 'react';
// import camStatus from './components/testing_data/camStatusMock.json';
// import blockStatus from './components/testing_data/blockStatusMock.json';
// import headStatus from './components/testing_data/headStatusMock.json';
// import crankStatus from './components/testing_data/crankStatusMock.json';

function ModelQuantityChart() {
  const [blockStatus, setBlockStatus] = useState({});
  const [headStatus, setHeadStatus] = useState({});
  const [crankStatus, setCrankStatus] = useState({});
  const [camStatus, setCamStatus] = useState({});

  async function fetchBlockStatus() {
    const response = await fetch('http://localhost:8000/quantity/Block');
    const data = await response.json();
    setBlockStatus(data);
  }
  async function fetchHeadStatus() {
    const response = await fetch('http://localhost:8000/quantity/Head');
    const data = await response.json();
    setHeadStatus(data);
  }
  async function fetchCrankStatus() {
    const response = await fetch('http://localhost:8000/quantity/Crankshaft');
    const data = await response.json();
    setCrankStatus(data);
  }
  async function fetchCamStatus() {
    const response = await fetch('http://localhost:8000/quantity/Camshaft');
    const data = await response.json();
    setCamStatus(data);
  }



  // call the fetchBlockStatus function once
  useEffect(() => {
    fetchBlockStatus();
    fetchHeadStatus();
    fetchCrankStatus();
    fetchCamStatus();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const blockResponse = await fetch('http://localhost:8000/quantity/Block');
        const blockData = await blockResponse.json();
        setBlockStatus(blockData);

        const headResponse = await fetch('http://localhost:8000/quantity/Head');
        const headData = await headResponse.json();
        setHeadStatus(headData);

        const crankResponse = await fetch('http://localhost:8000/quantity/Crankshaft');
        const crankData = await crankResponse.json();
        setCrankStatus(crankData);

        const camResponse = await fetch('http://localhost:8000/quantity/Camshaft');
        const camData = await camResponse.json();
        setCamStatus(camData);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='text-4xl font-ligh pb-5'>Overview</h2>
      <div className='shadow-lg space-x-10 py-10 mb-5 rounded-lg bg-neutral-100'>
        <div className='flex justify-center space-x-5'>
          <DoughnutChart data={blockStatus} chartName={'Block'}  />
          <DoughnutChart data={headStatus} chartName={'Head'}  />
          <DoughnutChart data={crankStatus} chartName={'Crank'}  />
          <DoughnutChart data={camStatus} chartName={'Cam'}  />
        </div>
      </div>

      <h2 className='text-2xl font-light pb-5 justify-start'>Reminder</h2>
      <div className='shadow-lg flex flex-col space-x-10 pt-4 pb-2 mb-5 rounded-lg bg-neutral-100 justify-center'>
        <div className='px-5'>
          <ReusableTable pageSize={3}/>
        </div>
      </div>

      <h2 className='text-2xl font-light pb-5 justify-start'>Warehouse</h2>
      <div className='shadow-lg flex flex-row space-x-10 py-0 mb-5 bg-neutral-100 rounded-lg bg-neutral-100'>
        <WarehouseDash />
      </div>

    </div>
  );
}

export default ModelQuantityChart;
