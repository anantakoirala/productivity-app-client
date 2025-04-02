"use client";
import { RootState } from "@/redux/store";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BreadCrumbNav = () => {
  const paths = usePathname();
  const [manualBreadCrumb, setManualBreadCrumb] = useState<string[]>([""]);
  const { activeWorkSpaceName } = useSelector(
    (state: RootState) => state.workspace
  );
  const pathNames = paths
    .split("/")
    .filter((path) => path !== "workspace" && path.trim() !== "");

  useEffect(() => {
    if (paths) {
      const splited = paths.split("/");

      if (splited.includes("workspace")) {
        setManualBreadCrumb([activeWorkSpaceName]);
      } else {
        setManualBreadCrumb([]);
      }
    }
  }, [paths]);

  if (pathNames.length > 0) {
    return (
      <div className="flex items-center gap-1 md:gap-0.5 overflow-x-auto whitespace-nowrap p-2 md:p-0 text-sm sm:text-base">
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
                  {manualBreadCrumb
                    ? activeWorkSpaceName.toUpperCase()
                    : path.toUpperCase()}
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
