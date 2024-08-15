'use client'

import DoughnutChart from './components/donutDash';
import React, { useState, useEffect } from 'react';
import camStatus from './components/testing_data/camStatusMock.json';
import blockStatus from './components/testing_data/blockStatusMock.json';
import headStatus from './components/testing_data/headStatusMock.json';
import crankStatus from './components/testing_data/crankStatusMock.json';

function ModelQuantityChart() {
  const [chartData, setChartData] = useState(null);
  const [total, setTotal] = useState(0);
  const [partType, setPartType] = useState("camshaft"); // Default to camshaft

  const dataMap = {
    camshaft: camStatus,
    block: blockStatus,
    head: headStatus,
    crank: crankStatus,
  };

  const handlePartTypeChange = (type) => {
    setPartType(type);
  };

  useEffect(() => {
    const currentData = dataMap[partType];

    if (currentData) {
      const labels = currentData.model.map(item => item.model);
      const quantities = currentData.model.map(item => item.qty);

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
      setTotal(currentData.total);
    }
  }, [partType]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Model Quantity Distribution</h2>
      <div>
        {/* Buttons to switch between part types */}
        <button onClick={() => handlePartTypeChange("camshaft")}>Camshaft</button>
        <button onClick={() => handlePartTypeChange("block")}>Block</button>
        <button onClick={() => handlePartTypeChange("head")}>Head</button>
        <button onClick={() => handlePartTypeChange("crank")}>Crank</button>
      </div>
      <div style={{ width: '25%' }}>
        <DoughnutChart data={chartData} chartName={partType} sumParts={total}/>
      </div>
    </div>
  );
}

export default ModelQuantityChart;
