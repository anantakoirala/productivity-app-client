import React from "react";
import TopIcons from "./TopIcons";
import BottomSidebar from "./BottomSidebar";
import AddWorkspaceDialog from "../workspace/AddWorkspaceDialog";
import Workspaces from "../workspace/Workspaces";

type Props = {};

const ShortCutSidebar = (props: Props) => {
  return (
    <div className="border-r h-full flex flex-col justify-between items-center p-4 sm:py-6">
      <div className="w-full h-2/3 space-y-4">
        <TopIcons />

        <Workspaces />
        <AddWorkspaceDialog />
      </div>
      <BottomSidebar />
    </div>
  );
};

export default ShortCutSidebar;
