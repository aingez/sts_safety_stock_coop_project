import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DoughnutChart({ data, options, chartName, sumParts }) {
  const defaultOptions = {
    responsive: true,
    // maintainAspectRatio: false,
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
    // Add this new option for the center text
    centerText: {
        display: true,
        text: `${chartName}: ${sumParts}`
    }
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

        // Get chart height and width
        const chartArea = chart.chartArea;
        const width = chartArea.right - chartArea.left;
        const height = chartArea.bottom - chartArea.top;

        // Set font settings
        ctx.font = "bold 13px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate text position
        const textX = (chartArea.left + chartArea.right) / 2;
        const textY = (chartArea.top + chartArea.bottom) / 2;

        // Draw text
        ctx.fillText(centerConfig.text, textX, textY);
      }
    }
  };

  // Add the new plugin to the chart
  ChartJS.register(textCenter);

  return <Doughnut data={data} options={mergedOptions} />;
}

export default DoughnutChart;
