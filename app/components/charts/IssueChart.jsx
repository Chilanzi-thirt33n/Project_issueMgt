"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip, LabelList } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Supabase client for personal testing
// import axios from "axios"; // Uncomment for endpoints when linked to Tech Valley's DB

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Issue Status Chart</CardTitle>
        <CardDescription>Completed, Active, and Total Issues</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 10, // Space for larger Y-axis labels
              right: 10, // Space for total values at the end
              top: 10,
              bottom: 10,
            }}
            height={200} // Fixed height for compact view
            width={400} // Fixed width to fit card
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 13 }}
            />
            <Tooltip />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="#007BFF" radius={6} barSize={30}>
              {/* Display total value at the end of each bar */}
              <LabelList
                dataKey="value"
                position="right"
                style={{
                  fill: "#333", // Text color for totals
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
            </Bar>
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
