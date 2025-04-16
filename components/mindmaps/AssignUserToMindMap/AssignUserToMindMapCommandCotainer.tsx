"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import AssignUserToMindMapCommandItem from "./AssignUserToMindMapCommandItem";

type Props = {};

const AssignUserToMindMapCommandCotainer = (props: Props) => {
  const { workspaceSubscribers } = useSelector(
    (state: RootState) => state.workspace
  );
  return (
    <Command className="w-[15rem]">
      <CommandInput className="text-xs" placeholder="Filter" />
      <CommandList>
        <CommandEmpty>No user</CommandEmpty>
        <CommandGroup>
          {workspaceSubscribers?.map((subscriber, index) => (
            <AssignUserToMindMapCommandItem
              key={index}
              subscriber={subscriber}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default AssignUserToMindMapCommandCotainer;
