"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Pagination logic
const issuesPerPage = 6;

const AddedIssues = () => {
  // Initial issues state with only open issues
  const [issues, setIssues] = useState([
    // your issues data here
    {
      name: "Faulty Blaster in Dashboard",
      id: "76235",
      assigned_to: "Chishimba Mwamba",
      comment:
        "The blaster element on the dashboard is not rendering correctly.",
      date: "2022-01-01",
      progress: 20,
      isClosed: false,
    },
    {
      name: "Inconsistent Water Quality Sensor Data",
      id: "76236",
      assigned_to: "Kalenga Banda",
      comment: "Water quality sensors are providing inconsistent readings.",
      date: "2022-01-05",
      progress: 50,
      isClosed: false,
    },
    {
      name: "Incorrect Work Order Assignments",
      id: "76237",
      assigned_to: "Lillian Phiri",
      comment: "Work orders are being assigned incorrectly to team members.",
      date: "2022-02-01",
      progress: 90,
      isClosed: false,
    },
    {
      name: "UI Layout for Work Order Page Needs Improvement",
      id: "76238",
      assigned_to: "Chanda Zulu",
      comment:
        "The layout for the work order page is confusing, needs better structure.",
      date: "2022-02-10",
      progress: 100,
      isClosed: true,
    },
    {
      name: "Issue with Dashboard Data Fetching",
      id: "76239",
      assigned_to: "Tawanda Mwansa",
      comment: "Data fetching from the backend is slow and inconsistent.",
      date: "2022-02-20",
      progress: 35,
      isClosed: false,
    },
    {
      name: "Maintenance Tips Card Doesn't Display Correct Information",
      id: "76240",
      assigned_to: "Patricia Mulenga",
      comment:
        "The maintenance tips card on the dashboard isn't showing updated tips.",
      date: "2022-03-01",
      progress: 60,
      isClosed: false,
    },
    {
      name: "Worker Profile Cards not Rendering Properly",
      id: "76241",
      assigned_to: "Joseph Mumba",
      comment:
        "Worker profile cards are not displaying role and status correctly.",
      date: "2022-03-15",
      progress: 80,
      isClosed: false,
    },
    {
      name: "Alerts and Notifications Not Triggering",
      id: "76242",
      assigned_to: "Sarah Kambole",
      comment: "System alerts and notifications aren't being sent as expected.",
      date: "2022-04-01",
      progress: 25,
      isClosed: false,
    },
    {
      name: "Maintenance Dashboard Data Lag",
      id: "76243",
      assigned_to: "Aaron Sikazwe",
      comment:
        "There is a lag in displaying real-time data on the maintenance dashboard.",
      date: "2022-04-05",
      progress: 30,
      isClosed: false,
    },
    {
      name: "Slow Response on Issue Updates",
      id: "76244",
      assigned_to: "Sampa Mulenga",
      comment: "Updates to issues are not reflected promptly on the dashboard.",
      date: "2022-04-10",
      progress: 15,
      isClosed: "Open",
    },
    {
      name: "Access Control for Work Orders Not Working",
      id: "76245",
      assigned_to: "Martin Chanda",
      comment:
        "Access control settings for work orders are not functioning as expected.",
      date: "2022-04-12",
      progress: 40,
      isClosed: false,
    },
    {
      name: "CCTV Integration Not Showing Feed",
      id: "76246",
      assigned_to: "Eunice Ndlovu",
      comment:
        "CCTV feed for maintenance monitoring is not visible on the dashboard.",
      date: "2022-04-14",
      progress: 70,
      isClosed: false,
    },
    {
      name: "Delayed Work Order Notifications",
      id: "76247",
      assigned_to: "Peter Kanyama",
      comment: "Work order notifications are delayed, leading to missed tasks.",
      date: "2022-04-16",
      progress: 10,
      isClosed: false,
    },
    {
      name: "Work Order Search Not Filtering Results",
      id: "76248",
      assigned_to: "Chisomo Lungu",
      comment:
        "Search function for work orders is not filtering results correctly.",
      date: "2022-04-18",
      progress: 50,
      isClosed: false,
    },
    {
      name: "Water Quality Indicator Data Not Updating",
      id: "76249",
      assigned_to: "Maria Chabala",
      comment: "Water quality indicators aren't updating as they should.",
      date: "2022-04-20",
      progress: 20,
      isClosed: false,
    },
    {
      name: "UI Glitches in Work Order Page",
      id: "76250",
      assigned_to: "Emmanuel Kunda",
      comment:
        "There are UI glitches in the Work Order page causing confusion.",
      date: "2022-04-22",
      progress: 60,
      isClosed: false,
    },
  ]);

  // Pagination logic
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
    <div className="w-full h-full">
      <Card className="w-full h-full p-4">
        <table className="w-full table-auto border-collapse space-y-3">
          <thead className="bg-gray-700 text-white rounded-md p-2">
            <tr className="text-left grid grid-cols-8">
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
              <th className="px-4 py-2">Issue ID</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto flex flex-col items-center justify-center max-h-[700px]">
            {issues.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="flex justify-center items-center text-center py-4 text-xl font-bold min-h-[700px]"
                >
                  No issues available
                </td>
              </tr>
            ) : (
              currentIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className="hover:bg-gray-100 cursor-pointer grid grid-cols-8"
                >
                  <td className="px-4 py-2 border-b font-bold">{issue.name}</td>
                  <td className="px-4 py-2 border-b">{issue.id}</td>
                  <td className="px-4 py-2 border-b">{issue.assigned_to}</td>
                  <td className="px-4 py-2 border-b">{issue.comment}</td>
                  <td className="px-4 py-2 border-b">{issue.date}</td>
                  <td className="px-4 py-2 border-b ">
                    <h3 className="text-sm font-bold text-end">
                      {issue.progress}%
                    </h3>
                    <div className="w-full bg-gray-200 rounded-full ">
                      <div
                        className="h-6 bg-green-500 rounded-full"
                        style={{ width: `${issue.progress}%` }}
                      ></div>
                    </div>
                  </td>
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
                      href={`/dashboard/dynamic/${issue.id}`}
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

export default AddedIssues;
