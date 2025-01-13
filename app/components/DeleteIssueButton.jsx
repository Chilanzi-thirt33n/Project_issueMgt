"use client";

import React, { useState } from "react";

const DeleteIssueButton = ({ issue_id: id, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle the delete action
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        onDelete(id); // Call the parent's delete handler
        setIsOpen(false); // Close the modal
      } else {
        console.error("Failed to delete issue");
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  return (
    <>
      {/* Button to open the confirmation modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-600 bg-white px-8 py-2 b text-xl rounded-md hover:bg-red-600 hover:text-white"
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
