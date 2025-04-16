"use client";
import AssignUserCommandContainer from "@/components/tasks/AssignUser/AssignUserCommandContainer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLazyGetWorkspaceSubscribersQuery } from "@/redux/Workspace/workspaceApi";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AssignUserToMindMapCommandCotainer from "./AssignUserToMindMapCommandCotainer";

type Props = {};

const AssignUserToMindmap = (props: Props) => {
  const { workspace_id } = useParams();
  const [openDropdownMenu, setOpenDropDownMenu] = useState<boolean>(false);
  const [trigger, { isLoading }] = useLazyGetWorkspaceSubscribersQuery();

  useEffect(() => {
    const fetchWorkspaceUser = async () => {
      if (openDropdownMenu) {
        const response = await trigger({ workspaceId: workspace_id }).unwrap();
        console.log("response", response);
      }
    };
    fetchWorkspaceUser();
  }, [openDropdownMenu]);
  return (
    <DropdownMenu open={openDropdownMenu} onOpenChange={setOpenDropDownMenu}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          onClick={() => setOpenDropDownMenu((prev) => prev != prev)}
        >
          <Plus size={12} className="mr-1" />
          <span className="hidden sm:inline">Asign User</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoading ? (
          <>
            <div className="flex items-center justify-center text-xs w-[15rem]">
              Loading
            </div>
          </>
        ) : (
          <AssignUserToMindMapCommandCotainer />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AssignUserToMindmap;
