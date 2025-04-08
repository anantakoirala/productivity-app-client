"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CommandContainer from "./CommandContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Tag } from "@/types/Tag";
import { CustomColors } from "@/constants/CustomColors";

type Props = {
  onSelectActiveTags: (tag: Tag) => void;
  currentActiveTags: Tag[];
  onUpdateActiveTags: (id: number, name: string, color: CustomColors) => void;
};

const TagSelector = ({
  onSelectActiveTags,
  currentActiveTags,
  onUpdateActiveTags,
}: Props) => {
  const { workspaceTags } = useSelector((state: RootState) => state.workspace);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5 "
          variant={"outline"}
          size={"sm"}
        >
          <Plus size={16} className="" />
          <span className="hidden sm:inline">New Tag</span>
          <span className="sm:hidden">Tag</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {workspaceTags ? (
          <CommandContainer
            tags={workspaceTags}
            onSelectActiveTags={onSelectActiveTags}
            currentActiveTags={currentActiveTags}
            onUpdateActiveTags={onUpdateActiveTags}
          />
        ) : (
          <div>Loading...</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagSelector;
