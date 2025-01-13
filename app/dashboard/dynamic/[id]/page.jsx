"use client"; // Ensures client-side rendering for hooks like useState and useEffect

import { useState, useEffect } from "react";
import { use } from "react"; // Import the React.use function
import Delete from "../../../components/DeleteIssueButton";
import Update from "../../../components/UpdateIssueButton";

export default function DynamicIssuePage({ params }) {
  // Use React.use to unwrap the params object
  const { id } = use(params); // This unwraps the params Promise

  const [issueData, setIssueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch issue data from an API or database based on issue_id
    const fetchIssueData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/issues/${id}`); // Replace with your actual API route
        if (response.ok) {
          const data = await response.json();
          setIssueData(data); // Set the fetched issue data
        } else {
          console.error("Error fetching issue data");
        }
      } catch (error) {
        console.error("Error fetching issue data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchIssueData(); // Fetch data if the issue_id is available
    }
  }, [id]); // Re-fetch data when issue_id changes

  // Handle updated issue data
  const handleUpdate = (updatedIssue) => {
    setIssueData(updatedIssue); // Directly update the issueData with the updated issue
  };

  // Handle deleted issue
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Issue deleted successfully!");
        // Redirect to another page, e.g., to the issues list
        window.location.href = "/issues"; // Redirect to the issues list page
      } else {
        console.error("Error deleting issue");
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end gap-2">
        <Update issue_id={id} onUpdate={handleUpdate} />
        <Delete issue_id={id} onDelete={handleDelete} />
      </div>
      <h1>Issue Details for ID: {id}</h1>
      {isLoading ? (
        <div className="w-full text-center">Loading issue details...</div>
      ) : issueData ? (
        <div>
          <h2>{issueData.title}</h2>
          <p>{issueData.description}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <div className="w-full text-center">Issue not found.</div>
      )}
    </div>
  );
}
