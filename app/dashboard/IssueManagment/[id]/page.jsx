"use client"; // Ensures client-side rendering

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Delete from "../../../components/DeleteIssueButton";
import Update from "../../../components/UpdateIssueButton";
import Specification from "../../../components/SpecificationCard";
import Details from "../../../components/IssueDetails";
import { supabase } from "../../../../lib/supabaseClient"; // Import your Supabase client for my personala testing add we can use  if we need to present
// import axios from "axios"; // this is axio for end points comment it out and comment the abave when you link to tech valleys db

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
  const router = useRouter();
  // Fetch issue data when the component loads or when `id` changes

  // this id where you should pu tech valley db
  /*
  // Fetch issue data when the component loads or when `id` changes
  useEffect(() => {
    const fetchIssueData = async () => {
      setIsLoading(true); // Start loading state
      try {
        // Make a GET request to your API endpoint with Axios
        const response = await axios.get(`/api/issues`, {
          params: { id }, // Pass the `id` as a query parameter
        });

        if (response.status === 200) {
          console.log("Fetched Data:", response.data); // For debugging
          setIssueData(response.data[0]); // Assuming the response is an array and you need the first item
        } else {
          console.error("Error fetching issue data: Unexpected response status");
          setError("Unexpected response from the server.");
        }
      } catch (error) {
        console.error("Error fetching issue data:", error);
        setError(error.message); // Store error message in state
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    if (id) fetchIssueData(); // Fetch data if an ID is available
  }, [id]);

  */
  // this is supabase fetch comment it or remove it when you link to tech valleys db
  useEffect(() => {
    const fetchIssueData = async () => {
      setIsLoading(true);
      try {
        // Fetch data from Supabase based on the provided issue id
        const { data, error } = await supabase
          .from("issues") // Replace with your actual table name
          .select("*") // Select all columns (you can specify more if needed)
          .eq("id", id); // Filter based on the ID

        if (error) throw error; // Handle any errors

        console.log("Fetched Data:", data); // For debugging
        setIssueData(data[0]); // Assuming only one result will be returned for the ID
      } catch (error) {
        console.error("Error fetching issue data:", error);
        setError(error.message); // Store error message in state
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    if (id) fetchIssueData(); // Fetch data if an ID is available
  }, [id]);

  // Handle update of issue data
  const handleUpdate = (updatedIssue) => {
    setIssueData(updatedIssue); // Update state with the updated issue data
  };

  // Handle deletion of issue data axio version
  /*
  const handleDelete = async () => {
    const router = useRouter();
    try {
      // Make a DELETE request using Axios
      const response = await axios.delete(`/api/issues/${id}`); // Assuming you have an API endpoint set up for deleting an issue

      if (response.status === 200) {
        // Successfully deleted
        alert("Issue deleted successfully!");
        router.push("/dashboard/IssueManagement"); // Redirect to the issue management page
      } else {
        console.error("Error deleting issue:", response);
        alert("Failed to delete the issue. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  */

  // Handle deletion of issue data supabase version
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("issues") // Replace with your actual table name
        .delete() // Delete the issue
        .eq("id", id); // Match by ID

      if (error) {
        console.error("Error deleting issue:", error);
        alert("Failed to delete the issue. Please try again.");
        return;
      }

      // Redirect after deletion
      alert("Issue deleted successfully!");
      router.push("/dashboard/IssueManagment"); // Redirect to issue management page
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
      alert("An unexpected error occurred. Please try again.");
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
