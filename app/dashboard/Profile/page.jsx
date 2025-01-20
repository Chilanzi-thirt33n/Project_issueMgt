"use client";
import { useState } from "react";
import axios from "axios";

const SendEmailForm = () => {
  const [emailData, setEmailData] = useState({
    to_name: "",
    issue: "",
    priority: "",
    assigned_to: "",
    reported_by: "",
    contact_number: "",
    comment: "",
  });

  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post("/api/send-email", emailData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setStatus("Email sent successfully!");
      } else {
        setStatus(`Error: ${response.data.error || "Unknown error"}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>To Name:</label>
        <input
          type="text"
          name="to_name"
          value={emailData.to_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Issue:</label>
        <input
          type="text"
          name="issue"
          value={emailData.issue}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Priority:</label>
        <input
          type="text"
          name="priority"
          value={emailData.priority}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Assigned To:</label>
        <input
          type="text"
          name="assigned_to"
          value={emailData.assigned_to}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Reported By:</label>
        <input
          type="text"
          name="reported_by"
          value={emailData.reported_by}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contact_number"
          value={emailData.contact_number}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Comments:</label>
        <textarea
          name="comment"
          value={emailData.comment}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Send Email</button>
      <p>{status}</p>
    </form>
  );
};

export default SendEmailForm;
