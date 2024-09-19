"use client"

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarGraphs = ({ skills }) => {
    const data = {
      labels: skills.map(skill => skill.name),
      datasets: [
        {
          label: 'Proficiency Level',
          data: skills.map(skill => skill.proficiencyPercentage),
          backgroundColor: '#e2fd6c',
          borderColor: '#e2fd6c',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };