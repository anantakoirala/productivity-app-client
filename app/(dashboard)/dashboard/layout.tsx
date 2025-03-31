"use client";
import DashboardHeader from "@/components/dashboard/headers/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { ToggleSidebarProvider } from "@/contextProviders/ToogleSidebar";
import { useIsMobile } from "@/hooks/user-mobile";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const router = useRouter();
  const { completeOnBoarding } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("complete", completeOnBoarding);
    if (completeOnBoarding === false) {
      router.push("/on-boarding");
    } else {
      setLoading(false);
    }
  }, [completeOnBoarding, router]);

  const isMobile = useIsMobile();
  console.log("isMobile", isMobile);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ToggleSidebarProvider>
      <main className="flex h-0 min-h-screen w-full">
        <Sidebar />

        <div className="relative p-4 md:p-6 lg:px-10 flex-grow flex flex-col overflow-y-auto">
          <DashboardHeader />
          {children}
        </div>
      </main>
    </ToggleSidebarProvider>
  );
};

export default layout;
