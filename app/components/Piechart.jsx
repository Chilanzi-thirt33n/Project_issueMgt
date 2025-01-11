"use client";

import React, { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

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

// this should be updated with database data
const chartData = [
  { classification: "Class 1", issues: 10, fill: "#4A90E2" }, // Blue 1
  { classification: "Class 2", issues: 20, fill: "#5DADE2" }, // Blue 2
  { classification: "Class 3", issues: 29, fill: "#85C1E9" }, // Blue 3
  { classification: "Class 4", issues: 40, fill: "#D4E6F1" }, // Light Blue
];

// Chart hex colors
const chartConfig = {
  issues: {
    label: "Issues",
  },
  class1: {
    label: "Class 1",
    color: "#4A90E2", // Blue 1
  },
  class2: {
    label: "Class 2",
    color: "#5DADE2", // Blue 2
  },
  class3: {
    label: "Class 3",
    color: "#85C1E9", // Blue 3
  },
  class4: {
    label: "Class 4",
    color: "#D4E6F1", // Light Blue
  },
};

const PieChartComponent = () => {
  const totalIssues = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.issues, 0);
  }, []);

  return (
    <Card className="flex flex-col w-full  ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Issue Classification</CardTitle>
        <CardDescription>Overview of Issue Classes</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="issues"
              nameKey="classification"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalIssues.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Issues
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <ul className="leading-none text-muted-foreground flex flex-row space-x-3 justify-center items-end">
          <li className="flex flex-row gap-2 justify-center items-center">
            <span className="h-5 w-5 rounded-s bg-[#4A90E2] "></span>{" "}
            <p className="text-muted-foreground">Class 1</p>
          </li>
          <li className="flex flex-row gap-2 justify-center items-center">
            <span className="h-5 w-5 rounded-s bg-[#5DADE2] "></span>{" "}
            <p className="text-muted-foreground">Class 2</p>
          </li>
          <li className="flex flex-row gap-2 justify-center items-center">
            <span className="h-5 w-5 rounded-s bg-[#85C1E9] "></span>{" "}
            <p className="text-muted-foreground">Class 3</p>
          </li>
          <li className="flex flex-row gap-2 justify-center items-center">
            <span className="h-5 w-5 rounded-s bg-[#D4E6F1] "></span>{" "}
            <p className="text-muted-foreground">Class 4</p>
          </li>
        </ul>
        <div className="leading-none text-muted-foreground">classifiction</div>
      </CardFooter>
    </Card>
  );
};

export default PieChartComponent;
