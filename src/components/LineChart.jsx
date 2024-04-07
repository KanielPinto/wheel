// components/MyLineChart.tsx
"use client";
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

function LineChart({ data, data2, data3, dataSetTitle, xKey, yKey }) {

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Historical Performance Comparison",
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 1
                },
            },
            x: {
                type: "time",
                time: {
                    unit: "day"
                },
                ticks: {
                    maxTicksLimit: 20
                },
                autoskip: true,
            }
        },
        options: {
            spanGaps: true,
        }
    };

    var formatted_data = {
        labels: data.map(item => new Date(item[xKey])),
        datasets: [
            {
                label: dataSetTitle,
                data: data.map(item => item[yKey]),
                borderColor: '#6328EB',
                backgroundColor: 'rgba(99, 40, 235, 0.25)',
                pointRadius: 0,
                cubicInterpolationMode: 'monotone'
            },
            {
                label: "Nifty 50",
                data: data2.map(item => item[yKey]),
                borderColor: '#5CE1E6',
                backgroundColor: 'rgba(92, 225, 230, 0.5)',
                pointRadius: 0,
                cubicInterpolationMode: 'monotone'
            },
            {
                label: "FD / Liquid Fund",
                data: data3.map(item => item[yKey]),
                borderColor: '#FF66C4',
                backgroundColor: 'rgba(255, 102, 196, 0.5)',
                pointRadius: 0,
            },
        ],
    };

    return (

        <div className=" p-4 w-full min-h-max">
            <Line options={lineOptions} data={formatted_data} />
        </div>
    )
}

export default LineChart;
