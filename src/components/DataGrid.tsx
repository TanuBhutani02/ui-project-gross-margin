import React, { useState } from "react";

interface Column<T> {
  key?: any;
  label?: string;
  isSortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode; // Custom render function
  cellClassName?: string;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string; // Message to show when no data is available
}

const DataGrid = <T,>({ columns, data, emptyMessage = "No records found." }: DataGridProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedData, setSortedData] = useState<T[]>(data);

  const sortData = (column: keyof T) => {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...data].sort((a, b) => {
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortColumn(column);
    setSortOrder(newOrder);
    setSortedData(sorted);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden min-h-full">
        <thead>
          <tr className="bg-gray-200 text-gray-900 font-gabarito text-left">
            {columns.map(({ key, label, isSortable }) => (
              <th
                key={String(key)}
                className={`px-6 py-3 ${isSortable ? "cursor-pointer" : ""}`}
                onClick={() => isSortable && sortData(key)}
              >
                {label} {isSortable && "⬍"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row: any, rowIndex) => (
              <tr key={rowIndex} className="border-t font-gabarito text-gray-700 hover:bg-gray-100 transition">
                {columns.map(({ key, render }) => (
                  <td key={String(key)} className="px-6 py-4">
                    {render ? render(row[key], row) : row[key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
