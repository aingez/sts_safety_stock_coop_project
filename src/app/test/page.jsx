'use client'

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const testData = [
  {
    "type": "Camshaft",
    "model": [
      {
        "model": "CONV",
        "qty": 1
      }
    ],
    "total": 1
  },
  200
];

function DoughnutChart({ data = testData, options, chartName = "Testing" }) {
  // Ensure data[0].model is valid
  const parsedData = data.length > 0 && Array.isArray(data[0].model)
    ? data[0].model.map(model => ({
        label: model.model,
        qty: model.qty,
      }))
    : [];

  // Summing up the parts
  const sumParts = parsedData.reduce((sum, item) => sum + item.qty, 0);

  const chartData = {
    labels: parsedData.map(item => item.label),
    datasets: [
      {
        data: parsedData.map(item => item.qty),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: 'black',
        font: {
          size: 11,
          weight: 'bold',
        },
        formatter: (value, ctx) => {
          let label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    centerText: {
      display: true,
      text: `${chartName}: ${sumParts}`,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options?.plugins,
    }
  };

  // Add this new plugin to draw the center text
  const textCenter = {
    id: 'textCenter',
    afterDraw: (chart) => {
      if (chart.config.options.centerText.display !== false) {
        const ctx = chart.ctx;
        const centerConfig = chart.config.options.centerText;

        const chartArea = chart.chartArea;
        const textX = (chartArea.left + chartArea.right) / 2;
        const textY = (chartArea.top + chartArea.bottom) / 2;

        ctx.font = "bold 13px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(centerConfig.text, textX, textY);
      }
    }
  };

  // Register the plugin
  ChartJS.register(textCenter);

  return <Doughnut data={chartData} options={mergedOptions} />;
}

export default DoughnutChart;
