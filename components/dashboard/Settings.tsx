"use client";
import { LockKeyhole, SunMoon, User2 } from "lucide-react";
import React from "react";
import ActiveLink from "./ActiveLink";
import { useToggleSidebar } from "@/contextProviders/ToogleSidebar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { myWorkspaceAsAdmin } = useSelector(
    (state: RootState) => state.workspace
  );
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
        <div className="flex flex-col gap-2 w-full mt-2 h-96 overflow-y-auto">
          <div className="flex flex-col p-2 gap-1">
            {myWorkspaceAsAdmin.map((myWorkspace) => (
              <div
                className="w-full h-10 flex flex-row gap-2 items-center hover:bg-primary/20 rounded-sm transition-colors duration-200 cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/settings/workspace/${myWorkspace.id}`)
                }
                key={myWorkspace.id}
              >
                {/* Image div */}
                <div className="w-12 h-full bg-muted rounded-l-sm">
                  {myWorkspace.image ? (
                    <>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${myWorkspace.image}`} // Adjust the path based on your setup
                        alt={myWorkspace.name}
                        width={40}
                        height={40}
                        className="rounded-sm object-cover w-full h-full"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-lg font-semibold w-full h-full flex items-center justify-center ">
                        {myWorkspace.name[0].toUpperCase()}
                      </span>
                    </>
                  )}
                </div>
                {/* Name div */}
                <div className="w-full h-full truncate text-sm  flex flex-row items-center tracking-tight text-muted-foreground">
                  {myWorkspace.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
