"use client"; // Indicate this is a client-side component

import { usePathname } from "next/navigation"; // Import the hook for the current pathname
import Link from "next/link"; // Import Next.js's Link component

const Breadcrumbs = () => {
  const pathname = usePathname(); // Get the current pathname
  const pathArray = pathname.split("/").filter((path) => path); // Split the pathname into segments

  // Create an array of breadcrumbs
  const breadcrumbs = pathArray.map((path, index) => {
    const href = `/${pathArray.slice(0, index + 1).join("/")}`; // Build the href for each breadcrumb

    // Capitalize the first letter of each word and replace "-" with space
    const label = path
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, href };
  });

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600 mb-4">
      <ol className="flex space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <Link href={breadcrumb.href}>
              <span className="text-blue-500 hover:underline capitalize">
                {breadcrumb.label}
              </span>
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
