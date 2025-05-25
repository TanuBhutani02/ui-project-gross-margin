/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { months, years } from "@/types/role";
import DataGridComponent from "@/components/DataGridComponent";
import { RadioButton } from "@/components/RadioButton";
import { ProjectService } from "@/services/project";
import { EmployeeService } from "@/services/employeeService";
import { billingService } from "@/services/billing";
import moment from "moment";
import { Tab, Tabs } from "@/components/TabsComponent";
import { Calendar } from "@/components/Calender";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { key, prepareEmployeePaylaod, preparePaylaod } from "./util";

const Container = styled.main`
  padding: 2rem;
  background-color: #f8f9fa !important;
  /* Remove min-height if it's restricting content */
`;
const ScrollContainer = styled.div`
  height: 400px; // Fixed height instead of 100vh
  overflow-y: auto;
  overflow-x: auto;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 5px;
  font-size: 16px;
  flex: 1;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #218838;
  }
`;


export default function UpdatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [projects, setProjects] = useState<any>(null);
  const [fileType, setFileType] = useState("monthlyTime");
  const [selectedDate, setSelectedDate] = useState<undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null)


  async function loadProjects() {
    let data = await ProjectService.get();
    data = data.map((el: any) => ({
      value: el.Id,
      label: el.name
    }))
    console.log(data, "final data")
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, [])
  // Required column order
  const requiredColumns = [
    "employeeId",
    "employeeName",
    "employeeStatus",
    "hoursperDay",
    "billingRate",
    "multiBillingAccount",
    "accountCostFactor",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setFileType(type);
    const uploadedFile = event.target.files?.[0];

    if (!uploadedFile) return;

    // Check file size (10MB limit)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      setError("❌ File size should not exceed 10MB.");
      alert(error);
      return;
    }

    // Check file type
    if (
      uploadedFile.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      uploadedFile.type === "application/vnd.ms-excel"
    ) {
      setFile(uploadedFile);
      setError("");
      readExcel(uploadedFile, type);
    } else {
      setError("❌ Please upload a valid Excel file (.xlsx, .xls).");
      alert(error);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);

  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const calculateDaysInMonth = (month: string, year: string) => {
    if (month && year) {
      const days = new Date(parseInt(year), parseInt(month), 0).getDate();
      setDaysInMonth(days);
    }
  };

  const validateExcel = (data: any[]) => {
    const headers = data[0];
    const daysColumnIndex = headers.indexOf("Day");

    if (daysColumnIndex === -1) {
      setValidationResult("❌ The Excel file must contain a 'Day' column.");
      return;
    }

    const days = data.slice(1).map((row) => row[daysColumnIndex]);
    const uniqueDays = new Set(days);

    if (uniqueDays.size !== daysInMonth) {
      setValidationResult(`❌ The Excel file must contain ${daysInMonth} unique days.`);
      return;
    }

    for (let i = 1; i <= daysInMonth; i++) {
      if (!uniqueDays.has(i)) {
        setValidationResult(`❌ The Excel file is missing day ${i}.`);
        return;
      }
    }

    setValidationResult("✅ The Excel file is valid.");
  };

  const processRows = (jsonData: any[]) => {
    const headers = jsonData[0];
    setColumns(
      jsonData[0].map((header: string) => {
        console.log(header.toLowerCase() === 'hrs/day', " test field name", header.toLowerCase() === 'hrs/day' ? 'hrsperday' : header.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().trim());
        return ({
          field: header.toLowerCase() === 'hrs/day' ? 'hrsperday' : header.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().trim(),
          headerName: header,
          width: 150,
        })
      }
      )
    );

    // if(headers.length > 5){

    // const rows = jsonData.slice(1).map((row, index) => {
    //console.log("test for max billable hours", Number(row[7]), Number(row[6])); 
    //debugger;
    // Construct the static part of the row object
    // const staticColumns = {
    //   id: index + 1, // Auto-incrementing ID
    //   empid: row[0] ? String(row[0]) : "",
    //   name: row[1] ? String(row[1]) : "",
    //   billingstatus: row[2] ? String(row[2]) : "",
    //   hrsperday: row[3] ? Number(row[3]) : 8,
    //   rate: row[4] ? Number(row[4]) : 0,
    //   multibillingaccount: row[5] ? String(row[5]) : 1,
    //   accountcostfactor: row[6] ? Number(row[6]) : 100.00,
    //   maxhoursbillable: row[7]? Number(row[7]):0,
    // };
    // const dynamicColumns = headers.slice(7).reduce((acc: { [x: string]: string | number; }, header: string | number, i: number) => {
    //   acc[String(header).toLowerCase()] = row[i + 7] ? String(row[i + 7]) : "";
    //   return acc;
    // }, {});


    // const combinedRow : any = {
    //   id: staticColumns.id,
    //   empid: staticColumns.empid,
    //   name: staticColumns.name,
    //   billingstatus: staticColumns.billingstatus,
    //   hrsperday: staticColumns.hrsperday,
    //   rate: staticColumns.rate,
    //   multibillingaccount: staticColumns.multibillingaccount? staticColumns.multibillingaccount : 1,
    //   accountcostfactor: staticColumns.accountcostfactor,
    //   maxhoursbillable: staticColumns.maxhoursbillable,
    //    ...dynamicColumns,
    // };

    //   return combinedRow;
    //});
    //setRows(rows); 
    //}
    //else{
    const rows = jsonData.slice(1).map((row) => {
      const oneRow = headers.reduce((acc: any, header: any, index: number) => {
        acc["id"] = Math.random();
        if (header.trim().toLowerCase() == "ctc") {
          acc[key(header)] = row[index];
        } else if (key(header) == "multibillingaccount") {
          acc[key(header)] = row[index] || 1;
        } else if (header.toLowerCase() === 'hrs/day') {
          acc['hrsperday'] = row[index];
        } else {
          acc[key(header)] = row[index];
        }
        return acc;
      }, {})

      return oneRow;
    }
    )

    setRows(rows);
    //}

    //};
    //  }
  }

  const readExcel = (file: File, type: string) => {
    console.log("test read Excel");
    debugger;
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const binaryString = e.target?.result;
      if (!binaryString) return;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      if (jsonData.length > 0) {
        validateExcel(jsonData);
        processRows(jsonData);
      }
      if (jsonData.length > 0) {
        const headers = jsonData[0].map((header: any) =>
          String(header || "").trim()
        );

        // Validate column structure
        // if (JSON.stringify(headers) !== JSON.stringify(requiredColumns)) {
        //   const errorMessage = `❌ Invalid Excel format. \n\nEnsure the file contains these columns in order:\n${requiredColumns.join(
        //     ", "
        //   )}`;


        //   setError(errorMessage);
        //   setFile(null);
        //   setData([]);
        //   alert(errorMessage);
        //   return;
        // }

        setError("");

        // Add IDs to each row and enforce default values
        // const rows = jsonData.slice(1).map((row, index) => ({
        //   id: index + 1, // Auto-incrementing ID
        //   projectName: row[0] ? String(row[0]) : "",
        //   employeeName: row[1] ? String(row[1]) : "",
        //   employeeId: row[2] ? String(row[2]) : "",
        //   costToCompany: row[3] ? Number(row[3]) : 0,
        //   actualBillingCost: row[4] ? Number(row[4]) : 0,
        //   test: row[5] ? String(row[5]) : "",
        // }));
        // Console log the JSON data with IDs

      }
    };
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
    setRows([]);
    setColumns([]);
    setFile(null);
    setData([]);
    setError("");
  };

  function handleProjectChange(e: any) {
    setSelectedProject(e.target.value);
  }

  function handleFileType(e: any) {

    setFileType(e.target.value);
  }


  const handleSave = async () => {
    if (error || rows.length === 0) {
      alert("❌ Cannot save invalid data!");
      return;
    }
    try {
      calculateDaysInMonth(selectedMonth, selectedYear);
      let payload;
      if (fileType !== 'employee') {
        payload = preparePaylaod(rows, { project: selectedProject, month: (selectedMonth), year: selectedYear });
      } else {
        payload = prepareEmployeePaylaod(rows, selectedDate);
      }
      let response: any;
      if (fileType === 'employee') {
        response = await EmployeeService.update(payload);
      } else {
        response = await billingService.create(payload);
      }

      if (response.statusCode == 200) {
        setRows([]);
        setColumns([]);
        setFile(null);
        alert("✅ Data saved successfully!")
      }
      else throw new Error("Error in saving");
    } catch {
      alert("❌ Failed to save data!");
    }
  };

  function handleSelectedData(e: any) {
    setSelectedDate(e);
  }


  function handleTabSwitch() {
    handleRemoveFile();

  }
  return (
    <Container className="container">

      <Tabs handleTabSwitch={handleTabSwitch}>
        <Tab label="📁 Portfolio Monthly Timesheet">
          <h1 className="mt mb-4">📊 Project Data Management</h1>
          <Row>
            <Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
              <option value="" disabled>Select a project</option>
              {projects?.map((project: any) => (
                <option key={project.value} value={project.value}>{project.label}</option>
              ))}
            </Select>

            <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="" disabled>Select a year</option>
              {years.map((year) => (<option key={year.value} value={year.value}>{year.label}</option>))}
            </Select>

            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="" disabled>Select a month</option>
              {months.map((month) => (<option key={month.value} value={month.value}>{month.label}</option>))}
            </Select>
          </Row>
          <div>
            <label className="mb-12">📂 Upload File:</label>
          </div>
          <input className="mt-4" type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={(e) => handleFileUpload(e, "portfolio")} />

        </Tab>

        <Tab label="👨‍💻 Employee Details 👩‍💻">
          <h1 className="p-4">👥 Employee Data Management</h1>
          <Calendar selected={selectedDate} onChange={handleSelectedData} />
          <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={(e) => handleFileUpload(e, "employee")} className="mt-4" />
        </Tab>
      </Tabs>

      {file && <>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg font-gabarito hover:bg-red-600 transition"
          onClick={handleRemoveFile}
        >
          Remove File
        </button>
        <Button onClick={handleSave}>💾 Save Data</Button>
      </>}


      {/* Table Preview */}
      <div className="overflow-x-auto max-h-96 border rounded-lg mt-4">
        {/* <table className="min-w-full bg-white">
                <thead className="bg-gray-200 text-gray-900 font-gabarito">
                  <tr>
                    <th className="px-6 py-3 border">ID</th>{" "}
                    {data.length > 0 &&
                      Object.keys(data[0]).map(
                        (key, index) =>
                          key !== "id" && (
                            <th key={index} className="px-6 py-3 border">
                              {key}
                            </th>
                          )
                      )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-t font-gabarito hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border">{row.id}</td>{" "}
                      {Object.entries(row).map(
                        ([key, value], colIndex) =>
                          key !== "id" && (
                            <td key={colIndex} className="px-6 py-4 border">
                              {key === "costToCompany" ||
                              key === "actualBillingCost"
                                ? typeof value === "number"
                                  ? value
                                  : 0
                                : typeof value === "string"
                                ? value
                                : "-"}{" "}
                            </td>
                          )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table> */}

        {rows.length > 0 && (
          <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <h2 className="text-2xl font-bold mb-4">Processed Rows</h2>
            <DataGridComponent columns={columns} rows={rows} />
          </div>
        )}
      </div>

      {/* Buttons */}
      {/* <div className="flex gap-4 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg font-gabarito hover:bg-red-600 transition"
                onClick={handleRemoveFile}
              >
                Remove File
              </button>
              <button
                className={`py-2 px-4 rounded-lg font-gabarito transition ${
                  error || data.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                onClick={handleSave}
                disabled={!!error || rows.length === 0}
              >
                Save Data
              </button>
            </div> */}



    </Container>
  );
}
