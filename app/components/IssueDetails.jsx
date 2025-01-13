import React from "react";
import {
  FaExclamationTriangle,
  FaTags,
  FaRegFileAlt,
  FaComment,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { GiForkKnifeSpoon, GiHotMeal, GiMeal } from "react-icons/gi"; // Added food-related icons
import Progress from "./ProgressPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IssueDetails = ({ data }) => {
  // Fallback values for the data
  const {
    area = "Not Available",
    issue = "No Issue Reported",
    classification = "class 1",
    Priority = "priority 2 ",
    reported_by = "Unknown",
    contact_number = "Not Provided",
    assigned_to = "Unassigned",
    comment = "No comments provided",
    isClosed = false, // Default value is false (open)
    created_at = "N/A",
    updated_at = "N/A",
    closed_at = "N/A",
    progress = 20,
  } = data || {}; // Use empty object fallback in case data is undefined or null

  return (
    <Card className="flex flex-col col-span-3 gap-8 p-4 w-full">
      <CardHeader className="grid grid-cols-4 gap-4 justify-evenly items-center w-full">
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-lg p-2">
            <FaTags size={20} /> Classification
          </h2>
          <p>{classification}</p>
        </span>
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-lg p-2">
            <FaExclamationTriangle size={20} /> Priority
          </h2>
          <p>{Priority}</p>
        </span>
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-lg p-2">
            <FaPhoneAlt size={20} /> Assigned To
          </h2>
          <p>{assigned_to}</p>
        </span>
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-lg p-2">
            <FaPhoneAlt size={20} /> Assigned Contact
          </h2>
          <p>{contact_number}</p>
        </span>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 w-full">
        <ul className="flex flex-col gap-4 p-4 border border-blue-300 rounded-lg shadow-md bg-gray-50">
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <GiForkKnifeSpoon size={20} />
            <span>
              <h3>Area</h3>
              <p>{area}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <GiHotMeal size={20} />
            <span>
              <h3>Issue</h3>
              <p>{issue}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaRegFileAlt size={20} />
            <span>
              <h3>Reported By</h3>
              <p>{reported_by}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <GiMeal size={20} />
            <span>
              <h3>Comment</h3>
              <p>{comment}</p>
            </span>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 p-4 border border-blue-300 rounded-lg shadow-md bg-gray-50">
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCalendarAlt size={20} />
            <span>
              <h3>Date of Report</h3>
              <p>{created_at}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCalendarAlt size={20} />
            <span>
              <h3>Date of Update</h3>
              <p>{updated_at}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCheckCircle size={20} />
            <span>
              <h3>Status</h3>
              <p>{isClosed ? "Closed" : "Open"}</p>{" "}
              {/* Conditional rendering based on isClosed */}
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCalendarAlt size={20} />
            <span>
              <h3>Closed At</h3>
              <p>{isClosed ? closed_at : "N/A"}</p>{" "}
              {/* Only show closed_at if issue is closed */}
            </span>
          </li>
          <li className="p-3">
            <Progress percentage={progress} />
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default IssueDetails;
