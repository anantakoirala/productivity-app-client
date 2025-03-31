"use client";
import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { LogOutIcon, Settings2 } from "lucide-react";
import ActiveLink from "./ActiveLink";
import { restApi } from "@/api";
import { useRouter } from "next/navigation";

type Props = {};

const BottomSidebar = (props: Props) => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const response = await restApi.get("/api/auth/logout");
      router.push("/signin");
    } catch (error) {}
  };
  return (
    <div className="flex flex-col gap-4 ">
      <ThemeSwitcher />
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger tabIndex={1}>
          <Button
            onClick={() => {
              logOut();
            }}
            variant={"ghost"}
            size={"icon"}
          >
            <LogOutIcon />
          </Button>
        </HoverCardTrigger>
      </HoverCard>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger tabIndex={1}>
          <ActiveLink
            include="settings"
            variant="ghost"
            size={"icon"}
            href="/dashboard/settings"
          >
            <Settings2 />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>Settings</span>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default BottomSidebar;
