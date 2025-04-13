"use client";
import MindMap from "@/components/mindmaps/MindMap";
import { RootState } from "@/redux/store";
import { useLazyGetWorkspaceQuery } from "@/redux/Workspace/workspaceApi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  params: {
    workspace_id: string;
  };
};

const Page = ({ params: { workspace_id } }: Props) => {
  const { activeWorkSpaceName } = useSelector(
    (state: RootState) => state.workspace
  );
  return (
    <div className="flex flex-col gap-2 h-full">
      {activeWorkSpaceName}
      page
    </div>
  );
};

export default Page;
