"use client";

import React, { useMemo, useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client

const chartConfig = {
  issues: {
    label: "Issues",
  },
  class1: {
    label: "Class 1",
    color: "#AED6F1", // Lighter Blue
  },
  class2: {
    label: "Class 2",
    color: "#5DADE2", // Medium Blue
  },
  class3: {
    label: "Class 3",
    color: "#2980B9", // Darker Blue
  },
  class4: {
    label: "Class 4",
    color: "#1F618D", // Even Darker Blue
  },
};

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  // Fetch classification data from Supabase via RPC (remote procedure call)
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc(
        "get_issue_counts_by_classification",
      ); // Replace with your custom SQL function name

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        const formattedData = data.map((item) => ({
          classification: item.classification,
          issues: item.count,
          fill: getFillColor(item.classification), // Set the color based on classification
        }));
        setChartData(formattedData);
      }
    };

    fetchData();
  }, []);

  const totalIssues = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.issues, 0);
  }, [chartData]);

  // Helper function to get the fill color based on the classification
  const getFillColor = (classification) => {
    switch (classification) {
      case "class 1":
        return "#AED6F1"; // Lighter Blue
      case "class 2":
        return "#5DADE2"; // Medium Blue
      case "class 3":
        return "#2980B9"; // Darker Blue
      case "class 4":
        return "#1F618D"; // Even Darker Blue
      default:
        return "#D4E6F1"; // Default color (light blue) if classification is unknown
    }
  };

  return (
    <Card className="flex flex-col w-full">
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
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <ul className="leading-none text-muted-foreground flex flex-row space-x-3 justify-center items-end">
          {chartData.map((item, index) => (
            <li
              key={index}
              className="flex flex-row gap-2 justify-center items-center"
            >
              <span
                className="h-5 w-5 rounded-s"
                style={{ backgroundColor: item.fill }}
              ></span>
              <p className="text-muted-foreground">{item.classification}</p>
            </li>
          ))}
        </ul>
        <div className="leading-none text-muted-foreground">classification</div>
      </CardFooter>
    </Card>
  );
};

export default PieChartComponent;
