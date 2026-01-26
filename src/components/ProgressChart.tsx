'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Weekly Study Progress',
        },
    },
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ProgressChart() {
    // Mock data for MVP - strictly visual as requested ("Target CGPA tracker (non-predictive, visual only)" interpreted generally for charts)
    // In a real app, this would fetch from /api/progress
    const data = {
        labels,
        datasets: [
            {
                label: 'Tasks Assigned',
                data: [5, 6, 4, 7, 5, 3, 4],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
            {
                label: 'Tasks Completed',
                data: [4, 5, 2, 7, 4, 3, 2],
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
