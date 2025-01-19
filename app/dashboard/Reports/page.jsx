"use client";

import { Suspense } from "react";
import { useState } from "react";
import History from "../../components/overviewReport";

export default function Reports() {
  //this is dummy data and needs to be fetched from db
  const [data, setData] = useState({
    issues: [
      {
        id: 1,
        name: "Issue 1",
        area: "Location 1",
        assigned_to: "John Doe",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-14",
        progress: 100,
      },
      {
        id: 2,
        name: "Issue 2",
        area: "Location 2",
        assigned_to: "Jane Doe",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-13",
        progress: 100,
      },
      {
        id: 3,
        name: "Issue 3",
        area: "Location 3",
        assigned_to: "Mark Smith",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-12",
        progress: 100,
      },
      {
        id: 4,
        name: "Issue 4",
        area: "Location 4",
        assigned_to: "Anna Brown",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-11",
        progress: 100,
      },
      {
        id: 5,
        name: "Issue 5",
        area: "Location 5",
        assigned_to: "James Wilson",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-10",
        progress: 100,
      },
      {
        id: 6,
        name: "Issue 6",
        area: "Location 6",
        assigned_to: "Olivia Davis",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-09",
        progress: 100,
      },
      {
        id: 7,
        name: "Issue 7",
        area: "Location 7",
        assigned_to: "William Harris",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-08",
        progress: 100,
      },
      {
        id: 8,
        name: "Issue 8",
        area: "Location 8",
        assigned_to: "Sophia Clark",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-07",
        progress: 100,
      },
      {
        id: 9,
        name: "Issue 9",
        area: "Location 9",
        assigned_to: "David Lewis",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-06",
        progress: 100,
      },
      {
        id: 10,
        name: "Issue 10",
        area: "Location 10",
        assigned_to: "Isabella Walker",
        comment: "Issue resolved.",
        isClosed: true,
        date: "2024-01-05",
        progress: 100,
      },
    ],
  });
  const [data1, setData1] = useState({});
  return (
    <div>
      <header>
        {/* Add a header component  such ass button for download*/}
      </header>
      <main className="grid grid-cols-1 w-full">
        {/* Overview Reports Section*/}
        <div className="mt-10 space-y-6 w-full">
          <h1 className="text-lg">Overview Reports</h1>
          <div className="space-y-3 w-ful">
            <Suspense fallback={<div>Loading...</div>}>
              <h2> Closed issues</h2>
              <History data={data} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <h2> Yet to start and ongoing issues</h2>
              <History data={data1} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
