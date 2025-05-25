"use client";
import React from "react";
import useEmployeeDetail from "./useEmployeeDetail";
import DataGridComponent from "@/components/DataGridComponent";
import moment from "moment";
import SalaryDialog from "./SalaryEditDialog";


export default function EmployeePage() {
    const { id, employeeDetail, employeeDetailsColumns, employeeDetailDialog, handleDialogClose, handleSave, selectedSalary } = useEmployeeDetail();

    return (
        <main className="p-8">
            {selectedSalary && (
                <SalaryDialog openDialog={employeeDetailDialog} handleDialogClose={handleDialogClose} handleSave={handleSave} employee={selectedSalary} />
            )}
            <h1 className="text-3xl font-bold">Employee Details</h1>

            <p>{employeeDetail?.name + ", " + id}</p>
            <DataGridComponent columns={employeeDetailsColumns} rows={employeeDetail?.salary_history.map((el) => ({ ...el, id: el._id, formatted_effective_from: `${moment(el?.effective_from)?.format("DD- MMM -YYYY")}` || "" })) || []} getGridProps={{ autoHeight: true, pageSize: 5 }} />
        </main>
    );
}