"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

// Pagination logic
const issuesPerPage = 5;

const RecentsIssues = () => {
  const [issues, setIssues] = useState([
    {
      name: "testissue",
      issue_id: "76235",
      status: "Open",
      assigned_to: "John Doedit",
      comment: "Needs more info",
      date: "2022-01-01",
    },
    {
      name: "testissue2",
      issue_id: "74239",
      status: "Open",
      assigned_to: "John Doedit",
      comment: "Needs more info",
      date: "2022-01-01",
    },
    {
      name: "testissue3",
      issue_id: "76536",
      status: "Open",
      assigned_to: "John Doedit",
      comment: "Needs more info",
      date: "2022-01-01",
    },
    {
      name: "testissue4",
      issue_id: "75736",
      status: "Open",
      assigned_to: "John Doedit",
      comment: "Needs more info",
      date: "2022-01-01",
    },
    {
      name: "testissue5",
      issue_id: "74670",
      status: "Closed",
      assigned_to: "John Doedit",
      comment: "Resolved",
      date: "2022-01-03",
    },
    {
      name: "testissue6",
      issue_id: "76234",
      status: "Open",
      assigned_to: "John Doedit",
      comment: "Needs more info",
      date: "2022-01-02",
    },
    {
      name: "testissue7",
      issue_id: "76233",
      status: "Closed",
      assigned_to: "John Doedit",
      comment: "Resolved",
      date: "2022-01-03",
    },
  ]);
  // this is sorting and pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("");

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

    // Update the state with the sorted data
    setIssues(sortedIssues);
  };

  const startIndex = (currentPage - 1) * issuesPerPage;
  const endIndex = startIndex + issuesPerPage;
  const currentIssues = issues.slice(startIndex, endIndex);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Recent Issue Activities</h2>
      <Card className="w-full p-4">
        <table className="w-full table-auto border-collapse min-h-[300px] flex flex-col justify-start ">
          <thead className="bg-gray-700 text-white rounded-md p-2">
            <tr className="text-left grid grid-cols-6">
              <th
                className="px-4 py-2 cursor-pointer "
                onClick={() => handleSort("name")}
              >
                Issue
                {activeSortField === "name" && (
                  <span className="ml-2">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="px-4 py-2">Issue ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Comment</th>
              <th
                className="px-4 py-2 cursor-pointer "
                onClick={() => handleSort("date")}
              >
                Date
                {activeSortField === "date" && (
                  <span className="ml-2 text-white">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentIssues.map((issue) => (
              <tr
                key={issue.issue_id}
                className="hover:bg-gray-100 cursor-pointer grid grid-cols-6"
              >
                <td className="px-4 py-2 border-b font-bold">{issue.name}</td>
                <td className="px-4 py-2 border-b">{issue.issue_id}</td>
                <td
                  className={`px-4 py-2 border-b font-semibold ${
                    issue.status === "Open"
                      ? "text-red-600 bg-red-100"
                      : "text-blue-600 bg-blue-100"
                  }`}
                >
                  {issue.status}
                </td>
                <td className="px-4 py-2 border-b">{issue.assigned_to}</td>
                <td className="px-4 py-2 border-b">{issue.comment}</td>
                <td className="px-4 py-2 border-b text-lg font-medium">
                  {issue.date}
                </td>
              </tr>
            ))}
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

export default RecentsIssues;
