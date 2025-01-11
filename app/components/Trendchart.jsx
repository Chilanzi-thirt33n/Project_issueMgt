"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample chart data for issues added each month
const sampleChartData = [
  { month: "January", issues: 120 },
  { month: "February", issues: 150 },
  { month: "March", issues: 180 },
  { month: "April", issues: 200 },
  { month: "May", issues: 210 },
  { month: "June", issues: 250 },
];

export function IssuesChartComponent() {
  const [chartData, setChartData] = useState(sampleChartData);

  useEffect(() => {
    // Here you can fetch data from an API or any other source
    // For now, we'll just use the sample data above
    // Example API call (commented out):
    // fetch("/api/issues")
    //   .then((response) => response.json())
    //   .then((data) => setChartData(data));
    // For now, we’re using static data, as API integration is not included
  }, []);

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Issues Added Trend</CardTitle>
        <CardDescription>
          Track the number of issues added each month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Shorten month names
            />
            <Tooltip cursor={false} />
            <Area
              dataKey="issues"
              type="monotone"
              fill="rgba(30, 144, 255, 0.4)" // Blue fill color for chart area
              fillOpacity={0.4}
              stroke="rgba(30, 144, 255, 1)" // Blue stroke color for chart area
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 8.3% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default IssuesChartComponent;
