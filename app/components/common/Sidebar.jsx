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
  const [isReportsOpen, setIsReportsOpen] = useState(false); // State for dropdown menu

  // Styling for main menu links
  const linkStyle = (isActive) =>
    `flex items-center space-x-2 p-2 rounded-md transition ${
      isActive
        ? "bg-blue-700 text-white" // Active link for main menu
        : "text-gray-300 hover:bg-gray-700 hover:text-white" // Hover state
    }`;

  // Styling for dropdown menu links
  const dropdownLinkStyle = (isActive) =>
    `block p-2 transition ${
      isActive
        ? "bg-gray-800 text-white" // Active link for dropdown
        : "text-gray-300 hover:bg-gray-700 hover:text-white" // Hover state
    }`;

  return (
    <nav className="bg-black h-full rounded-xl p-4 flex flex-col justify-between">
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-white text-center">
          DEFECTS-LOGGER
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

          {/* Reports with Dropdown */}
          <li>
            <div
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition ${
                isReportsOpen
                  ? "bg-blue-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setIsReportsOpen(!isReportsOpen)}
            >
              <div className="flex items-center space-x-2">
                <FaChartBar className="shrink-0" />
                <span>Reports</span>
              </div>
              {isReportsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Dropdown Menu */}
            {isReportsOpen && (
              <ul className="pl-6 space-y-2">
                <li>
                  <Link
                    href="/dashboard/Reports"
                    className={dropdownLinkStyle(
                      pathname === "/dashboard/Reports",
                    )}
                  >
                    <span>Issue report</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/Reports/Charts"
                    className={dropdownLinkStyle(
                      pathname === "/dashboard/Reports/Charts",
                    )}
                  >
                    <span>Trend report</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/Reports/DetailedReports"
                    className={dropdownLinkStyle(
                      pathname === "/dashboard/Reports/DetailedReports",
                    )}
                  >
                    <span>Detailed report</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/Reports/AdminReports"
                    className={dropdownLinkStyle(
                      pathname === "/dashboard/Reports/AdminReports",
                    )}
                  >
                    <span>Admin report</span>
                  </Link>
                </li>
              </ul>
            )}
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
