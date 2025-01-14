"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Format date to word form
const formatDateToWords = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const TrendChart = () => {
  //initail data for testing
  const [chartData, setChartData] = useState([
    { date: "2024-04-01", open_issues: 50, closed_issues: 9 },
    { date: "2024-04-02", open_issues: 18, closed_issues: 12 },
    { date: "2024-04-03", open_issues: 5, closed_issues: 9 },
    { date: "2024-04-04", open_issues: 6, closed_issues: 3 },
    { date: "2024-04-05", open_issues: 13, closed_issues: 8 },
    { date: "2024-04-06", open_issues: 4, closed_issues: 20 },
    { date: "2024-04-07", open_issues: 13, closed_issues: 17 },
    { date: "2024-04-08", open_issues: 10, closed_issues: 8 },
    { date: "2024-04-09", open_issues: 70, closed_issues: 19 },
    { date: "2024-04-11", open_issues: 90, closed_issues: 10 },
    { date: "2024-04-12", open_issues: 20, closed_issues: 12 },
    { date: "2024-04-13", open_issues: 21, closed_issues: 23 },
    { date: "2024-04-14", open_issues: 22, closed_issues: 24 },
    { date: "2024-04-12", open_issues: 2, closed_issues: 22 },
    { date: "2024-04-13", open_issues: 10, closed_issues: 30 },
    { date: "2024-04-14", open_issues: 20, closed_issues: 20 },
  ]);
  const [period, setPeriod] = useState("7d");

  const filteredData = useMemo(() => {
    const periodDataMap = {
      "7d": chartData.slice(-7),
      "30d": chartData.slice(-30),
      "60d": chartData.slice(-60),
      "90d": chartData.slice(-90),
    };

    return (
      periodDataMap[period]?.map((item) => ({
        ...item,
        date: formatDateToWords(item.date),
      })) || chartData
    );
  }, [period, chartData]);

  return (
    <Card className="w-full col-span-2 flex flex-col justify-evenly items-center">
      <CardHeader className="self-start">
        <CardTitle>Issue Traffic (Open Issues)</CardTitle>
        <CardDescription>
          Track the open and closed issues over time.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="space-y-8 flex flex-col justify-end">
          <div className="flex flex-row  w-1/4 ">
            <Select
              value={period}
              onValueChange={setPeriod}
              className=" bg-transparent border-none"
            >
              <SelectTrigger className=" p-2 rounded-md focus:ring-2 ">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="60d">60 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="0.2 0.2" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip tick={{ fontSize: 12 }} />
              {/* Open Issues Area - Light Faded Red */}
              <Area
                type="monotone"
                dataKey="open_issues"
                stroke="#ff6f61" // Light faded red border
                fill="rgba(255, 111, 97, 0.2)" // Light faded red fill with transparency
              />
              {/* Closed Issues Area - Light Faded Blue */}
              <Area
                type="monotone"
                dataKey="closed_issues"
                stroke="#66aaff" // Light faded blue border
                fill="rgba(102, 170, 255, 0.2)" // Light faded blue fill with transparency
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row justify-center gap-10 text-sm text-muted-foreground">
          <div className="flex items-center">
            <span
              className="w-4 h-4"
              style={{ backgroundColor: "#ff6f61", marginRight: "5px" }}
            ></span>
            Open Issues
          </div>
          <div className="flex items-center">
            <span
              className="w-4 h-4"
              style={{ backgroundColor: "#66aaff", marginRight: "5px" }}
            ></span>
            Closed Issues
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrendChart;
