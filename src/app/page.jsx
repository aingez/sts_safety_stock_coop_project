'use client'

import DoughnutChart from './components/donutDash';
import BarChart from './components/barDash';
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
  const [barJson, setBarJson] = useState([]);

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
  // const [chartType, setChartType] = useState('doughnut');

  // function toggleChartType() {
  //   setChartType(chartType === 'doughnut' ? 'bar' : 'doughnut');
  //   console.log(chartType);
  // }

  useEffect(() => {
  async function fetchData() {
    try {
      const types = ['Block', 'Head', 'Crankshaft', 'Camshaft'];
      const combinedData = [];

      for (const type of types) {
        const response = await fetch(`http://localhost:8000/quantity/${type}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && data[0].type === type) {
          combinedData.push(data[0]);
        }
      }

      setBarJson(combinedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  fetchData();
}, []);

  return (
    <div>
      <h2 className='text-4xl font-ligh pb-5'>Overview</h2>
      <div className='shadow-lg space-x-10 py-10 mb-5 rounded-lg bg-neutral-100 flex flex-row justify-center'>
        {/* if isLoading */}
        {isLoading && <div>Loading...</div>}
        {/* if not isLoading */}
        {!isLoading && (
          <div style={{ width: '50%', height: '10%' }}>
            {barJson.length > 0 && <BarChart data={barJson}/>}
          </div>
        )}
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
