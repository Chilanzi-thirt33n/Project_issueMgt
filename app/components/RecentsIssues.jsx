"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

// Pagination logic
const issuesPerPage = 5;

const RecentsIssues = () => {
  const [issues, setIssues] = useState([
    {
      issue: "Conveyor Belt Tear - Line 03 5567-BELT-CV03",
      id: "76235",
      status: "YTS",
      assigned_to: "Maintenance",
      comment: "The belt has a major tear near the loading zone.",
      created_at: "2022-01-01",
    },
    {
      issue: "Drill Head Overheating - Unit 4782-DRL-HD02",
      id: "74239",
      status: "closed",
      assigned_to: "Drilling",
      comment: "Drill head overheating during operations. Resolved.",
      created_at: "2022-01-01",
    },
    {
      issue: "Hydraulic Leak - Excavator 8821-HYD-EX01",
      id: "76536",
      status: "ongoing",
      assigned_to: "Hydraulics",
      comment: "Hydraulic fluid leaking from the main cylinder.",
      created_at: "2022-01-01",
    },
    {
      issue: "Control Panel Fault - Crusher 2234-CTRL-CS01",
      id: "75736",
      status: "YTS",
      assigned_to: "Electrical",
      comment: "Crusher control panel unresponsive.",
      created_at: "2022-01-01",
    },
    {
      issue: "Sensor Failure - Loader 6651-SENS-LD02",
      id: "74670",
      status: "YTS",
      assigned_to: "Sensors",
      comment: "Proximity sensor not detecting objects.",
      created_at: "2022-01-03",
    },
    {
      issue: "Track Misalignment - Dozer 8822-TRCK-DZ01",
      id: "76234",
      status: "YTS",
      assigned_to: "Maintenance",
      comment: "Tracks are misaligned, affecting movement.",
      created_at: "2022-01-02",
    },
    {
      issue: "Cabin Display Error - Haul Truck 3321-DISP-HT01",
      id: "76233",
      status: "ongoing",
      assigned_to: "Electrical",
      comment: "Cabin display showing incorrect readings.",
      created_at: "2022-01-03",
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
        // Handle sorting by date, as before
        return sortOrder === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else if (field === "name") {
        // Ensure the issue.name is being accessed properly
        const nameA = a.issue || ""; // Access 'issue.issue' field for name
        const nameB = b.issue || ""; // Access 'issue.issue' field for name
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        // Handle other fields that are not "date" or "name"
        const valueA = a[field] || ""; // Fallback to "" in case of null or undefined
        const valueB = b[field] || ""; // Fallback to "" in case of null or undefined
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setActiveSortField(field);
    setIssues(sortedIssues); // Update the sorted issues
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
                key={issue.id}
                className="hover:bg-gray-100 cursor-pointer grid grid-cols-6"
              >
                <td className="px-4 py-2 border-b font-bold text-sm">
                  {issue.issue}
                </td>
                <td className="px-4 py-2 border-b">{issue.id}</td>
                <td
                  className={`px-4 py-2 border-b font-semibold text-sm ${
                    issue.status === "YTS"
                      ? "text-blue-800 bg-blue-200"
                      : issue.status === "ongoing"
                        ? "text-green-800 bg-green-200"
                        : "text-gray-700 bg-gray-300"
                  }`}
                >
                  {issue.status === "YTS"
                    ? "Yet to Start"
                    : issue.status === "ongoing"
                      ? "Ongoing"
                      : "Closed"}
                </td>
                <td className="px-4 py-2 border-b text-sm">
                  {issue.assigned_to}
                </td>
                <td className="px-4 py-2 border-b text-sm">{issue.comment}</td>
                <td className="px-4 py-2 border-b text-sm font-medium">
                  {issue.created_at}
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
