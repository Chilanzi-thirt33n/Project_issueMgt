"use client";

import Copyright from "../app/components/common/CopyRight";
import Welcome from "./components/common/welcome";

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
      <Welcome />

      {/* Fixed Copyright Section */}
      <div className="absolute bottom-0 w-full py-4 bg-black bg-opacity-60 text-center text-white">
        <Copyright data={CompanyDetails} />
      </div>
    </div>
  );
}
