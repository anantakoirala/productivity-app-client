"use client";
import NewTask from "@/components/tasks/NewTask";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { activeWorkSpaceName, activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );
  return (
    <div className="flex flex-col gap-2 min-h-[40rem]">
      <NewTask />
    </div>
  );
};

export default Page;
