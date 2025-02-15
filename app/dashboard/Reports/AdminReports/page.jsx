"use client";

// this section should be new components that can be made new
import MonthChart from "../../../components/charts/MonthChart";
import ActiveIssues from "../../../components/Tables/ActiveIssuea";
import ClosedIssues from "../../../components/Tables/ClosedIssues";
import ClassificationChart from "../../../components/charts/Piechart";
import BarChart from "../../../components/charts/IssueChart";
import DepartmentChart from "../../../components/charts/departmentJobsChart";
import CrewChart from "../../../components/charts/crewChart";
import DetailedReports from "../../Reports/DetailedReports/page";
import TrendChart from "../../../components/charts/Trendchart";

const Admin = () => {
  return (
    <div>
      {/*the header has the title */}
      <header>
        {" "}
        <h1 className="text-xl">Admin Reports</h1>
        <p className="text-gray-600 mb-5">
          Overview on all important metrics on the defects ( Issues )
        </p>
      </header>
      {/*this is te main */}
      <main className="space-y-10">
        <MonthChart />

        <div>
          <h2 className="text-lg">Trend Charts</h2>
          <p className="text-gray-600"></p>
          <div className="grid grid-cols-3 gap-2">
            <TrendChart />
            <CrewChart />
            <BarChart />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-lg">Active Issues</h2>
            <p className="text-gray-600"></p>
            <ActiveIssues />
          </div>
          <div>
            <h2 className="text-lg">Closed Issues</h2>
            <p className="text-gray-600"></p>
            <ClosedIssues />
          </div>
        </div>

        <div>
          <h2 className="text-lg">dept Charts</h2>
          <p className="text-gray-600">Classification and crew Charts</p>
          <div className="grid grid-cols-2 gap-2">
            <DepartmentChart />
            <ClassificationChart />
          </div>
        </div>

        <DetailedReports />
      </main>
    </div>
  );
};

export default Admin;
