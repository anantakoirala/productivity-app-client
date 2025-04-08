"use client";
import { useLazyGetWorkspaceQuery } from "@/redux/Workspace/workspaceApi";
import React, { useEffect } from "react";

type Props = {
  params: {
    workspace_id: string;
  };
};

const Page = ({ params: { workspace_id } }: Props) => {
  return <div>Page</div>;
};

export default Page;
