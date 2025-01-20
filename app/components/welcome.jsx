"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const WelcomeCard = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <Card className="w-[25%]  bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>
            <h1 className="text-center text-2xl font-bold text-blue-600">
              Defects Logger
            </h1>
            <p className="text-center text-gray-700">
              Welcome to the Defects Logger v0.0.1
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mt-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeCard;
