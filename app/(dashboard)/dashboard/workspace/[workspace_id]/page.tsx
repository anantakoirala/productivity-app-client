"use client";
import { useLazyGetWorkspaceQuery } from "@/redux/Workspace/workspaceApi";
import React, { useEffect } from "react";

type Props = {
  params: {
    workspace_id: string;
  };
};

const Page = ({ params: { workspace_id } }: Props) => {
  const [trigger, { isLoading }] = useLazyGetWorkspaceQuery();

  useEffect(() => {
    if (workspace_id) {
      trigger({ id: workspace_id });
    }
  }, [workspace_id]);
  return <div>Page</div>;
};

export default Page;
