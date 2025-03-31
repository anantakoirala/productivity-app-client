import React from "react";
import User from "./User";
import BreadCrumbNav from "./BreadCrumbNav";
import Welcome from "./Welcome";
import OpenSidebar from "@/components/OpenSidebar";

type Props = {};

const DashboardHeader = (props: Props) => {
  return (
    <header className="flex w-full justify-between items-center mb-4 py-2 gap-2">
      <div className="flex items-center gap-4">
        <OpenSidebar />

        <BreadCrumbNav />
      </div>

      <User />
    </header>
  );
};

export default DashboardHeader;
