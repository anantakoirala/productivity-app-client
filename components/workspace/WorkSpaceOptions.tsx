"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  ChartArea,
  ChevronDown,
  ChevronUp,
  Hourglass,
  MessageSquare,
  PencilRuler,
  TagIcon,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLazyGetWorkspaceTasksQuery } from "@/redux/Workspace/workspaceApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

type Props = {};

const WorkSpaceOptions = (props: Props) => {
  const router = useRouter();
  const [openTask, setIsOpenTask] = useState<boolean>(false);
  const [openMindMap, setIsOpenMindMap] = useState<boolean>(false);

  const {
    activeWorkspaceId,
    workspaceTasks,
    workspaceMindMaps,
    conversationId,
  } = useSelector((state: RootState) => state.workspace);
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
          Today&apos;s Tasks
        </div>

        {openTask ? <ChevronUp /> : <ChevronDown />}
      </Button>

      {/* Tasks */}
      <div className="ml-4 text-sm my-1 ">
        {openTask && (
          <>
            {workspaceTasks.length === 0 ? (
              <div className="w-full min-h-7 bg-accent flex items-center justify-center ">
                No tasks
              </div>
            ) : (
              <div className="min-h-7 max-h-48 bg-accent overflow-y-auto rounded-sm">
                {workspaceTasks &&
                  workspaceTasks.map((task) => (
                    <Link
                      href={`/dashboard/workspace/${activeWorkspaceId}/tasks/task/${task.id}`}
                      key={task.id}
                      className={cn(
                        "flex flex-row gap-2 w-full  rounded-sm h-7 px-2 text-sm items-center hover:bg-primary/30 transition-colors duration-100"
                      )}
                    >
                      <span>{task.emoji}</span>
                      <span className="truncate">{task.title}</span>
                    </Link>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
      {/* Mindmap */}
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
            <div className="min-h-7 max-h-48 bg-accent overflow-y-auto rounded-sm">
              {workspaceMindMaps &&
                workspaceMindMaps.map((mindmap) => (
                  <Link
                    href={`/dashboard/workspace/${activeWorkspaceId}/mind-maps/mind-map/${mindmap.id}`}
                    key={mindmap.id}
                    className={cn(
                      "flex flex-row gap-2 w-full  rounded-sm h-7 px-2 text-sm items-center hover:bg-primary/30 transition-colors duration-100"
                    )}
                  >
                    <span className="truncate">{mindmap.title}</span>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
      {/* Chat */}
      <Button
        onClick={() => {
          if (conversationId) {
            router.push(
              `/dashboard/workspace/${activeWorkspaceId}/chat/${conversationId}`
            );
          }
        }}
        variant={"ghost"}
        size={"sm"}
        className="w-full justify-between mt-1"
      >
        <div className="flex items-center justify-center gap-2">
          <MessageSquare size={15} />
          Chat
        </div>
      </Button>
      {/* Assigned to me */}
      <Button
        onClick={() => {
          router.push(
            `/dashboard/workspace/${activeWorkspaceId}/assigned-to-me`
          );
        }}
        variant={"ghost"}
        size={"sm"}
        className="w-full justify-between mt-1"
      >
        <div className="flex items-center justify-center gap-2">
          <Hourglass size={15} />
          Assigned to me
        </div>
      </Button>
      {/* Labels */}
      <Button
        onClick={() => {
          router.push(`/dashboard/workspace/${activeWorkspaceId}/labels`);
        }}
        variant={"ghost"}
        size={"sm"}
        className="w-full justify-between mt-1"
      >
        <div className="flex items-center justify-center gap-2">
          <TagIcon size={15} />
          Labels
        </div>
      </Button>
    </div>
  );
};

export default WorkSpaceOptions;
