"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Settings from "./Settings";
import WorkSpaceSettings from "../workspace/WorkSpaceSettings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {};

const OptionsSidebar = (props: Props) => {
  const pathName = usePathname();
  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );
  if (pathName === "/dashboard") return null;
  return (
    <div className="border-r w-64 h-full p-4 sm:py-6">
      {pathName.includes("/dashboard/settings") && <Settings />}

      {pathName === `/dashboard/workspace/${activeWorkspaceId}` && (
        <WorkSpaceSettings />
      )}
      {pathName === `/dashboard/workspace/${activeWorkspaceId}/tasks` && (
        <p className="text-red-500">Tasks</p>
      )}
    </div>
  );
};

export default OptionsSidebar;
