"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceMemberSettings from "@/components/workspace/WorkspaceMemberSettings";
import WorkspaceSettingOverview from "@/components/workspace/WorkspaceSettingOverview";
import {
  useLazyGetWorkspaceQuery,
  useLazyGetWorkspaceSettingQuery,
} from "@/redux/Workspace/workspaceApi";
import { Layers, Users2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { workspaceId } = useParams();
  const [trigger, { isLoading }] = useLazyGetWorkspaceSettingQuery();

  useEffect(() => {
    if (workspaceId) {
      trigger({ id: workspaceId });
    }
  }, [workspaceId]);

  if (isLoading) {
    return (
      <>
        <div>Loading ...</div>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="mr-2 flex item-center gap-2">
            <Layers size={18} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="members" className="mr-2 flex item-center gap-2">
            <Users2 size={18} />
            Members
          </TabsTrigger>
        </TabsList>
        <TabsContent tabIndex={1} value="overview">
          <WorkspaceSettingOverview />
        </TabsContent>
        <TabsContent tabIndex={1} value="members">
          <WorkspaceMemberSettings workspaceId={workspaceId as string} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
