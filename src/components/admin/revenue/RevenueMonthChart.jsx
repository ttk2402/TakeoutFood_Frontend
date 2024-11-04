// RevenueChart.jsx
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueMonthChart = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
        backgroundColor: [],
        borderColor: "rgba(211, 211, 211, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Generate darker background colors
  const generateColors = (dataLength) =>
    Array.from(
      { length: dataLength },
      () =>
        `rgba(${Math.floor(Math.random() * 155 + 50)}, ${Math.floor(
          Math.random() * 155 + 50
        )}, ${Math.floor(Math.random() * 155 + 50)}, 0.8)`
    );

  // Fetch default data
  const fetchDefaultData = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api/bill/revenue/month/latest");
      const result = response.data;

      const labels = result.map((entry) => entry.issueMonth);
      const data = result.map((entry) => entry.totalForMonth);
      const backgroundColors = generateColors(data.length);

      setChartData({
        labels,
        datasets: [
          {
            label: "Doanh thu",
            data,
            backgroundColor: backgroundColors,
            borderColor: "rgba(211, 211, 211, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching default data:", error);
      alert("Could not fetch default revenue data.");
    }
  };

  // Fetch data based on selected months
  const fetchRevenueData = async () => {
    if (!startDate || !endDate) {
      alert("Please select valid date ranges.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8084/api/bill/revenue/month",
        {
          params: { startDate, endDate },
        }
      );
      const result = response.data;

      const labels = result.map((entry) => entry.issueMonth);
      const data = result.map((entry) => entry.totalForMonth);
      const backgroundColors = generateColors(data.length);

      setChartData({
        labels,
        datasets: [
          {
            label: "Doanh thu",
            data,
            backgroundColor: backgroundColors,
            borderColor: "rgba(211, 211, 211, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      alert("Could not fetch revenue data.");
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  // Dynamic bar thickness
  const barThickness = chartData.labels.length <= 5 ? 50 : undefined;

  return (
    <div className="bg-white backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-200">
      <div className="flex flex-col items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="month" // Change to month type
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Từ tháng"
          />
          <input
            type="month" // Change to month type
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Đến tháng"
          />
          <button
            onClick={fetchRevenueData}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Thống kê
          </button>
        </div>
      </div>

      <div className="w-full h-[420px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: { display: true, text: "Thống kê doanh thu theo tháng" },
              },
              y: {
                title: { display: true, text: "VNĐ" },
                beginAtZero: true,
              },
            },
            barThickness: barThickness,
          }}
        />
      </div>
    </div>
  );
};

export default RevenueMonthChart;
