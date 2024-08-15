'use client'

import DoughnutChart from './components/donutDash';
import React, { useState, useEffect } from 'react';
import camStatus from './components/testing_data/camStatusMock.json';
import headStatus from './components/testing_data/headStatusMock.json';
import blockStatus from './components/testing_data/blockStatusMock.json';
import crankStatus from './components/testing_data/crankStatusMock.json';

function ModelQuantityChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const labels = camStatus.map(item => item.model);
    const quantities = camStatus.map(item => item.qty);

    setChartData({
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
    });
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Model Quantity Distribution</h2>
        <div style={{ width: '25%'}}>
          <DoughnutChart data={chartData} chartName={"Camshaft"} />
        </div>
    </div>
  );
}

export default ModelQuantityChart;
