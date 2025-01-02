import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ActivityChart = ({ metrics }) => {
  const data = {
    labels: metrics.map((_, index) => `Session ${index + 1}`),
    datasets: [
      {
        label: 'Distance',
        data: metrics.map((m) => m.distance || 0),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Weight',
        data: metrics.map((m) => m.weight || 0),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'Duration',
        data: metrics.map((m) => m.duration || 0),
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default ActivityChart;
