"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

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
const initialData = [
  { section: "Mechanical", completed: 10, ongoing: 5, date: "2024-01-10" },
  { section: "Electrical", completed: 15, ongoing: 2, date: "2024-01-10" },
  { section: "Instrumentation", completed: 8, ongoing: 3, date: "2024-01-10" },
  { section: "Operations", completed: 12, ongoing: 6, date: "2024-01-10" },
  { section: "Mechanical", completed: 14, ongoing: 3, date: "2024-01-11" },
  { section: "Electrical", completed: 18, ongoing: 4, date: "2024-01-11" },
  { section: "Instrumentation", completed: 10, ongoing: 2, date: "2024-01-11" },
  { section: "Operations", completed: 13, ongoing: 4, date: "2024-01-11" },
  { section: "Mechanical", completed: 16, ongoing: 2, date: "2024-01-12" },
  { section: "Electrical", completed: 20, ongoing: 1, date: "2024-01-12" },
  { section: "Instrumentation", completed: 12, ongoing: 4, date: "2024-01-12" },
  { section: "Operations", completed: 14, ongoing: 3, date: "2024-01-12" },
  { section: "Mechanical", completed: 18, ongoing: 1, date: "2024-01-13" },
  { section: "Electrical", completed: 22, ongoing: 2, date: "2024-01-13" },
  { section: "Instrumentation", completed: 15, ongoing: 5, date: "2024-01-13" },
  { section: "Operations", completed: 16, ongoing: 3, date: "2024-01-13" },
];

const chartConfig = {
  completed: {
    label: "Completed Jobs",
    color: "hsl(var(--chart-1))",
  },
  ongoing: {
    label: "Ongoing Jobs",
    color: "hsl(var(--chart-2))",
  },
};

function JobStatusChart() {
  const [selectedDate, setSelectedDate] = useState("2024-01-10");
  const [selectedSections, setSelectedSections] = useState([
    "Mechanical",
    "Electrical",
    "Instrumentation",
    "Operations",
  ]);

  // Filter the data based on selected date and sections
  const filteredData = initialData.filter(
    (data) =>
      data.date === selectedDate && selectedSections.includes(data.section),
  );

  const handleSectionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSections((prevSelectedSections) =>
      checked
        ? [...prevSelectedSections, value]
        : prevSelectedSections.filter((section) => section !== value),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Status per Section</CardTitle>
        <CardDescription>
          Display the number of completed and ongoing jobs per section
          (Mechanical, Electrical, Instrumentation, Operations).
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Date Filter */}
        <div className="flex gap-4 mb-4">
          <Select
            value={selectedDate}
            onValueChange={(value) => setSelectedDate(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-01-10">2024-01-10</SelectItem>
              <SelectItem value="2024-01-11">2024-01-11</SelectItem>
              <SelectItem value="2024-01-12">2024-01-12</SelectItem>
              <SelectItem value="2024-01-13">2024-01-13</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Department Filter */}
        <div className="flex gap-4 mb-4">
          <label>
            <input
              type="checkbox"
              value="Mechanical"
              checked={selectedSections.includes("Mechanical")}
              onChange={handleSectionChange}
            />
            Mechanical
          </label>
          <label>
            <input
              type="checkbox"
              value="Electrical"
              checked={selectedSections.includes("Electrical")}
              onChange={handleSectionChange}
            />
            Electrical
          </label>
          <label>
            <input
              type="checkbox"
              value="Instrumentation"
              checked={selectedSections.includes("Instrumentation")}
              onChange={handleSectionChange}
            />
            Instrumentation
          </label>
          <label>
            <input
              type="checkbox"
              value="Operations"
              checked={selectedSections.includes("Operations")}
              onChange={handleSectionChange}
            />
            Operations
          </label>
        </div>

        {/* Chart */}
        <ChartContainer config={chartConfig}>
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="section" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#1E90FF" name="Completed Jobs" />
            <Bar dataKey="ongoing" fill="#32CD32" name="Ongoing Jobs" />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Section: ${value}`}
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

export default JobStatusChart;
