import React from "react";
import TopIcons from "./TopIcons";
import BottomSidebar from "./BottomSidebar";
import Workspaces from "./Workspaces";
import AddWorkspaceDialog from "../workspace/AddWorkspaceDialog";

type Props = {};

const ShortCutSidebar = (props: Props) => {
  return (
    <div className="border-r h-full flex flex-col justify-between items-center p-4 sm:py-6">
      <div className="w-full h-2/3">
        <TopIcons />

        <Workspaces />
        <AddWorkspaceDialog />
      </div>
      <BottomSidebar />
    </div>
  );
};

export default ShortCutSidebar;
