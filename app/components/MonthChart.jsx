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
  // Sample data for testing
  const [chartData, setChartData] = useState([
    { date: "2024-04-01", yetToStart: 50, open_issues: 80, closed_issues: 9 },
    { date: "2024-04-02", yetToStart: 18, open_issues: 40, closed_issues: 12 },
    { date: "2024-04-03", yetToStart: 10, open_issues: 20, closed_issues: 9 },
    { date: "2024-04-04", yetToStart: 5, open_issues: 15, closed_issues: 3 },
    { date: "2024-04-05", yetToStart: 30, open_issues: 25, closed_issues: 8 },
    { date: "2024-04-06", yetToStart: 40, open_issues: 10, closed_issues: 20 },
    { date: "2024-04-07", yetToStart: 25, open_issues: 13, closed_issues: 17 },
    { date: "2024-04-08", yetToStart: 15, open_issues: 18, closed_issues: 8 },
    { date: "2024-04-09", yetToStart: 50, open_issues: 40, closed_issues: 19 },
    { date: "2024-04-10", yetToStart: 30, open_issues: 60, closed_issues: 10 },
    { date: "2024-04-11", yetToStart: 20, open_issues: 90, closed_issues: 10 },
    { date: "2024-04-12", yetToStart: 15, open_issues: 20, closed_issues: 12 },
    { date: "2024-04-13", yetToStart: 10, open_issues: 30, closed_issues: 23 },
    { date: "2024-04-14", yetToStart: 5, open_issues: 40, closed_issues: 24 },
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
        <CardTitle>Issue Traffic</CardTitle>
        <CardDescription>
          Track the open, closed, and unstarted issues over time.
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
              {/* Yet to Start Issues - Light Blue */}
              <Area
                type="monotone"
                dataKey="yetToStart"
                stroke="#add8e6" // Light Blue stroke color
                fill="rgba(173, 216, 230, 0.4)" // Light Blue fill color
              />
              {/* Open Issues - Light Green */}
              <Area
                type="monotone"
                dataKey="open_issues"
                stroke="#90ee90" // Light Green stroke color
                fill="rgba(144, 238, 144, 0.4)" // Light Green fill color
              />
              {/* Closed Issues - Light Yellow */}
              <Area
                type="monotone"
                dataKey="closed_issues"
                stroke="#ffff99" // Light Yellow stroke color
                fill="rgba(255, 255, 153, 0.4)" // Light Yellow fill color
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
              style={{ backgroundColor: "#add8e6", marginRight: "5px" }}
            ></span>
            Yet to Start
          </div>
          <div className="flex items-center">
            <span
              className="w-4 h-4"
              style={{ backgroundColor: "#90ee90", marginRight: "5px" }}
            ></span>
            Open Issues
          </div>
          <div className="flex items-center">
            <span
              className="w-4 h-4"
              style={{ backgroundColor: "#ffff99", marginRight: "5px" }}
            ></span>
            Closed Issues
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrendChart;
