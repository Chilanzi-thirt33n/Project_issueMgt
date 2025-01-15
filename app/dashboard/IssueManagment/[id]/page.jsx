"use client"; // Ensures client-side rendering

import { useState, useEffect, use } from "react";
import { redirect } from "next/navigation";
import Delete from "../../../components/DeleteIssueButton";
import Update from "../../../components/UpdateIssueButton";
import Specification from "../../../components/SpecificationCard";
import Details from "../../../components/IssueDetails";

// Static classification and priority data
const classificationData = [
  { label: "Class One", value: "Injury or incident" },
  { label: "Class Two", value: "Plant downtime" },
  { label: "Class Three", value: "Reduced operational performance" },
  { label: "Class Four", value: "Reduced throughput" },
];

const priorityData = [
  { label: "Priority One", value: "Safety and Production Stopper" },
  { label: "Priority Two", value: "Can be fixed in 24 hrs" },
  { label: "Priority Three", value: "Can be fixed next week" },
  { label: "Priority Four", value: "Can be fixed during next shutdown" },
];

export default function DynamicIssuePage({ params }) {
  const { id } = use(params); // Unwrap the Promise returned by `params`

  const [issueData, setIssueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch issue data when the component loads or when `id` changes
  useEffect(() => {
    const fetchIssueData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/issues/${id}`, {
          cache: "no-store", // Prevent caching for dynamic updates
        });
        if (response.ok) {
          const data = await response.json();
          setIssueData(data);
        } else {
          console.error("Error fetching issue data");
        }
      } catch (error) {
        console.error("Error fetching issue data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchIssueData(); // Fetch data if an ID is available
  }, [id]);

  // Handle update of issue data
  const handleUpdate = (updatedIssue) => {
    setIssueData(updatedIssue); // Update state with the updated issue data
  };

  // Handle deletion of issue data
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Issue deleted successfully!");
        redirect("/dashboard/IssueManagement"); // Redirect after deletion
      } else {
        console.error("Error deleting issue");
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <Update issue_id={id} onUpdate={handleUpdate} />
        <Delete issue_id={id} onDelete={handleDelete} />
      </div>
      <h1 className="text-l">
        Issue Details for ID: <b className="text-blue-600">{id}</b>
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {isLoading ? (
          <div>Loading issue details...</div>
        ) : (
          <Details data={issueData} />
        )}
        <div className="grid grid-cols-1 gap-2">
          <Specification
            items={classificationData}
            title="Classification"
            description="Has the Issue/Risk caused or has the potential to cause:"
          />
          <Specification
            items={priorityData}
            title="Priority"
            description="Meaning of each Priority level."
          />
        </div>
      </div>
    </div>
  );
}
