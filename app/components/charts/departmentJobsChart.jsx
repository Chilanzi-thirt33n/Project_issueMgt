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
import { ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Initial Data with Areas split into Area 1, Area 2, and Area 3
const initialData = [
  {
    section: "Mechanical",
    completed: 10,
    ongoing: 5,
    date: "2024-01-10",
    area: "Area 1",
    phase: "Phase 1",
  },
  {
    section: "Electrical",
    completed: 15,
    ongoing: 2,
    date: "2024-01-10",
    area: "Area 2",
    phase: "Phase 2",
  },
  {
    section: "Instrumentation",
    completed: 8,
    ongoing: 3,
    date: "2024-01-10",
    area: "Area 1",
    phase: "Phase 2",
  },
  {
    section: "Operations",
    completed: 12,
    ongoing: 6,
    date: "2024-01-10",
    area: "Area 3",
    phase: "Phase 1",
  },
  {
    section: "Mechanical",
    completed: 18,
    ongoing: 3,
    date: "2024-01-11",
    area: "Area 2",
    phase: "Phase 2",
  },
  {
    section: "Electrical",
    completed: 22,
    ongoing: 1,
    date: "2024-01-11",
    area: "Area 1",
    phase: "Phase 1",
  },
  {
    section: "Instrumentation",
    completed: 14,
    ongoing: 5,
    date: "2024-01-11",
    area: "Area 3",
    phase: "Phase 2",
  },
  {
    section: "Operations",
    completed: 16,
    ongoing: 4,
    date: "2024-01-11",
    area: "Area 2",
    phase: "Phase 1",
  },
  {
    section: "Mechanical",
    completed: 20,
    ongoing: 1,
    date: "2024-01-12",
    area: "Area 1",
    phase: "Phase 3",
  },
  {
    section: "Electrical",
    completed: 18,
    ongoing: 4,
    date: "2024-01-12",
    area: "Area 2",
    phase: "Phase 3",
  },
  {
    section: "Instrumentation",
    completed: 16,
    ongoing: 2,
    date: "2024-01-12",
    area: "Area 3",
    phase: "Phase 1",
  },
  {
    section: "Operations",
    completed: 18,
    ongoing: 3,
    date: "2024-01-12",
    area: "Area 1",
    phase: "Phase 2",
  },
  {
    section: "Mechanical",
    completed: 14,
    ongoing: 6,
    date: "2024-01-13",
    area: "Area 2",
    phase: "Phase 1",
  },
  {
    section: "Electrical",
    completed: 24,
    ongoing: 2,
    date: "2024-01-13",
    area: "Area 1",
    phase: "Phase 2",
  },
  {
    section: "Instrumentation",
    completed: 20,
    ongoing: 1,
    date: "2024-01-13",
    area: "Area 3",
    phase: "Phase 3",
  },
  {
    section: "Operations",
    completed: 22,
    ongoing: 3,
    date: "2024-01-13",
    area: "Area 2",
    phase: "Phase 2",
  },
  {
    section: "Mechanical",
    completed: 28,
    ongoing: 2,
    date: "2024-01-14",
    area: "Area 1",
    phase: "Phase 2",
  },
  {
    section: "Electrical",
    completed: 30,
    ongoing: 1,
    date: "2024-01-14",
    area: "Area 3",
    phase: "Phase 1",
  },
  {
    section: "Instrumentation",
    completed: 25,
    ongoing: 4,
    date: "2024-01-14",
    area: "Area 2",
    phase: "Phase 3",
  },
  {
    section: "Operations",
    completed: 30,
    ongoing: 5,
    date: "2024-01-14",
    area: "Area 1",
    phase: "Phase 1",
  },
];

// Chart configuration for completed and ongoing jobs
const chartConfig = {
  completed: {
    label: "Completed Jobs",
    color: "hsl(200, 100%, 50%)", // Blue
  },
  ongoing: {
    label: "Ongoing Jobs",
    color: "hsl(120, 100%, 40%)", // Green
  },
};

function JobStatusChart() {
  const [selectedDate, setSelectedDate] = useState("2024-01-10");
  const [selectedArea, setSelectedArea] = useState("Area 1");
  const [selectedPhase, setSelectedPhase] = useState("Phase 1");
  const [selectedSections, setSelectedSections] = useState([
    "Mechanical",
    "Electrical",
    "Instrumentation",
    "Operations",
  ]);

  // Filter data based on selected filters
  const filteredData = initialData.filter(
    (data) =>
      data.date === selectedDate &&
      data.area === selectedArea &&
      data.phase === selectedPhase &&
      selectedSections.includes(data.section),
  );

  // Handle section selection for filtering
  const handleSectionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSections((prevSelectedSections) =>
      checked
        ? [...prevSelectedSections, value]
        : prevSelectedSections.filter((section) => section !== value),
    );
  };

  // Get unique dates for the date filter
  const uniqueDates = Array.from(new Set(initialData.map((data) => data.date)));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Status per Section</CardTitle>
        <CardDescription>
          Display the number of completed and ongoing jobs per section
          (Mechanical, Electrical, Instrumentation, Operations) with filters for
          date, area, and phase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Date Filter */}
          <div>
            <Select
              value={selectedDate}
              onValueChange={(value) => setSelectedDate(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                {uniqueDates.map((date, index) => (
                  <SelectItem key={index} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Filter */}
          <div>
            <Select
              value={selectedArea}
              onValueChange={(value) => setSelectedArea(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Area 1">Area 1</SelectItem>
                <SelectItem value="Area 2">Area 2</SelectItem>
                <SelectItem value="Area 3">Area 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phase Filter */}
          <div>
            <Select
              value={selectedPhase}
              onValueChange={(value) => setSelectedPhase(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phase 1">Phase 1</SelectItem>
                <SelectItem value="Phase 2">Phase 2</SelectItem>
                <SelectItem value="Phase 3">Phase 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap gap-4 mb-4">
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
            <Bar
              dataKey="completed"
              fill={chartConfig.completed.color}
              name={chartConfig.completed.label}
            />
            <Bar
              dataKey="ongoing"
              fill={chartConfig.ongoing.color}
              name={chartConfig.ongoing.label}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default JobStatusChart;
