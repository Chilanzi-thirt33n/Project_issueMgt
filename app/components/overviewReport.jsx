"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

// Pagination logic constant
const issuesPerPage = 5;

const OverviewTable = ({ data }) => {
  // Destructure data and provide defaults
  const {
    title = "Overview",
    description = "",
    issues: initialIssues = [],
  } = data || {};

  // Define state for sorting, pagination, and issues
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("");
  const [issues, setIssues] = useState(initialIssues);

  const totalPages = Math.ceil(issues.length / issuesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (field) => {
    const sortedIssues = [...issues].sort((a, b) => {
      if (field === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else {
        return sortOrder === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setActiveSortField(field);
    setIssues(sortedIssues);
  };

  const startIndex = (currentPage - 1) * issuesPerPage;
  const endIndex = startIndex + issuesPerPage;
  const currentIssues = issues.slice(startIndex, endIndex);

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full p-4">
        <table className="w-full table-auto border-collapse space-y-3">
          <thead className="bg-gray-700 text-white rounded-md p-2">
            <tr className="text-left grid grid-cols-6">
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Issue
                {activeSortField === "name" && (
                  <span className="ml-2">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[700px]">
            {issues.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="flex justify-center items-center text-center py-4 text-xl font-bold min-h-[300px]"
                >
                  No issues available
                </td>
              </tr>
            ) : (
              currentIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className="hover:bg-gray-100 cursor-pointer grid grid-cols-6"
                >
                  <td className="px-4 py-2 border-b font-bold">{issue.name}</td>
                  <td className="px-4 py-2 border-b font-bold">{issue.area}</td>
                  <td className="px-4 py-2 border-b">{issue.assigned_to}</td>
                  <td className="px-4 py-2 border-b">{issue.comment}</td>
                  <td
                    className={`px-4 py-2 border-b font-semibold ${
                      issue.isClosed === false
                        ? "text-red-600 bg-red-100"
                        : "text-blue-600 bg-blue-100"
                    }`}
                  >
                    {issue.isClosed === false ? "Open" : "Closed"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <Link
                      href={`/dashboard/IssueManagment/${issue.id}`}
                      className="text-white hover:bg-gray-700 bg-blue-500 py-2 px-8 rounded-md"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
          >
            Next
          </button>
        </div>
      </Card>
    </div>
  );
};

export default OverviewTable;
