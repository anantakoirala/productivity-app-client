import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import AssignUserCommandTagItem from "./AssignUserCommandTagItem";

type Props = {};

const AssignUserCommandContainer = (props: Props) => {
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
            <AssignUserCommandTagItem subscriber={subscriber} key={index} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default AssignUserCommandContainer;
