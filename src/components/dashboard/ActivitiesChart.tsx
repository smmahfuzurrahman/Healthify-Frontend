import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useUsersActivitiesQuery } from "@/redux/api/user/userApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const ActivitiesChart: React.FC = () => {
  const { data: activities } = useUsersActivitiesQuery("");
  const completedPercentage = activities?.data?.totalPercentageOfCompleted || 0;
  const notCompletedPercentage = 100 - completedPercentage;

  const data = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        label: "User Activities",
        data: [completedPercentage, notCompletedPercentage],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 14,
          },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Users Activities Overview",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto transition-transform transform hover:scale-105">
      <h1 className="text-center font-semibold text-3xl text-gray-800 mb-6">
        Users Profile Activities
      </h1>
      <div className="relative">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ActivitiesChart;
