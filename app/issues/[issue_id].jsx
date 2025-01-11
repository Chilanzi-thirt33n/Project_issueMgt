import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const IssueDetails = () => {
  const router = useRouter();
  const { issue_id } = router.query;
  const [issue, setIssue] = useState(null);

  if (!issue) {
    return <div>Loading issue details, please wait...</div>;
  }

  return (
    <div>
      <h1>{issue.name}</h1>
      <p>Issue ID: {issue.issue_id}</p>
      <p>Status: {issue.status}</p>
      <p>Action: {issue.action}</p>
      <p>Comment: {issue.comment}</p>
      <p>Date: {issue.date}</p>
    </div>
  );
};

export default IssueDetails;
