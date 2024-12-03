import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartRound: React.FC = () => {
  // Define data for the chart
  const data = {
    labels: ["Revenue", "Expenses", "Savings"],
    datasets: [
      {
        label: "Financial Distribution",
        data: [300, 200, 100], // Dummy values
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"], // Colors for segments
        borderWidth: 1,
      },
    ],
  };

  // Define options for the chart
  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    cutout: "70%", // Makes the chart look like a donut
  };

  return (
    <div className="w-80 h-80 mx-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
        Financial Chart
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};
