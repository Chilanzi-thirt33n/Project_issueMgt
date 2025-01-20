import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { supabase } from "../../lib/supabaseClient"; // Import your Supabase client
import axios from "axios";

function AddButton() {
  // State to toggle form visibility
  const [showForm, setShowForm] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    area: "",
    phase: "",
    section: "",
    issue: "",
    classification: "",
    priority: "",
    reported_by: "",
    contact_number: "",
    assigned_to: "",
    comment: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

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

  // Handle form submission (Supabase example, comment out when using axios)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent further submissions if already submitting
    if (isSubmitting) return;

    // Set submitting state to true
    setIsSubmitting(true);

    // supabase version
    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from("issues") // Replace 'issues' with your table name
        .insert([
          {
            area: formData.area,
            phase: formData.phase,
            section: formData.section,
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

      // Send email after successful data insertion
      try {
        const emailData = {
          to_name: formData.assigned_to,
          issue: formData.issue,
          priority: formData.priority,
          assigned_to: formData.assigned_to,
          reported_by: formData.reported_by,
          contact_number: formData.contact_number,
          area: formData.area,
          phase: formData.phase,
          section: formData.section,
          comment: formData.comment,
        };

        const response = await axios.post("/api/send-email", emailData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          alert(
            "ISSUE( DEFECT ) succesfully added ! - EMAIL and SMS sent successfully!",
          );
        } else {
          alert(
            `DATA added, but EMAIL and SMS failed: ${response.data.error || "Unknown error"}`,
          );
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        alert(`Data added, but EMAIL sending failed: ${emailError.message}`);
      }
      // test email sending
      setFormData({
        area: "",
        phase: "",
        section: "",
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
    } finally {
      // Reset submitting state after processing
      setIsSubmitting(false);
    }

    // Axios request (commented out for now)
    /*
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData);
      console.log("Response from server:", response.data);
      // Handle success (e.g., show confirmation message)
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("There was an error submitting the form.");
    }
    */
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
          <div className="bg-white p-6 rounded-lg max-h-fit w-2/4 text-black relative">
            {/* Close Button (X) positioned at top-right corner of the form */}
            <button
              onClick={toggleForm}
              className="absolute top-2 right-5 text-4xl font-bold hover:text-blue-400"
            >
              &times;
            </button>

            {/* Form for adding data */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Two columns grid layout */}
              <div className="grid grid-cols-2 gap-2">
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
                  <label htmlFor="section" className="block text-lg mb-2">
                    Section:
                  </label>
                  <select
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    required
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
                    placeholder="Defect(Issue) detail"
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
                    <option value="class 1">Class 1</option>
                    <option value="class 2">Class 2</option>
                    <option value="class 3">Class 3</option>
                    <option value="class 4">Class 4</option>
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
                    <option value="priority 1">priority 1</option>
                    <option value="priority 2">priority 2</option>
                    <option value="priority 3">priority 3</option>
                    <option value="priority 4">priority 4</option>
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
                    placeholder="John Do"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact_number"
                    className="block text-lg mb-2"
                  >
                    Assigned Contact:
                  </label>
                  <input
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full"
                    placeholder="+(XXX) XXX XXX XXX or email@example.com"
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
                    <option value="">Select individual</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Michael Brown">Michael Brown</option>
                    <option value="Emily Davis">Emily Davis</option>
                    <option value="Sarah Wilson">Sarah Wilson</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-lg mb-2">
                  Comments:
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded w-full"
                  rows="4"
                  placeholder="Additional comments on the Defect(issue)"
                />
              </div>

              {/* Error message display */}
              {error && (
                <p className="text-red-500 mt-2 text-center">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`bg-blue-500 text-white px-6 py-3 rounded ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting} // Disable button during submission
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddButton;
