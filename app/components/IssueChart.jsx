"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient"; // Import your Supabase client for my personala testing add we can use  if we need to present
// import axios from "axios"; // this is axio for end points comment it out and comment the abave when you link to tech valleys db

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const IssueChart = () => {
  // Updated chart data with completed, active, and total issues
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchIssuesCounts = async () => {
      // Call the SQL function
      const { data, error } = await supabase.rpc("get_issues_count");

      if (error) {
        console.error("Error fetching issue counts:", error);
        return;
      }

      // Transform data for the chart
      const formattedData = [
        {
          category: "YTS Issues",
          value: data.find((item) => item.status === "YTS")?.count || 0,
        },
        {
          category: "Ongoing Issues",
          value: data.find((item) => item.status === "Ongoing")?.count || 0,
        },
        {
          category: "Closed Issues",
          value: data.find((item) => item.status === "Closed")?.count || 0,
        },
      ];

      setChartData(formattedData);
    };

    fetchIssuesCounts();
  }, []);
  const chartConfig = {
    total: {
      label: "YTS Issues",
      color: "hsl(var(--chart-1))",
    },
    closed: {
      label: "Closed Issues",
      color: "hsl(var(--chart-2))",
    },
    active: {
      label: "Ongoing Issues",
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
              left: 5, // Increased space for larger Y-axis labels
              right: 5,
              top: 5,
              bottom: 5,
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
              tick={{ fontSize: 10 }} // Increased font size of Y-axis labels
            />
            <Tooltip />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Adjusted bar size for reduced spacing */}
            <Bar dataKey="value" fill="#007BFF" radius={25} barSize={40} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col justify-between items-center w-full">
          <div className="text-sm font-medium text-gray-400 text-center">
            Showing current issues in system
          </div>
          <div className="text-sm font-medium text-gray-400">
            Last updated: Today
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IssueChart;
