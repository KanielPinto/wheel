import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function ExpensesBarGraph({ data, labels }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Expenses',
                data: data,
                backgroundColor: 'rgba(120, 40, 200, 0.2)',
                borderColor: 'rgba(120, 40, 200, 1)',
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        maxBarThickness: 60,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount (INR)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Expense',
                },
            },
        },

    };

    return (
        <div className='w-full h-96'>
            <Bar data={chartData} plugins={[{
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

        </div>
    );
};

