export const ProjectColumns = [
{ key: "project_name", label: "Project Name", isSortable: true },
{ key: "bu_head", label: "Bu Head", isSortable: true },
{ key: "del", label: "Delivery Manager", isSortable: true },
{ key: "billingtype", label: "Billing Type", isSortable: true },
{key:"edit", label:"Edit", isSortable: false},

];

export const PortFoliocolumns = [
    { field: "empid", headerName: "Employee ID", width: 130},
    { field: "name", headerName: "Name", width: 200 },
    { field: "actual_hours_billable", headerName: "Actual Billing Hours", width: 180, cellClassName: "soft-green", },
    { field: "revenue", headerName: "Revenue", width: 150, cellClassName: "soft-green", },
    { field: "revenue_gap", headerName: "Revenue Gap", width: 150, cellClassName: "soft-green", },
    { field: "max_hours_shadow", headerName: "Max Hours Shadow", width: 180, cellClassName: "soft-green", },
    { field: "ctc", headerName: "CTC", width: 150, cellClassName: "soft-green", },
    { field: "factored_monthly_cost", headerName: "Factored Monthly Cost", width: 200, cellClassName: "soft-green", },
    { field: "status", headerName: "Status", width: 120 },
  ];

  