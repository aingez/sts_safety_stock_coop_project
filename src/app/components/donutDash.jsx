'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

import blockStats from './testing_data/blockStatusMock.json'
import crankStatus from './testing_data/crankStatusMock.json'
import headStatus from './testing_data/headStatusMock.json'

function DashPage() {
    // Function to prepare data for chart
    // input: data - array of objects
    // output: object with labels and datasets
    const prepareChartData = (data) => {
        return {
            labels: data.map(item => item.model),
            datasets: [{
                data: data.map(item => item.qty),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                hoverOffset: 4
            }]
        };
    };

    const blockChartData = prepareChartData(blockStats);
    const crankChartData = prepareChartData(crankStatus);
    const headChartData = prepareChartData(headStatus);

    return (
        <div class='flex flex-row'>

            <div style={{ width: '20%', height: '20%' }}>
                <h2>Block Status</h2>
                <Doughnut data={blockChartData} />
            </div>

            <div style={{ width: '20%', height: '20%' }}>
                <h2>Crank Status</h2>
                <Doughnut data={crankChartData} />
            </div>

            <div style={{ width: '20%', height: '20%' }}>
                <h2>Head Status</h2>
                <Doughnut data={headChartData} />
            </div>
        </div>
    )
}

export default DashPage
