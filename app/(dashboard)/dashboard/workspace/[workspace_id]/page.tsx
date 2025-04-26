"use client";
import MindMap from "@/components/mindmaps/MindMap";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/redux/store";
import { useLazyGetWorkspaceQuery } from "@/redux/Workspace/workspaceApi";
import { MessageSquare, PencilRuler, Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  params: {
    workspace_id: string;
  };
};

const Page = ({ params: { workspace_id } }: Props) => {
  const { activeWorkSpaceName, conversationId, activeWorkspaceId } =
    useSelector((state: RootState) => state.workspace);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      {activeWorkSpaceName}

      <div className="">
        <ScrollArea className="w-full">
          <div className="flex w-max space-x-4 pb-4 mt-4 xl:w-full">
            <Button
              onClick={() => {
                router.push(
                  `/dashboard/workspace/${activeWorkspaceId}/chat/${conversationId}`
                );
              }}
              className={`w-40 text-sm md:text-base md:w-52 h-14 p-2 roundedl-lg shadow-sm flex justify-center items-center gap-1 md:gap-2`}
            >
              <MessageSquare size={16} />
              Group Chat
            </Button>
            <Button
              className={`w-40 text-sm md:text-base md:w-52 h-14 p-2 roundedl-lg shadow-sm flex justify-center items-center gap-1 md:gap-2`}
            >
              <PencilRuler size={16} />
              User Role
            </Button>
            <Button
              className={`w-40 text-sm md:text-base md:w-52 h-14 p-2 roundedl-lg shadow-sm flex justify-center items-center gap-1 md:gap-2`}
            >
              <Workflow size={16} />
              New Task
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
