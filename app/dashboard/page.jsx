"use client";
import IssueChart from "../components/IssueChart";
import PieChart from "../components/Piechart";
import PriorityCards from "../components/PriorityOverviewCards";
import RecentActivity from "../components/RecentsIssues";
import Trends from "../components/Trendchart";
import { Suspense } from "react";
import { useState } from "react";

export default function Overview() {
  // The variables
  // Declaring the Priority data update to endpoint data with setPriorityData
  const [priorityData, setPriorityData] = useState([
    { name: "Priority 1 Issues", total: 5 },
    { name: "Priority 2 Issues", total: 3 },
    { name: "Priority 3 Issues", total: 1 },
    { name: "Priority 4 Issues", total: 1 },
  ]);

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
    </div>
  );
}
