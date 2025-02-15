"use client";

import React from "react";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WelcomeCard = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <Card className="w-[25%]  bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>
            <h1 className="text-center text-2xl font-bold text-blue-600">
              Issue management
            </h1>
            <p className="text-center text-gray-700">
              version v0.0.1
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-3 justify-center mt-4">
            <LoginLink className={" bg-sky-700 hover:bg-sky-300 text-center text-gray-50 py-2 px-8 rounded font-bold"}>Log in</LoginLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeCard;
