"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Project } from "@/types/project";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProjectBarChart({ data }: { data: any }) {
  const chartData = {
    labels:  data.name,
    datasets: [
      {
        label: "Cost to Company (₹)",
        data: [10],
        backgroundColor: "rgba(75, 85, 99, 0.7)", 
      },
      {
        label: "Actual Billing Cost (₹)",
        data: [20],
        backgroundColor: "rgba(96, 165, 250, 0.7)", 
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-xl font-bold font-gabarito mb-4">Project Cost Comparison</h2>
      <div className="h-80 mt-10">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
