"use client";

import { Suspense, useState, useEffect } from "react";
import Closed from "../../components/ClosedIssues";
import Active from "../../components/ActiveIssuea";

export default function Reports() {
  return (
    <div>
      <header>{/* Add header components, e.g., buttons for download */}</header>
      <main className="grid grid-cols-1 w-full">
        {/* Overview Reports Section */}
        <div className="mt-10 space-y-6 w-full">
          <h1 className="text-lg">Overview Reports</h1>
          <div className="space-y-3 w-full">
            {/* Suspense component for fetching data */}
            <Suspense fallback={<div>Loading...</div>}>
              <h2>Closed Issues</h2>
              {/* Pass closedIssues as a prop to History */}
              <Closed />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <h2>Active Issues</h2>
              {/* Pass activeIssues as a prop to History */}
              <Active />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
