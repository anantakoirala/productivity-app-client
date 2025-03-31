import React from "react";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import ActiveLink from "./ActiveLink";
import { Home } from "lucide-react";
import { HoverCardContent } from "@radix-ui/react-hover-card";

type Props = {};

const TopIcons = (props: Props) => {
  return (
    <div>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <ActiveLink variant={"ghost"} size={"icon"} href="/dashboard">
            <Home />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>Home</span>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default TopIcons;
