"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ProgressPieChart({ percentage }) {
  const chartData = [
    { name: "Progress", value: percentage, fill: "#60A5FA" }, // Hex color for progress (blue)
    { name: "Remaining", value: 100 - percentage, fill: "#FFFFFF" }, // Hex color for remaining (white)
  ];

  return (
    <Card className="flex flex-col bg-gray-900 text-white">
      <CardContent className="flex-1 pb-0">
        <div className="relative mx-auto aspect-square max-h-[250px]">
          {/* Centered Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-bold text-blue-500">
                {percentage}%
              </span>
              <div className="text-sm text-gray-400">Progress</div>
            </div>
          </div>

          {/* Pie Chart */}
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              startAngle={90}
              endAngle={-270} // Full circular progress with start at 12 o'clock
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="text-lg font-bold text-blue-500">
          {percentage}% Progress
        </div>
        <div className="text-gray-400">
          Showing current progress out of 100%
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProgressPieChart;
