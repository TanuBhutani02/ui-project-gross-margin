import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataGridComponentProps {
  columns: any[];
  rows: any[];
  getGridProps?: any;
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  columns,
  rows,
  getGridProps
}) => {

  console.log("final columns", columns);
  return (

    <DataGrid
      rows={rows}
      columns={columns}

      // Slots configuration to disable unwanted UI elements

      // sx={{
      //   "& .MuiDataGrid-virtualScroller": {
      //     overflowY: "auto",
      //   },
      //   "& .MuiDataGrid-cell": {
      //     border: "1px solid #d1d5db",
      //   },
      //   "& .soft-green": {
      //     backgroundColor: "#e6f7e6",
      //   },

      //   // Hide any auto-generated columns
      //   "& .MuiDataGrid-columnHeader--sortable": {
      //     display: "block",
      //   },

      //   // Try targeting specific problem columns
      //   "& .MuiDataGrid-iconButtonContainer": {
      //     display: "none",
      //   },
      //   "& .MuiDataGrid-columnSeparator": {
      //     display: "none",
      //   },
      // }}

      rowHeight={40}
      disableColumnMenu
      pageSizeOptions={[100]}
      hideFooter
      scrollbarSize={30}
      disableRowSelectionOnClick
      checkboxSelection={false}

      // Additional options to try
      disableVirtualization={false}


      {...(getGridProps || {})}
    />

  );
};

export default DataGridComponent;