"use client";
import { RootState } from "@/redux/store";
import { useLazyGetAllWorkspacesQuery } from "@/redux/Workspace/workspaceApi";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { setActiveWorkspace } from "@/redux/Workspace/workspaceSlice";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

const Workspaces = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [trigger, { isLoading }] = useLazyGetAllWorkspacesQuery();
  const { workspaces, activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  useEffect(() => {
    trigger({});
  }, []);

  return (
    <div className="flex flex-col gap-1.5  max-h-72">
      <div className="h-full p-1 hide-scrollbar overflow-y-auto">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            onClick={() => {
              dispatch(
                setActiveWorkspace({ id: workspace.id, name: workspace.name })
              );
              router.push(`/dashboard/workspace/${workspace.id}`);
            }}
            className={`w-10 h-10 bg-muted mb-1 flex items-center justify-center rounded-sm cursor-pointer  ${
              activeWorkspaceId === workspace.id ? "bg-primary " : ""
            }`}
          >
            {workspace.image ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${workspace.image}`} // Adjust the path based on your setup
                        alt={workspace.name}
                        width={40}
                        height={40}
                        className="rounded-sm object-cover w-full h-full"
                        priority
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      <p>{workspace.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-lg font-semibold w-full h-full flex items-center justify-center">
                        {workspace.name[0].toUpperCase()}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      <p>{workspace.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspaces;
