import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "../../lib/supabaseClient"; // Import your Supabase client for my personala testing add we can use  if we need to present
// import axios from "axios"; // this is axio for end points comment it out and comment the abave when you link to tech valleys db
import Link from "next/link";

const issuesPerPage = 6;

const AddedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("");

  // Fetch issues from Supabase
  //this is what you should comment out to put tech valleys end point
  /*
    const fetchIssuesFromAPI = async () => {
      try {
        // Replace with your Supabase API endpoint and authorization key
        const response = await axios.get("https://your-supabase-api-endpoint/issues", {
          headers: {
            apiKey: "your-supabase-api-key", // Replace with your Supabase API key
            Authorization: `Bearer your-supabase-auth-token`, // Replace with your Bearer token if needed
          },
        });

        const data = response.data;
        console.log("Fetched Data:", data); // Log fetched data for verification
        setIssues(data); // Update the `issues` state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message
      }
    };
    */

  //this is for my supabase comment this section when you link to tech vally db
  const fetchIssuesFromAPI = async () => {
    try {
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from("issues") // Replace 'issues' with your table name
        .select("*"); // Fetch all columns (you can customize columns if needed)

      if (error) throw error;

      console.log("Fetched Data:", data); // Log fetched data for verification
      setIssues(data); // Update the `issues` state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set error message
    }
  };

  useEffect(() => {
    // Fetch data immediately
    fetchIssuesFromAPI();

    // Set an interval to fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchIssuesFromAPI();
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this will only run once when the component mounts will need to add web socket feature for live data

  // Sort function
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
                  className="flex justify-center items-center text-center py-4 text-xl font-bold min-h-[300px] text-gray-500"
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
                  <td className="px-4 py-2 border-b font-bold text-sm">
                    {issue.issue}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">{issue.id}</td>
                  <td className="px-4 py-2 border-b text-sm">
                    {issue.assigned_to}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    {issue.comment}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    {issue.created_at}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    <h3 className="text-sm font-bold text-end ">
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
                    className={`px-4 py-2 border-b font-semibold text-sm ${
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
                  <td className="px-4 py-2 border-b text-sm">
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
