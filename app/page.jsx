"use client";

import Link from "next/link";
import Copyright from "../app/components/CopyRight";

const CompanyDetails = {
  name: "TechValley",
  address: "123 Main St, Anytown, USA",
  phone: "555-555-5555",
  email: "info@company.com",
  website: "https://www.techvalleyzambia.com/",
};

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2 gap-1">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/vid.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="text-center text-white z-10">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome to Issue-Logger <em className="text-green-500"> (V.1.0.0)</em>
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          <Link href="/dashboard">Dashboard</Link>
        </button>
      </div>

      {/* Fixed Copyright Section */}
      <div className="absolute bottom-0 w-full py-4 bg-black bg-opacity-60 text-center text-white">
        <Copyright data={CompanyDetails} />
      </div>
    </div>
  );
}
