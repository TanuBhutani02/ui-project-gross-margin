"use client";

import { useState, useEffect } from "react";
import ProjectPieChart from "@/components/PieChart";
import EmployeeChart from "@/components/EmployeeChart";
import useProject from "@/app/projects/useProject";
import { months, years } from "@/types/role";
import RefreshButton from "./RefreshButton";
import { PortFoliocolumns } from "@/constant/projects";
import DataGridComponent from "@/components/DataGridComponent";
import { Checkbox, Chip, FormControl, ListItemText, MenuItem, Select } from "@mui/material";

export default function Dashboard() {
  const { projects, fetchBillingData, billingData, setSelectedProjects, selectedProjects, selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } = useProject();
  const [activeTab, setActiveTab] = useState("dashboard");
  const dashboardData = billingData;
  console.log(selectedProjects, "selectedProjects");
  useEffect(() => {
    if (projects?.length > 0 && (selectedProjects?.length == 0 || !selectedProjects)) {
      setSelectedProjects([String(projects[0].id)]);
    }
  }, [projects]);

  useEffect(() => {
    if (selectedProjects?.length > 0) {
      fetchBillingData();
    }
  }, [selectedProjects, selectedMonth, selectedYear]);

  function loadDashboard() {
    fetchBillingData();
  }

  const projectName = projects?.find((project) => project.id === dashboardData?.project)?.name;

  const handleProjectChange = (event: any) => {
    const value = event.target.value;

    if (value.includes("all")) {
      if (selectedProjects.length === projects.length) {
        setSelectedProjects([]);
      } else {
        setSelectedProjects(projects.map((p) => p.id).filter((id): id is string => id !== undefined)); // Select all
      }
    } else {
      setSelectedProjects(value);
    }
  };



  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full flex space-x-4 border-b pb-2">
        {[
          { tab: "dashboard", label: "📊 Dashboard" },
          { tab: "portfolio", label: "📁 Org Details" },
        ].map(({ tab, label }) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium transition-all ${activeTab === tab
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {label}
          </button>
        ))}
      </div>


      {activeTab === "dashboard" && (
        <>
          <h1 className="text-4xl font-bold text-gray-900 my-6">📊 {projectName ? `${projectName} ` : ""}Revenue & Utilization </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
            <FormControl fullWidth className="w-full">
              <label id="projects" className="block text-gray-700 font-medium mb-1">Select Projects:</label>
              <Select
                multiple
                id="projects"
                value={selectedProjects}
                onChange={handleProjectChange}
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span className="text-gray-400">Select Projects</span>;
                  }

                  const selectedNames = selected
                    .map((id) => projects.find((p) => p.id === id)?.name)
                    .filter(Boolean);

                  const displayText =
                    selectedNames.length > 2
                      ? `${selectedNames.slice(0, 2).join(", ")} +${selectedNames.length - 2} more`
                      : selectedNames.join(", ");

                  return <div className="flex flex-wrap gap-1"><Chip label={displayText} /></div>;
                }}
                MenuProps={{
                  PaperProps: {
                    className: "z-40", // Ensures dropdown appears above other content
                  },
                }}
                className="w-full h-12 py-2 px-3 border border-gray-300 rounded-lg shadow-sm bg-white z-40"
              >
                {/* Select All Option */}
                <MenuItem
                  value="all"
                  onClick={() => {
                    if (selectedProjects.length === projects.length) {
                      setSelectedProjects([]);
                    } else {
                      setSelectedProjects(projects.map((p) => p.id).filter((id): id is string => id !== undefined));
                    }
                  }}
                >
                  <Checkbox checked={selectedProjects.length === projects.length} />
                  <ListItemText primary="Select All" />
                </MenuItem>

                {/* Individual Project Selection */}
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    <Checkbox checked={project.id ? selectedProjects.includes(project.id) : false} />
                    <ListItemText primary={project.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Select Year:</label>
              <select
                className="w-full h-12 py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                value={selectedYear}
                onChange={(e: any) => setSelectedYear(e.target.value)}
              >
                {years.map((yr) => (
                  <option key={yr.value} value={yr.value}>{yr.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Select Month:</label>
              <div className="relative w-full">
                <select
                  className="w-full h-12 py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={selectedMonth}
                  onChange={(e: any) => setSelectedMonth(e.target.value)}
                >
                  {/* Placeholder Option (empty value) */}
                  <option value="">Select Month</option>

                  {/* Month Options */}
                  {months.map((mn) => (
                    <option key={mn.value} value={mn.value}>
                      {mn.label}
                    </option>
                  ))}
                </select>

                {/* Show Colorful Delete Emoji if a month is selected */}
                {selectedMonth && (
                  <button
                    type="button"
                    onClick={() => setSelectedMonth("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-600 transition text-lg"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center mt-7">
              <RefreshButton onClick={loadDashboard} />
            </div>
          </div>

          {dashboardData?.total ? (
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "💰 Total Revenue", value: dashboardData?.total?.revenue?.toFixed(2) || "0.00", color: "blue" },
                  { label: "💸 Total Cost", value: dashboardData?.total?.cost_to_account?.toFixed(2) || "0.00", color: "indigo" },
                  { label: "📈 Gross Margin", value: dashboardData?.total?.gross_margin?.toFixed(2) || "0.00", color: "green" },
                  { label: "🧑‍💻 Utilization Billable Only", value: dashboardData?.total?.billing_utilization?.toFixed(2) + " %" || "0.00", color: "blue" },
                  { label: "⏳ Overall Utilization", value: dashboardData?.total?.overall_utilzation?.toFixed(2) + " %" || "0.00", color: "indigo" },
                  { label: "🪙 Gross Margin Percentage", value: dashboardData?.total?.gross_margin_percent?.toFixed(2) + " %" || "0.00", color: "green" },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="p-6 rounded-xl shadow-lg border bg-gradient-to-br from-blue-300 to-gray-200 
                hover:bg-gradient-to-br hover:from-blue-400 hover:to-gray-300 
                hover:shadow-2xl hover:scale-105 transition-all duration-300
                flex flex-col justify-between h-32"
                  >
                    <h2 className="text-lg font-semibold text-gray-700 text-left">{label}</h2>
                    <p className="text-3xl font-bold text-gray-900">
                      {!value.includes("%") ? "$" : ""}{" "}{value}
                    </p>
                  </div>
                ))}
              </div>


              {dashboardData?.projects?.map((project: any) => (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200" key={project.project}>
                  <h2 className="text-xl font-semibold text-center mb-4">📊 {projects.find((el) => el.id === project.project)?.name} Distribution</h2>
                  <ProjectPieChart project={project} />
                </div>
              ))}



              {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold text-center mb-4">📉 Employee Revenue & Cost Comparison</h2>
                {dashboardData?.details?.length > 0 ? <EmployeeChart data={dashboardData.details} /> : <p className="text-center">No Data Available</p>}
              </div> */}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">Loading data...</p>
          )}
        </>
      )} {activeTab === "portfolio" && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">📁 Org Details</h2>
          {dashboardData ? (
            <div className="mt-6">
              <DataGridComponent rows={dashboardData?.details.map((el: any) => ({ ...el, revenue: el?.revenue?.toFixed(2), revenue_gap: el?.revenue_gap?.toFixed(2), factored_monthly_cost: el?.factored_monthly_cost?.toFixed(2), id: Math.random(), indMargin: el?.indMargin?.toFixed(2) }))} columns={PortFoliocolumns} />
            </div>
          ) : (
            <p className="text-gray-600 mt-2">Portfolio details will be displayed here.</p>
          )}
        </div>
      )}

      {/* {activeTab === "employee" && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">👨‍💻 Employee Details 👩‍💻</h2>
          <SalaryEditDialog openDialog={openDialog}
            editingSalary={editingSalary}
            setEditingSalary={setEditingSalary}
            handleEmployeeSave={handleEmployeeSave}
          />
          <DataGridComponent rows={employeeList} columns={employeeColumns} getGridProps={getGridProps} />
        </div>
      )} */}
    </main>
  );
}