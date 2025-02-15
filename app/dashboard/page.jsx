"use client";
import IssueChart from "../components/charts/IssueChart";
import PieChart from "../components/charts/Piechart";
import PriorityCards from "../components/charts/PriorityOverviewCards";
import RecentActivity from "../components/Tables/RecentsIssues";
import Trends from "../components/charts/Trendchart";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client for my personala testing add we can use  if we need to present
// import axios from "axios"; // this is axio for end points comment it out and comment the abave when you link to tech valleys db
import DownloadButton from "../components/buttons/ButtonProp";

export default function Overview() {
  const [priorityData, setPriorityData] = useState([]);

  // Fetch the priority totals from Supabase
  const fetchPriorityTotals = async () => {
    const { data, error } = await supabase.rpc("get_priority_totals");

    if (error) {
      console.error("Error fetching priority totals:", error);
      return;
    }

    // Check for existing priority counts, and use || to default to 0 if the priority doesn't exist
    const updatedData = [
      {
        name: "Priority 1 Issues",
        total:
          data.find((item) => item.priority === "priority 1")?.total_count || 0,
      },
      {
        name: "Priority 2 Issues",
        total:
          data.find((item) => item.priority === "priority 2")?.total_count || 0,
      },
      {
        name: "Priority 3 Issues",
        total:
          data.find((item) => item.priority === "priority 3")?.total_count || 0,
      },
      {
        name: "Priority 4 Issues",
        total:
          data.find((item) => item.priority === "priority 4")?.total_count || 0,
      },
    ];

    setPriorityData(updatedData);
  };

  useEffect(() => {
    fetchPriorityTotals();
  }, []);

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      {/* Priority Issues Count */}
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <PriorityCards data={priorityData} />
      </Suspense>

      {/* Charts */}
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <div className="grid grid-cols-3 gap-5 w-full">
          <IssueChart />
          <Trends />
          <PieChart />
        </div>
      </Suspense>

      {/* Critical Issues Section */}
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <RecentActivity />
      </Suspense>
      <div className="w-full flex flex-row justify-end items-center">
        <DownloadButton
          name="Download Pdf"
          link="#"
          className="bg-green-500 hover:bg-green-700"
        />
      </div>
    </div>
  );
}
