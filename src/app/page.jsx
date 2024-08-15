'use client'

import React from 'react';
import ReusableTable from './components/AlertTable';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  options: {
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'middle',
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          size: 18,
        },
      },
    },
  },
};

import blockStats from './components/testing_data/blockStatusMock.json';
import crankStatus from './components/testing_data/crankStatusMock.json';
import headStatus from './components/testing_data/headStatusMock.json';
import camStatus from './components/testing_data/camStatusMock.json';

const prepareChartData = (data) => {
  return {
    labels: data.map(item => item.model),
    datasets: [{
      data: data.map(item => item.qty),
      backgroundColor: [
        '#003f5c',
        '#f95d6a',
        '#ff7c43',
        '#d45087',
        '#665191',
        '#a05195',
        '#2f4b7c',
        '#ffa600'
      ],
      hoverOffset: 4
    }]
  };
};

const blockChartData = prepareChartData(blockStats);
const crankChartData = prepareChartData(crankStatus);
const headChartData = prepareChartData(headStatus);
const camChartData = prepareChartData(camStatus);

function Page() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        <main className="grid gap-4">
          {/* Monitor Sections */}
          <div className="col-span-4 bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-bold mb-4">Stock Monitor</h2>
            <div className="flex justify-center">
              <div style={{ width: '20%', height: '20%' }}>
                <Doughnut data={blockChartData} options={chartOptions}/>
              </div>

              <div style={{ width: '20%', height: '20%' }}>
                <Doughnut data={crankChartData} />
              </div>

              <div style={{ width: '20%', height: '20%' }}>
                <Doughnut data={headChartData} />
              </div>

              <div style={{ width: '20%', height: '20%' }}>
                <Doughnut data={camChartData} />
              </div>
            </div>
          </div>

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
  );
}

export default Page;
