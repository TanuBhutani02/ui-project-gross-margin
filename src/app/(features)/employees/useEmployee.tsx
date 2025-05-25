import { EmployeeService } from "@/services/employeeService";
import { IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from next/link

const useEmployee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSalary, setEditingSalary] = useState<any>(null);

  // Fetch employee data
  const fetchEmployeeList = async () => {
    setLoading(true);
    try {
      const response = await EmployeeService.get();
      const formattedRows = response.map((employee: any) => ({
        id: employee?._id,
        empid: employee?.empid || "",
        name: employee.name || "",
        salary: `₹ ${employee.recentSalary.ctc.toLocaleString()}`,
        effective_from: `${moment(employee?.recentSalary?.effective_from)?.format("DD- MMM -YYYY")}` || "",
      }));

      setEmployeeList(formattedRows);
    } catch (err) {
      setError("Failed to fetch employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  // Open Dialog
  const handleEditClick = (empId: string, salary: any) => {
    const employee: any = employeeList.find((e: any) => e?.empid === empId);
    const salaryDetailIndex = employee.salary_history.findIndex((salaryDetail: any) => salaryDetail.id == salary.id);
    const empSalaryDetails = employee.salary_history[salaryDetailIndex];
    setEditingSalary({
      employee,
      empSalaryDetails: empSalaryDetails,
    });
    setOpenDialog(true);
  };

  // Handle Save
  const handleEmployeeSave = () => {
    const empPaylaod = {

    }
    setOpenDialog(false);
  };

  // Define table columns
  const employeeColumns = [
    {
      field: "empid",
      headerName: "Employee ID",
      width: 150,
      renderCell: (params: any) => (
        <Link href={`/employees/${params.value}`}>
          <div className="text-blue-600 hover:text-blue-800 underline">{params.value}</div> {/* Tailwind classes for styling */}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 400,
      renderCell: (params: any) => (
        <Link href={`/employees/${params.row.empid}`}>
          <div className="text-blue-600 hover:text-blue-800 underline">{params.value}</div> {/* Tailwind classes for styling */}
        </Link>
      ),
    },
    {
      field: "salary",
      headerName: "CTC",
      width: 200,
    },
    {
      field: "effective_from",
      headerName: "Effective From",
      width: 200,
    }
  ];

  return {
    employeeList,
    employeeColumns,
    openDialog,
    loading,
    error,
    editingSalary,
    handleEmployeeSave,
    setEditingSalary,
    // Return grid props for the DataGrid component
    getGridProps: () => ({
      autoHeight: false,  // Don't auto expand
      rowHeight: 52,      // More reasonable default height
      getRowHeight: (params: any) => {
        // Calculate based on number of salary entries, but with smaller increments
        const salaryCount = params.model.rows[params.id]?.salary_history?.length || 1;
        return Math.max(52, 28 + (salaryCount * 28)); // Base height + smaller height per entry
      }
    })
  };
};

export default useEmployee;
