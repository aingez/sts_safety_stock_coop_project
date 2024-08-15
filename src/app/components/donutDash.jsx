// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// function DoughnutChart({ data, options }) {
//     const chartOptions = {
//         ...options,
//         plugins: {
//             ...options.plugins,
//             datalabels: {
//                 color: '#fff',
//                 formatter: (value, ctx) => {
//                     const label = ctx.chart.data.labels[ctx.dataIndex];
//                     return `${label} : ${value}`;
//                 }
//             }
//         }
//     };

//     return <Doughnut data={data} options={chartOptions} />;
// }

// export default DoughnutChart;

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DoughnutChart({ data, options, chartName, sumParts }) {
  const defaultOptions = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, index) => {
              const dataset = datasets[0];
              const value = dataset.data[index];
              return {
                text: `${label}: ${value}`,
                fillStyle: dataset.backgroundColor[index],
                hidden: isNaN(dataset.data[index]),
                lineCap: 'round',
                lineDash: [],
                lineDashOffset: 0,
                lineJoin: 'round',
                lineWidth: 1,
                strokeStyle: dataset.backgroundColor[index],
                pointStyle: 'circle',
                index: index
              }
            });
          }
        }
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
          return `${label} : ${value}`;
        },
      },
    },
    // Add this new option for the center text
    centerText: {
        display: true,
    //   text: "Total"
        text: chartName + " : " + sumParts
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
        ctx.font = "bold 16px Arial";
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
