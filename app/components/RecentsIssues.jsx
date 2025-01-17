"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

// Pagination logic
const issuesPerPage = 5;

const RecentsIssues = () => {
  const [issues, setIssues] = useState([
    {
      name: "Conveyor Belt Tear - Line 03 5567-BELT-CV03",
      id: "76235",
      status: "YTS",
      assigned_to: "Maintenance",
      comment: "The belt has a major tear near the loading zone.",
      date: "2022-01-01",
    },
    {
      name: "Drill Head Overheating - Unit 4782-DRL-HD02",
      id: "74239",
      status: "closed",
      assigned_to: "Drilling",
      comment: "Drill head overheating during operations. Resolved.",
      date: "2022-01-01",
    },
    {
      name: "Hydraulic Leak - Excavator 8821-HYD-EX01",
      id: "76536",
      status: "ongoing",
      assigned_to: "Hydraulics",
      comment: "Hydraulic fluid leaking from the main cylinder.",
      date: "2022-01-01",
    },
    {
      name: "Control Panel Fault - Crusher 2234-CTRL-CS01",
      id: "75736",
      status: "YTS",
      assigned_to: "Electrical",
      comment: "Crusher control panel unresponsive.",
      date: "2022-01-01",
    },
    {
      name: "Sensor Failure - Loader 6651-SENS-LD02",
      id: "74670",
      status: "YTS",
      assigned_to: "Sensors",
      comment: "Proximity sensor not detecting objects.",
      date: "2022-01-03",
    },
    {
      name: "Track Misalignment - Dozer 8822-TRCK-DZ01",
      id: "76234",
      status: "YTS",
      assigned_to: "Maintenance",
      comment: "Tracks are misaligned, affecting movement.",
      date: "2022-01-02",
    },
    {
      name: "Cabin Display Error - Haul Truck 3321-DISP-HT01",
      id: "76233",
      status: "ongoing",
      assigned_to: "Electrical",
      comment: "Cabin display showing incorrect readings.",
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
                key={issue.id}
                className="hover:bg-gray-100 cursor-pointer grid grid-cols-6"
              >
                <td className="px-4 py-2 border-b font-bold">{issue.name}</td>
                <td className="px-4 py-2 border-b">{issue.id}</td>
                <td
                  className={`px-4 py-2 border-b font-semibold ${
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
