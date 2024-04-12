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
          'rgba(255, 255, 0, 0.7)',
        ],
        hoverBackgroundColor: [
          'rgba(99, 40, 235, 1)',
          'rgba(61, 216, 252, 1)',
          'rgba(255, 102, 196, 1)',
          'rgba(156, 142, 226, 1)',
          'rgba(57, 255, 20, 1)',
          'rgba(255, 255, 0, 1)',
        ],
        borderColor: [
          'rgba(99, 40, 235, 1)',
          'rgba(61, 216, 252, 1)',
          'rgba(255, 102, 196, 1)',
          'rgba(156, 142, 226, 1)',
          'rgba(57, 255, 20, 1)',
          'rgba(255, 255, 0, 1)',
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
      beforeInit: function (chart, options) {
        chart.legend.afterFit = function () {
          this.height = this.height + 50;
        };
      },
      legend: {
        display: true,
        // position: 'right',
        fullSize: false,
        labels: {
          color: "#fff",
          font: "sans-serif",
          useBorderRadius: true,
          padding: 20,
          borderRadius: 50,
          boxWidth: 18,

        },

      },
    },

  };

  return (<div className='w-full h-full'>
    <Pie data={chartData} plugins={[{
      beforeInit(chart) {
        // Get a reference to the original fit function
        const originalFit = chart.legend.fit;

        // Override the fit function
        chart.legend.fit = function fit() {
          // Call the original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)();
          // Change the height as suggested in other answers
          this.height += 15;
        }
      }
    }]} options={options} />
  </div>);
};

export default ExpenseCategoryChart;