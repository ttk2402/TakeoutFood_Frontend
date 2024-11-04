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

const RevenueYearChart = () => {
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
      const response = await axios.get(
        "http://localhost:8084/api/bill/revenue/year/latest"
      );
      const result = response.data;

      const labels = result.map((entry) => entry.issueYear);
      const data = result.map((entry) => entry.totalForYear);
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

  useEffect(() => {
    fetchDefaultData();
  }, []);

  // Dynamic bar thickness
  const barThickness = chartData.labels.length <= 5 ? 75 : undefined;

  return (
    <div className="bg-white backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-200">
      <div className="w-full h-[420px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: { display: true, text: "Thống kê doanh thu theo năm" },
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

export default RevenueYearChart;
