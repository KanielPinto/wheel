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
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default ExpenseCategoryChart;