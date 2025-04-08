"use client";
import { useLazyGetWorkspaceQuery } from "@/redux/Workspace/workspaceApi";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const [trigger, { isLoading }] = useLazyGetWorkspaceQuery();
  const { workspace_id } = useParams();

  useEffect(() => {
    if (workspace_id) {
      trigger({ id: workspace_id });
    }
  }, [workspace_id]);
  return <div>{children}</div>;
};

export default layout;
