import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { DashApi } from "../services/Dashboard";
import Assets from "./Assets";
import Transactions from "./Transactions";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [networth, setNetworth] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state?.global?.authData);

  const chartsData = useMemo(() => {
    if (!chartData) return null;
    return {
      labels: chartData.map((entry) => entry.year),
      datasets: [
        {
          label: "Networth Over Time",
          data: chartData.map((entry) => entry.networth),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          pointBackgroundColor: "#3b82f6",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [chartData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#f3f4f6",
        bodyColor: "#f3f4f6",
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Period",
          color: "#374151",
          font: { size: 14 },
        },
        ticks: { color: "#6b7280" },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          color: "#374151",
          font: { size: 14 },
        },
        ticks: {
          color: "#6b7280",
          callback: (value) =>
            value.toLocaleString("en-IN", { maximumFractionDigits: 0 }),
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutCubic",
    },
  };

  useEffect(() => {
    const fetchNetworthData = async () => {
      try {
        setLoading(true);

        const [networthResponse, networthByDateResponse] = await Promise.all([
          DashApi.networth(),
          DashApi.networthByDateRange(),
        ]);

        setNetworth(networthResponse);
        setChartData(networthByDateResponse?.data);
      } catch (error) {
        console.error("Error fetching networth data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworthData();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 bg-white rounded-xl p-4 text-left">
        <h1 className="text-xl font-semibold">
          Hello <span className="">{user?.split("@")[0]}</span>,
        </h1>
        <p>
          Your current <span className="text-[#024695]">Networth</span> is
        </p>
        <p className="text-3xl font-bold text-[#024695]">
          ₹ {networth?.networth?.toLocaleString()}
        </p>
        <p className="text-xs text-gray-700">
          ⓘ Your networth is updated every 24 hours
        </p>
      </div>

      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <div className="relative h-64">
          {chartsData && <Line data={chartsData} options={chartOptions} />}
        </div>
      )}

      <Assets />
      <Transactions />
    </div>
  );
};

export default Dashboard;
