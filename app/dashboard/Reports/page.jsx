import CrewChart from "../../components/crewChart";
import DepartmentChart from "../../components/departmentJobsChart";
import { Suspense } from "react";
import Trends from "../../components/MonthChart";

export default function Reports() {
  return (
    <div className="container w-full">
      <header></header>

      <main>
        <h1>Reports</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          <CrewChart />
          <DepartmentChart />
          <Trends />
        </div>
      </main>
    </div>
  );
}
