"use client";

import { useState, useEffect } from "react";
import { getAllUploadData } from "@/services/uploadApis";
import { Project } from "@/types/project";


export default function ReportsPage() {
  const [data, setData] = useState<Project[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Project | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uploadData = await getAllUploadData();
        if (!uploadData) {
          console.error("No upload data received.");
          return;
        }
        setData(uploadData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const sortData = (column: keyof Project) => {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) =>
      a[column] < b[column] ? (newOrder === "asc" ? -1 : 1) : a[column] > b[column] ? (newOrder === "asc" ? 1 : -1) : 0
    );

    setSortColumn(column);
    setSortOrder(newOrder);
    setData(sortedData);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 font-gabarito mb-6">
        Reports
      </h1>

      {/* Data Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-900 font-gabarito text-left">
              <th className="px-6 py-3 cursor-pointer" onClick={() => sortData("project_name")}>
                Project Name ⬍
              </th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => sortData("employee_name")}>
                Employee Name ⬍
              </th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => sortData("employee_id")}>
                Employee ID ⬍
              </th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => sortData("cost_to_company")}>
                Cost to Company (₹) ⬍
              </th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => sortData("actual_billing_cost")}>
                Actual Billing Cost (₹) ⬍
              </th>
              <th className="px-6 py-3">Gross Margin (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => {
              const margin = project.actual_billing_cost - project.cost_to_company;
              return (
                <tr key={project._id} className="border-t font-gabarito text-gray-700 hover:bg-gray-100 transition">
                  <td className="px-6 py-4">{project.project_name}</td>
                  <td className="px-6 py-4">{project.employee_name}</td>
                  <td className="px-6 py-4">{project.employee_id}</td>
                  <td className="px-6 py-4">₹{project.cost_to_company.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">₹{project.actual_billing_cost.toLocaleString("en-IN")}</td>
                  <td className={`px-6 py-4 font-semibold ${margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ₹{margin.toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
