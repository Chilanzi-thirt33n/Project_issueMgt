import IssueChart from "../components/IssueChart";
import PieChart from "../components/Piechart";
import PriorityCards from "../components/PriorityOverviewCards";
import RecentActivity from "../components/RecentsIssues";
import Trends from "../components/Trendchart";

// The variables
// Declaring the Priority data
const Priority = [
  { name: "Priority 1 Issues", total: 5 },
  { name: "Priority 2 Issues", total: 3 },
  { name: "Priority 3 Issues", total: 1 },
  { name: "Priority 4 Issues", total: 1 },
];

export default function Overview() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      {/* Priority Issues Count */}
      <PriorityCards data={Priority} />

      {/* Charts */}
      <div className="grid grid-cols-3 gap-5 w-full">
        <IssueChart />
        <Trends />
        <PieChart />
      </div>

      {/* Critical Issues Section */}
      <div className="w-full">
        <RecentActivity />
      </div>
    </div>
  );
}
