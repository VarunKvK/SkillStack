"use client"

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {DownloadGraphBtn} from "../layout/DownloadGraphBtn"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarGraphs = ({ skills, id }) => {
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

  return (
    <div className="w-full h-full flex">
      <Bar data={data} options={options} id={id} className='w-[90%]'/>
      <DownloadGraphBtn chartId={"bargraph"} className="absolute -right-[2rem]"/>
    </div>
  );
};