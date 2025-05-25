"use client";

import DataGridComponent from "@/components/DataGridComponent";
import useEmployee from "./useEmployee";

export default function Employees() {
    const { employeeList, employeeColumns, getGridProps, openDialog, editingSalary, setEditingSalary, handleEmployeeSave } = useEmployee();
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-900 my-6">👨‍💻 Employee Details 👩‍💻 </h1>


            <DataGridComponent rows={employeeList} columns={employeeColumns} getGridProps={getGridProps} />

        </>
    )
}