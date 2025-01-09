"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

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

// Updated chart data with completed, active, and total issues
const chartData = [
  { category: "Total Issues", value: 50 },
  { category: "Closed Issues", value: 45 },
  { category: "Active Issues", value: 5 },
];

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

const IssueChart = () => {
  return (
    <Card>
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
              left: 50, // Increased space for larger Y-axis labels
              right: 20,
              top: 20,
              bottom: 20,
            }}
            height={150} // Increased chart height for spacing
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
            <Bar dataKey="value" fill="#007BFF" radius={12} barSize={80} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default IssueChart;
