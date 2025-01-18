import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { supabase } from "../../lib/supabaseClient"; // Import your Supabase client for my personala testing add we can use  if we need to present
// import axios from "axios"; // this is axio for end points comment it out and comment the abave when you link to tech valleys db

function AddButton() {
  // State to toggle form visibility
  const [showForm, setShowForm] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    area: "",
    phase: "",
    issue: "",
    classification: "",
    priority: "",
    reported_by: "",
    contact_number: "",
    assigned_to: "",
    comment: "",
  });
  const [error, setError] = useState("");

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

  // uncomment this to test your end point and make sure you comment out my supabase
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://your-new-endpoint.com/your-api-path",
        {
          area: formData.area,
          phase: formData.phase,
          issue: formData.issue,
          classification: formData.classification,
          priority: formData.priority,
          reported_by: formData.reported_by,
          contact_number: formData.contact_number,
          assigned_to: formData.assigned_to,
          comment: formData.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Add authentication if needed
            "Authorization": `Bearer YOUR_API_KEY`,
          },
        }
      );

      if (response.status === 200) {
        alert("Data added successfully!");
        setFormData({
          area: "",
          phase: "",
          issue: "",
          classification: "",
          priority: "",
          reported_by: "",
          contact_number: "",
          assigned_to: "",
          comment: "",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); // Set error message
    }
    };
    */

  // Handle form submission this my supapbase comment this section when you link to tech valleys db
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from("issues") // Replace 'issues' with your table name
        .insert([
          {
            area: formData.area,
            phase: formData.phase,
            issue: formData.issue,
            classification: formData.classification,
            priority: formData.priority,
            reported_by: formData.reported_by,
            contact_number: formData.contact_number,
            assigned_to: formData.assigned_to,
            comment: formData.comment,
          },
        ]);

      if (error) throw error;

      alert("Data added successfully!");
      setFormData({
        area: "",
        phase: "",
        issue: "",
        classification: "",
        priority: "",
        reported_by: "",
        contact_number: "",
        assigned_to: "",
        comment: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); // Set error message
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
                  <select
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
                  >
                    <option value="">Select Area</option>
                    <option value="Area 1">Area 1</option>
                    <option value="Area 2">Area 2</option>
                    <option value="Area 3">Area 3</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phase" className="block text-lg mb-2">
                    Phase:
                  </label>
                  <select
                    id="phase"
                    name="phase"
                    value={formData.phase}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
                  >
                    <option value="">Select Phase</option>
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                  </select>
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

                <div>
                  <label
                    htmlFor="classification"
                    className="block text-lg mb-2"
                  >
                    Classification:
                  </label>
                  <select
                    id="classification"
                    name="classification"
                    value={formData.classification}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
                  >
                    <option value="">Select Classification</option>
                    <option value="class 1">Classification 1</option>
                    <option value="class 2">Classification 2</option>
                    <option value="class 3">Classification 3</option>
                    <option value="class 4">Classification 4</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-lg mb-2">
                    Priority:
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="priority 1">1</option>
                    <option value="priority 2">2</option>
                    <option value="priority 3">3</option>
                    <option value="priority 4">4</option>
                  </select>
                </div>

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
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact_number"
                    className="block text-lg mb-2"
                  >
                    Assigned Department Contact:
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

                <div>
                  <label htmlFor="assigned_to" className="block text-lg mb-2">
                    Assigned To:
                  </label>
                  <select
                    id="assigned_to"
                    name="assigned_to"
                    value={formData.assigned_to}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Electrical Department">
                      Electrical Department
                    </option>
                    <option value="Mechanical Department">
                      Mechanical Department
                    </option>
                    <option value="Plumbing Department">
                      Plumbing Department
                    </option>
                    <option value="Maintenance Department">
                      Maintenance Department
                    </option>
                    <option value="Safety Department">Safety Department</option>
                  </select>
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

              {error && (
                <div className="text-red-600 bg-red-100 p-2 mt-4 rounded">
                  <strong>Error:</strong> {error}
                </div>
              )}

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
