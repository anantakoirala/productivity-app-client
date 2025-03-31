"use client";
import { LockKeyhole, SunMoon, User2 } from "lucide-react";
import React from "react";
import ActiveLink from "./ActiveLink";
import { useToggleSidebar } from "@/contextProviders/ToogleSidebar";

type Props = {};

const settingsFields = [
  {
    href: "/dashboard/settings",
    icon: <User2 size={20} />,
    title: "ACCOUNT",
  },
  {
    href: "/dashboard/settings/security",
    icon: <LockKeyhole size={20} />,
    title: "SECURITY",
  },
  {
    href: "/dashboard/settings/theme",
    icon: <SunMoon size={20} />,
    title: "THEME",
  },
];

const Settings = (props: Props) => {
  const { setIsOpen } = useToggleSidebar();
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="">
        <p className="text-xs sm:text-sm uppercase text-muted-foreground">
          General
        </p>
        <div className="flex flex-col gap-2 w-full mt-2">
          {settingsFields.map((settingField, i) => (
            <ActiveLink
              key={i}
              href={settingField.href}
              variant={"ghost"}
              size={"sm"}
              className="flex justify-start w-full items-center gap-2"
            >
              {settingField.icon}
              {settingField.title}
            </ActiveLink>
          ))}
        </div>
      </div>
      <div className="">
        <p className="text-xs sm:text-sm uppercase text-muted-foreground">
          Workspace
        </p>
        <div className="flex flex-col gap-2 w-full mt-2 h-96 overflow-y-auto"></div>
      </div>
    </div>
  );
};

export default Settings;
