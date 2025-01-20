import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "../../lib/supabaseClient"; // Adjust the import according to your project structure

const dataPerPage = 5;

const OverviewTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSortField, setActiveSortField] = useState("");
  const [sortedData, setSortedData] = useState([]);

  // Fetch data from Supabase when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("issues") // Replace with your table name
        .select("*")
        .eq("status", "Closed"); // Filter for issues with status "Closed"

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setData(data);
      setSortedData(data);
    };

    fetchData();
  }, []);

  // Total pages calculation
  const totalPages = Math.ceil(sortedData.length / dataPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    const newSortedData = [...sortedData].sort((a, b) => {
      if (field === "date") {
        return sortOrder === "asc"
          ? new Date(a.updated_at) - new Date(b.updated_at)
          : new Date(b.updated_at) - new Date(a.updated_at);
      } else if (field === "issue") {
        const issueA = a.issue || "";
        const issueB = b.issue || "";
        return sortOrder === "asc"
          ? issueA.localeCompare(issueB)
          : issueB.localeCompare(issueA);
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
    setSortedData(newSortedData);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full p-4">
        <table className="w-full table-auto border-collapse space-y-3">
          <thead className="bg-gray-700 text-white rounded-md p-2">
            <tr className="text-left grid grid-cols-7">
              <th
                className="px-4 py-2 cursor-pointer text-sm"
                onClick={() => handleSort("issue")}
              >
                Issue
                {activeSortField === "issue" && (
                  <span className="ml-2">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="px-4 py-2">Area</th>
              <th className="px-4 py-2">Phase</th>
              <th className="px-4 py-2">Section</th>
              <th className="px-4 py-2">Status</th>
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
              <th className="px-4 py-2">Comment</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[700px] text-xs">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="flex justify-center items-center text-center py-4 text-xl font-bold min-h-[300px]"
                >
                  No issues available
                </td>
              </tr>
            ) : (
              currentData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 cursor-pointer grid grid-cols-7"
                >
                  <td className="px-4 py-2 border-b font-bold text-sm">
                    {item.issue || "No Issue"}
                  </td>
                  <td className="px-4 py-2 border-b">{item.area}</td>
                  <td className="px-4 py-2 border-b">{item.phase}</td>
                  <td className="px-4 py-2 border-b">{item.section}</td>
                  <td
                    className={`px-4 py-2 border-b font-semibold text-xs ${
                      item.status === "YTS"
                        ? "text-blue-800 bg-blue-200"
                        : item.status === "Ongoing"
                          ? "text-green-800 bg-green-200"
                          : "text-gray-700 bg-gray-300"
                    }`}
                  >
                    {item.status === "YTS"
                      ? "Yet to Start"
                      : item.status === "Ongoing"
                        ? "Ongoing"
                        : "Closed"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(item.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">{item.comment}</td>
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
