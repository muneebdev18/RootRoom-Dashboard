import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const SplineGraph = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Post Analysis',
            },
        },
    };

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spet", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Post dataset",
                data: [33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65],
                backgroundColor: "rgba(4, 167, 234, 0.1)",
                borderColor: "rgba(4, 167, 234, 1)",
                fill: true
            }
        ]
    };

    return (
        <>
            <Line data={data} options={options} />
        </>
    )
}

export default SplineGraph;