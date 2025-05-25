import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom width & height
    scales: {
      x: {
        ticks: { autoSkip: false }, // Ensures all labels show
      },
    },
    plugins: {
      legend: {
        position: "top" as "top",
      },
      title: {
        display: true,
        text: "Employee Revenue & Cost Comparison",
      },
    },
  };
const EmployeeChart = ({ data }: any) => {
  console.log("test data", data);

  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No valid data provided for the chart.");
    return null; // Render nothing until valid data is available
  }

  const EmployeeChartBinding = {
    labels: data.map((emp: any) => emp?.name),
    datasets: [
      {
        label: "Revenue",
        data: data.map((emp: any) => emp.revenue || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal Green
        borderColor: "rgba(75, 192, 192, 1)", // Darker Teal for Border
        borderWidth: 1,
      },
      {
        label: "Factored Monthly Cost",
        data: data.map((emp: any) => emp.factored_monthly_cost),
        backgroundColor: "rgba(255, 159, 64, 0.6)", // Orange
        borderColor: "rgba(255, 159, 64, 1)", // Darker Orange for Border
        borderWidth: 1,
      },
      {
        label: "Revenue Gap",
        data: data.map((emp: any) => emp.revenue_gap),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Soft Red
        borderColor: "rgba(255, 99, 132, 1)", // Darker Red for Border
        borderWidth: 1,
      }
    ],
  };
  

  console.log(EmployeeChartBinding);
  return <div className="w-full h-[400px] max-h-[400px] overflow-hidden"><Bar data={EmployeeChartBinding} options={options} style={{ width: "1500px", height: "1px" }}/></div>;
};
  
  export default EmployeeChart;