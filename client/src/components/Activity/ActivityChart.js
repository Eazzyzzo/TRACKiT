import React from 'react';
import { Line } from 'react-chartjs-2';

const ActivityChart = ({ metrics }) => {
  const data = {
    labels: metrics.map((_, index) => `Session ${index + 1}`),
    datasets: [
      {
        label: 'Distance',
        data: metrics.map((m) => m.metrics.distance || 0),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Weight',
        data: metrics.map((m) => m.metrics.weight || 0),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'Duration',
        data: metrics.map((m) => m.metrics.duration || 0),
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ActivityChart;
