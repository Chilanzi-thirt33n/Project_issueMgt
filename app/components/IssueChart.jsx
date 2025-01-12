"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const IssueChart = () => {
  // Updated chart data with completed, active, and total issues
  const [chartData, setChartData] = useState([
    { category: "Total Issues", value: 50 },
    { category: "Closed Issues", value: 45 },
    { category: "Active Issues", value: 5 },
  ]);

  const chartConfig = {
    total: {
      label: "Total Issues",
      color: "hsl(var(--chart-1))",
    },
    closed: {
      label: "Closed Issues",
      color: "hsl(var(--chart-2))",
    },
    active: {
      label: "Active Issues",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Issue Status Chart</CardTitle>
        <CardDescription>Completed, Active, and Total Issues</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 70, // Increased space for larger Y-axis labels
              right: 10,
              top: 10,
              bottom: 10,
            }}
            height={50} // Adjusted the chart height for a more compact view
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 14 }} // Increased font size of Y-axis labels
            />
            <Tooltip />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Adjusted bar size for reduced spacing */}
            <Bar dataKey="value" fill="#007BFF" radius={10} barSize={40} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default IssueChart;
