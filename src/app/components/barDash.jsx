import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// Mock data for the Bar chart testing
const mockData = [
  {"type":"Block","model":[{"model":"CONV","qty":2}],"total":2},
  {"type":"Head","model":[{"model":"HV","qty":1}],"total":1},
  {"type":"Crankshaft","model":[{"model":"CONV","qty":6},{"model":"HV","qty":5}],"total":11},
  {"type":"Camshaft","model":[{"model":"889F-EX","qty":1},{"model":"889F-IN","qty":1},{"model":"926F-EX","qty":1},{"model":"926F-IN","qty":1}],"total":4}
];

const BarChart = ({ data = mockData }) => {
  const labels = data.map(item => item.type);
  const uniqueModels = [...new Set(data.flatMap(item => item.model.map(m => m.model)))];

  const hexColors = ["#8f2a1b", "#b8614f", "#dd9788", "#e89d95", "#cf6c6c", "#b33549"];

  const datasets = uniqueModels.map((modelName, index) => ({
    label: modelName,
    data: data.map(item => {
      const model = item.model.find(m => m.model === modelName);
      return model ? model.qty : 0;
    }),
    backgroundColor: hexColors[index % hexColors.length],
    borderColor: hexColors[index % hexColors.length],
    borderWidth: 1,
  }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: {
        display: false,  // Turn off the legend display
      },
      title: {
        display: false,
        // text: chartName,
      },
      datalabels: {
        display: true,
        color: 'white',
        font: {
          size: 12,
          weight: 'bold',
        },
        textStrokeColor	: 'black',
        textStrokeWidth	: 1,
        textShadowColor: 'black',
        textShadowBlur: 15,
        formatter: (value, context) => {
          if (value === 0) return '';
          const modelName = context.dataset.label;
          return `${modelName} : ${value}`;
        },
      },
      tooltip: {
        callbacks: {
          footer: (tooltipItems) => {
            const dataIndex = tooltipItems[0].dataIndex;
            return `Total: ${data[dataIndex].total}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
