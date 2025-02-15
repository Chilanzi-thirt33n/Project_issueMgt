"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client for my personal testing add we can use if we need to present
// import axios from "axios"; // this is axios for endpoints comment it out and comment the above when you link to tech valley's db

const UpdateIssueButton = ({ issue_id, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);

  // Fetch the existing issue data when modal opens axios version
  /*
   const fetchIssueData = async () => {
     setLoading(true);
     try {
       // Fetch issue data from the API
       const response = await axios.get(`/api/issues/${issue_id}`);

       if (response.status === 200) {
         const data = response.data; // Assuming the API returns the issue object
         setFormData({
           issue: data.issue || "",
           comment: data.comment || "",
           assigned_to: data.assigned_to || "",
           classification: data.classification || "",
           progress: data.progress || "20%",
           priority: data.priority || "Low",
           reported_by: data.reported_by || "",
           contact_number: data.contact_number || "",
           status: data.status || "YTS",
         });
       } else {
         console.error("Failed to fetch issue data");
       }
     } catch (error) {
       console.error("Error fetching issue data with Axios:", error);
     } finally {
       setLoading(false);
     }
   };
   */

  // Fetch the existing issue data when modal opens supabase version
  const fetchIssueData = async () => {
    setLoading(true);
    try {
      // Fetch issue data from Supabase
      const { data, error } = await supabase
        .from("issues") // Replace with your table name
        .select("*")
        .eq("id", issue_id); // Filter by issue_id

      if (error) throw error;

      if (data && data.length > 0) {
        const issue = data[0]; // Assuming only one issue is returned
        setFormData({
          issue: issue.issue || "",
          comment: issue.comment || "",
          assigned_to: issue.assigned_to || "",
          section: issue.section || "",
          area: issue.area || "",
          phase: issue.phase || "",
          classification: issue.classification || "",
          progress: issue.progress || "0",
          priority: issue.priority || "Low",
          reported_by: issue.reported_by || "",
          contact_number: issue.contact_number || "",
          status: issue.status || "YTS",
        });
      } else {
        console.error("No issue data found");
      }
    } catch (error) {
      console.error("Error fetching issue data from Supabase:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal open
  const handleOpen = () => {
    setIsOpen(true);
    fetchIssueData(); // Fetch the existing issue data
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle form submission axios version
  /*
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Prepare the request data
    const requestData = {
      issue: formData.issue,
      comment: formData.comment,
      assigned_to: formData.assigned_to,
      classification: formData.classification,
      progress: formData.progress,
      priority: formData.priority,
      reported_by: formData.reported_by,
      contact_number: formData.contact_number,
      status: formData.status,
    };

    // Send PUT request with axios
    const response = await axios.put(
      `https://your-api-endpoint.com/issues/${issue_id}`, // Use your API endpoint
      requestData
    );

    if (response.status === 200) {
      // Trigger parent update with updated issue data
      onUpdate(response.data);
      setIsOpen(false); // Close the modal
      alert("Issue updated successfully!"); // Success pop-up
    } else {
      console.error("Failed to update issue:", response);
      alert("Failed to update issue!"); // Error pop-up
    }
  } catch (error) {
    console.error("Error updating issue with axios:", error);
    alert("Error updating issue!"); // Error pop-up
  }
};
*/

  // Handle form submission supabase version
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update issue in Supabase
      const { data, error } = await supabase
        .from("issues") // Table name
        .update({
          issue: formData.issue,
          comment: formData.comment,
          assigned_to: formData.assigned_to,
          section: formData.section,
          area: formData.area,
          phase: formData.phase,
          classification: formData.classification,
          progress: formData.progress,
          priority: formData.priority,
          reported_by: formData.reported_by,
          contact_number: formData.contact_number,
          status: formData.status,
        })
        .eq("id", issue_id) // Filter by issue_id
        .select(); // Explicitly return the updated data

      if (error) throw error;

      if (data && data.length > 0) {
        onUpdate(data[0]); // Trigger parent update with updated issue
        setIsOpen(false); // Close the modal
        alert("Issue updated successfully!"); // Success pop-up
      } else {
        console.error("Failed to update issue: No data returned");
        alert("Failed to update issue!"); // Error pop-up
      }
    } catch (error) {
      console.error("Error updating issue in Supabase:", error);
      alert("Error updating issue!"); // Error pop-up
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="text-white bg-blue-500 px-8 py-2 text-sm rounded-md hover:bg-gray-700"
      >
        Update Issue
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[50%] max-h-fit relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-5 text-4xl font-bold hover:text-blue-400"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Update Issue</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-stretch items-center">
                  {/* Title */}
                  <div>
                    <label className="block text-lg mb-2">Issue Title</label>
                    <input
                      type="text"
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />
                  </div>
                  {/* area */}
                  <div>
                    <label className="block text-lg mb-2">Area:</label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    >
                      <option value="">Select Area</option>
                      <option value="MILLING">MILLING</option>
                      <option value="FLOATATION">FLOATATION</option>
                      <option value="REAGENT">REAGENT</option>
                      <option value="CRUSHING">CRUSHING</option>
                      <option value="HPGR">HPGR</option>
                      <option value="DEWATERING">DEWATERING</option>
                      <option value="FILTRATION">FILTRATION</option>
                      <option value="BAGGING">BAGGING</option>
                      <option value="DEWATERING">DEWATERING</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg mb-2">Phase:</label>
                    <select
                      name="phase"
                      value={formData.phase}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                    >
                      <option value="">Select Phase</option>
                      <option value="Phase 1">Phase 1</option>
                      <option value="Phase 2">Phase 2</option>
                      <option value="Phase 3">Phase 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg mb-2">Section:</label>
                    <select
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                    >
                      <option value="">Select section</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Process">Process</option>
                      <option value="Mining">Mining</option>
                      <option value="Intrumentation">Intrumentation</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="StandBy">StandBy</option>
                    </select>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="block text-lg mb-2">Assigned To</label>
                    <select
                      name="assigned_to"
                      value={formData.assigned_to}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                    >
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Michael Brown">Michael Brown</option>
                      <option value="Emily Davis">Emily Davis</option>
                      <option value="Sarah Wilson">Sarah Wilson</option>
                    </select>
                  </div>

                  {/* Classification */}
                  <div>
                    <label className="block text-lg mb-2">Classification</label>
                    <select
                      name="classification"
                      value={formData.classification}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                    >
                      <option value="class 1">Class 1</option>
                      <option value="class 2">Class 2</option>
                      <option value="class 3">Class 3</option>
                      <option value="class 4">Class 4</option>
                    </select>
                  </div>

                  {/* Progress */}
                  <div>
                    <label className="block text-lg mb-2">Progress</label>
                    <select
                      name="progress"
                      value={formData.progress}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                    >
                      <option value="0">0%</option>
                      <option value="20">20%</option>
                      <option value="40">40%</option>
                      <option value="60">60%</option>
                      <option value="80">80%</option>
                      <option value="100">100%</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-lg mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                    >
                      <option value="YTS">YTS</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-lg mb-2">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Priority</option>
                      <option value="priority 1">priority 1</option>
                      <option value="priority 2">priority 2</option>
                      <option value="priority 3">priority 3</option>
                      <option value="priority 4">priority 4</option>
                    </select>
                  </div>

                  {/* Reported By */}
                  <div>
                    <label className="block text-lg mb-2">Reported By</label>
                    <input
                      type="text"
                      name="reported_by"
                      value={formData.reported_by}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-lg mb-2">
                      Assigned Contact
                    </label>
                    <input
                      type="text"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />
                  </div>

                  {/* Comments */}
                  <div className="sm:col-span-2">
                    <label className="block text-lg mb-2">Comments</label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-700"
                >
                  {loading ? "Updating..." : "Update Issue"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateIssueButton;
