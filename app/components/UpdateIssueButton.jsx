"use client";

import React, { useState, useEffect } from "react";

const UpdateIssueButton = ({ issue_id, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    comments: "",
    assignedTo: "",
    classification: "",
    progress: "20%",
    priority: "Low",
    reportedBy: "",
    phoneNumber: "",
    status: "YTS",
  });

  const [loading, setLoading] = useState(false);

  // Fetch the existing issue data when modal opens
  const fetchIssueData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/issues/${issue_id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title || "",
          comments: data.comments || "",
          assignedTo: data.assignedTo || "",
          classification: data.classification || "",
          progress: data.progress || "20%",
          priority: data.priority || "Low",
          reportedBy: data.reportedBy || "",
          phoneNumber: data.phoneNumber || "",
          status: data.status || "YTS",
        });
      } else {
        console.error("Failed to fetch issue data");
      }
    } catch (error) {
      console.error("Error fetching issue data:", error);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //add your update endpoin here
    try {
      const response = await fetch(`/api/issues/${issue_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedIssue = await response.json();
        onUpdate(updatedIssue); // Trigger parent update
        setIsOpen(false); // Close the modal
      } else {
        console.error("Failed to update issue");
      }
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={handleOpen}
        className="text-white bg-blue-500 px-8 py-2 text-xl rounded-md hover:bg-gray-700"
      >
        Update Issue
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[60%] max-w-3xl relative">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-stretch items-center">
                  {/* Title */}
                  <div>
                    <label className="block text-lg mb-2">Issue Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="block text-lg mb-2">Assigned To</label>
                    <select
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="Operations">Operations</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
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
                      <option value="">Select Classification</option>
                      <option value="Class 1">Classification 1</option>
                      <option value="Class 2">Classification 2</option>
                      <option value="Class 3">Classification 3</option>
                      <option value="Class 4">Classification 4</option>
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
                      <option value="Priority 1">Priority 1</option>
                      <option value="Priority 2">Priority 2</option>
                      <option value="Priority 3">Priority 3</option>
                      <option value="Priority 4">Priority 4</option>
                    </select>
                  </div>

                  {/* Reported By */}
                  <div>
                    <label className="block text-lg mb-2">Reported By</label>
                    <input
                      type="text"
                      name="reportedBy"
                      value={formData.reportedBy}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-lg mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />
                  </div>

                  {/* Comments */}
                  <div className="sm:col-span-2">
                    <label className="block text-lg mb-2">Comments</label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      className="px-3 py-2 border rounded w-full"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-start space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateIssueButton;
