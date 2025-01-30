import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Small", "Medium", "Large"],
    datasets: [
      {
        label: "Gas Stock",
        data: [150, 100, 50], 
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)", 
          "rgba(75, 192, 192, 0.6)", 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center mb-2">Gas Stock Overview</h2>
      <div className="h-[300px] flex justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
