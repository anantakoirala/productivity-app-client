"use client";
import React, { useEffect, useState } from "react";
import User from "./User";
import BreadCrumbNav from "./BreadCrumbNav";
import Welcome from "./Welcome";
import OpenSidebar from "@/components/OpenSidebar";
import InviteUser from "@/components/workspace/user/InviteUser";
import { usePathname } from "next/navigation";

type Props = {};

const DashboardHeader = (props: Props) => {
  const pathname = usePathname();
  const [showInviteUser, setShowInviteUser] = useState<boolean>(false);

  useEffect(() => {
    setShowInviteUser(false);
    if (pathname) {
      if (pathname.startsWith("/dashboard/workspace")) {
        setShowInviteUser(true);
      }
    }
  }, [pathname]);
  return (
    <header className="flex w-full justify-between items-center mb-4 py-2 gap-2">
      <div className="flex items-center gap-4">
        <OpenSidebar />

        <BreadCrumbNav />
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        {showInviteUser && <InviteUser />}
        <User />
      </div>
    </header>
  );
};

export default DashboardHeader;
