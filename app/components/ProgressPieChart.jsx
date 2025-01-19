"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ProgressPieChart({ percentage = 0 }) {
  // Ensure percentage is within 0–100
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  const chartData = [
    { name: "Progress", value: clampedPercentage, fill: "#60A5FA" }, // Blue color
    { name: "Remaining", value: 100 - clampedPercentage, fill: "#FFFFFF" }, // White color
  ];

  return (
    <Card className="flex flex-col bg-gray-900 justify-center items-center text-white">
      {/* Card Content */}
      <CardContent className="flex-1 pb-0">
        <div className="relative mx-auto aspect-square max-h-[250px]">
          {/* Centered Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-bold text-blue-500">
                {clampedPercentage}%
              </span>
              <div className="text-sm text-gray-400 text-center">Progress</div>
            </div>
          </div>

          {/* Pie Chart */}
          <PieChart
            width={250}
            height={250}
            aria-label={`Progress chart showing ${clampedPercentage}% progress`}
          >
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270} // Full circular progress
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="text-sm font-bold text-blue-500">
          {clampedPercentage}% Progress
        </div>
        <div className="text-gray-400">
          Showing current progress out of 100%
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProgressPieChart;
