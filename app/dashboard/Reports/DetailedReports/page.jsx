"use client";
import React, { useState } from "react";

const data = [
  {
    phase: "PHASE 1",
    tables: [
      {
        title: "MILLING",
        issues: [
          { label: "Captured Issues", value: 8071 },
          { label: "Open Issues", value: 366 },
          { label: "Closed Issues", value: 7705 },
          { label: "Percentage of Completed Issues", value: "95%" },
        ],
        date: "2021-02-02",
      },
      {
        title: "FLOATATION",
        issues: [
          { label: "Captured Issues", value: 8633 },
          { label: "Open Issues", value: 238 },
          { label: "Closed Issues", value: 8395 },
          { label: "Percentage of Completed Issues", value: "97%" },
        ],
        date: "2023-03-15",
      },
      {
        title: "GRAVITY CONCENTRATION",
        issues: [
          { label: "Captured Issues", value: 1285 },
          { label: "Open Issues", value: 32 },
          { label: "Closed Issues", value: 1253 },
          { label: "Percentage of Completed Issues", value: "98%" },
        ],
        date: "2023-06-10",
      },
      {
        title: "LEACHING",
        issues: [
          { label: "Captured Issues", value: 3891 },
          { label: "Open Issues", value: 129 },
          { label: "Closed Issues", value: 3762 },
          { label: "Percentage of Completed Issues", value: "97%" },
        ],
        date: "2022-07-20",
      },
      {
        title: "CARBON REGENERATION",
        issues: [
          { label: "Captured Issues", value: 487 },
          { label: "Open Issues", value: 12 },
          { label: "Closed Issues", value: 475 },
          { label: "Percentage of Completed Issues", value: "97%" },
        ],
        date: "2021-12-25",
      },
    ],
  },
  {
    phase: "PHASE 2",
    tables: [
      {
        title: "HPGR",
        issues: [
          { label: "Captured Issues", value: 3735 },
          { label: "Open Issues", value: 207 },
          { label: "Closed Issues", value: 3528 },
          { label: "Percentage of Completed Issues", value: "94%" },
        ],
        date: "2023-08-10",
      },
      {
        title: "DEWATERING",
        issues: [
          { label: "Captured Issues", value: 4808 },
          { label: "Open Issues", value: 410 },
          { label: "Closed Issues", value: 4398 },
          { label: "Percentage of Completed Issues", value: "91%" },
        ],
        date: "2022-07-22",
      },
      {
        title: "TAILINGS",
        issues: [
          { label: "Captured Issues", value: 1072 },
          { label: "Open Issues", value: 58 },
          { label: "Closed Issues", value: 1014 },
          { label: "Percentage of Completed Issues", value: "94%" },
        ],
        date: "2023-05-18",
      },
      {
        title: "CONVEYORS",
        issues: [
          { label: "Captured Issues", value: 932 },
          { label: "Open Issues", value: 75 },
          { label: "Closed Issues", value: 857 },
          { label: "Percentage of Completed Issues", value: "92%" },
        ],
        date: "2021-09-10",
      },
      {
        title: "MATERIAL HANDLING",
        issues: [
          { label: "Captured Issues", value: 1840 },
          { label: "Open Issues", value: 112 },
          { label: "Closed Issues", value: 1728 },
          { label: "Percentage of Completed Issues", value: "94%" },
        ],
        date: "2023-11-05",
      },
    ],
  },
  {
    phase: "PHASE 3",
    tables: [
      {
        title: "SLURRY PUMPS",
        issues: [
          { label: "Captured Issues", value: 1060 },
          { label: "Open Issues", value: 52 },
          { label: "Closed Issues", value: 1008 },
          { label: "Percentage of Completed Issues", value: "95%" },
        ],
        date: "2022-10-12",
      },
      {
        title: "ROASTING",
        issues: [
          { label: "Captured Issues", value: 4520 },
          { label: "Open Issues", value: 238 },
          { label: "Closed Issues", value: 4282 },
          { label: "Percentage of Completed Issues", value: "95%" },
        ],
        date: "2023-02-16",
      },
      {
        title: "SAG MILL",
        issues: [
          { label: "Captured Issues", value: 7023 },
          { label: "Open Issues", value: 128 },
          { label: "Closed Issues", value: 6895 },
          { label: "Percentage of Completed Issues", value: "98%" },
        ],
        date: "2021-11-20",
      },
      {
        title: "AG MILL",
        issues: [
          { label: "Captured Issues", value: 5367 },
          { label: "Open Issues", value: 189 },
          { label: "Closed Issues", value: 5178 },
          { label: "Percentage of Completed Issues", value: "96%" },
        ],
        date: "2023-01-10",
      },
      {
        title: "GRINDING",
        issues: [
          { label: "Captured Issues", value: 1213 },
          { label: "Open Issues", value: 61 },
          { label: "Closed Issues", value: 1152 },
          { label: "Percentage of Completed Issues", value: "95%" },
        ],
        date: "2022-09-30",
      },
    ],
  },
];

function QuarterlyReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleDateFilter = () => {
    if (startDate && endDate) {
      const filtered = data.map((phase) => ({
        ...phase,
        tables: phase.tables.filter(
          (table) =>
            new Date(table.date) >= new Date(startDate) &&
            new Date(table.date) <= new Date(endDate),
        ),
      }));
      setFilteredData(filtered);
    }
  };

  return (
    <div className="min-h-screen  w-full ">
      <div className=" mx-auto">
        <div className="text-center mb-3">
          <h1 className="text-3xl font-semibold text-gray-900">
            Quarterly Report
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Between {startDate && startDate} and {endDate && endDate}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleDateFilter}
            className="inline-flex items-center px-8 py-2 mt-4 text-white bg-blue-600  rounded-md shadow-sm text-l font-medium  hover:bg-blue-700"
          >
            Filter
          </button>
        </div>

        {filteredData.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="mb-12">
            <div className="text-2xl font-bold text-gray-900 mb-4">
              {phase.phase}
            </div>
            <div className="flex flex-row flex-wrap gap-2 justify-start items-baseline">
              {phase.tables.map((table, tableIndex) => (
                <div
                  key={tableIndex}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {table.title}
                  </h3>
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">ISSUES</th>
                        <th className="px-4 py-2 text-left">NUMBER</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.issues.map((issue, issueIndex) => (
                        <tr
                          key={issueIndex}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-2 text-gray-700">
                            {issue.label}
                          </td>
                          <td
                            className={`px-4 py-2 text-gray-700 ${
                              issue.label === "Percentage of Completed Issues"
                                ? "font-bold text-green-600"
                                : ""
                            }`}
                          >
                            {issue.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuarterlyReport;
