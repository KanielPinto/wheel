// components/MyLineChart.tsx
"use client";
import React, { useEffect, useState } from 'react'
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
                text: "",
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
                }
              }
        },
    };


    var formatted_data = {
        labels: data.map(item => new Date(item[xKey])),
        datasets: [
            {
                label: dataSetTitle,
                data: data.map(item => item[yKey]),
                borderColor: 'rgb(207,68,100)',
                backgroundColor: 'rgba(207,68,100, 1)',
                pointRadius: 1
            },
            {
                label: "Nifty",
                data: data2.map(item => item[yKey]),
                borderColor: 'rgb(0,68,0)',
                backgroundColor: 'rgba(0,68,0, 0.5)',
                pointRadius: 0,
            },
            {
                label: "FD/Liquid Fund",
                data: data3.map(item => item[yKey]),
                borderColor: 'rgb(60,0,0)',
                backgroundColor: 'rgba(60,0,0, 0.5)',
                pointRadius: 0,
            },
        ],
    };

    return (
        <div className='flex justify-center shadow-soft bg-rose-50 rounded-xl my-4 items-center self-center w-full'>
            <div className="sm:h-[50vh] h-[25vh] min-w-[30vw] p-4 w-full">
                <Line options={lineOptions} data={formatted_data} />
            </div>

        </div>

    )
}

export default LineChart