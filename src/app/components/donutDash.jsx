import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DoughnutChart({ data, chartName }) {
  // Parse the data to extract labels and values
  const chartData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        data: data.map(item => item.total),
        backgroundColor: [
          "#0e5542",
          "#067458",
          "#00956d",
          "#00b782",
          "#00db96",
          "#00ffaa"
        ],
        hoverBackgroundColor: [
          "#8f1f79",
          "#c878b1",
          "#ffcbed",
          "#f793ad",
          "#de635b"
        ],
      },
    ],
  };

  // Options for the Doughnut chart
  const defaultOptionsDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
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
          return `${label}: ${value}`;
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label;
            const value = tooltipItem.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
    centerText: {
      display: true,
      text: `${chartName}`,
    },
  };

  // Custom plugin for center text
  // const textCenter = {
  //   id: 'textCenter',
  //   afterDraw: (chart) => {
  //     if (chart.config.options.centerText.display !== false) {
  //       const ctx = chart.ctx;
  //       const centerConfig = chart.config.options.centerText;

  //       const chartArea = chart.chartArea;
  //       const textX = (chartArea.left + chartArea.right) / 2;
  //       const textY = (chartArea.top + chartArea.bottom) / 2;

  //       ctx.font = "bold 13px Arial";
  //       ctx.fillStyle = "black";
  //       ctx.textAlign = 'center';
  //       ctx.textBaseline = 'middle';

  //       ctx.fillText(centerConfig.text, textX, textY);
  //     }
  //   }
  // };

  // Register the plugin
  // ChartJS.register(textCenter);

  return (
    <div style={{ width: 300, height: 300 }}>
      <Doughnut data={chartData} options={defaultOptionsDoughnut} />
    </div>
  );
}

export default DoughnutChart;
