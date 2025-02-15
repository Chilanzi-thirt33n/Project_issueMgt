"use client";

import CrewChart from "../../../components/charts/crewChart";
import DepartmentChart from "../../../components/charts/departmentJobsChart";
import { Suspense } from "react";
import Trends from "../../../components/charts/MonthChart";

export default function Charts() {
  return (
    <div className="w-full p-2">
      {" "}
      {/* Trends Reports Section*/}
      <div className="mt-10 space-y-3 w-full">
        <h1 className="text-lg">Trends Reports</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <CrewChart />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <DepartmentChart />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Trends />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
