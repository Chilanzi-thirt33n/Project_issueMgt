"use client"; // Ensures client-side rendering for hooks like useState and useEffect

import { useState, useEffect, Suspense } from "react";
import { use } from "react"; // Import the React.use function
import Delete from "../../../components/DeleteIssueButton";
import Update from "../../../components/UpdateIssueButton";
import Specification from "../../../components/SpecificationCard";
import { redirect } from "next/navigation";
import Details from "../../../components/IssueDetails";

//hard coded static variables
const classificationData = [
  { label: "Class One", value: " Injury or incident" },
  { label: "Class Two", value: " Plant downtime" },
  { label: "Class Three", value: "Reduced operational performance" },
  { label: "Class Four", value: " Reduced throughput" },
];

const priorityData = [
  { label: "Priority One", value: "Safety and Production Stopper" },
  { label: "Priority Two", value: "Can be fixed in 24 hrs" },
  { label: "Priority Three", value: "Can be fixed next week " },
  { label: "Priority Four", value: "Can be fixed during next shutdown" },
];

export default function DynamicIssuePage({ params }) {
  // Use React.use to unwrap the params object
  const { id } = use(params); // This unwraps the params Promise

  const [issueData, setIssueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        redirect("/dashboard/IssueManagement"); // Redirect to the issues list page
      } else {
        console.error("Error deleting issue");
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

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

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <Update issue_id={id} onUpdate={handleUpdate} />
        <Delete issue_id={id} onDelete={handleDelete} />
      </div>
      <h1 className="text-l">
        Issue Details for ID:<b className="text-blue-600"> {id}</b>
      </h1>
      <div className="grid grid-cols-4 gap-4 ">
        <Details data={issueData} />
        <div className="grid grid-cols-1 gap-2">
          <Specification
            items={classificationData}
            title="Classification"
            description="Has the Issue/Risk caused or has the potential to cause:"
          />

          <Specification
            items={priorityData}
            title="Priority"
            description="meaning of each Priority level."
          />
        </div>
      </div>
    </div>
  );
}
