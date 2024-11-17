import React, { useState } from "react";

interface TableProps<T> {
  data: T[]; 
  columns: Array<{ label: string; accessor: keyof T }>;
  renderActions?: (row: T) => React.ReactNode;
  itemsPerPage?: number; 
  onPageChange?: (page: number) => void; 
}

const Table = <T extends {}>({
  data,
  columns,
  renderActions,
  itemsPerPage = 10,
  onPageChange,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  return (
    <section className="w-full dark:bg-dark-bg pt-4 px-3 flex justify-center">
      <div className="w-full md:w-[80%] rounded-xl bg-white dark:bg-neutral-800 shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 dark:border-neutral-700 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-neutral-700 rounded-tl-lg">
                {columns.map((col, index) => (
                  <th key={index} className="py-2 px-4 border-b dark:border-neutral-600 dark:text-neutral-300">
                    {col.label}
                  </th>
                ))}
                {renderActions && <th className="py-2 px-4 border-b dark:border-neutral-600 dark:text-neutral-300">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg">
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="py-2 px-4 dark:text-neutral-300 text-center">
                        {(row[col.accessor] ?? "-") as React.ReactNode}
                      </td>
                      // {typeof row[col.accessor] === 'string' && 
                      //   row[col.accessor].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
                      //   ? formatDate(row[col.accessor] as string) 
                      //   : (row[col.accessor] ?? "-") as React.ReactNode 
                      // }
                    ))}
                    {renderActions && (
                      <td className="py-2 px-4 text-syncworks-blue text-center cursor-pointer">
                        {renderActions(row)}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (renderActions ? 1 : 0)} className="text-center py-4 text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Rows per page: {itemsPerPage}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-md dark:bg-neutral-700 dark:text-neutral-400 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {totalPages > 0 ? `${currentPage} of ${totalPages}` : "0 of 0"}
            </span>
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-md dark:bg-neutral-700 dark:text-neutral-400 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
