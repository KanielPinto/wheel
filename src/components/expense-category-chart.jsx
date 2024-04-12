import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCategoryChart = ({ data, labels, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(99, 40, 235, 0.6)',
          'rgba(61, 216, 252, 0.6)',
          'rgba(255, 102, 196, 0.7)',
          'rgba(156, 142, 226, 0.7)',
          'rgba(57, 255, 20, 0.4)',
          'rgba(255, 102, 196, 0.7)',
        ],
        hoverBackgroundColor: [
          '#5e7de3',
          '#6c8be6',
          '#7b99e9',
          '#8aa7ec',
          '#98b5ef',
          '#a7c3f2',
        ],
        borderColor: [
          'rgba(99, 40, 235, 1)',
          'rgba(61, 216, 252, 1)',
          'rgba(255, 102, 196, 1)',
          'rgba(156, 142, 226, 1)',
          'rgba(57, 255, 20, 1)',
          '#a7c3f2',
        ],
      },
    ],
  };

  const options = {
    // responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: true,
        position: 'right',
        fullSize: true,
        labels: {
          color: "#fff",
          font: "sans-serif",
          useBorderRadius: true,
          padding: 20,
          borderRadius: 50
        }
      },
    },

  };

  return <Pie data={chartData} options={options} />;
};

export default ExpenseCategoryChart;