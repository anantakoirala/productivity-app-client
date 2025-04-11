"use client";
import { useLazyGetWorkspaceQuery } from "@/redux/Workspace/workspaceApi";
import { useParams, notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const [trigger, { isLoading }] = useLazyGetWorkspaceQuery();
  const [pageNotFound, setPageNotFound] = useState(false);
  const { workspace_id } = useParams();

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (workspace_id) {
        try {
          const response = await trigger({ id: workspace_id }).unwrap();
        } catch (error: any) {
          if (error?.status === 404) {
            setPageNotFound(true);
          }
        }
      }
    };
    fetchWorkspace();
  }, [workspace_id]);

  if (pageNotFound) {
    notFound();
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export default layout;
