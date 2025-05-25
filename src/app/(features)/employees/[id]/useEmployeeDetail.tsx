import { EmployeeService } from "@/services/employeeService";
import { IconButton } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export interface SalaryHistory {
    _id?: string;
    empid?: string;
    ctc: number | string;
    effective_from: string;
    remarks: string;
    isOverwrite: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface EmployeeDetail {
    _id: string;
    empid: string;
    name: string;
    salary_history: SalaryHistory[];
}

export interface EmployeeDetailResponse {
    message: string;
    statusCode: number;
    result: EmployeeDetail;
    error: any; // This can be refined further based on error structure if needed
}

const useEmployeeDetail = () => {
    const { id } = useParams();
    const [employeeDetail, setEmployeeDetail] = useState<EmployeeDetail>();
    const [employeeDetailDialog, setEmployeeDetailDialog] = useState(false);
    const [selectedSalary, setSelectedSalary] = useState<SalaryHistory | undefined>();

    async function fetchEmployeeDetail() {
        if (typeof id === "string") {
            const employeeDetail: EmployeeDetailResponse = await EmployeeService.getById(id);
            setEmployeeDetail(employeeDetail.result);
        }
    }

    async function updateEmplyeeDetail(data: any) {

        const res = await EmployeeService.update(data);
        if (res.message) {
            fetchEmployeeDetail();
        }
    }
    function handleDialogClose() {
        setEmployeeDetailDialog(false);
    }
    function handleEditClick(e: any) {
        setEmployeeDetailDialog(true);
        setSelectedSalary(e);
    }
    function handleSave(salaryDetails: any) {
        const empPaylaod =
        {
            empid: employeeDetail?.empid,
            name: employeeDetail?.name,
            salaryDetails
        }
        updateEmplyeeDetail(empPaylaod);
        handleDialogClose();

    }

    const employeeDetailsColumns = [

        { field: "ctc", headerName: "Salary History", width: 200 },
        { field: "formatted_effective_from", headerName: "Effective From", width: 200 },
        { field: "remarks", headerName: "Remarks", width: 200 },
        // Inside your DataGrid columns definition
        {
            field: "edit",
            headerName: "Edit",
            width: 100,
            renderCell: (params: any) => (
                <IconButton onClick={() => handleEditClick(params.row)}>
                    {/* Pencil emoji */}
                    <span role="img" aria-label="edit" style={{ fontSize: '15px' }}>✏️</span>
                </IconButton >
            ),
        }


    ]

    useEffect(() => {
        if (id) {
            fetchEmployeeDetail();
        }
    }, [id]);
    return {
        employeeDetail,
        updateEmplyeeDetail,
        id,
        employeeDetailsColumns,
        handleEditClick,
        selectedSalary,
        employeeDetailDialog,
        handleDialogClose,
        handleSave
    }

}
export default useEmployeeDetail;