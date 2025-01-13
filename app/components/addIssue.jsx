"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function AddButton() {
  // State to toggle form visibility
  const [showForm, setShowForm] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    area: "",
    issue: "",
    classification: "",
    Priority: "",
    reported_by: "",
    contact_number: "",
    assigned_to: "",
    comment: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example API call to send the data to the server/database
      const response = await fetch("/api/addIssue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Handle the result (e.g., display success message, reset form, etc.)
      if (result.success) {
        alert("Data added successfully!");
        setFormData({
          area: "",
          issue: "",
          classification: "",
          Priority: "",
          reported_by: "",
          contact_number: "",
          assigned_to: "",
          comment: "",
        });
        setShowForm(false); // Hide form after successful submission
      } else {
        alert("Error adding data!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the data.");
    }
  };

  return (
    <div>
      {/* Button to toggle the form */}
      <button
        onClick={toggleForm}
        className="px-8 py-2 bg-blue-500 text-white rounded-md flex flex-row gap-4 justify-center items-center font-bold text-xl hover:bg-blue-300 hover:text-gray-950"
      >
        <p>Add Issue</p>
        <AiOutlinePlus />
      </button>

      {/* Overlay Form when showForm is true */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3 text-black relative">
            {/* Close Button (X) positioned at top-right corner of the form */}
            <button
              onClick={toggleForm}
              className="absolute top-2 right-5 text-4xl font-bold hover:text-blue-400"
            >
              &times;
            </button>

            {/* Form for adding data */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Two columns grid layout */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column Inputs */}
                <div>
                  <label htmlFor="area" className="block text-lg mb-2">
                    Area:
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    placeholder="Enter area"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="issue" className="block text-lg mb-2">
                    Issue:
                  </label>
                  <input
                    type="text"
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    placeholder="Enter issue"
                    required
                  />
                </div>

                {/* Right Column Inputs */}
                <div>
                  <label htmlFor="class" className="block text-lg mb-2">
                    Class:
                  </label>
                  <select
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Class 1">Classification 1</option>
                    <option value="Class 2">Classification 2</option>
                    <option value="Class 3">Classification 3</option>
                    <option value="Class 4">Classification 4</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Priority" className="block text-lg mb-2">
                    Priority:
                  </label>
                  <select
                    id="Priority"
                    name="Priority"
                    value={formData.Priority}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="Priority 1">Priority 1</option>
                    <option value="Priority 2">Priority 2</option>
                    <option value="Priority 3">Priority 3</option>
                    <option value="Priority 4">Priority 4</option>
                  </select>
                </div>

                {/* Left Column Inputs */}
                <div>
                  <label htmlFor="reported_by" className="block text-lg mb-2">
                    Reported By:
                  </label>
                  <input
                    type="text"
                    id="reported_by"
                    name="reported_by"
                    value={formData.reported_by}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    placeholder="Enter reported by"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact_number"
                    className="block text-lg mb-2"
                  >
                    Contact Number:
                  </label>
                  <input
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                {/* Right Column Inputs */}
                <div>
                  <label htmlFor="assigned_to" className="block text-lg mb-2">
                    Assigned To:
                  </label>
                  <input
                    type="text"
                    id="assigned_to"
                    name="assigned_to"
                    value={formData.assigned_to}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    placeholder="Assigned to"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block text-lg mb-2">
                    Comment:
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    placeholder="Add a comment"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-300"
                >
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddButton;
