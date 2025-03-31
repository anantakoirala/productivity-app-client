"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Settings from "./Settings";

type Props = {};

const OptionsSidebar = (props: Props) => {
  const pathName = usePathname();
  if (pathName === "/dashboard") return null;
  return (
    <div className="border-r w-64 h-full p-4 sm:py-6">
      {pathName.includes("/dashboard/settings") && (
        <>
          <Settings />
        </>
      )}
    </div>
  );
};

export default OptionsSidebar;
