import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CryptoDetailPage = () => {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: "30",
            },
          }
        );

        if (response.data.prices) {
          setCryptoData(response.data);
        } else {
          throw new Error("No price data found for this cryptocurrency.");
        }
      } catch (err) {
        setError(`Error fetching crypto data: ${err.message}`);
      }
    };

    fetchCryptoData();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!cryptoData) return <p>Loading...</p>;

  const { prices } = cryptoData;

  const chartData = {
    labels: prices.map(([timestamp]) =>
      new Date(timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: prices.map(([, price]) => price),
        borderColor: "rgba(248, 165, 33, 1)",
        backgroundColor: "rgba(248, 165, 33, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Price: $${context.raw.toFixed(2)}`;
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
          text: "Price (USD)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">{id} Detail</h2>
      <div style={{ width: "800px", height: "400px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CryptoDetailPage;
