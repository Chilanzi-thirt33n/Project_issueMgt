"use client";

import { useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Static initial data (with more data added)
// Format of how data should be pulled
const initialData = [
  {
    shift: "Day",
    crew: "A",
    completedJobs: 16,
    totalJobs: 20,
    date: "2024-01-10",
  },
  {
    shift: "Day",
    crew: "B",
    completedJobs: 13,
    totalJobs: 20,
    date: "2024-01-10",
  },
  {
    shift: "Day",
    crew: "C",
    completedJobs: 15,
    totalJobs: 20,
    date: "2024-01-10",
  },
  {
    shift: "Night",
    crew: "A",
    completedJobs: 18,
    totalJobs: 20,
    date: "2024-01-10",
  },
  {
    shift: "Night",
    crew: "B",
    completedJobs: 10,
    totalJobs: 20,
    date: "2024-01-10",
  },
  {
    shift: "Night",
    crew: "C",
    completedJobs: 14,
    totalJobs: 20,
    date: "2024-01-10",
  },
  {
    shift: "Day",
    crew: "A",
    completedJobs: 17,
    totalJobs: 20,
    date: "2024-01-11",
  },
  {
    shift: "Day",
    crew: "B",
    completedJobs: 12,
    totalJobs: 20,
    date: "2024-01-11",
  },
  {
    shift: "Night",
    crew: "A",
    completedJobs: 19,
    totalJobs: 20,
    date: "2024-01-11",
  },
  {
    shift: "Day",
    crew: "A",
    completedJobs: 15,
    totalJobs: 20,
    date: "2024-01-12",
  },
  {
    shift: "Day",
    crew: "B",
    completedJobs: 14,
    totalJobs: 20,
    date: "2024-01-12",
  },
  {
    shift: "Day",
    crew: "C",
    completedJobs: 16,
    totalJobs: 20,
    date: "2024-01-12",
  },
  {
    shift: "Night",
    crew: "A",
    completedJobs: 17,
    totalJobs: 20,
    date: "2024-01-12",
  },
  {
    shift: "Night",
    crew: "B",
    completedJobs: 13,
    totalJobs: 20,
    date: "2024-01-12",
  },
  {
    shift: "Night",
    crew: "C",
    completedJobs: 14,
    totalJobs: 20,
    date: "2024-01-12",
  },
  {
    shift: "Day",
    crew: "A",
    completedJobs: 18,
    totalJobs: 20,
    date: "2024-01-13",
  },
  {
    shift: "Day",
    crew: "B",
    completedJobs: 14,
    totalJobs: 20,
    date: "2024-01-13",
  },
  {
    shift: "Night",
    crew: "A",
    completedJobs: 19,
    totalJobs: 20,
    date: "2024-01-13",
  },
  {
    shift: "Night",
    crew: "B",
    completedJobs: 10,
    totalJobs: 20,
    date: "2024-01-13",
  },
];

const chartConfig = {
  completedJobs: {
    label: "Completed Jobs",
    color: "hsl(var(--chart-1))",
  },
};

function JobCompletionChart() {
  const [selectedShift, setSelectedShift] = useState("Day");
  const [selectedCrew, setSelectedCrew] = useState("A");

  // Filter the data based on selected shift and crew
  const filteredData = initialData.filter(
    (data) => data.shift === selectedShift && data.crew === selectedCrew,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Completion per Shift and Crew</CardTitle>
        <CardDescription>
          Filter job completion data by shift and crew.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex gap-4 mb-4">
          {/* Shift Filter */}
          <Select
            value={selectedShift}
            onValueChange={(value) => setSelectedShift(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Day">Day</SelectItem>
              <SelectItem value="Night">Night</SelectItem>
            </SelectContent>
          </Select>

          {/* Crew Filter */}
          <Select
            value={selectedCrew}
            onValueChange={(value) => setSelectedCrew(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Crew" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Crew A</SelectItem>
              <SelectItem value="B">Crew B</SelectItem>
              <SelectItem value="C">Crew C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chart */}
        <ChartContainer config={chartConfig}>
          <BarChart data={filteredData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <Bar
              dataKey="completedJobs"
              fill="#1E90FF" // Blue color
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
              defaultIndex={0}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default JobCompletionChart;
