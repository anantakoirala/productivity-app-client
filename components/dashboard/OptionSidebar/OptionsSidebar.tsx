"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import Settings from "../Settings";
import WorkSpaceSettings from "../../workspace/WorkSpaceSettings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import WorkSpaceOptions from "../../workspace/WorkSpaceOptions";
import AddNewTask from "./AddNewTask";
import AddNewMindMap from "./AddNewMindMap";
import PomodoroOptions from "@/components/Pomodoro/PomodoroOptions";
import AddNewProject from "./AddNewProject";
import WorkspaceProjects from "./WorkspaceProjects";

type Props = {};

const OptionsSidebar = (props: Props) => {
  const { workspace_id } = useParams();
  const pathName = usePathname();
  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  // Remove option sidebar
  if (
    pathName === "/dashboard" ||
    pathName.includes(`/dashboard/workspace/${workspace_id}/tasks/task`)
  )
    return null;
  return (
    <div className="border-r w-64 h-full p-4 sm:py-6">
      {pathName.includes("/dashboard/settings") && <Settings />}

      {!pathName.includes(`/dashboard/pomodoro`) &&
        !pathName.includes(`/dashboard/settings`) && (
          <>
            <WorkSpaceOptions />
            {/* <WorkSpaceSettings /> */}
            <div className="">
              <p className="text-xs sm:text-sm uppercase text-muted-foreground">
                Actions
              </p>
              <div className="flex flex-col gap-2 w-full mt-1">
                <AddNewTask />
                <AddNewMindMap />
                <AddNewProject />
              </div>
            </div>
            <div className="mt-1">
              <p className="text-xs sm:text-sm uppercase text-muted-foreground">
                Projects
              </p>
              <WorkspaceProjects />
            </div>
          </>
        )}
      {pathName === `/dashboard/workspace/${activeWorkspaceId}/tasks` && (
        <p className="text-red-500">Tasks</p>
      )}
      {pathName.includes(`/dashboard/pomodoro`) && <PomodoroOptions />}
    </div>
  );
};

export default OptionsSidebar;
