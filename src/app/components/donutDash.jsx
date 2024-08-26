import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DoughnutChart({ data, chartName}) {
  // Check data[0].model is valid
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
        // get color scheme from https://www.learnui.design/tools/data-color-picker.html#single
        backgroundColor: [
          "#1f77b4", // Strong blue
          "#ff7f0e", // Bright orange
          "#2ca02c", // Vivid green
          "#d62728", // Bold red
          "#9467bd", // Deep purple
          "#8c564b", // Warm brown
        ],
        hoverBackgroundColor: [
          "#145a7a", // Darker blue
          "#bf5a00", // Darker orange
          "#1d7a1d", // Darker green
          "#a31d1d", // Darker red
          "#674a89", // Darker purple
          "#643d35", // Darker brown
        ],

      },
    ],
  };

  const defaultOptionsDoughnut = {
    responsive: true,
    maibtainAspectRatio: false,
    // aspectRatio: 0.5,
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

  return (
    <div style={{ width: 300, height: 300 }}>
      <Doughnut data={chartData} options={defaultOptionsDoughnut} />
    </div>
  );
}

export default DoughnutChart;
