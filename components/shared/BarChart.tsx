"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = {
  labelSet: string[],
  dataSet: number[]
}

const BarChart = ({ labelSet, dataSet }: BarChartProps) => {
  const data = {
    labels: labelSet,
    datasets: [
      {
        label: "Orders",
        data: dataSet,
        backgroundColor: [
          "#365314",
          "#3f6212",
          "#4d7c0f",
          "#65a30d",
          "#84cc16",
          "#a3e635",
          "#bef264"
      ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Order Summary",
        position: "top" as const,
        align: "start" as const,
        font: {
          family: "Tauri",
          size: 16,
        },
        padding: {
          bottom: 30,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart
