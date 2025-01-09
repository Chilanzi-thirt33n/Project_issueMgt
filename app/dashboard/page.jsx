import IssueChart from "../components/IssueChart";
import PieChart from "../components/Piechart";
export default function Overview() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {/*Priority IssuesCount */}
      {/*charts */}
      <div className=" grid grid-cols-2 gap-4 ">
        <IssueChart />
        <PieChart />
      </div>
      {/*Critical issues sections*/}
    </div>
  );
}
