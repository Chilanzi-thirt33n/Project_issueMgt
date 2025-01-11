"use client";

import { useState } from "react"; // Ensure that useState is imported
import { Card } from "@/components/ui/card";

// Sample issues data (replace this with actual data fetched from a database)
const Issues = [
  {
    name: "testissue",
    issue_id: "76235",
    status: "Open",
    action: "edit",
    comment: "Needs more info",
    date: "2022-01-01",
  },
  {
    name: "testissue2",
    issue_id: "74239",
    status: "Open",
    action: "edit",
    comment: "Needs more info",
    date: "2022-01-01",
  },
  {
    name: "testissue3",
    issue_id: "76536",
    status: "Open",
    action: "edit",
    comment: "Needs more info",
    date: "2022-01-01",
  },
  {
    name: "testissue4",
    issue_id: "75736",
    status: "Open",
    action: "edit",
    comment: "Needs more info",
    date: "2022-01-01",
  },
  {
    name: "testissue5",
    issue_id: "74670",
    status: "Open",
    action: "edit",
    comment: "Needs more info",
    date: "2022-01-03",
  },
  {
    name: "testissue6",
    issue_id: "76234",
    status: "Open",
    action: "edit",
    comment: "Needs more info",
    date: "2022-01-02",
  },
  {
    name: "testissue7",
    issue_id: "76233",
    status: "Open",
    action: "edit",
    comment: "Needs more info",
    date: "2022-01-03",
  },
];

// Pagination logic: we will display 5 issues per page
const issuesPerPage = 5;
const totalPages = Math.ceil(Issues.length / issuesPerPage);

const RecentsIssues = () => {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * issuesPerPage;
  const endIndex = startIndex + issuesPerPage;
  const currentIssues = Issues.slice(startIndex, endIndex);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Recent Issue Activities</h2>
      <Card className="w-full p-4">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-700 text-white rounded-md p-4">
            <tr className="text-left grid grid-cols-6 ">
              <th className="px-4 py-2 text-left">Issue</th>
              <th className="px-4 py-2 text-left">Issue ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Render issues for the current page */}
            {currentIssues.map((issue) => (
              <tr
                key={issue.issue_id}
                className="hover:bg-gray-100 cursor-pointer grid grid-cols-6"
              >
                <td className="px-4 py-2 border-b">{issue.name}</td>
                <td className="px-4 py-2 border-b">{issue.issue_id}</td>
                <td className="px-4 py-2 border-b">{issue.status}</td>
                <td className="px-4 py-2 border-b">{issue.action}</td>
                <td className="px-4 py-2 border-b">{issue.comment}</td>
                <td className="px-4 py-2 border-b">{issue.date}</td>
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
