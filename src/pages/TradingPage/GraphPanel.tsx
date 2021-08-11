import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

const rand = () => Math.round(Math.random() * 20 - 10);

const Bar_Data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
};
const Line_Data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function GraphPanel() {
  return (
    <>
      <div style ={{marginTop: 50}}>
        <h1 >BTCUSDT, 1</h1>
        <div style={{width:700,alignItems:'center'}}>
          <Bar data={Bar_Data} />
        </div>
        <div style={{width:700}}>
          <Line data={Line_Data} options={options} />
        </div>
        <div style={{width:700}}>
          <Line data={Line_Data}  />
        </div>
      </div>

    </>
  )
}
