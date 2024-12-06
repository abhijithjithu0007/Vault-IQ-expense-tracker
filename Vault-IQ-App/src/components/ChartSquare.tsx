import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const IncomeChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [chartData, setChartData] = useState<any>(null);

  const options = [
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 30 Days", value: "30days" },
    { label: "Last 6 Months", value: "6months" },
    { label: "This Year", value: "year" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      renderChart();
    }
  }, [selectedOption, chartData]);

  const fetchData = async () => {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/swindon/fake-api@master/tailwindAlpineJsChartJsEx1.json"
    );
    const data = await response.json();
    setChartData(data.dates);
  };

  const renderChart = () => {
    if (!chartRef.current || !chartData) return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const context = chartRef.current.getContext("2d");
    if (!context) return;

    const data = chartData[options[selectedOption].value];
    const newChartInstance = new Chart(context, {
      type: "line",
      data: {
        labels: data.data.labels,
        datasets: [
          {
            label: "Income",
            backgroundColor: "rgba(102, 126, 234, 0.25)",
            borderColor: "rgba(102, 126, 234, 1)",
            pointBackgroundColor: "rgba(102, 126, 234, 1)",
            data: data.data.income,
          },
          {
            label: "Expenses",
            backgroundColor: "rgba(237, 100, 166, 0.25)",
            borderColor: "rgba(237, 100, 166, 1)",
            pointBackgroundColor: "rgba(237, 100, 166, 1)",
            data: data.data.expenses,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              callback: (value: any) =>
                value > 1000
                  ? value < 1000000
                    ? value / 1000 + "K"
                    : value / 1000000 + "M"
                  : value,
            },
            grid: {
              display: false,
            },
          },
        },
        layout: {
          padding: {
            right: 10,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  };

  return (
    <div className="bg-white text-gray-800 rounded shadow-xl py-3 px-4 w-full lg:w-3/4">
      <div className="flex flex-wrap items-end justify-between mb-2">
        <h3 className="text-sm font-semibold leading-tight text-gray-900">
          Income
        </h3>
        <div className="relative">
          <button
            className="text-xs hover:text-gray-600 h-5 focus:outline-none"
            onClick={() =>
              setSelectedOption((prev) => (prev + 1) % options.length)
            }
          >
            {options[selectedOption].label}
            <i className="ml-1 mdi mdi-chevron-down"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-end mb-2">
        <h4 className="text-lg lg:text-xl text-gray-900 font-semibold leading-tight inline-block mr-2">
          $
          {chartData
            ? chartData[options[selectedOption].value].total.toLocaleString()
            : 0}
        </h4>
        <span
          className={`inline-block ${
            chartData && chartData[options[selectedOption].value].upDown < 0
              ? "text-red-600"
              : "text-green-600"
          } text-xs`}
        >
          {chartData && chartData[options[selectedOption].value].upDown < 0
            ? "▼"
            : "▲"}{" "}
          {chartData ? chartData[options[selectedOption].value].upDown : 0}%
        </span>
      </div>
      <canvas
        ref={chartRef}
        className="w-full"
        style={{
          height: "150px", // Adjust this value to your desired height
        }}
      ></canvas>
    </div>
  );
};

export default IncomeChart;
