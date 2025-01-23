"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // Import your Supabase client for my personala testing add we can use  if we need to present
// import axios from "axios"; // this is axio for end points comment it out and comment the abave when you link to tech valleys db

const DeleteIssueButton = ({ issue_id: id, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null); // To display error/success messages

  // Handle the delete action supabase version
  const handleDelete = async () => {
    try {
      // Assuming you have a Supabase client instance available
      const { data, error } = await supabase
        .from("issues") // Replace "issues" with your table name
        .delete()
        .eq("id", id); // Assuming the issue ID is stored in 'id'

      if (error) {
        setMessage("Failed to delete issue. Please try again.");
        setTimeout(() => setMessage(null), 10000);
        console.error("Error deleting issue:", error);
      } else {
        onDelete(id); // Call the parent's delete handler
        setIsOpen(false); // Close the modal
        setMessage("Issue deleted successfully!");
        setTimeout(() => setMessage(null), 10000); // Clear message after 10 seconds
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error deleting issue:", error);
      setTimeout(() => setMessage(null), 10000);
    }
  };

  return (
    <>
      {/* Success/Error Message */}
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white shadow-lg bg-red-500">
          {message}
        </div>
      )}

      {/* Button to open the confirmation modal */}
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-red-600 px-8 py-2 text-sm rounded-md hover:bg-gray-700 text-white"
      >
        Delete Issue
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this issue? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteIssueButton;
