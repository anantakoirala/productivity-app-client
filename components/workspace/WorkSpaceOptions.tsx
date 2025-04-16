"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, PencilRuler, Workflow } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLazyGetWorkspaceTasksQuery } from "@/redux/Workspace/workspaceApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {};

const WorkSpaceOptions = (props: Props) => {
  const [openTask, setIsOpenTask] = useState<boolean>(false);
  const [openMindMap, setIsOpenMindMap] = useState<boolean>(false);

  const { activeWorkspaceId, workspaceTasks, workspaceMindMaps } = useSelector(
    (state: RootState) => state.workspace
  );
  const [trigger, { isLoading }] = useLazyGetWorkspaceTasksQuery();

  return (
    <div>
      <p className="text-xs sm:text-sm uppercase text-muted-foreground">
        Shortcuts
      </p>
      <Button
        onClick={() => {
          setIsOpenTask((prev) => !prev);
        }}
        variant={"ghost"}
        size={"sm"}
        className="w-full justify-between"
      >
        <div className="flex items-center justify-center gap-2">
          <PencilRuler size={15} />
          Tasks
        </div>
        {openTask ? <ChevronUp /> : <ChevronDown />}
      </Button>

      {/* Tasks */}
      <div className="ml-4 text-sm my-1">
        {openTask && (
          <>
            {workspaceTasks &&
              workspaceTasks.map((task) => (
                <Link
                  href={`/dashboard/workspace/${activeWorkspaceId}/tasks/task/${task.id}`}
                  key={task.id}
                  className={cn(
                    "flex flex-row gap-2 w-full  rounded-sm h-7 px-2 text-sm items-center hover:bg-muted transition-colors duration-100"
                  )}
                >
                  <span>{task.emoji}</span>
                  <span className="truncate">{task.title}</span>
                </Link>
              ))}
          </>
        )}
      </div>
      <Button
        onClick={() => {
          setIsOpenMindMap((prev) => !prev);
        }}
        variant={"ghost"}
        size={"sm"}
        className="w-full justify-between"
      >
        <div className="flex items-center justify-center gap-2">
          <Workflow size={15} />
          MindMaps
        </div>
        {openMindMap ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {/* Mind map */}
      <div className="ml-4 text-sm my-1">
        {openMindMap && (
          <>
            {workspaceMindMaps &&
              workspaceMindMaps.map((mindmap) => (
                <Link
                  href={`/dashboard/workspace/${activeWorkspaceId}/mind-maps/mind-map/${mindmap.id}`}
                  key={mindmap.id}
                  className={cn(
                    "flex flex-row gap-2 w-full  rounded-sm h-7 px-2 text-sm items-center hover:bg-muted transition-colors duration-100"
                  )}
                >
                  <span className="truncate">{mindmap.title}</span>
                </Link>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkSpaceOptions;
