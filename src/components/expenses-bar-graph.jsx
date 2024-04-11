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
        // maintainAspectRatio: true,
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
        <div className='w-full h-full'>
            <Bar style={{ height: "500px" }} data={chartData} options={options} />
        </div>
    );
};

