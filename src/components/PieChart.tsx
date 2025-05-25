"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function ProjectPieChart({ project }: { project: any }) {
  const totalRevenue = project?.revenue || project[0]?.actual_billing_cost;
  const totalCost = project?.factored_monthly_cost;
  const margin = +project?.gross_margin?.toFixed(2) || totalRevenue - totalCost;
  const grossMarginPercentage: number =
    +project?.gross_margin_percent?.toFixed(2) ||
    (totalRevenue > 0 ? +(((margin / totalRevenue) * 100).toFixed(2)) : 0.0);

  const costPercentage = 100 - grossMarginPercentage;

  const data = {
    labels: ["Cost to Company", "Actual Billing Cost", "Gross Margin"],
    datasets: [
      {
        data: [totalCost, totalRevenue, margin],
        backgroundColor: ["#D8E2DC", "#B5D0EB", "#C4DFAA"],
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const grossMarginPercentageData = {
    labels: ["Gross Margin Percentage", "Cost Percentage"],
    datasets: [
      {
        data: [grossMarginPercentage, costPercentage],
        backgroundColor: ["#A3C9A8", "#D3DCE6"],
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const overAllUtilization = {
    labels: ["Overall Utilization"],
    datasets: [
      {
        data: [project.overall_utilzation],
        backgroundColor: ["#D6E5FA"],
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const baseOptions = (title: string, showLegend = true) => ({
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom" as const,
        labels: {
          color: "#444",
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: title,
        font: { size: 18, family: "sans-serif" },
        color: "#333",
        padding: { bottom: 20 },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
  });

  return (
    <div className="mt-8 p-6 bg-white shadow-lg rounded-xl flex flex-col lg:items-center gap-6">
      <div className="w-full flex flex-wrap justify-center gap-10">
        <div className="w-72 h-72">
          <Pie data={data} options={baseOptions("Cost vs Revenue vs Margin")} />
        </div>
        <div className="w-72 h-72">
          <Pie
            data={grossMarginPercentageData}
            options={baseOptions("Gross Margin vs Cost %")}
          />
        </div>
        <div className="w-72 h-72">
          <Pie
            data={overAllUtilization}
            options={baseOptions("Overall Utilization", false)}
          />
        </div>
      </div>
    </div>
  );
}
