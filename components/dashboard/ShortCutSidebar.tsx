import React from "react";
import TopIcons from "./TopIcons";
import BottomSidebar from "./BottomSidebar";
import AddWorkspaceDialog from "../workspace/AddWorkspaceDialog";
import Workspaces from "../workspace/Workspaces";

type Props = {};

const ShortCutSidebar = (props: Props) => {
  return (
    <div className="border-r min-h-screen flex flex-col justify-between items-center p-4 sm:py-6">
      <div className="w-full h-full  space-y-4 flex flex-col items-center justify-between ">
        <TopIcons />

        <div className="space-y-4 flex flex-col items-center">
          <Workspaces />
          <AddWorkspaceDialog />
        </div>
        <BottomSidebar />
      </div>
    </div>
  );
};

export default ShortCutSidebar;
