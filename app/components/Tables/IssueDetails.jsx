"use client";

import React from "react";
import {
  FaExclamationTriangle,
  FaTags,
  FaRegFileAlt,
  FaComment,
  FaUserAlt,
  FaCalendarAlt,
  FaPhoneAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiForkKnifeSpoon, GiHotMeal, GiMeal } from "react-icons/gi"; // Added food-related icons
import Progress from "../charts/ProgressPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IssueDetails = ({ data }) => {
  // Fallback values for the data
  const {
    area = "N/A ",
    issue = "N/A ",
    classification = "N/A ",
    priority = "N/A ",
    reported_by = "N/A ",
    contact_number = "N/A ",
    assigned_to = "N/A ",
    comment = "No comments provided",
    phase = "N/A ",
    section = "N/A",
    created_at = "N/A",
    updated_at = "N/A",
    status = "N/A",
    progress = 0,
  } = data || {}; // Use empty object fallback in case data is undefined or null

  return (
    <Card className="flex flex-col col-span-3 justify-evenly flex-grow items-center gap-4 w-full">
      <CardHeader className="grid grid-cols-4 gap-2 justify-center items-center w-full">
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-sm p-2">
            <FaTags size={20} /> Classification
          </h2>
          <p className="text-xm">{classification}</p>
        </span>
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-sm p-2">
            <FaExclamationTriangle size={20} /> Priority
          </h2>
          <p className="text-xm">{priority}</p>
        </span>
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-sm p-2">
            <FaUserAlt size={20} /> Assigned To
          </h2>
          <p className="text-xm">{assigned_to}</p>
        </span>
        <span className="bg-blue-200 flex flex-col justify-center items-center rounded-md p-2 shadow-lg">
          <h2 className="flex w-full flex-row gap-3 justify-center items-center text-black font-black text-sm p-2">
            <FaPhoneAlt size={20} /> Contact
          </h2>
          <p className="text-xm">{contact_number}</p>
        </span>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2 w-full">
        <Progress percentage={progress} />
        <ul className="flex flex-col gap-4 p-4 border border-blue-300 rounded-lg shadow-md bg-gray-50">
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaMapMarkerAlt size={20} />
            <span>
              <h3 className="font-bold text-sm">location</h3>
              <p className="text-xm">
                {area} - {phase} - {section}
              </p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaExclamationTriangle size={20} />
            <span>
              <h3 className="font-bold text-sm">Issue</h3>
              <p className="text-xm">{issue}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaRegFileAlt size={20} />
            <span>
              <h3 className="font-bold text-sm">Reported By</h3>
              <p className="text-xm">{reported_by}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaComment size={20} />
            <span>
              <h3 className="font-bold text-sm">Comment</h3>
              <p className="text-xm">{comment}</p>
            </span>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 p-4 border border-blue-300 rounded-lg shadow-md bg-gray-50">
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCalendarAlt size={20} />
            <span>
              <h3 className="font-bold text-sm">Date of Report</h3>
              <p className="text-xm">
                {new Date(created_at).toISOString().split("T")[0]}
              </p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCalendarAlt size={20} />
            <span>
              <h3 className="font-bold text-sm">Date of Update</h3>
              <p className="text-xm">{new Date(updated_at).toLocaleString()}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCheckCircle size={20} />
            <span>
              <h3 className="font-bold text-sm">Status</h3>
              <p className="text-xm">{status}</p>
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default IssueDetails;
