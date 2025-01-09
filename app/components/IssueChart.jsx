"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  { category: "Total Issues", value: 186 },
  { category: "Closed Issues", value: 150 },
  { category: "Active Issues", value: 36 },
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
              left: 30, // Adjusted for more space on the left
              right: 10,
              top: 10,
              bottom: 80,
            }}
            height={300} // Reduced height for a smaller graph
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Bars for total issues, closed issues, and active issues with blue color */}
            <Bar dataKey="value" fill="#007BFF" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default IssueChart;
