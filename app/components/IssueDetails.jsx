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
import Progress from "./ProgressPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IssueDetails = ({ data }) => {
  // Fallback values for the data
  const {
    area = "N/A ",
    issue = "N/A ",
    classification = "N/A ",
    Priority = "N/A ",
    reported_by = "N/A ",
    contact_number = "N/A ",
    assigned_to = "N/A ",
    comment = "No comments provided",
    phase = "N/A ",
    created_at = "N/A",
    updated_at = "N/A",
    status = "N/A",
    progress = 0,
  } = data || {}; // Use empty object fallback in case data is undefined or null

  return (
    <Card className="flex flex-col col-span-3 justify-evenly items-center gap-8 p-4 w-full">
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
            <FaUserAlt size={20} /> Assigned To
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
      <CardContent className="grid grid-cols-3 gap-4 w-full">
        <Progress percentage={progress} />
        <ul className="flex flex-col gap-4 p-4 border border-blue-300 rounded-lg shadow-md bg-gray-50">
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaMapMarkerAlt size={20} />
            <span>
              <h3 className="font-bold">location</h3>
              <p>
                {area} | {phase}
              </p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaExclamationTriangle size={20} />
            <span>
              <h3 className="font-bold">Issue</h3>
              <p>{issue}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaRegFileAlt size={20} />
            <span>
              <h3 className="font-bold">Reported By</h3>
              <p>{reported_by}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaComment size={20} />
            <span>
              <h3 className="font-bold">Comment</h3>
              <p>{comment}</p>
            </span>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 p-4 border border-blue-300 rounded-lg shadow-md bg-gray-50">
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCalendarAlt size={20} />
            <span>
              <h3 className="font-bold">Date of Report</h3>
              <p>{created_at}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCalendarAlt size={20} />
            <span>
              <h3 className="font-bold">Date of Update</h3>
              <p>{updated_at}</p>
            </span>
          </li>
          <li className="flex items-center gap-4 p-3 hover:bg-blue-100 rounded-lg transition-all">
            <FaCheckCircle size={20} />
            <span>
              <h3 className="font-bold">Status</h3>
              <p>{status}</p>
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default IssueDetails;
