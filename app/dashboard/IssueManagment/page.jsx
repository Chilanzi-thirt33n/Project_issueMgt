"use client";
import AddIssue from "../../components/buttons/addIssue";
import IssueActive from "../../components/Tables/addedIssues";
import { Suspense } from "react";
import DownloadButton from "../../components/buttons/ButtonProp";

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
        <div className="w-full flex flex-row justify-end items-center">
          <DownloadButton
            name="Download Excel"
            link="#"
            className="bg-green-500 hover:bg-green-700"
          />
        </div>
      </main>
    </div>
  );
};

export default IssueManagment;
