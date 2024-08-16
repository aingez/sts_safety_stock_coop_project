'use client'

import DoughnutChart from './components/donutDash';
import ReusableTable from './components/AlertTable';  // Import the reusable table
import React, { useState, useEffect } from 'react';
import camStatus from './components/testing_data/camStatusMock.json';
import blockStatus from './components/testing_data/blockStatusMock.json';
import headStatus from './components/testing_data/headStatusMock.json';
import crankStatus from './components/testing_data/crankStatusMock.json';

function ModelQuantityChart() {
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState({});

  useEffect(() => {
    // Helper function to prepare chart data for each part
    const prepareChartData = (data) => {
      const labels = data.model.map(item => item.model);
      const quantities = data.model.map(item => item.qty);

      return {
        labels: labels,
        datasets: [
          {
            data: quantities,
            backgroundColor: [
              '#3184c2',
              '#67a353',
              '#cc5f21',
              '#7d2105',
              '#ba2e0f',
              '#b2911c',
              '#7d8998'
            ],
          },
        ],
      };
    };

    // Prepare data for all part types
    setChartData({
      camshaft: prepareChartData(camStatus),
      block: prepareChartData(blockStatus),
      head: prepareChartData(headStatus),
      crank: prepareChartData(crankStatus),
    });

    // Set total parts for each part type
    setTotal({
      camshaft: camStatus.total,
      block: blockStatus.total,
      head: headStatus.total,
      crank: crankStatus.total,
    });
  }, []);

  if (!chartData.camshaft || !chartData.block || !chartData.head || !chartData.crank) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='text-4xl font-ligh pb-5'>Overview</h2>

      <div className='flex flex-row space-x-10 justify-center py-10 mb-5 rounded-lg bg-neutral-100'>
        {/* Camshaft Chart */}
        <div style={{ width: '20%'}}>
          <DoughnutChart data={chartData.camshaft} chartName="Camshaft" sumParts={total.camshaft} />
        </div>
        {/* Crank Chart */}
        <div style={{ width: '20%'}}>
          <DoughnutChart data={chartData.crank} chartName="Crank" sumParts={total.crank} />
        </div>
        {/* Block Chart */}
        <div style={{ width: '20%'}}>
          <DoughnutChart data={chartData.block} chartName="Block" sumParts={total.block} />
        </div>
        {/* Head Chart */}
        <div style={{ width: '20%'}}>
          <DoughnutChart data={chartData.head} chartName="Head" sumParts={total.head} />
        </div>
      </div>

        <h2 className='text-2xl font-light pb-5 justify-start'>Reminder</h2>
      <div className='flex flex-col space-x-10 pt-4 pb-2 mb-5 rounded-lg bg-neutral-100 justify-center'>
        <div className='px-5'>
          <ReusableTable pageSize={3}/>
        </div>
      </div>

      <h2 className='text-2xl font-light pb-5 justify-start'>Warehouse</h2>
      <div className='flex flex-row space-x-10 py-10 mb-5 bg-neutral-100 rounded-lg bg-neutral-100'>
      </div>

    </div>
  );
}

export default ModelQuantityChart;

