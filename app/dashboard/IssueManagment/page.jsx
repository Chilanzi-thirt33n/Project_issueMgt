"use client";
import AddIssue from "../../components/addIssue";
import IssueActive from "../../components/addedIssues";
import { Suspense } from "react";

const IssueManagment = () => {
  return (
    <div>
      {/* Add Issue Button */}
      <header className="flex flex-row justify-end items-center p-4">
        <AddIssue />
      </header>

      {/* Issue Active Section */}
      <main className="flex flex-col justify-start ittem-start gap-4">
        {" "}
        <h2>Issue Status</h2>
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center">
              Loading...
            </div>
          }
        >
          <IssueActive />
        </Suspense>
      </main>
    </div>
  );
};

export default IssueManagment;
