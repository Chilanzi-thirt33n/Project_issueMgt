import IssueChart from "../components/IssueChart";
import PieChart from "../components/Piechart";
import PriorityCards from "../components/PriorityOverviewCards";

//the variables
// Declaring the Priority data
const Priority = [
  { name: "Priority 1", total: 5 },
  { name: "Priority 2", total: 3 },
  { name: "Priority 3", total: 1 },
  { name: "Priority 4", total: 1 },
];

export default function Overview() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      {/* Priority Issues Count */}
      <PriorityCards data={Priority} />
      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <IssueChart />
        <PieChart />
      </div>

      {/* Critical Issues Section */}
    </div>
  );
}
