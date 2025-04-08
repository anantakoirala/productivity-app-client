"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CommandTagItem from "./CommandTagItem";
import NewTag from "./NewTag";
import EditTag from "./EditTag";
import { Tag } from "@/types/Tag";
import { CustomColors } from "@/constants/CustomColors";

type Props = {
  tags: Tag[];
  onSelectActiveTags: (tag: Tag) => void;
  currentActiveTags: Tag[];
  onUpdateActiveTags: (id: number, name: string, color: CustomColors) => void;
  onDeleteActiveTags: (tagId: number) => void;
};

const CommandContainer = ({
  tags,
  onSelectActiveTags,
  currentActiveTags,
  onUpdateActiveTags,
  onDeleteActiveTags,
}: Props) => {
  const [tab, setTab] = useState<"list" | "newTag" | "editTag">("list");

  const onSetTab = (tab: "list" | "newTag" | "editTag") => {
    setTab(tab);
  };

  return (
    <Command className="w-[15rem]">
      {tab === "list" && (
        <>
          <CommandInput className="text-xs" placeholder="Filter" />
          <CommandList>
            <CommandEmpty>No Result</CommandEmpty>
            <CommandGroup heading="TAGS">
              {tags?.map((tag, i) => (
                <CommandTagItem
                  key={i}
                  tag={tag}
                  onSelectActiveTags={onSelectActiveTags}
                  currentActiveTags={currentActiveTags}
                  setTab={setTab}
                />
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="NEW">
              <CommandItem className="p-0">
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="w-full h-fit justify-start px-2 py-1.5 text-xs"
                  onClick={() => {
                    setTab("newTag");
                  }}
                >
                  <Plus className="mr-1" size={16} />
                  Add Tag
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </>
      )}
      {tab === "newTag" && (
        <>
          <NewTag setTab={setTab} />
        </>
      )}
      {tab === "editTag" && (
        <>
          <EditTag
            setTab={setTab}
            onUpdateActiveTags={onUpdateActiveTags}
            onDeleteActiveTags={onDeleteActiveTags}
          />
        </>
      )}
    </Command>
  );
};

export default CommandContainer;
