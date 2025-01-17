"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  // initial data this will be changed to empty after presentation but update it to fetch that will com after this
  const [issues, setIssues] = useState([
    {
      name: "Conveyor Belt Tear - Line 03 5567-BELT-CV03",
      id: "76235",
      assigned_to: "Maintenance", // Changed to department
      comment: "The belt has a major tear near the loading zone.",
      date: "2022-01-01",
      progress: 20,
      status: "YTS",
    },
    {
      name: "Drill Head Overheating - Unit 4782-DRL-HD02",
      id: "76236",
      assigned_to: "Drilling", // Changed to department
      comment: "Drill head is overheating during operation.",
      date: "2022-01-05",
      progress: 50,
      status: "ongoing",
    },
    {
      name: "Hydraulic Leak - Excavator 8821-HYD-EX01",
      id: "76237",
      assigned_to: "Hydraulics", // Changed to department
      comment: "Hydraulic fluid leaking from main cylinder.",
      date: "2022-02-01",
      progress: 90,
      status: "YTS",
    },
    {
      name: "Control Panel Fault - Crusher 2234-CTRL-CS01",
      id: "76238",
      assigned_to: "Electrical", // Changed to department
      comment: "Crusher control panel unresponsive.",
      date: "2022-02-10",
      progress: 100,
      status: "closed",
    },
    {
      name: "Sensor Failure - Loader 6651-SENS-LD02",
      id: "76239",
      assigned_to: "Sensors", // Changed to department
      comment: "Proximity sensor not detecting objects.",
      date: "2022-02-20",
      progress: 35,
      status: "YTS",
    },
    {
      name: "Track Misalignment - Dozer 8822-TRCK-DZ01",
      id: "76240",
      assigned_to: "Maintenance", // Changed to department
      comment: "Tracks are misaligned, affecting movement.",
      date: "2022-03-01",
      progress: 60,
      status: "ongoing",
    },
    {
      name: "Cabin Display Error - Haul Truck 3321-DISP-HT01",
      id: "76241",
      assigned_to: "Electrical", // Changed to department
      comment: "Cabin display showing incorrect readings.",
      date: "2022-03-15",
      progress: 80,
      status: "ongoing",
    },
    {
      name: "Air Compressor Failure - Drill 5563-COMP-DR03",
      id: "76242",
      assigned_to: "Drilling", // Changed to department
      comment: "Air compressor not generating enough pressure.",
      date: "2022-04-01",
      progress: 25,
      status: "YTS",
    },
    {
      name: "Engine Lag - Dump Truck 7742-ENG-DT02",
      id: "76243",
      assigned_to: "Engines", // Changed to department
      comment: "Engine response delayed during acceleration.",
      date: "2022-04-05",
      progress: 30,
      status: "YTS",
    },
    {
      name: "Brake System Fault - Grader 6654-BRK-GR02",
      id: "76244",
      assigned_to: "Brakes", // Changed to department
      comment: "Brakes not engaging properly on slopes.",
      date: "2022-04-10",
      progress: 15,
      status: "YTS",
    },
    {
      name: "Electrical Short - Shovel 4432-ELC-SH01",
      id: "76245",
      assigned_to: "Electrical", // Changed to department
      comment: "Electrical short causing operational issues.",
      date: "2022-04-12",
      progress: 40,
      status: "YTS",
    },
    {
      name: "Bucket Damage - Loader 2231-BCK-LD01",
      id: "76246",
      assigned_to: "Maintenance", // Changed to department
      comment: "Bucket edges worn out, needs repair.",
      date: "2022-04-14",
      progress: 70,
      status: "ongoing",
    },
    {
      name: "Overheating - Generator 8812-OVHT-GN01",
      id: "76247",
      assigned_to: "Engines", // Changed to department
      comment: "Generator overheating under load.",
      date: "2022-04-16",
      progress: 10,
      status: "YTS",
    },
    {
      name: "Alignment Issue - Conveyor 3344-ALIGN-CV02",
      id: "76248",
      assigned_to: "Maintenance", // Changed to department
      comment: "Belt misaligned causing material spillage.",
      date: "2022-04-18",
      progress: 50,
      status: "ongoing",
    },
    {
      name: "Pump Malfunction - Dewatering Unit 4493-PMP-DW01",
      id: "76249",
      assigned_to: "Pumps", // Changed to department
      comment: "Pump not operating at full capacity.",
      date: "2022-04-20",
      progress: 20,
      status: "YTS",
    },
    {
      name: "Gearbox Noise - Drill Rig 6654-GBOX-DR02",
      id: "76250",
      assigned_to: "Drilling", // Changed to department
      comment: "Unusual noise from gearbox during operation.",
      date: "2022-04-22",
      progress: 60,
      status: "ongoing",
    },
  ]);
  //this is the fetch function should follow the above the layout of the object
  const fetchIssuesFromAPI = async () => {
    try {
      const response = await fetch("https://your-api-endpoint.com/issues"); //place you end poimt url here
      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }
      const data = await response.json();
      setIssues(data); // Assuming the API returns issues in the same structure
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };
  // this is so that it retrievs data immediatly the component is mounted
  useEffect(() => {
    fetchIssuesFromAPI();
  }, []);

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

export default AddedIssues;
