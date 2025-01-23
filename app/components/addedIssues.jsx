import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "../../lib/supabaseClient"; // Make sure to correctly set up supabaseClient
import Link from "next/link";
import UpdateButton from "../components/UpdateIssueButton";

const issuesPerPage = 6;

const AddedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("");

  // Fetch issues from Supabase
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data, error } = await supabase
          .from("issues")
          .select("*")
          .in("status", ["YTS", "Ongoing"]); // Fetch initial issues

        if (error) throw error;
        setIssues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchInitialData();

    // Subscribe to real-time updates from Supabase
    const subscription = supabase
      .channel("realtime:issues")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for any changes (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "issues",
        },
        (payload) => {
          console.log("Real-time update:", payload);
          handleRealTimeUpdate(payload);
        },
      )
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Handle real-time updates
  const handleRealTimeUpdate = (payload) => {
    const { eventType, new: newIssue, old: oldIssue } = payload;

    // Check if newIssue has necessary fields before updating
    if (newIssue && newIssue.id) {
      console.log("New Issue on Update:", newIssue);

      switch (eventType) {
        case "INSERT":
          setIssues((prev) =>
            Array.isArray(prev) ? [...prev, newIssue] : [newIssue],
          );
          break;
        case "UPDATE":
          setIssues(
            (prev) =>
              Array.isArray(prev)
                ? prev.map((issue) =>
                    issue.id === newIssue.id
                      ? { ...issue, ...newIssue }
                      : issue,
                  )
                : [newIssue], // In case the prev state is not an array
          );
          break;
        case "DELETE":
          setIssues((prev) =>
            Array.isArray(prev)
              ? prev.filter((issue) => issue.id !== oldIssue.id)
              : [],
          );
          break;
        default:
          console.warn("Unhandled real-time event:", payload);
      }
    } else {
      console.warn("Invalid update data:", payload); // Warn if newIssue does not have valid data
    }
  };

  // Handle update of issue data manually
  const handleUpdate = (updatedIssue) => {
    setIssues(
      (prev) =>
        Array.isArray(prev)
          ? prev.map((issue) =>
              issue.id === updatedIssue.id
                ? { ...issue, ...updatedIssue }
                : issue,
            )
          : [updatedIssue], // In case prev is not an array
    );
  };

  // Handle sorting of issues
  const handleSort = (field) => {
    const sortedIssues = [...issues].sort((a, b) => {
      if (field === "date") {
        return sortOrder === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else if (field === "name") {
        const nameA = a.issue || "";
        const nameB = b.issue || "";
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        const valueA = a[field] || "";
        const valueB = b[field] || "";
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setActiveSortField(field);
    setIssues(sortedIssues);
  };

  // Handle pagination
  const startIndex = (currentPage - 1) * issuesPerPage;
  const endIndex = startIndex + issuesPerPage;
  const currentIssues = issues.slice(startIndex, endIndex);
  const totalPages = Math.ceil(issues.length / issuesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full p-4">
        <table className="w-full table-auto border-collapse space-y-3">
          <thead className="bg-gray-700 text-white rounded-md p-2">
            <tr className="text-left grid grid-cols-8">
              <th
                className="px-4 py-2 text-sm cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Issue
                {activeSortField === "name" && (
                  <span className="ml-2">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="px-4 py-2 text-sm">Issue ID</th>
              <th className="px-4 py-2 text-sm">Assigned To</th>
              <th className="px-4 py-2 text-sm">Comment</th>
              <th
                className="px-4 py-2 cursor-pointer text-sm"
                onClick={() => handleSort("date")}
              >
                Date
                {activeSortField === "date" && (
                  <span className="ml-2 text-white">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="px-4 py-2 text-sm">Progress</th>
              <th className="px-4 py-2 text-sm">Status</th>
              <th className="px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto flex flex-col items-center justify-center max-h-[700px]">
            {issues.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="flex justify-center items-center text-center py-4 text-sm font-bold min-h-[300px] text-gray-500"
                >
                  No issues available
                </td>
              </tr>
            ) : (
              currentIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className="w-full hover:bg-gray-100 cursor-pointer grid grid-cols-8 text-xs justify-evenly"
                >
                  <td className="px-4 py-2 border-b font-bold text-xs">
                    {issue.issue}
                  </td>
                  <td className="px-4 py-2 border-b text-xm">{issue.id}</td>
                  <td className="px-4 py-2 border-b text-xm">
                    {issue.assigned_to}
                  </td>
                  <td className="px-4 py-2 border-b text-xm">
                    {issue.comment}
                  </td>
                  <td className="px-4 py-2 border-b text-xm">
                    {new Date(issue.created_at).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 py-2 border-b text-xm">
                    <h3 className="text-xm font-bold text-end">
                      {issue.progress}%
                    </h3>
                    <div className="w-full bg-gray-200 rounded-full">
                      <div
                        className={`h-6 rounded-full ${
                          issue.progress <= 50
                            ? "bg-red-500"
                            : issue.progress <= 75
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${issue.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td
                    className={`px-4 py-2 border-b font-semibold text-xm ${
                      issue.status === "YTS"
                        ? "text-blue-800 bg-blue-200"
                        : issue.status === "Ongoing"
                          ? "text-green-800 bg-green-200"
                          : "text-gray-700 bg-gray-300"
                    }`}
                  >
                    {issue.status === "YTS"
                      ? "Yet to Start"
                      : issue.status === "Ongoing"
                        ? "Ongoing"
                        : "Closed"}
                  </td>
                  <td className="px-4 py-2 border-b text-xm flex flex-col gap-2">
                    <UpdateButton issue_id={issue.id} onUpdate={handleUpdate} />
                    <Link
                      className="text-white bg-green-500 px-8 py-2 text-sm text-center rounded-md hover:bg-gray-700"
                      href={`/dashboard/IssueManagment/${issue.id}`}
                    >
                      View issue
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddedIssues;
