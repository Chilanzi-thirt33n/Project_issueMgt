"use client"; // Ensures this component works as a client-side component

import Link from "next/link";
import { usePathname } from "next/navigation"; // For active link support
import { useState } from "react"; // For dropdown toggle state
import {
  FaHome,
  FaBug,
  FaChartBar,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"; // Icons from React Icons
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Sidebar = () => {
  const pathname = usePathname(); // Get current path for active link highlighting

  // Styling for main menu links
  const linkStyle = (isActive) =>
    `flex items-center space-x-2 p-2 rounded-md transition ${
      isActive
        ? "bg-blue-700 text-white" // Active link for main menu
        : "text-gray-300 hover:bg-gray-700 hover:text-white" // Hover state
    }`;

  return (
    <nav className="bg-black h-full rounded-xl p-4 flex flex-col justify-between">
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-white text-center">
          issue management
        </h1>
        <hr className="border-gray-700 w-full" />
        <ul className="space-y-2">
          {/* Overview */}
          <li>
            <Link
              href="/dashboard"
              className={linkStyle(pathname === "/dashboard")}
            >
              <FaHome className="shrink-0" />
              <span>Overview</span>
            </Link>
          </li>

          {/* Issue Management */}
          <li>
            <Link
              href="/dashboard/IssueManagment"
              className={linkStyle(pathname === "/dashboard/IssueManagment")}
            >
              <FaBug className="shrink-0" />
              <span>Issue Management</span>
            </Link>
          </li>
          <li>
            <Link
                href="/dashboard/Reports"
                className={linkStyle(pathname === "/dashboard/Reports")}
            >
              <FaChartBar  className="shrink-0" />
              <span>Reports</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Sign Out */}
      <LogoutLink  className={"text-white flex flex-row gap-3 w-full py-2 justify-center items-start rounded-md bg-[#171717] hover:bg-blue-700"}>
        <FaSignOutAlt size={20} />
        <p>Sign Out</p>
      </LogoutLink>


    </nav>
  );
};

export default Sidebar;
