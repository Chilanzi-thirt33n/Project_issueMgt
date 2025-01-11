import AddIssue from "../../components/addIssue";

const IssueManagment = () => {
  return (
    <div>
      {/* Add Issue Button */}
      <header className="flex flex-row justify-end items-center p-4">
        <AddIssue />
      </header>
    </div>
  );
};

export default IssueManagment;
