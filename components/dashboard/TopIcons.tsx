import React from "react";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import ActiveLink from "./ActiveLink";
import { BrainCircuit, CalendarDays, Home } from "lucide-react";
import { HoverCardContent } from "@radix-ui/react-hover-card";

type Props = {};

const TopIcons = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <ActiveLink variant={"ghost"} size={"icon"} href="/dashboard">
        <Home />
      </ActiveLink>
      <ActiveLink variant={"ghost"} size={"icon"} href="/dashboard/pomodoro">
        <BrainCircuit />
      </ActiveLink>
      <ActiveLink variant={"ghost"} size={"icon"} href="/dashboard/calendar">
        <CalendarDays />
      </ActiveLink>
    </div>
  );
};

export default TopIcons;
