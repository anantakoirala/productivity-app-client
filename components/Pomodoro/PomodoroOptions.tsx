import { Settings, Settings2, Timer } from "lucide-react";
import React from "react";
import ActiveLink from "../dashboard/ActiveLink";

type Props = {};

const PomodoroOptions = (props: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <ActiveLink
        href={"/dashboard/pomodoro"}
        variant={"ghost"}
        size={"sm"}
        className="flex justify-start w-full items-center gap-2"
      >
        <Timer />
        <span>Timer</span>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/pomodoro/settings"}
        variant={"ghost"}
        size={"sm"}
        className="flex justify-start w-full items-center gap-2"
      >
        <Settings />
        <span>Setting</span>
      </ActiveLink>
    </div>
  );
};

export default PomodoroOptions;
