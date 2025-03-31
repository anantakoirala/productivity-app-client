"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumbNav = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path.trim() !== "");

  if (pathNames.length > 0) {
    return (
      <div className="flex items-center gap-1 md:gap-0.5 overflow-x-auto whitespace-nowrap p-2 md:p-0">
        {pathNames.map((path, i) => {
          const href = `/${pathNames.slice(0, i + 1).join("/")}`;
          return (
            <div key={i} className="flex flex-wrap items-center">
              {i + 1 < pathNames.length ? (
                <>
                  <Link
                    href={href}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-md px-1 md:px-2 text-xs md:text-sm truncate max-w-[100px] md:max-w-none"
                    title={path.toUpperCase()} // Tooltip for truncated text
                  >
                    {path.toUpperCase()}
                  </Link>
                  <ChevronRight className="text-primary w-4 h-4 md:w-5 md:h-5" />
                </>
              ) : (
                <p className="text-xs md:text-sm truncate max-w-[100px] md:max-w-none">
                  {path.toUpperCase()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

export default BreadCrumbNav;
