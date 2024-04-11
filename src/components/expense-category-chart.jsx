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
          '#38B6FF',
          '#FF66C4',
          '#6328EB',
          '#6085E9',
          '#9C8EE2',
          '#a7c3f2',
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
          '#38B6FF',
          '#FF66C4',
          '#6328EB',
          '#6085E9',
          '#9C8EE2',
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