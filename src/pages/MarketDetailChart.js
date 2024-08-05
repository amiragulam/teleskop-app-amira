import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const MarketDetailChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Open Price",
        data: data.map((entry) => entry.open),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
        fill: true,
      },
      {
        label: "Close Price",
        data: data.map((entry) => entry.close),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
        ticks: {
          callback: (value) => `$${value.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="mb-8">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MarketDetailChart;
