import React from "react";
import Members from "./settings/Members";

type Props = {
  workspaceId: string;
};

const WorkspaceMemberSettings = ({ workspaceId }: Props) => {
  return (
    <div className="">
      <Members workspaceId={workspaceId} />
    </div>
  );
};

export default WorkspaceMemberSettings;
